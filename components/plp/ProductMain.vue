<template>
  <div class="w-full h-full md:h-auto">
    <product-filter-panel :class="{ 'overflow-y-auto': isMobile }" />
    <app-container class="flex flex-col lg:flex-row pt-10">
      <plp-all-refinements class="hidden lg:block" />
      <plp-product-hits :class="productListClass" class="lg:flex-1">
        <ais-stats
          class="text-sm text-black text-center font-para font-normal mb-4 mt-4 lg:mt-0"
        >
          <template slot-scope="{ nbHits, hitsPerPage, page, nbPages }">
            {{ getPagination({ nbHits, hitsPerPage, page, nbPages }) }}
          </template>
        </ais-stats>
      </plp-product-hits>
    </app-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["shownFacets", "hiddenFacets"]),
    ...mapState("app", ["isFilterPanelOpen"]),
    productListClass() {
      return this.isFilterPanelOpen ? "hidden  lg:block" : "";
    },
  },
  methods: {
    getPagination({ nbHits, nbPages, hitsPerPage, page }) {
      if (nbHits === 0) {
        return `No match found . Try reselecting filters`;
      }

      const itemCount =
        page + 1 === nbPages ? nbHits : hitsPerPage * (page + 1);
      return `Showing ${itemCount} of ${nbHits} products`;
    },
  },
};
</script>
