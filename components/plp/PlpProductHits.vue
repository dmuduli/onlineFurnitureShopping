<template>
  <div v-if="state">
    <div ref="productContainer" class="flex flex-wrap -ml-2 md:-ml-6 lg:ml-0">
      <product-tile
        v-for="item of items"
        ref="productElements"
        :key="item.objectID"
        class="flex flex-col w-1/2 md:w-1/3 xxl:w-1/4 pl-2 mb-10 md:mb-18 md:pl-6"
        :product="getProductProps(item, getShopifyProduct(item))"
        :initial-variant-id="item.objectID"
      >
        <template #images="{ productImagesProps }">
          <product-tile-images
            :title="item.title"
            v-bind="productImagesProps"
          />
        </template>
        <template #brand>
          <product-tile-brand :metafields="item.meta.snooze" />
        </template>
        <template #title="{ selectedVariantId }">
          <product-tile-title
            :title="`${item.title}`"
            :handle="item.handle"
            :selected-variant-id="selectedVariantId"
          />
        </template>
        <template #ratings="{ selectedVariantId }">
          <product-tile-rating
            :review-html="item.meta.yotpo ? item.meta.yotpo.bottomline : ''"
            :handle="item.handle"
            :selected-variant-id="selectedVariantId"
          />
        </template>
        <template #colors="{ productColorProps }">
          <product-tile-colors
            :meta-colors="getMetaColorsProp(getShopifyProduct(item))"
            :options="getOptions(getShopifyProduct(item))"
            v-bind="productColorProps"
            :handle="item.handle"
          />
        </template>
        <template #sizes>
          <product-tile-sizes
            :options="getOptions(getShopifyProduct(item))"
            :handle="item.handle"
          />
        </template>
        <template #prices="{ price, compareAtPrice }">
          <product-tile-prices
            :compare-at-price="compareAtPrice"
            :price="price"
            :handle="item.handle"
          />
        </template>
      </product-tile>
    </div>
    <slot></slot>
    <div v-if="items.length > 0" class="flex justify-center mb-10">
      <app-button
        v-if="!isLastPage"
        class="w-full md:w-1/3"
        @click.native.prevent="refineNext"
      >
        {{ "load more" }}
      </app-button>
      <p v-else class="font-para text-sm text-black font-semibold">
        All products are loaded
      </p>
    </div>
  </div>
</template>

<script>
import { connectInfiniteHitsWithInsights } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch";
import {
  path,
  map,
  last,
  andThen,
  init,
  compose,
  curry,
  splitEvery,
  unnest,
  otherwise,
  difference,
  isNil,
  isEmpty,
  equals,
} from "ramda";
import gql from "graphql-tag";
import { mapState } from "vuex";

import createInfiniteHitsSessionStorageCache from "~/utils/infinite-hits-cache";
import metaColourMixin from "~/mixins/metaColourMixin";
import templateString from "~/utils/template-string";
import { getImages } from "~/datalayer/PDPPage";
import { getVariants, byId } from "~/utils/shopify-utils";

const PRODUCT_BY_HANDLE = templateString`${"index"}: productByHandle( handle: "${"handle"}") {
  id
  handle
  options {
    position
    name
    values
  }
  variants(first: 20) {
      edges {
        node {
          position
          compare_at_price: compareAtPrice
          price
          id
          selectedOptions {
            name
            value
          }
          colourHex: metafield(namespace: "snooze", key: "color_hex") {
            value
          }
        }
      }
    }
  images(first: 20) {
    edges {
      node {
        src: originalSrc
        id
      }
    }
  }
}`;

async function getShopifyData(nuxt, productHandles) {
  const query = productHandles
    .map((handle, index) => PRODUCT_BY_HANDLE({ index: `q_${index}`, handle }))
    .join("");

  const client = nuxt.$apolloProvider.clients.shopifyAdmin;
  const { data } = await client.query({
    query: gql` query { ${query} }`,
  });

  return Object.values(data);
}

