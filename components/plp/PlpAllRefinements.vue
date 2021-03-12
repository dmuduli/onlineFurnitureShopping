<template>
  <div class="w-full md:w-66 md:mr-4">
    <div
      v-observe-visibility="{
        callback: visibilityChanged,
        intersection: {
          root: null,
          threshold: 0.35,
        },
      }"
      class="w-full filter-dropdown-box"
    >
      <component
        :is="getComponent(facet)"
        v-for="facet of shownFacets"
        :key="facet.name"
        :attribute="facet.name"
        :label="facet.title"
        :sort-by="getSortBy(facet)"
        :checkbox="facet.type !== 'conjunctive'"
        :operator="facet.type === 'conjunctive' ? 'and' : 'or'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PlpPriceRangeRefinement from "~/components/plp/PlpPriceRangeRefinement";
import PlpListRefinement from "~/components/plp/PlpListRefinement";
import algolia from "~/utils/algolia";

export default {
  components: { PlpPriceRangeRefinement, PlpListRefinement },
  computed: mapGetters(["shownFacets"]),

  methods: {
    visibilityChanged(isVisible, entry) {
      this.$store.dispatch("app/setRefinementListVisiblity", isVisible);
    },
    getSortBy(facet) {
      const { facetSortFunctions } = algolia;
      return facetSortFunctions[facet.attribute]
        ? facetSortFunctions[facet.attribute]
        : ["count:desc", "name:asc"];
    },
    getComponent(facet) {
      return facet.name === "price"
        ? "PlpPriceRangeRefinement"
        : "PlpListRefinement";
    },
  },
};
</script>

<style scoped>
.filter-dropdown-box .border-b:last-child {
  @apply border-none;
}
</style>
