const express = require("express");
const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const Algoliasearch = require("algoliasearch");
const { path, replace, pathOr, compose, map } = require("ramda");

const router = express.Router();

function getPrismicApi() {
  return Prismic.getApi("https://snooze-discovery.cdn.prismic.io/api/v2");
}

function authenticate(req, res, next) {
  const authToken = pathOr("", ["body", "secret"], req);
  console.log("request payload", req.body);
  if (!authToken || authToken != process.env.SHOPIFY_ADMIN_API_KEY) {
    res.status(401).json({ message: "not authenticated" });
    return;
  }
  console.log("authenticated");
  next();
}

router.use(authenticate);

async function saveToAlgolia(algoliaIndex, results) {
  const algoliaReadyResults = results
    .map(blog => {
      const blogData = blog.data;
      const title = path(["title", [0], "text"], blogData);
      const author = path(["author", "data"], blogData);
      const image = path(["feature_image", "url"], blogData);
      const richText = path(["description", [0], "text"], blogData);
      const tags = compose(
        map(replace(/^Blog_/, "")),
        pathOr([], ["tags"])
      )(blog);

      if (title == null || image == null || richText == null) {
        console.log(`Blog(${title}): Not Synced`);
        console.log(
          "Because it does not contain title or image or description"
        );
        return null;
      }

      // In Algolia searchable attribute are restrcited up to 1500 characters
      const body = PrismicDOM.RichText.asText(blogData.description).slice(
        0,
        1500
      );

      return {
        title,
        image,
        tags,
        body,
        handle: blog.uid,
        author,
        created_at: blog.first_publication_date,
        published_at: blog.data.date ?? blog.last_publication_date,
        objectID: blog.id,
      };
    })
    .filter(Boolean);

  const algoliaObjectIds = await algoliaIndex.saveObjects(algoliaReadyResults);

  if (algoliaObjectIds.length != 0) {
    console.log(
      "Algolia snooze_dev_blogs index has been updated with 50 blogs from Prismic."
    );
  } else {
    throw new Error("Data not synced completely");
  }
}

router.post("/", async (req, res) => {
  const prismicClient = await getPrismicApi();
  const algoliaClient = Algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  );
  const algoliaIndex = algoliaClient.initIndex("snooze_dev_blogs");

  let page = 1;
  do {
    const { results, next_page: nextPage } = await prismicClient.query(
      Prismic.Predicates.at("document.type", "blog"),
      {
        fetchLinks: ["author.name", "author.username"],
        orderings: "[my.blog.publication_date desc]",
        pageSize: 50,
        page,
      }
    );

    try {
      await saveToAlgolia(algoliaIndex, results);
    } catch (err) {
      console.log(err);
      res.json(err);
      return;
    }

    console.log({ nextPage });
    if (nextPage == null) {
      break;
    }
    console.log(page, nextPage);
    page++;
  } while (true);

  res.json("sync completed");
});

module.exports = router;
