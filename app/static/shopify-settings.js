const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

const shopifyAdminURL = `${process.env.SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_ADMIN_URI}`;
const shopifyThemeId = process.env.SHOPIFY_THEME_ID;
const configURI = `${shopifyAdminURL}/themes/${shopifyThemeId}/assets.json`;
const restUrl = `${configURI}?asset[key]=config/settings_data.json`;

const resultsFileName = path.join(__dirname, "files/settings_data.json");

const authorization = Buffer.from(
  `${process.env.SHOPIFY_ADMIN_API_KEY}:${process.env.SHOPIFY_ADMIN_PASSWORD}`
).toString("base64");

fetch(`${restUrl}`, {
  headers: { Authorization: `Basic ${authorization}` },
})
  .then(response => response.json())
  .then(data => {
    try {
      const result = JSON.parse(data.asset.value);
      writeFile(result);
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
