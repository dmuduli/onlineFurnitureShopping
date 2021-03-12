<template>
  <div class="amount-details font-normal text-gray-900">
    <!--loading -->
    <div
      v-if="getProductFetchingStatus(handle)"
      class="animate-pulse h-6 bg-gray-400 w-1/3"
    />
    <p
      v-if="!getProductFetchingStatus(handle) && price !== Infinity"
      class="text-xs font-normal"
      :class="{ 'text-red-700': hasDiscount(compareAtPrice, price) }"
    >
      <span class="hidden mr-1 md:inline">From</span>
      <span class="lg:text-2xl text-lg discounted-price">
        {{ price | formatCurrency }}
      </span>
      <span
        v-if="hasDiscount(compareAtPrice, price)"
        class="lg:text-lg text-sm font-normal text-gray-800 md:text-gray-900 ml-2 md:ml-4 line-through"
      >
        {{ compareAtPrice | formatCurrency }}
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hasDiscount from "~/mixins/hasDiscount";

export default {
  mixins: [hasDiscount],
  props: {
    handle: { type: String, default: "" },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: -1 },
  },
  computed: {
    ...mapGetters("products", ["getProductFetchingStatus"]),
  },
};
</script>
