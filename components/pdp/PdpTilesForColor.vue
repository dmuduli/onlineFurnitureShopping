<template>
  <div class="flex flex-col">
    <div class="mb-2 text-xs text-black">
      {{ label }}: <strong>{{ internalSelectedTile }}</strong>
    </div>
    <div class="flex items-center">
      <app-button
        v-for="{ tileLabel, targetVariantId } of tiles"
        :key="tileLabel"
        rounded
        :disabled="!targetVariantId"
        :class="{
          'border border-black': internalSelectedTile === tileLabel,
          'opacity-25 cursor-not-allowed': !targetVariantId,
        }"
        @click.native="handleClick(targetVariantId, tileLabel)"
      >
        <span
          class="inline-block rounded-full w-full h-full"
          :style="{ backgroundColor: metaColors[tileLabel] }"
        />
      </app-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tiles: { type: Array, default: () => [] },
    selectedTile: { type: String, default: "" },
    label: { type: String, default: "" },
    metaColors: { type: Object, default: () => {} },
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
    handleClick(targetVariantId, tileLabel) {
      this.internalSelectedTile = tileLabel;
      this.$emit("select-variant-id", targetVariantId);
    },
  },
};
</script>
