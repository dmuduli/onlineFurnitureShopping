import {
  reduce,
  compose,
  pathOr,
  map,
  path,
  evolve,
  values,
  mapObjIndexed,
  head,
  intersection,
} from "ramda";
import gql from "graphql-tag";
import {
  normalizeId,
  byId,
  getVariants,
  createVariantOptionsMap,
} from "~/utils/shopify-utils";

const PRODUCT_DETAIL_BY_HANDLE = gql`
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      productType
      tags
      description
      descriptionHtml
      vendor
      seo {
        description
        title
      }
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
            src: originalSrc
            altText
            id
          }
        }
      }
      collections(first: 20) {
        edges {
          node {
            handle
            title
          }
        }
      }
      reviews_average: metafield(namespace: "yotpo", key: "reviews_average") {
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
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 50) {
        edges {
          node {
            mattress_comfort_feel: metafield(
              namespace: "snooze"
              key: "mattress_comfort_feel"
            ) {
              key
              value
            }
            cloud_rating: metafield(namespace: "snooze", key: "cloud_rating") {
              key
              value
            }
            warranty: metafield(namespace: "snooze", key: "warranty") {
              key
              value
            }
            support_system: metafield(
              namespace: "snooze"
              key: "support_system"
            ) {
              key
              value
            }
            australian_made: metafield(
              namespace: "snooze"
              key: "australian_made"
            ) {
              key
              value
            }
            delivery_pickup: metafield(
              namespace: "snooze"
              key: "delivery_pickup"
            ) {
              key
              value
            }
            delivery_truck: metafield(
              namespace: "snooze"
              key: "delivery_truck"
            ) {
              key
              value
            }
            lead_time_text: metafield(
              namespace: "snooze"
              key: "lead_time_text"
            ) {
              key
              value
            }
            width: metafield(namespace: "snooze", key: "width") {
              key
              value
            }
            height: metafield(namespace: "snooze", key: "height") {
              key
              value
            }
            depth: metafield(namespace: "snooze", key: "depth") {
              key
              value
            }
            colourHex: metafield(namespace: "snooze", key: "color_hex") {
              value
            }
            inventoryPolicy
            inventoryQuantity
            fulfillmentService {
              serviceName
            }
            taxable
            sku
            id
            storefrontId
            title
            availableForSale
            compareAtPrice
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
          }
        }
      }
    }
  }
`;

async function getShopifyData(handle, app) {
  const client = app.apolloProvider.clients.shopifyAdmin;
  const result = await client.query({
    query: PRODUCT_DETAIL_BY_HANDLE,
    variables: { handle },
  });
  return path(["data", "productByHandle"], result);
}

export const getImages = compose(
  map(compose(evolve({ id: normalizeId }), pathOr({}, ["node"]))),
  pathOr([], ["images", "edges"])
);

const getCollections = compose(
  map(path(["node", "handle"])),
  pathOr([], ["collections", "edges"])
);

export const getVariantsById = byId("id");
export const getVariantsByPosition = byId("position");

const getOptions = path(["options"]);
export const getOptionsByName = byId("name");
const getOptionsByPosition = byId("position");

export const groupByOptions = (options, optionPos) => variant => {
  const optionsByPosition = getOptionsByPosition(options);
  const optionsByName = getOptionsByName(options);
  const option = optionsByPosition[optionPos].name;
  const sizePosition = path([option, "position"], optionsByName);

  return path(["selectedOptions", sizePosition - 1, "value"], variant);
};

export const getTilesInfo = (options, variants) => {
  const variantOptionsMap = createVariantOptionsMap(options, variants, true);
  return selectedOptionsObj => {
    const selectedOptions = values(
      mapObjIndexed((value, key) => `${key}-${value}`, selectedOptionsObj)
    );
    const selectedOptionsValues = values(selectedOptionsObj);

    return options.map((_, optionIndex) => {
      const tiles = options[optionIndex].values.map(optionValue => {
        for (
          let accuracy = options.length;
          accuracy > optionIndex;
          accuracy--
        ) {
          // Formulate an array of target options with given accuracy
          let targetOptions = selectedOptions.slice(0, accuracy);
          targetOptions[
            optionIndex
          ] = `${options[optionIndex].name}-${optionValue}`;

          // Attempt to find variant with target options
          const target = head(
            reduce(
              (acc, v) => intersection(acc, variantOptionsMap[v]),
              variantOptionsMap[targetOptions[0]],
              targetOptions
            )
          );

          if (target) {
            // Target found, store accuracy and break
            return {
              tileLabel: optionValue,
              targetAccuracy: accuracy,
              targetVariantId: target,
            };
          }
        }

        // if not returned from the loop then return this value
        return {
          tileLabel: optionValue,
          targetAccuracy: 0,
          targetVariantId: null,
        };
      });
      return {
        label: options[optionIndex].name,
        tiles,
        selectedTile: selectedOptionsValues[optionIndex],
      };
    });
  };
};

export const getSelectedVariantId = variantOptionsMap => selectedOptions => {
  console.log({ selectedOptions, variantOptionsMap });
  const allOptions = values(selectedOptions);
  const allVariantIds = compose(
    xs => reduce((acc, v) => intersection(acc, v), xs[0], xs),
    map(option => pathOr([], [option], variantOptionsMap))
  );

  console.log({ allOptions, qwwww: allVariantIds(allOptions) });
  return path([0], allVariantIds(allOptions));
};

export default async function (handle, app) {
  const response = await getShopifyData(handle, app);

  const images = getImages(response);
  const title = path(["title"], response);
  const tags = path(["tags"], response);
  const description = pathOr("", ["description"], response);
  const descriptionHtml = pathOr("", ["descriptionHtml"], response);
  const variants = getVariants(response);
  const options = getOptions(response);
  const id = normalizeId(response.id);
  const featuredImage = pathOr("", ["featuredImage", "src"], response);
  const productReview = {
    reviews_average: Number(pathOr(0, ["reviews_average", "value"], response)),
    reviews_count: Number(pathOr(0, ["reviews_count", "value"], response)),
  };
  const collections = getCollections(response);
  const campaignBadgeTitle = path(
    ["product_campaign_badge_title", "value"],
    response
  );
  const campaignBadgeColor = path(
    ["product_campaign_badge_color", "value"],
    response
  );

  const threeDUrl = path(["three_d_url", "value"], response);
  const reviewHtml = path(["bottomline", "value"], response);

  const metaTitle = pathOr(title, ["seo", "title"], response);
  const metaDescription = path(["seo", "description"], response);

  let metafields = null;
  if (campaignBadgeTitle != null || campaignBadgeColor != null) {
    metafields = {
      product_campaign_badge_color: campaignBadgeColor,
      product_campaign_badge_title: campaignBadgeTitle,
    };
  }

  return {
    images,
    title,
    tags,
    description,
    descriptionHtml,
    variants,
    options,
    metafields,
    handle,
    id,
    collections,
    productReview,
    featuredImage,
    threeDUrl,
    reviewHtml,
    metaTitle,
    metaDescription,
  };
}
