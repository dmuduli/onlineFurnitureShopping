<template>
  <div class="w-full">
    <AppExpansionPanels :items="featurePanels" multiple>
      <template #item="{ itemIndex, open, item }">
        <AppExpansionPanel
          class="border-b border-gray-500 last:border-0"
          :item-index="itemIndex"
          :open="open"
        >
          <template #title>{{ item.title }}</template>
          <component :is="item.component" v-bind="comProperties" />
        </AppExpansionPanel>
      </template>
    </AppExpansionPanels>
  </div>
</template>

<script>
export default {
  props: {
    selectedVariant: { type: Object, default: () => {} },
  },
  computed: {
    comProperties() {
      if (this.selectedVariant.width) {
        return {
          width: this.selectedVariant.width.value,
          height: this.selectedVariant.height.value,
          depth: this.selectedVariant.depth.value,
        };
      }
      return {};
    },
    featurePanels() {
      const featurePanels = [];
      if (this.selectedVariant.width) {
        featurePanels.push({ title: "dimensions", component: `PDPDimension` });
      }
      if (this.selectedVariant.warranty) {
        featurePanels.push({
          title: "care & warranty",
          component: `PDPCareWarranty`,
        });
      }
      if (this.selectedVariant.delivery_truck) {
        featurePanels.push({
          title: "2 person delivery service",
          component: `PDPDeliveryService`,
        });
      }
      return featurePanels;
    },
  },
};
</script>
