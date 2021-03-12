<template>
  <div>
    <!--loading -->
    <div
      v-if="getProductFetchingStatus(handle)"
      class="border border-gray-500 w-16 mb-4 px-2 py-1"
    >
      <div class="animate-pulse h-4 bg-gray-400 w-full" />
    </div>
    <div
      v-if="!getProductFetchingStatus(handle) && hasSizes"
      class="border border-gray-500 py-1 px-4 mb-4 text-xs font-normal text-gray-800 uppercase"
    >
      {{ sizesLabel }}
    </div>
  </div>
</template>

<script>
import { filter, propEq } from "ramda";
import { mapGetters } from "vuex";

const getSizes = filter(propEq("name", "Size"));

export default {
  props: {
    options: { type: Array, default: () => [] },
    handle: { type: String, default: "" },
  },
  computed: {
    ...mapGetters("products", ["getProductFetchingStatus"]),
    sizeOptions() {
      return getSizes(this.options);
    },
    hasSizes() {
      return this.sizeOptions.length != 0;
    },
    sizesValuesCount() {
      return this.sizeOptions[0].values.length;
    },
    sizesLabel() {
      return `${this.sizesValuesCount} ${
        this.sizesValuesCount == 1 ? "size" : "sizes"
      }`;
    },
  },
};
</script>
