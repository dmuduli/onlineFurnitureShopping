<template>
  <div class="flex items-center">
    <span
      :class="{ 'text-campaign-sale': hasDiscount(compareAtPrice, price) }"
      class="text-3xl mr-4 font-normal"
    >
      {{ price | formatCurrency }}
    </span>
    <span
      v-if="hasDiscount(compareAtPrice, price)"
      class="line-through text-xl text-gray-800 md:text-gray-900 font-normal"
    >
      {{ compareAtPrice | formatCurrency }}
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
  },
};
</script>
