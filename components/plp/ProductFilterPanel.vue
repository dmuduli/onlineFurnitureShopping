<template>
  <!--- condition for mobile device isFilterPanelOpen,  
  condition for desktop isRefinementListInViewPort --->
  <div
    :class="[
      'flex flex-wrap left-0 max-h-screen w-full h-full md:h-auto bg-gray-100 top-0',
      isRefinementListVisible ? 'lg:static' : 'sticky',
      isFilterPanelOpen ? 'fixed filter-sticky' : 'sticky',
      otherOverlayScreen ? 'z-30' : 'z-40',
    ]"
    :style="{ top: topBannerHeight + 'px' }"
  >
    <!-- Filters section -->
    <app-container
      class="flex-full min-w-0 filter-btn-section bg-white border-t border-b-2 border-gray-400 flex justify-between items-center h-20"
    >
      <div class="flex items-center">
        <span class="flex items-center" @click="toggleFilterPanel">
          <span class="text-sm text-gray-333 leading-5 uppercase font-medium">
            Filter
          </span>
          <svg-icon-filter class="w-16 lg:w-20" />
        </span>
        <plp-clear-all-refinements v-if="!isMobile" />
      </div>

      <!-- Selected Filters for desktop only-->
      <plp-all-selected-refinements v-if="!isMobile" />

      <product-sorting :class="{ 'hidden md:flex': isFilterPanelOpen }" />
      <svg-icon-close
        v-if="isMobile"
        class="cursor-pointer w-3 flex"
        :class="[isFilterPanelOpen ? 'block' : 'hidden']"
        aria-hidden="true"
        @click.native="toggleFilterPanel"
      />
    </app-container>

    <!-- Selected Filters for mobile -->
    <plp-all-selected-refinements
      v-if="isMobile"
      class="refinement-chip-mobile"
      :class="['flex-full']"
    />

    <app-container v-if="isMobile" class="w-full">
      <plp-all-refinements :class="['', { hidden: !isFilterPanelOpen }]" />
    </app-container>
    <!-- view 133 results component on mobile -->
    <app-container
      v-if="isMobile"
      class="p-10 w-full"
      :class="[isFilterPanelOpen ? 'block' : 'hidden']"
    >
      <ais-stats v-if="showViewAll">
        <template slot-scope="{ nbHits }">
          <app-button responsive block @click.native="toggleFilterPanel">
            {{ getResultsText(nbHits) }}
          </app-button>
        </template>
      </ais-stats>
      <plp-clear-all-refinements
        class="text-sm font-medium leading-5 flex justify-center pt-6"
      />
    </app-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    showViewAll: false,
    factedClicked: false,
    otherOverlayScreen: false,
  }),
  computed: {
    ...mapGetters(["shownFacets", "hiddenFacets"]),
    ...mapState("app", [
      "isFilterPanelOpen",
      "activeMenuIndex",
      "isMegaMenuOpen",
      "topBannerHeight",
      "isRefinementListVisible",
    ]),
  },
  watch: {
    isMegaMenuOpen(newVal) {
      this.watchMegaMenuProp(newVal);
    },
    activeMenuIndex(newVal) {
      if (this.$device.isDesktop) {
        this.watchMegaMenuProp(newVal > -1);
      }
    },
  },
  mounted() {
    this.$nuxt.$on("has-refinements", value => {
      this.showViewAll = value;
    });
  },
  methods: {
    watchMegaMenuProp(propVal) {
      if (propVal) {
        this.otherOverlayScreen = true;
      } else if (this.activeMenuIndex < 0) {
        setTimeout(() => {
          this.otherOverlayScreen = false;
        }, 1000);
      }
    },
    toggleFilterPanel() {
      if (this.isMobile) {
        this.factedClicked = false;
        this.$store.dispatch("app/TOGGLE_FILTER_PANEL");
      }
    },
    getResultsText(nbHits) {
      return `view ${nbHits} ${nbHits == 1 ? "result" : "results"}`;
    },
  },
};
</script>
<style lang="postcss" scoped>
.filter-sticky .filter-btn-section {
  @apply pl-10;
}
.refinement-chip-mobile.swiper-container {
  @apply py-4;
}
</style>
