<template>
  <div class="bg-brown-E4E py-10 md:pt-10 md:pb-12">
    <div
      v-if="state"
      class="mx-auto text-center max-w-none md:max-w-3xl lg:px-10"
    >
      <h1
        class="text-center text-gray-900 text-3xl font-normal md:text-4xl leading-11 mb-3"
      >
        Search results for
      </h1>
      <p
        class="text-center font-normal text-gray-700 text-sm md:text-base leading-normal"
      >
        <q>{{ searchQuery }}</q>
      </p>

      <ais-state-results class="">
        <div slot-scope="{ results: { hits } }">
          <p v-if="hits.length == 0" class="leading-7 mt-4">
            No match found . Try reselecting filters
          </p>
        </div>
      </ais-state-results>
    </div>
  </div>
</template>

<script>
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch";

export default {
  mixins: [createWidgetMixin({ connector: connectSearchBox })],
  computed: {
    searchQuery() {
      return this.$route.query.query;
    },
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler(newValue, oldValue) {
        if (this.state == null || oldValue == newValue) {
          return;
        }
        console.log({ newValue, oldValue });
        console.log("SEARCH QUERY");
        this.state.refine(newValue);
      },
    },
  },
};
</script>
