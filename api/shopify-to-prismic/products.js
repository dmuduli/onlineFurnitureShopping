const readline = require("readline");
const express = require("express");
const gql = require("graphql-tag");
const { print } = require("graphql");
const axios = require("axios");
const {
  evolve,
  pathOr,
  path,
  compose,
  map,
  filter,
  includes,
  not,
} = require("ramda");

const { normalizeId, byId } = require("../../utils/shopify-utils");

const router = express.Router();

const PRODUCTS_QUERY = gql`
  query {
    products {
      edges {
        node {
          id
          title
          handle
          tags
          description
          descriptionHtml
          vendor
          featuredImage {
            src: originalSrc
          }
          options {
            name
            position
            values
          }
          images(first: 50) {
            edges {
              node {
                id
                src: originalSrc
                altText
              }
            }
          }
          collections(first: 20) {
            edges {
              node {
                id
                handle
                title
              }
            }
          }
          reviews_average: metafield(
            namespace: "yotpo"
            key: "reviews_average"
          ) {
            value
          }
          reviews_count: metafield(namespace: "yotpo", key: "reviews_count") {
            value
          }
          bottomline: metafield(namespace: "yotpo", key: "bottomline") {
            value
          }
          product_campaign_badge_color: metafield(
            namespace: "snooze"
            key: "product_campaign_badge_color"
          ) {
            value
          }
          three_d_url: metafield(namespace: "snooze", key: "three_d_url") {
            value
          }
          product_campaign_badge_title: metafield(
            namespace: "snooze"
            key: "product_campaign_badge_title"
          ) {
            value
          }
          variants(first: 50) {
            edges {
              node {
                id
                sku
                title
                availableForSale
                compare_at_price: compareAtPrice
                price
                image {
                  src: originalSrc
                  altText
                  id
                }
                position
                selectedOptions {
                  name
                  value
                }
                inventoryPolicy
                inventoryQuantity
                fulfillmentService {
                  serviceName
                }
                mattress_comfort_feel: metafield(
                  namespace: "snooze"
                  key: "mattress_comfort_feel"
                ) {
                  value
                }
                cloud_rating: metafield(
                  namespace: "snooze"
                  key: "cloud_rating"
                ) {
                  value
                }
                warranty: metafield(namespace: "snooze", key: "warranty") {
                  value
                }
                support_system: metafield(
                  namespace: "snooze"
                  key: "support_system"
                ) {
                  value
                }
                australian_made: metafield(
                  namespace: "snooze"
                  key: "australian_made"
                ) {
                  value
                }
                delivery_pickup: metafield(
                  namespace: "snooze"
                  key: "delivery_pickup"
                ) {
                  value
                }
                delivery_truck: metafield(
                  namespace: "snooze"
                  key: "delivery_truck"
                ) {
                  value
                }
                width: metafield(namespace: "snooze", key: "width") {
                  value
                }
                height: metafield(namespace: "snooze", key: "height") {
                  value
                }
                depth: metafield(namespace: "snooze", key: "depth") {
                  value
                }
                colourHex: metafield(namespace: "snooze", key: "color_hex") {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const BULK_PRODUCTS_MUTATION = gql`
  mutation bulkOperationRunQuery($bulkQuery: String!) {
    bulkOperationRunQuery(query: $bulkQuery) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const shopifyAdminGraphqlURL = `${process.env.SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_ADMIN_GRAPHQL_URI}`;
const shopifyAccessToken = process.env.SHOPIFY_ADMIN_PASSWORD;

async function executeBulkMutation() {
  const { data } = await axios.post(
    shopifyAdminGraphqlURL,
    {
      query: print(BULK_PRODUCTS_MUTATION),
      variables: { bulkQuery: print(PRODUCTS_QUERY) },
    },
    {
      headers: {
        Accept: "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
    }
  );

  const errors = path(["data", "bulkOperationRunQuery", "userErrors"], data);

  if (errors.length != 0) {
    const errorMessage = `Error happened in bulk operation query muatation ---
     ${errors.reduce((acc, v) => acc.concat(v.message), "")}`;
    throw new Error(errorMessage);
  }

  const bulkOperationId = path(
    ["data", "bulkOperationRunQuery", "bulkOperation", "id"],
    data
  );

  return bulkOperationId;
}

const POLL_BULK_OPERATION_QUERY = gql`
  query pollQuery($id: ID!) {
    node(id: $id) {
      ... on BulkOperation {
        id
        status
        errorCode
        createdAt
        completedAt
        objectCount
        fileSize
        url
        partialDataUrl
      }
    }
  }
`;

async function getBulkOperationData(bulkOperationId) {
  let responseData;
  try {
    const { data } = await axios.post(
      shopifyAdminGraphqlURL,
      {
        query: print(POLL_BULK_OPERATION_QUERY),
        variables: { id: bulkOperationId },
      },
      {
        headers: {
          Accept: "application/json",
          "X-Shopify-Access-Token": shopifyAccessToken,
        },
      }
    );
    responseData = path(["data", "node"], data);
  } catch (e) {
    throw new Error(e.response.statusText);
  }

  return responseData;
}

async function pollForBulkQuery(bulkOperationId) {
  const data = await getBulkOperationData(bulkOperationId);
  console.log({ data });

  if (data.status == "COMPLETED") {
    console.log("after completed .......");
    return data.url;
  }

  // wait for 1 minutes and then poll again
  console.log("waiting...........");
  await new Promise(resolve => setTimeout(resolve, 1 * 1000 * 60));
  console.log("after waiting .......");
  return pollForBulkQuery(bulkOperationId);
}

const getVariants = compose(
  map(
    evolve({
      id: normalizeId,
      fulfillmentService: path(["serviceName"]),
      warranty: path(["value"]),
      support_system: path(["value"]),
      australian_made: path(["value"]),
      delivery_pickup: path(["value"]),
      delivery_truck: path(["value"]),
      width: path(["value"]),
      height: path(["value"]),
      depth: path(["value"]),
      colourHex: path(["value"]),
      selectedOptions: byId("name"),
    })
  )
);

const normalizeData = evolve({
  id: normalizeId,
  images: map(evolve({ id: normalizeId })),
  variants: getVariants,
  featuredImage: pathOr("", ["src"]),
  reviews_average: compose(Number, pathOr(0, ["value"])),
  reviews_count: compose(Number, pathOr(0, ["value"])),
  collections: map(path(["handle"])),
  product_campaign_badge_title: path(["value"]),
  product_campaign_badge_color: path(["value"]),
  three_d_url: path(["value"]),
  bottomline: path(["value"]),
});

const productsCatalogURL = process.env.PRODUCTS_CATALOG_URL;
const productsCatalogToken = process.env.PRODUCT_CATALOG_TOKEN;
async function pushDataToPrismic(products) {
  console.log("@@@PUSHSTTTTTTTTTTTTTTTTTTARTTTTTTTTTTTTTTTTTTTTTTT@@@");
  const normalizedData = compose(
    map(
      compose(
        product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          image_url: product.featuredImage,
          last_update: Date.now(),
          blob: product,
        }),
        normalizeData
      )
    ),
    filter(compose(not, includes("hidden"), pathOr([], ["tags"])))
  );

  let response;
  try {
    response = await axios.post(productsCatalogURL, normalizedData(products), {
      headers: { Authorization: `Bearer ${productsCatalogToken}` },
    });
  } catch (e) {
    throw new Error(e.response ? e.response.statusText : e.message);
  }
  console.log("!!!PUSHENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDDDDDDDDDD!!!");
  return response.data;
}

