const express = require("express");

const productTags = require("./shopify-to-prismic/product-tags");
const products = require("./shopify-to-prismic/products");
const prismicToAlgolia = require("./prismic-to-algolia");
const emailSendGrid = require("./email-send-grid");
const storeLocation = require("./store-catalog");
const bag = require("./bag/velocity");
const velocity = require("./velocity/calculate-points");
const autoClub = require("./bag/auto-club");
const shareCart = require("./bag/share_cart");
const seoDocuments = require("./seo-documents");

const app = express();

app.use(express.json());
app.use("/shopify-to-prismic/products", products);
app.use("/shopify-to-prismic/product-tags", productTags);
app.use("/prismic-to-algolia", prismicToAlgolia);
app.use("/send-mail", emailSendGrid);
app.use("/stores", storeLocation);
app.use("/bag/velocity", bag);
app.use("/bag/auto-club", autoClub);
app.use("/bag/share-cart", shareCart);
app.use("/velocity/calculte-points", velocity);
app.use("/seo-documents", seoDocuments);

app.use("/*", (req, res) => {
  res.status(404).json({ message: "api not found" });
});

module.exports = {
  path: "/api/",
  handler: app,
};
