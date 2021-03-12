const express = require("express");
const router = express.Router();
const axios = require("axios");
const gql = require("graphql-tag");
const { print } = require("graphql");
const { pathOr } = require("ramda");

const {
  SHOPIFY_SHOP_END_POINT,
  SHOPIFY_ADMIN_PASSWORD,
  SHOPIFY_TAGS_URL,
  SHOPIFY_TAGS_TOKEN,
} = process.env;
const shopifyAdminGraphqlURL = `${SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_ADMIN_URI}/graphql.json`;
const shopifyAccessToken = SHOPIFY_ADMIN_PASSWORD;

const TAGS_QUERY = gql`
  query {
    shop {
      productTags(first: 250) {
        edges {
          node
        }
      }
    }
  }
`;

async function fetchShopifyTags() {
  const { data } = await axios.post(
    shopifyAdminGraphqlURL,
    {
      query: print(TAGS_QUERY),
    },
    {
      headers: {
        Accept: "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
    }
  );
  return pathOr([], ["data", "shop", "productTags", "edges"], data);
}

async function postTagsToPrismic(url, data, headers) {
  let result = {};
  await axios
    .post(url, data, { headers })
    .then(function (response) {
      result = {
        status: "success",
        msg: "Api result",
        data: response.config.data,
      };
    })
    .catch(function (error) {
      result = {
        status: "error",
        msg: "Got some error",
        data: error,
      };
      console.log(error);
    });
  return result;
}

router.get("/", async function (req, res) {
  try {
    const productTags = await fetchShopifyTags();
    let index = 0;
    let prismicReadyResults = [];
    for (const tag of productTags) {
      index++;
      try {
        prismicReadyResults.push({
          id: tag.node,
          title: tag.node,
          description: `product tag ${tag.node}`,
          image_url: `${index} tag ${tag.node}`,
          last_update: Date.now(),
          blob: { node: tag.node },
        });
      } catch (e) {
        console.log(`Issue with this record ${e.message}`);
      }
    }

    const headers = {
      Authorization: `Bearer ${SHOPIFY_TAGS_TOKEN}`,
      "Content-Type": "application/json",
    };

    // push data to prismic
    const prismicResponse = await postTagsToPrismic(
      SHOPIFY_TAGS_URL,
      prismicReadyResults,
      headers
    );
    res.send({ ...prismicResponse });
  } catch (e) {
    console.log(e);
    res.send({
      error: "some error",
      response: e.message,
    });
  }
});

module.exports = router;
