import { map, pathOr, compose, filter } from "ramda";

// const shopifyProductsPropEq = propEq("type", "shopify_products");
// const shopifyProductsPropNotEq = complement(shopifyProductsPropEq);
// const productsByHandle = byId("handle");

const _getPrismicProducts = compose(
  map(filter(pathOr(false, ["product", "handle"]))),
  map(pathOr([], ["fields"]))
  // pathOr([], ['fields']),
  // filter(shopifyProductsPropEq)
);

export const getPrismicProducts = slices =>
  _getPrismicProducts(slices)
    .filter(arr => arr.length)
    .reduce((acc, value) => acc.concat(value), []);
