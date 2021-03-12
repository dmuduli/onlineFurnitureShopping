<template>
  <div
    v-if="totalSaving > 0"
    class="text-center border border-gray-1600 py-4 px-8 text-base text-red-700 mb-6"
  >
    Checkout now to
    <strong>save {{ totalSaving | formatCurrency }}</strong> on this order
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("checkout", [
      "visibleLineItems",
      "discountValue",
      "cartSubTotal",
    ]),
    totalSaving() {
      const comparePrice = this.visibleLineItems.reduce(
        (acc, val) => (acc += val.quantity * val.variant.compareAtPrice),
        0
      );
      return Number(comparePrice) > 0
        ? Number(comparePrice) -
            Number(this.cartSubTotal) +
            Number(this.discountValue)
        : Number(this.discountValue);
    },
  },
};
</script>
