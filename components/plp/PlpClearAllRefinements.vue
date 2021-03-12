<template>
  <div v-if="state && hasRefinements">
    <a
      title="Clear All Filters"
      alt="Clear All Filters"
      class="text-black text-xs font-medium border-b-2 border-gray-500 hover:border-gray-900 uppercase lg:capitalize"
      :href="state.createURL()"
      @click.prevent="state.refine"
    >
      Clear All Filters
      <!-- <svg-filter-clear-icon class="w-6 h-6" /> -->
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createWidgetMixin } from "vue-instantsearch";
import { connectClearRefinements } from "instantsearch.js/es/connectors";

export default {
  mixins: [createWidgetMixin({ connector: connectClearRefinements })],

  computed: {
    ...mapGetters(["shownFacets"]),
    widgetParams() {
      return { includedAttributes: this.includedAttributes };
    },
    includedAttributes() {
      return this.shownFacets.map(f => f.name);
    },
    hasRefinements() {
      return (this.state && this.state.hasRefinements) || false;
    },
  },

  watch: {
    hasRefinements(value) {
      this.$nuxt.$emit("has-refinements", value);
    },
  },
};
</script>
