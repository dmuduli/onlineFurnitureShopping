import {
  pathOr,
  compose,
  map,
  last,
  split,
  reduce,
  merge,
  reduceBy,
  mergeAll,
  evolve,
  concat,
  path,
} from "ramda";

/*
 * Takes a Shopiy `checkoutlineitemconnection` object and strips out the edges and nodes
 * SEE https://help.shopify.com/en/api/storefront-api/reference/object/checkoutlineitemconnection
 */
export const stripLineItems = items => {
  return compose(
    map(item => item.node),
    pathOr([], ["edges"])
  )(items);
};

/*
 * Takes a Shopify value, and then appends the currency to it.
 */
export const formatMoney = (value, currency) => {
  return `$${parseFloat(value).toFixed(2)} ${currency}`;
};

// normalize shopify id as it is in the form
// "gid://shopify/ProductVariant/34236684828716"
export const normalizeId = compose(last, split("/"));

// makes a list of objects as map with specified identfier
// identfier should be unique
export const byId = id => reduce((acc, v) => merge(acc, { [v[id]]: v }), {});

// create a map of varinatIds and option values
// optionName-OptionValue: [variantIds...]
// Comfort Feel Left- Plush : [34762584293420, 34762556145708]
export const createVariantOptionsMap = (
  options,
  variants,
  withOptionName = false
) => {
  const groupByOption = optionName =>
    compose(
      concat(withOptionName ? `${optionName}-` : ""),
      pathOr("", ["selectedOptions", optionName, "value"])
    );

  const byOption = reduceBy((acc, { id }) => acc.concat(id), []);
  const groupFuncs = map(
    compose(byOption, groupByOption, path(["name"])),
    options
  );
  return mergeAll(map(f => f(variants), groupFuncs));
};

// normalizes variants
export const getVariants = compose(
  map(
    compose(
      evolve({
        id: normalizeId,
        selectedOptions: byId("name"),
        colourHex: path(["value"]),
      }),
      pathOr({}, ["node"])
    )
  ),
  pathOr([], ["variants", "edges"])
);

export const getPdpUrl = (storefrontVariantId, productHandle) => {
  let decodedVariantId = "";
  if (typeof window === "undefined") {
    decodedVariantId = Buffer.from(storefrontVariantId, "base64").toString();
  } else {
    decodedVariantId = atob(storefrontVariantId);
  }
  const variantId = normalizeId(decodedVariantId);
  return `/products/${productHandle}?variant=${variantId}`;
};
