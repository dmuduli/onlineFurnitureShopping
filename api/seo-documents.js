const fs = require("fs").promises;
const express = require("express");
const Prismic = require("prismic-javascript");
const { pathOr, evolve } = require("ramda");
const { pathToRegexp } = require("path-to-regexp");

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

const evolveData = evolve({
  from: x => {
    const regexp = pathToRegexp(x);
    console.log(regexp, x);
    return { source: regexp.source, flags: regexp.flags };
  },
});

const saveFile = (fileName, data) =>
  fs
    .writeFile(fileName, data)
    .then(() => {
      console.log(`File ${fileName} saved successfully`);
    })
    .catch(err => {
      console.error(`Error in saving ${fileName} Error-${err.message}`);
    });

router.use(authenticate);

router.post("/", async (req, res) => {
  const prismicClient = await getPrismicApi();
  const {
    results: [{ data }],
  } = await prismicClient.query(
    Prismic.Predicates.at("document.type", "seo_documents")
  );

  console.log("Saving redirects.json file ....");
  const redirectsData = JSON.parse(data.redirects_file[0].text);
  const updatedRedirectsData = redirectsData.map(evolveData);
  await saveFile("redirects.json", JSON.stringify(updatedRedirectsData));

  console.log("Saving resource-gone.json file ....");
  const resourceGoneData = JSON.parse(data.resource_gone_file[0].text);
  const updatedresourceGoneData = resourceGoneData.map(evolveData);
  await saveFile("resource-gone.json", JSON.stringify(updatedresourceGoneData));

  console.log("Saving robots.txt file ....");
  await saveFile("robots.txt", data.robots_text_file[0].text);

  console.log("Saving sitemap.xml file ....");
  await saveFile("sitemap.xml", data.xml_sitemap_file[0].text);

  res.send({
    message: "all file saved",
  });
});

module.exports = router;
