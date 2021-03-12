<template>
  <div class="lg:pt-6 pt-4 border-b border-gray-500">
    <div class="flex justify-between lg:items-end mb-3">
      <bag-item-image :line-item="lineItem" />
      <div class="flex-1 lg:min-h-42 flex flex-col justify-between">
        <div class="flex justify-between w-full">
          <div class="flex flex-col max-w-3/4">
            <bag-item-title :line-item="lineItem" />
            <bag-item-options :line-item="lineItem" />
          </div>
          <div class="flex items-center self-start">
            <button
              class="flex items-center"
              @click="isRemoveDialogOpen = true"
            >
              <svg-icon-remove-bin class="lg:mr-2 w-5 lg:w-4" />
              <span
                class="text-brown-100 text-xs font-para underline hidden lg:block"
              >
                Remove
              </span>
            </button>
          </div>
          <template v-if="isRemoveDialogOpen">
            <app-modal-overlay @close-modal="isRemoveDialogOpen = false" />
            <bag-item-remove-modal
              :line-item="lineItem"
              @closeSharingModal="isRemoveDialogOpen = false"
            />
          </template>
        </div>
        <bag-item-stepper class="lg:flex hidden w-full" :line-item="lineItem" />
      </div>
    </div>
    <bag-item-stepper class="lg:hidden flex" :line-item="lineItem" />
    <bag-item-assembly-picker :line-item="lineItem" />
    <bag-item-low-stock v-if="isLowStock" />
    <bag-item-lead-time v-else :line-item="lineItem" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  data: () => ({ isRemoveDialogOpen: false }),
  computed: {
    ...mapGetters("bag", ["lowStockStatus"]),
    ...mapState("bag", ["hasFilteredQuickship"]),
    isLowStock() {
      return this.lowStockStatus.some(
        item =>
          item.sku == this.lineItem.variant.sku &&
          item.low_stock &&
          this.hasFilteredQuickship
      );
    },
  },
};
</script>
