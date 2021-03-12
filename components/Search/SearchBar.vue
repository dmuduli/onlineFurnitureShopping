<template>
  <ais-instant-search
    :stalled-search-delay="searchDelay"
    :index-name="collectionIndexName"
    :search-client="$algoliaConditional"
    class="w-full absolute z-10 top-0 left-0 bg-white"
  >
    <ais-configure :hits-per-page.camel="searchCollectionHits" />
    <ais-index :index-name="indexName">
      <ais-configure :hits-per-page.camel="searchProductsHits" />
    </ais-index>
    <ais-index :index-name="blogIndexName">
      <ais-configure :hits-per-page.camel="searchBlogsHits" />
    </ais-index>
    <ais-autocomplete class="border-b border-gray-500">
      <div slot-scope="{ refine, indices }" class="lg:px-27 px-5 py-6">
        <form
          role="search"
          class="relative"
          @submit.prevent="handleSubmit($event, indices)"
        >
          <div class="absolute top-0 left-0 w-8 h-8">
            <icon-search />
          </div>
          <input
            v-focus
            class="bg-white text-lg font-light w-full pl-16 pr-16 mt-1 focus:outline-none"
            type="search"
            name="search"
            autocomplete="off"
            placeholder="Search our store..."
            @input="handleInputChange($event, refine)"
          />
          <app-button
            class="absolute right-0 top-0 mt-2"
            type="button"
            icon
            @click.native="closeSearch"
          >
            <svg-icon-cross />
          </app-button>
        </form>
      </div>

      <!-- Search Container ends -->
    </ais-autocomplete>
    <transition name="slide-fade">
      <search-results v-if="isSearchOpen && currentQuery != ''" />
    </transition>
  </ais-instant-search>
</template>

<script>
import qs from "qs";
import { compose, filter, propEq, pathOr, complement } from "ramda";
import { mapState } from "vuex";

export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  data: () => ({ currentQuery: "" }),
  computed: {
    ...mapState({
      indexName: s => s.siteConfig.indexName,
      collectionIndexName: s => s.siteConfig.collectionIndexName,
      blogIndexName: s => s.siteConfig.blogIndexName,
      searchCollectionHits: s => s.siteConfig.searchCollectionHits,
      searchProductsHits: s => s.siteConfig.searchProductsHits,
      searchBlogsHits: s => s.siteConfig.searchBlogsHits,
      searchDelay: s => s.siteConfig.searchDelay,
      isSearchOpen: s => s.app.isSearchOpen,
    }),
  },
  methods: {
    closeSearch() {
      this.$store.dispatch("app/closeSearch", this.isTablet);
    },
    handleInputChange($event, refine) {
      this.currentQuery = $event.currentTarget.value;
      refine(this.currentQuery);
    },
    handleSubmit(event, indices) {
      const hasProductHits = compose(
        complement(propEq("length", 0)),
        pathOr([], [[0], "hits"]),
        filter(propEq("indexName", this.indexName))
      );

      if (event.target.search.value && hasProductHits(indices)) {
        const query = qs.stringify(
          {
            query: event.target.search.value,
            sortBy: "snooze_dev_products_recently_ordered_count_desc",
          },
          { addQueryPrefix: true }
        );

        this.$router.push(`/products/search${query}`);
        this.closeSearch();
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
/* disable default search tools */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  @apply duration-700 transition-all ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  @apply opacity-0 transform -translate-y-10;
}
</style>