async function processLineByLine(fileURL) {
  const { data: fileStream } = await axios.get(fileURL, {
    responseType: "stream",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let products = [];
  let product = null;
  let productsPromise = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const item = JSON.parse(line);
    if (item.id.includes("/Product/")) {
      if (products.length >= 5) {
        productsPromise.push(pushDataToPrismic(products));
        products = [];
      } else if (product != null) {
        products.push(product);
      }

      product = { ...item, images: [], variants: [], collections: [] };
      continue;
    }

    if (item.id.includes("/ProductImage/")) {
      product.images.push(item);
      continue;
    }

    if (item.id.includes("/ProductVariant/")) {
      product.variants.push(item);
      continue;
    }

    if (item.id.includes("/Collection/")) {
      product.collections.push(item);
      continue;
    }
  }

  products.push(product);
  productsPromise.push(pushDataToPrismic(products));
  console.log("@@@WAITING TO PUSH ALL THE PRODUCTSSSSSSSSSSSSSSSSS");
  await Promise.all(productsPromise);
}

router.get("/", async function (req, res) {
  let errorMessage = "";
  try {
    const bulkOperationId = await executeBulkMutation();
    console.log({ bulkOperationId });
    const fileURL = await pollForBulkQuery(bulkOperationId);
    await processLineByLine(fileURL);
  } catch (e) {
    errorMessage = `Some error happened ---
    ${e.message}`;
  }

  res.send({
    response:
      errorMessage != ""
        ? errorMessage
        : "Successsfully pushed the products to prismic",
  });
});

module.exports = router;
