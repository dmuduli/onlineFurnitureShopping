<template>
  <div class="border-t border-gray-1400 pt-8 mb-6">
    <div class="flex justify-between mb-3">
      <div class="text-sm text-gray-1500">Sub-total</div>
      <div class="text-xs text-gray-1500">
        {{ subTotalWithoutAssembly | formatCurrency(2) }}
      </div>
    </div>
    <div v-if="discountValue" class="flex justify-between mb-3">
      <div class="text-sm text-gray-1500">Discount</div>
      <div class="text-xs text-red-700">
        -{{ discountValue | formatCurrency(2) }}
      </div>
    </div>
    <div v-if="gstAmount" class="flex justify-between mb-3">
      <div class="text-sm text-gray-1500">GST</div>
      <div class="text-xs text-gray-1500">
        {{ gstAmount | formatCurrency(2) }}
      </div>
    </div>
    <client-only>
      <div v-if="shippingCharge" class="flex justify-between mb-3">
        <div class="text-sm text-gray-1500">Shipping Charges</div>
        <div class="text-xs text-gray-1500">
          {{ shippingCharge | formatCurrency(2) }}
        </div>
      </div>
    </client-only>
    <div v-if="addedAssemblyAmount" class="flex justify-between mb-3">
      <div class="text-sm text-gray-1500">Assembly</div>
      <div class="text-xs text-gray-1500">
        {{ addedAssemblyAmount | formatCurrency(2) }}
      </div>
    </div>
    <div class="flex justify-between mb-4">
      <div class="text-sm text-gray-1500 font-medium">Total</div>
      <div class="text-base text-black font-medium">
        {{ grandTotal | formatCurrency(2) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { pathOr } from "ramda";

export default {
  computed: {
    ...mapState("bag", ["selectedShippingRate"]),
    ...mapGetters("checkout", [
      "discountValue",
      "gstAmount",
      "cartSubTotal",
      "addedAssemblyAmount",
    ]),
    subTotalWithoutAssembly() {
      return this.addedAssemblyAmount
        ? Number(this.cartSubTotal) - Number(this.addedAssemblyAmount)
        : this.cartSubTotal;
    },
    grandTotal() {
      return (
        this.subTotalWithoutAssembly -
        this.discountValue +
        this.shippingCharge +
        this.addedAssemblyAmount
      );
    },
    shippingCharge() {
      return Number(
        pathOr(0, ["total_price"], this.selectedShippingRate) / 100
      );
    },
  },
};
</script>
