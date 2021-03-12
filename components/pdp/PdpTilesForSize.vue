<template>
  <div class="flex flex-wrap -mx-1">
    <div
      v-for="{ tileLabel, targetVariantId } of tiles"
      :key="tileLabel"
      class="p-1 w-1/2"
    >
      <button
        type="button"
        class="border border-primary p-4 w-full h-full flex flex-col items-center justify-center text-black hover:bg-gray-300 bg-white"
        :class="{
          'active-tile': internalSelectedTile === tileLabel,
          'opacity-25 cursor-not-allowed': !targetVariantId,
        }"
        :disabled="!targetVariantId"
        @click="handleClick(targetVariantId, tileLabel)"
      >
        <h3 class="text-sm text-black font-medium mb-2 uppercase">
          {{ tileLabel }}
        </h3>
        <h5 class="text-base text-black font-normal">
          {{ getPrice(targetVariantId) | formatCurrency }}
        </h5>
      </button>
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";

export default {
  props: {
    tiles: { type: Array, default: () => [] },
    selectedTile: { type: String, default: "" },
    variants: { type: Object, required: true },
    label: { type: String, default: "" },
  },
  data() {
    return { internalSelectedTile: this.selectedTile };
  },
  watch: {
    selectedTile(value) {
      this.internalSelectedTile = value;
    },
  },
  methods: {
    getPrice(variantId) {
      return pathOr("", ["variants", variantId, "price"], this);
    },
    handleClick(targetVariantId, tileLabel) {
      this.internalSelectedTile = tileLabel;
      this.$emit("select-variant-id", targetVariantId, this.label, tileLabel);
    },
  },
};
</script>

<style lang="postcss" scoped>
.active-tile {
  @apply bg-gray-500 text-white;
}
</style>
