const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

const shopifyAdminURL = `${process.env.SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_ADMIN_URI}`;
const shopifyThemeId = process.env.SHOPIFY_THEME_ID;
const configURI = `${shopifyAdminURL}/themes/${shopifyThemeId}/assets.json`;
const restUrl = `${configURI}?asset[key]=assets/algolia_config.js.liquid`;

const resultsFileName = path.join(__dirname, "files/algolia_config.json");

const shopifyAdminAuthKey = Buffer.from(
  `${process.env.SHOPIFY_ADMIN_API_KEY}:${process.env.SHOPIFY_ADMIN_PASSWORD}`
).toString("base64");

/* eslint no-new-func : off */
// returned response is like
// window.algoliaShopify = {};
// algoliaShopify.confi - g = ...
function getParsedConfig(response) {
  const { config } = new Function(
    `const window={};
        const algoliaShopify={};
        ${response};
        return algoliaShopify;`
  )();

  return config;
}

fetch(`${restUrl}`, {
  headers: { Authorization: `Basic ${shopifyAdminAuthKey}` },
})
  .then(response => response.json())
  .then(response => {
    try {
      const config = getParsedConfig(response.asset.value);
      writeFile(config);
    } catch (error) {
      console.log(error);
    }
  });

const writeFile = data => {
  fs.writeFileSync(resultsFileName, JSON.stringify(data), error => {
    if (error) {
      console.error("Error writing in the file", error);
    } else {
      console.log("File written successfully");
    }
  });
};
