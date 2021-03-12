<template>
  <div v-if="!state || state.results.nbHits == null">
    <loading-icon class="fixed" />
    <div
      class="top-0 left-0 fixed bg-gray-300 w-screen h-screen z-40 opacity-75"
    />
  </div>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";

export default {
  mixins: [createWidgetMixin({ connector: connectInfiniteHits })],
};
</script>
