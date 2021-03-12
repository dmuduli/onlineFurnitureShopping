<template>
  <div>
    <app-bread-crumb :page-name="title" />
    <slice-zone :slices="slices" :slices-data="{ title }" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import { pathOr, isNil } from "ramda";

import { getPrismicProducts } from "~/utils/getPrismicProducts";
import { getListOfArticle } from "~/slices/ListOfArticles/fragment";
import { getShopifyProducts } from "~/slices/ShopifyProducts/fragment";

import { getCallToAction } from "~/slices/CallToAction/fragment";
import { getNewsSubscription } from "~/slices/NewsSubscription/fragment";
import { heroBanner } from "~/slices/HeroBanner/fragment";
import { listOfFacets } from "~/slices/ListOfFacets/fragment";

import seoMixin, { getSeoFields, getMetaFields } from "~/mixins/seoMixin";
import trackRoutes from "~/mixins/trackRoutes";

const COLLECTION_PAGE_QUERY = gql`
  query AllCollections($uid: String!) {
    allCollection_pages(uid: $uid) {
      edges {
        node {
          title
          ...Collection_pageSEOFields
          ...Collection_pageMetaFields
          body {
            ...Collection_page_Shopify_products
            ...Collection_page_hero_banner
            ...Collection_page_call_to_action
            ...Collection_page_listOfArticle
            ...Collection_page_news_subscription
            ...Collection_page_list_of_facets
          }
        }
      }
    }
  }
  ${getListOfArticle("Collection_page")}
  ${getShopifyProducts("Collection_page")}
  ${getSeoFields("Collection_page")}
  ${getMetaFields("Collection_page")}
  ${getCallToAction("Collection_page")}
  ${getNewsSubscription("Collection_page")}
  ${heroBanner}
  ${listOfFacets}
`;

async function getPrismicData(handle, app) {
  const client = app.apolloProvider.clients.prismic;
  const result = await client.query({
    query: COLLECTION_PAGE_QUERY,
    variables: { uid: handle },
  });

  return pathOr(
    { body: null, title: null },
    ["data", "allCollection_pages", "edges", [0], "node"],
    result
  );
}

async function dispatchVariantImages({ products, store, $config, source }) {
  const productsForVarints = products.map(field => ({
    handle: field.product.handle,
    productId: field.product.id,
  }));

  await store.dispatch("products/getVariantImages", {
    productsForVarints,
    uri: $config.shopifyVariantsEndPoint,
    source,
  });
}

export default {
  mixins: [trackRoutes, seoMixin],

  middleware: "collection-rule-set",

  async asyncData({ $axios, $config, error, store, app, route: { params } }) {
    try {
      const { handle } = params;

      const {
        body: slices,
        title,
        meta_title: metaTitle,
        meta_description: metaDescription,
        meta_robots: metaRobots,
        _linkType,
        _meta,
      } = await getPrismicData(handle, app);

      if (isNil(slices)) {
        return error({ statusCode: 404, message: "Page not found" });
      }

      const source = $axios.CancelToken.source();
      const prismicProducts = getPrismicProducts(slices);
      if (prismicProducts.length) {
        await dispatchVariantImages({
          products: prismicProducts,
          store,
          $config,
          source,
        });
      }

      return {
        slices,
        title,
        source: process.server ? null : source,
        metaTitle,
        metaDescription,
        metaRobots,
        metaFields: { _linkType, _meta },
      };
    } catch (err) {
      return error({
        statusCode: 500,
        message: "Oops Something went wrong...",
      });
    }
  },

  beforeDestroy() {
    if (this.source) {
      this.source.cancel();
    }
  },
};
</script>
