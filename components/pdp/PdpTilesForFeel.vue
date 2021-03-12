<template>
  <div>
    <div class="flex items-center mb-4 relative">
      <span class="text-xs text-gray-900 mr-4">{{
        isSingleSizeSelected ? "Comfort Feel" : label
      }}</span>
      <span v-click-outside="closeModal">
        <svg-icon-info
          class="cursor-pointer"
          @click.native="infoDialog = true"
        />
      </span>
      <pdp-info-modal
        :info-dialog="infoDialog"
        class="comfort-layer-modal"
        @close-modal="closeModal"
      >
        <template #title> Comfort Feel </template>
        <template #information>
          <div class="text-sm text-gray-900 font-para py-4 px-6 w-full">
            At snooze we refer to the combination of how the support and comfort
            layers work together as overall mattress feel.
          </div>
        </template>
      </pdp-info-modal>
    </div>
    <div class="flex flex-wrap -mx-1 mb-6">
      <div
        v-for="{ tileLabel, targetVariantId } of sortedTiles"
        :key="tileLabel"
        class="p-1 w-1/3"
      >
        <button
          type="button"
          class="border border-gray-500 p-2 bg-white w-full flex flex-col items-center justify-center text-sm text-black font-normal hover:bg-gray-300 uppercase"
          :class="{
            'active-tile': internalSelectedTile === tileLabel,
            'opacity-25 cursor-not-allowed': !targetVariantId,
          }"
          :disabled="!targetVariantId"
          @click="handleClick(targetVariantId, tileLabel)"
        >
          {{ tileLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapState } from "vuex";

export default {
  directives: { ClickOutside },
  props: {
    tiles: { type: Array, default: () => [] },
    selectedTile: { type: String, default: "" },
    isSingleSizeSelected: { type: Boolean, default: false },
    label: { type: String, default: "" },
  },
  data() {
    return { internalSelectedTile: this.selectedTile, infoDialog: false };
  },
  computed: {
    ...mapState({
      order: s => s.siteConfig.pdp.comfortFeelOrder,
    }),
    sortedTiles() {
      const { order } = this;
      return this.tiles
        .slice()
        .sort(
          (a, b) => order.indexOf(a.tileLabel) - order.indexOf(b.tileLabel)
        );
    },
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
    closeModal() {
      this.infoDialog = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.active-tile {
  @apply bg-gray-500 text-white;
}
.comfort-layer-modal {
  bottom: 40px;
  width: 100%;
}
@screen lg {
  .comfort-layer-modal {
    bottom: 35px;
  }
}
</style>
