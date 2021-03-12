<template>
  <div class="text-xs leading-6 text-gray-600 text-right">
    <span v-if="hasDiscount(compareAtPrice, price)" class="line-through">
      {{ calculateTotalPrice(compareAtPrice) | formatCurrency }}
    </span>
    <span
      class="ml-3 inline-block"
      :class="{
        'text-red-700': hasDiscount(compareAtPrice, price),
      }"
    >
      {{ calculateTotalPrice(price) | formatCurrency }}
    </span>
  </div>
</template>
<script>
import hasDiscount from "~/mixins/hasDiscount";
export default {
  mixins: [hasDiscount],
  props: {
    price: { type: String, default: "0" },
    compareAtPrice: { type: String, default: "0" },
    quantity: { type: Number, default: 1 },
  },
  methods: {
    calculateTotalPrice(price) {
      return this.quantity * Number(price);
    },
  },
};
</script>
