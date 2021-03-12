<template>
  <div>
    <app-bread-crumb v-if="!isFilterPanelOpen" :page-name="title" />
    <slice-zone :slices="slices" />
    <app-back-to-top-button />
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState } from "vuex";
import { pathOr, isNil } from "ramda";

import { getListOfArticle } from "~/slices/ListOfArticles/fragment";
import { getHeroSection } from "~/slices/HeroSection/fragment";
import { getListOfProducts } from "~/slices/ListOfProducts/fragment";

import seoMixin, { getSeoFields, getMetaFields } from "~/mixins/seoMixin";
import trackRoutes from "~/mixins/trackRoutes";

const PRODUCT_PAGE_QUERY = gql`
  query AllProductListPages($uid: String!) {
    allProduct_list_pages(uid: $uid) {
      edges {
        node {
          title
          ...Product_list_pageSEOFields
          ...Product_list_pageMetaFields
          body {
            ...Product_list_page_hero_section
            ...Product_list_page_list_of_products
            ...Product_list_page_listOfArticle
          }
        }
      }
    }
  }
  ${getListOfArticle("Product_list_page")}
  ${getSeoFields("Product_list_page")}
  ${getMetaFields("Product_list_page")}
  ${getHeroSection("Product_list_page")}
  ${getListOfProducts("Product_list_page")}
`;

async function getPrismicData(handle, app) {
  const client = app.apolloProvider.clients.prismic;
  const result = await client.query({
    query: PRODUCT_PAGE_QUERY,
    variables: { uid: handle },
  });

  return pathOr(
    { body: null, title: null },
    ["data", "allProduct_list_pages", "edges", [0], "node"],
    result
  );
}

export default {
  mixins: [trackRoutes, seoMixin],

  middleware: "collection-rule-set",

  async asyncData({ app, error, route }) {
    const { handle } = route.params;
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
      return error({
        statusCode: 404,
        message: "Page not found",
      });
    }

    return {
      title,
      slices,
      metaTitle,
      metaDescription,
      metaRobots,
      metaFields: { _linkType, _meta },
    };
  },

  computed: {
    ...mapState("app", ["isFilterPanelOpen"]),
  },

  beforeDestroy() {
    this.$store.dispatch("app/CLOSE_FILTER_PANEL");
  },
};
</script>
