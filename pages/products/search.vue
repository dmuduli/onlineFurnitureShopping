<template>
  <div>
    <app-bread-crumb :page-name="title" />
    <ais-instant-search-ssr>
      <template #default>
        <ais-configure
          :distinct="true"
          :hits-per-page.camel="hitsPerPage"
          :faceting-after-distinct.camel="true"
        />
        <search-clear-all />
        <search-query-box class="flex items-center" />
        <product-main />
        <algolia-loading-indicator />
      </template>
    </ais-instant-search-ssr>
    <slice-zone :slices="slices" />
  </div>
</template>

<script>
import { pathOr } from "ramda";
import gql from "graphql-tag";
import { mapState } from "vuex";
import createSearchSSRMixin from "~/mixins/createSearchSSRMixin";
import facetsMixin from "~/mixins/facetsMixin";
import { getListOfArticle } from "~/slices/ListOfArticles/fragment";

import trackRoutes from "~/mixins/trackRoutes";

const PAGE_QUERY = gql`
  {
    product_search_page(uid: "product-search", lang: "en-in") {
      title
      body {
        ...Product_search_page_listOfArticle
      }
    }
  }
  ${getListOfArticle("Product_search_page")}
`;

async function getPrismicData(app) {
  const client = app.apolloProvider.clients.prismic;
  const result = await client.query({
    query: PAGE_QUERY,
  });

  return pathOr(
    { body: [], title: null },
    ["data", "product_search_page"],
    result
  );
}

export default {
  mixins: [facetsMixin, trackRoutes],

  async asyncData({ app }) {
    const { body: slices, title } = await getPrismicData(app);
    return { slices, title };
  },

  data() {
    const {
      algoliaAppId,
      algoliaKey,
      indexName,
    } = this.$store.state.siteConfig;

    const mixin = createSearchSSRMixin({
      algoliaAppId,
      algoliaKey,
      indexName,
      router: this.$router,
    });

    return { indexName, ...mixin.data() };
  },

  computed: {
    ...mapState("app", ["plateform"]),

    hitsPerPage() {
      return this.plateform == "mobile" ? 18 : 12;
    },
  },

  beforeDestroy() {
    this.$store.dispatch("app/CLOSE_FILTER_PANEL");
  },

  methods: {
    getDescription(item) {
      return pathOr("", ["item", "meta", "snooze", "description_title"], item);
    },
  },
};
</script>
