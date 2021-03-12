<template>
  <div
    class="fixed inset-0 m-auto bg-white shadow-lg w-64 md:w-79 h-64 p-6 lg:z-20 z-50 top-0"
  >
    <div class="flex items-end mb-6">
      <app-button color="black" block icon="icon" class="ml-auto">
        <svg-icon-cross @click.native="closeModal" />
      </app-button>
    </div>
    <div class="text-2xl text-black mb-8 text-center py-8">Remove</div>

    <div class="grid grid-cols-2 gap-2">
      <app-button type="submit" @click.native="closeModal"> Cancel </app-button>
      <app-button
        type="submit"
        :class="{
          'opacity-50 cursor-not-allowed focus:outline-none': loading,
        }"
        color="black"
        :disabled="loading"
        @click.native="removeLineItem"
      >
        <span v-if="loading"><svg-icon-circle class="w-full" /></span>
        <span v-else>Remove</span>
      </app-button>
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";

export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  data: () => ({ loading: false }),
  methods: {
    closeModal() {
      this.$emit("closeSharingModal");
    },
    async removeLineItem() {
      this.loading = true;
      const assemblyId = pathOr("", ["assemblyItem", "id"], this.lineItem);
      const payload = assemblyId
        ? [this.lineItem.id, assemblyId]
        : [this.lineItem.id];
      await this.$store.dispatch("checkout/REMOVE_LINE_ITEM", payload);
      this.closeModal();
    },
  },
};
</script>
