export default {
  routeMap: {
    "options.size": "sizes",
    "meta.snooze.color_group": "colors",
    "meta.snooze.brand_list": "brands",
    "meta.snooze.mattress_comfort_feel": "feel",
    "named_tags.quickship": "quickship",
    "options.title": "title",
    range: "price",
    sortBy: "sortBy",
  },
  collection: {
    facetWidgets: {
      maxValuesPerFacet: 7,
      size: {
        sortOrder: [
          "super-king",
          "king",
          "queen",
          "double",
          "king-single",
          "long-single",
          "single",
        ],
        shopifyName: "options.size",
      },
      feel: {
        sortOrder: ["plush", "medium", "firm"],
        shopifyName: "meta.snooze.mattress_comfort_feel",
      },
      brand: { shopifyName: "meta.snooze.brand_list" },
    },
  },
  home: {
    carouselLimit: 8,
  },
  indexName: "snooze_dev_products",
  collectionIndexName: "snooze_dev_collections",
  blogIndexName: "snooze_dev_blogs",
  searchCollectionHits: 5,
  searchProductsHits: 3,
  searchBlogsHits: 3,
  searchDelay: 500,
  blogsPerPage: 5,
  reviewsPerPage: 3,
  reviewDescriptionMaxLen: 300,
  headerHeight: 80,
  storeLocator: {
    locationRadius: 50000, // 50 km
    country: "au", // australia
    zoom: 4,
    mapCenter: { lat: -25.3, lng: 133.8 },
    timeout: 100000,
    maxAge: 0,
  },
  pdp: {
    comfortFeelOrder: ["Firm", "Medium", "Plush"],
    addedToBagCloseTime: 10000,
    descriptionCharLimit: 300,
    dimensionPlaceholderImg:
      "//cdn.shopify.com/s/files/1/2513/8850/t/153/assets/mattresses-dimension.svg?v=14558218864766473346",
  },
  megaMenu: {
    rowsLimit: 15,
  },
  footer: {
    reviewImage: {
      src:
        "https://api.productreview.com.au/api/services/rating-badge/v2/au/dd184ca8-9cab-3495-a8f9-d9bc2f6f2d98/from-internal-entry-id",
      alt: "Snooze",
      link: "https://www.productreview.com.au/listings/snooze",
    },
  },
};

export const starPointsList = [
  19.8,
  2.2,
  6.6,
  43.56,
  39.6,
  17.16,
  0,
  17.16,
  33,
  43.56,
];
