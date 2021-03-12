<template>
  <div
    v-if="lineItem.assemblyVariant"
    class="flex justify-between border border-gray-500 p-3 lg:p-6 my-4"
  >
    <div class="flex items-center bg-gray-1100 py-2 px-6 mr-4 w-5/12 lg:w-40">
      <svg-icon-assembly-service class="m-auto" />
    </div>
    <div
      class="flex items-baseline lg:items-center lg:justify-between flex-auto flex-col lg:flex-row w-7/12 lg:w-auto"
    >
      <div class="mb-2 lg:mb-0">
        <h3 class="text-sm lg:text-base text-gray-900 mb-2">
          Assembly Service
        </h3>
        <div class="text-xl text-red-700">
          {{ computedPrice | formatCurrency }}
        </div>
      </div>
      <button
        v-if="!lineItem.assemblyItem"
        class="border-2 border-gray-500 text-center text-xs text-gray-900 uppercase p-2 font-medium focus:outline-none min-w-28"
        :class="{
          'opacity-50 cursor-not-allowed focus:outline-none': addingOrRemoving,
        }"
        :disabled="addingOrRemoving"
        @click="addAssembly"
      >
        <span class="inline-flex items-center m-auto">
          <app-dot-flashing v-if="addingOrRemoving" />
          <span v-else class="inline-flex items-center">
            <span> Add</span>
            <svg-icon-plus-circle class="ml-2" />
          </span>
        </span>
      </button>
      <button
        v-else
        class="border-2 border-gray-500 text-center text-xs text-gray-900 uppercase p-2 font-medium focus:outline-none min-w-28"
        :class="{
          'focus:outline-none opacity-50 cursor-not-allowed': addingOrRemoving,
        }"
        :disabled="addingOrRemoving"
        @click="removeAssembly"
      >
        <span class="inline-flex items-center m-auto">
          <app-dot-flashing v-if="addingOrRemoving" />
          <span v-else class="inline-flex items-center">
            <span> Remove</span> <svg-icon-minus-circle class="ml-2" />
          </span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { pathOr, path } from "ramda";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  data: () => ({ addingOrRemoving: false }),
  computed: {
    ...mapState("quickship", ["postcode"]),
    assemblyVariant() {
      return path(["assemblyVariant", "node"], this.lineItem);
    },
    computedPrice() {
      const price = pathOr(
        0,
        ["assemblyVariant", "node", "price"],
        this.lineItem
      );
      return this.lineItem.quantity * price;
    },
  },
  methods: {
    ...mapActions("bag", ["estimateDelivery"]),
    async addAssembly() {
      this.addingOrRemoving = true;
      const { storefrontId, taxable } = this.assemblyVariant;
      const payload = [
        {
          variantId: storefrontId,
          quantity: this.lineItem.quantity || 1,
          customAttributes: [
            { taxable: taxable.toString() },
            { "_assembly-for-key": this.lineItem.variant.id },
            { "_assembly-for": this.lineItem.variant.sku },
          ],
        },
      ];
      await this.$store.dispatch("checkout/ADD_LINE_ITEM", payload);

      await this.estimateDelivery({ postcode: this.postcode });
      this.addingOrRemoving = false;
    },
    async removeAssembly() {
      this.addingOrRemoving = true;
      const payload = [path(["assemblyItem", "id"], this.lineItem)];
      await this.$store.dispatch("checkout/REMOVE_LINE_ITEM", payload);
      await this.estimateDelivery({ postcode: this.postcode });
      this.addingOrRemoving = false;
    },
  },
};
</script>
