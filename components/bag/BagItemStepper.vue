<template>
  <div class="items-end justify-between">
    <div class="flex items-center">
      <button
        type="button"
        class="border border-gray-500 flex items-center justify-center w-10 h-10"
        :class="{
          'opacity-50 cursor-not-allowed focus:outline-none': updatingQuantity,
        }"
        :disabled="updatingQuantity"
        @click="decreaseQuantity"
      >
        <svg-icon-minus />
      </button>
      <div
        class="border-t border-b border-gray-500 p-2 text-center leading-6 w-14 h-10 focus:outline-none text-sm"
      >
        <div
          v-if="updatingQuantity"
          class="flex items-center h-full w-full ml-2"
        >
          <app-dot-flashing />
        </div>
        <input
          v-else
          v-model="quantity"
          class="w-full text-center bg-transparent"
          :class="{ 'opacity-25': updatingQuantity }"
          @keyup.enter="$event.target.blur()"
          @blur="editQuant(quantityToBeUpdated)"
        />
      </div>
      <button
        type="button"
        class="border border-gray-500 flex items-center justify-center w-10 h-10"
        :class="{
          'opacity-50 cursor-not-allowed focus:outline-none': updatingQuantity,
        }"
        :disabled="updatingQuantity"
        @click="increaseQuantity"
      >
        <svg-icon-plus />
      </button>
    </div>
    <div class="flex items-center justify-end">
      <span
        v-if="hasDiscount(compareAtPrice, price)"
        class="text-xs lg:text-sm text-gray-900 mr-4 line-through"
      >
        {{ compareAtPrice | formatCurrency }}
      </span>
      <span
        class="text-base lg:text-18px"
        :class="{ 'text-red-700': hasDiscount(compareAtPrice, price) }"
      >
        {{ price | formatCurrency }}
      </span>
    </div>
  </div>
</template>

<script>
import { pathOr, path } from "ramda";
import hasDiscount from "~/mixins/hasDiscount";
import { debounce } from "~/utils/underscore-utils";

export default {
  mixins: [hasDiscount],
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  data: () => ({
    updatingQuantity: false,
    quantityToBeUpdated: "",
  }),
  computed: {
    variant() {
      return this.lineItem.variant;
    },
    quantity: {
      get() {
        return path(["lineItem", "quantity"], this);
      },
      set(val) {
        this.quantityToBeUpdated = parseInt(val);
      },
    },
    price() {
      const priceAmount = pathOr(0, ["priceV2", "amount"], this.variant);
      return this.quantity * priceAmount;
    },
    compareAtPrice() {
      const priceAmount = pathOr(
        0,
        ["compareAtPriceV2", "amount"],
        this.variant
      );
      return this.quantity * priceAmount;
    },
    isAssemblyAdded() {
      return pathOr(false, ["assemblyItem", "id"], this.lineItem);
    },
    assemblyObj() {
      const obj = pathOr(false, ["assemblyItem"], this.lineItem);
      return {
        id: pathOr("", ["id"], obj),
        variantId: pathOr("", ["variant", "id"], obj),
        quantity: pathOr("", ["quantity"], obj),
      };
    },
    editQuant() {
      return debounce(this.editQuantity, 500);
    },
  },
  methods: {
    async decreaseQuantity() {
      this.updatingQuantity = true;

      let payload = [
        {
          id: this.lineItem.id,
          variantId: this.lineItem.variant.id,
          quantity: this.quantity - 1,
        },
      ];
      if (this.isAssemblyAdded) {
        payload.push({
          id: this.assemblyObj.id,
          variantId: this.assemblyObj.variantId,
          quantity: this.assemblyObj.quantity - 1,
        });
      }
      await this.$store.dispatch("checkout/UPDATE_QUANTITY", payload);
      this.updatingQuantity = false;
    },
    async increaseQuantity() {
      this.updatingQuantity = true;
      let payload = [
        {
          id: this.lineItem.id,
          variantId: this.lineItem.variant.id,
          quantity: this.quantity + 1,
        },
      ];
      if (this.isAssemblyAdded) {
        payload.push({
          id: this.assemblyObj.id,
          variantId: this.assemblyObj.variantId,
          quantity: this.assemblyObj.quantity + 1,
        });
      }
      await this.$store.dispatch("checkout/UPDATE_QUANTITY", payload);
      this.updatingQuantity = false;
    },
    async editQuantity(q) {
      if (this.quantity === this.quantityToBeUpdated) {
        return;
      }
      this.updatingQuantity = true;
      let payload = [
        {
          id: this.lineItem.id,
          variantId: this.lineItem.variant.id,
          quantity: q,
        },
      ];
      if (this.isAssemblyAdded) {
        payload.push({
          id: this.assemblyObj.id,
          variantId: this.assemblyObj.variantId,
          quantity: this.assemblyObj.quantity + (q - this.lineItem.quantity),
        });
      }
      await this.$store.dispatch("checkout/UPDATE_QUANTITY", payload);
      this.updatingQuantity = false;
    },
  },
};
</script>
