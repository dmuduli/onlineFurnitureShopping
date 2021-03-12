<template>
  <ais-configure
    :disjunctive-facets.camel="disjunctiveFacets"
    :disjunctive-facets-refinements.camel="disjunctiveFacetsRefinements"
    :facets.camel="facets"
    :facets-refinements.camel="facetsRefinements"
    filters='NOT tags:"algolia-ignore"'
  />
</template>

<script>
import collectionRuleMixin from "~/mixins/collectionRuleMixin";

export default {
  mixins: [collectionRuleMixin],

  props: { collectionRuleSet: { type: Object, required: true } },

  computed: {
    facetFilters() {
      return this.getCollectionRules(this.collectionRuleSet);
    },
    facets() {
      const { facetFilters } = this.facetFilters;
      return Object.keys(facetFilters);
    },
    facetsRefinements() {
      const { facetFilters } = this.facetFilters;
      return facetFilters;
    },
    disjunctiveFacets() {
      const { disjunctivefacetFilters } = this.facetFilters;
      // TODO: v1
      return Object.keys(disjunctivefacetFilters);
      // TODO: v2
      // return Object.keys(disjunctivefacetFilters).concat("options.size");
    },
    disjunctiveFacetsRefinements() {
      const { disjunctivefacetFilters } = this.facetFilters;
      // TODO: v1
      return disjunctivefacetFilters;
      // TODO: v2
      // return { ...disjunctivefacetFilters, "options.size": ["Queen"] };
    },
  },
};
</script>
