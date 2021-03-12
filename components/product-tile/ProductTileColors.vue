<template>
  <div>
    <div v-if="getProductFetchingStatus(handle)" class="flex items-center">
      <div class="rounded-full p-px mr-2 mb-4 cursor-pointer shadow w-6 h-6">
        <span
          class="animate-pulse inline-block rounded-full w-full h-full p-px mr-2 mb-4 shadow bg-gray-400"
        />
      </div>
    </div>
    <div
      v-if="!getProductFetchingStatus(handle) && hasColors"
      class="flex items-center"
    >
      <nuxt-link
        v-for="(color, index) of colorValues"
        :key="index"
        class="rounded-full p-px mr-2 mb-4 cursor-pointer focus:outline-none w-6 h-6"
        :class="{ 'border border-gray-500': selectedColor === color }"
        :to="`/products/${handle}?variant=${metaColors[color][1]}`"
      >
        <span
          class="inline-block rounded-full w-full h-full p-px mr-2 mb-4 cursor-pointer focus:outline-none shadow"
          :style="{ backgroundColor: metaColors[color][0] }"
        />
      </nuxt-link>
      <nuxt-link
        v-if="colors.length > MAX_COLORS"
        class="border border-gray-500 py-1 px-4 text-center text-xs mr-2 mb-4 font-normal text-gray-800 uppercase"
        :to="`/products/${handle}`"
      >
        + {{ colors.length - MAX_COLORS }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { pathOr, filter, propEq } from "ramda";
import { mapGetters } from "vuex";

const getColors = filter(propEq("name", "Colour"));

export default {
  props: {
    metaColors: { type: Object, default: () => {} },
    handle: { type: String, default: "" },
    options: { type: Array, default: () => [] },
    initSelectedColor: { type: String, default: "" },
    showAll: { type: Boolean, default: false },
  },
  data() {
    return { selectedColor: this.initSelectedColor, MAX_COLORS: 3 };
  },
  computed: {
    ...mapGetters("products", ["getProductFetchingStatus"]),
    colorOptions() {
      return getColors(this.options);
    },
    hasColors() {
      return this.colorOptions.length != 0;
    },
    colors() {
      return pathOr([], [[0], "values"], this.colorOptions);
    },
    colorValues() {
      return this.colors.slice(0, this.MAX_COLORS);
    },
  },
  watch: {
    initSelectedColor: {
      handler(value) {
        this.selectedColor = value;
      },
    },
  },
};
</script>
