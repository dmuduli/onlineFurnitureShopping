<template>
  <ais-instant-search-ssr>
    <template #default>
      <product-tag-configure :collection-rule-set="collectionRuleSet" />
      <ais-configure
        :distinct="true"
        :hits-per-page.camel="hitsPerPage"
        :faceting-after-distinct.camel="true"
      />
      <product-main />
      <algolia-loading-indicator />
    </template>
  </ais-instant-search-ssr>
</template>

<script>
import { mapState } from "vuex";

import createSearchSSRMixin from "~/mixins/createSearchSSRMixin";
import facetsMixin from "~/mixins/facetsMixin";

export default {
  mixins: [facetsMixin],

  props: { collectionRuleSet: { type: Object, required: true } },

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
      facets: ["refinementList", "sortBy", "range", "page"],
    });

    return { ...mixin.data() };
  },

  computed: {
    ...mapState(["plateform"]),
    hitsPerPage() {
      return this.plateform == "mobile" ? 18 : 12;
    },
  },
};
</script>