export default {
  mixins: [
    metaColourMixin,
    createWidgetMixin({ connector: connectInfiniteHitsWithInsights }),
  ],

  data: () => ({
    topBarHeight: 100,
    loadMoreClicked: false,
    shopifyProducts: [],
    source: null,
    cache: createInfiniteHitsSessionStorageCache(),
  }),

  // fetchOnServer: false,
  // fetch() {
  //   console.log(this.state);
  //   // if (this.$route.query.page) {
  //   //   console.log(this.state);
  //   //   this.state.showPrevious();
  //   // }
  // },
  computed: {
    ...mapState("app", ["topBannerHeight"]),
    widgetParams() {
      return { showPrevious: true, cache: this.cache };
    },
    items() {
      return this.state?.hits ? this.state.hits : [];
    },
    isLastPage() {
      return this.state.isLastPage;
    },
    productIds() {
      return this.items.map(item => item.handle);
    },
    productsForVarints() {
      return this.items.map(item => ({
        handle: item.handle,
        productId: item.id,
      }));
    },
    normalizeShopifyProducts() {
      return byId("handle")(this.shopifyProducts);
    },
  },

  watch: {
    async productIds(newProductIds, oldProductIds) {
      const differenceList = difference(newProductIds, oldProductIds);
      if (differenceList.length == 0) {
        return;
      }

      this.$store.dispatch("products/setProductsFetching", {
        productHandles: differenceList,
      });

      const newShopifyProducts = await this.getShopifyProducts(differenceList);
      this.pushProducts(newShopifyProducts);

      this.$store.dispatch("products/setProductsFetching", {
        productHandles: differenceList,
        isFetching: false,
      });
    },

    items(newItems, oldItems) {
      if (
        this.loadMoreClicked &&
        newItems.length != oldItems.length &&
        oldItems.length != 0
      ) {
        // first element will be after last from
        // previous elements list
        this.scrollToBack(last(this.$refs.productElements), [
          "$el",
          "nextElementSibling",
        ]);
      }
    },

    "$route.query": {
      handler(newQuery, oldQuery) {
        this.watchQuery(newQuery, oldQuery);
      },
    },
  },

  beforeDestroy() {
    if (this.source) {
      this.source.cancel();
    }
  },

  methods: {
    async dispatchVariantImages(source) {
      await this.$store.dispatch("products/getVariantImages", {
        productsForVarints: this.productsForVarints,
        uri: this.$config.shopifyVariantsEndPoint,
        source,
      });
    },
    pushProducts(products) {
      products.forEach(element => {
        this.$set(this.shopifyProducts, this.shopifyProducts.length, element);
      });
    },
    getShopifyProducts(productIds) {
      this.source = this.$axios.CancelToken.source();
      const getShopifyDataFunc = curry(getShopifyData)(this.$nuxt);

      return compose(
        otherwise(() => []),
        andThen(unnest),
        andThen(init),
        xs => Promise.all([...xs, this.dispatchVariantImages(this.source)]),
        map(getShopifyDataFunc),
        splitEvery(6)
      )(productIds);
    },
    getShopifyProduct(item) {
      return this.normalizeShopifyProducts[item.handle];
    },
    getOptions({ options = [] } = {}) {
      return options.length ? options : [];
    },
    getAllImages(product, defaultImage) {
      return product ? getImages(product) : [{ src: defaultImage }];
    },
    getProductProps(item, shopifyProduct) {
      const { handle, id, position, collections, tags, price, objectID } = item;

      return {
        id,
        handle,
        position,
        collections,
        tags,
        price,
        compare_at_price: item.compare_at_price,
        selectedOptions: item.options,
        varaintId: objectID,
        metafields: item.meta.snooze,
        compareAtPrice: item.compare_at_price,
        images: this.getAllImages(shopifyProduct, item.product_image),
        options: this.getOptions(shopifyProduct),
        variants: getVariants(shopifyProduct),
      };
    },
    getMetaColorsProp(shopifyProduct) {
      return this.getMetaColors(
        shopifyProduct ? getVariants(shopifyProduct) : []
      );
    },
    refineNext() {
      this.loadMoreClicked = true;
      this.state.showMore();
    },
    scrollToBack(element, targetPaths) {
      this.$nextTick(() => {
        const firstElemnt = path(targetPaths, element);
        if (firstElemnt == null) {
          return;
        }

        const { top } = firstElemnt.getBoundingClientRect();
        const offset = document.documentElement.scrollTop;
        this.scrollToTop(
          top + offset - this.topBarHeight - this.topBannerHeight
        );
        this.loadMoreClicked = false;
      });
    },
    scrollToTop(elementTop) {
      if (!window) {
        return;
      }

      window.scrollTo({
        top: elementTop,
        left: 0,
        behavior: "smooth",
      });
    },
    watchQuery(newQuery, oldQuery) {
      const onlyQueryChanged =
        equals(["query", "sortBy"], Object.keys(newQuery)) &&
        newQuery.query !== oldQuery.query;

      const onFirstPage = isNil(newQuery.page);

      if (onlyQueryChanged) {
        this.$nextTick(() => {
          this.scrollToTop(0);
        });
      } else if (onFirstPage && !isEmpty(oldQuery)) {
        this.scrollToBack(this.$refs.productContainer, ["firstChild"]);
      }
    },
  },
};
</script>
