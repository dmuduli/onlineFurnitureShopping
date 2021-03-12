<template>
  <app-container
    v-if="state"
    class="py-10 shadow h-screen lg:h-auto overflow-y-auto"
  >
    <div class="flex flex-wrap mb-4">
      <div
        v-for="index in state.indices"
        :key="index.indexId"
        class="w-full lg:w-1/3"
        :class="
          index.indexId == 'snooze_dev_collections'
            ? 'pb-3 md:pr-6 lg:pl-16 lg:pr-12'
            : 'lg:pl-6 pt-6 pb-8 lg:pr-12 lg:pt-0 lg:pb-0 border-t border-opacity-50 lg:border-l  lg:border-t-0 border-gray-500'
        "
      >
        <search-collection-list
          v-if="index.indexId == $store.state.siteConfig.collectionIndexName"
          :hits="index.hits"
          :close-search="closeSearch"
        />
        <search-product-list
          v-if="index.indexId == $store.state.siteConfig.indexName"
          :hits="index.hits"
          :current-refinement="state.currentRefinement"
          :close-search="closeSearch"
        />
        <search-blog-list
          v-if="index.indexId == $store.state.siteConfig.blogIndexName"
          :hits="index.hits"
          :close-search="closeSearch"
        />
      </div>
    </div>
  </app-container>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectAutocomplete } from "instantsearch.js/es/connectors";

export default {
  mixins: [createWidgetMixin({ connector: connectAutocomplete })],
  computed: {
    widgetParams() {
      return {};
    },
  },
  methods: {
    closeSearch() {
      const payload = {
        title: { text: "Search" },
        url: "from search",
      };
      this.$store.dispatch("app/setRedirectFrom", payload);
      this.$store.dispatch("app/closeSearch", this.isTablet);
    },
  },
};
</script>
