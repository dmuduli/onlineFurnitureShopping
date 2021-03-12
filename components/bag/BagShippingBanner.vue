<template>
  <div
    v-if="isAvailableNextDayDelivery && quickShipHydrated && bagHydrated"
    class="flex items-center bg-blue-200 px-2 py-4 lg:px-4"
  >
    <template v-if="!postcode">
      <svg-icon-info class="mr-3 w-16 lg:w-8 lg:h-8 h-16" />
      <svg-icon-delivery-van class="mr-2 w-26 lg:w-14" />
      <p class="text-sm text-gray-900 ml-2">
        {{ getStateMessage() }}
      </p>
    </template>
    <template v-else-if="hasQuickshipRate">
      <svg-icon-item-select class="mr-3 w-16 lg:w-8 lg:h-8 h-16" />
      <p class="text-sm text-gray-900 ml-2">
        {{ getPostcodeMessage(postcode) }}
      </p>
    </template>
    <template v-else>
      <svg-icon-info class="mr-3 w-16 lg:w-8 lg:h-8 h-16" />
      <template v-if="hasFilteredQuickship === false">
        <p class="text-sm text-gray-900 ml-2">
          Sorry. NEXT DAY delivery isn't available in your area for online
          orders. Select Standard Delivery, Pick up from store or alternatively,
          contact your nearest store for availability.
        </p>
      </template>
      <template v-else-if="hasAssembly === true">
        <p class="text-sm text-gray-900 ml-2">
          Next Day Delivery is not available on orders with a Snooze Assembly
          Service. Please remove the Assembly Service from your cart if you want
          to be able to select Next Day Delivery.
        </p>
      </template>
      <template v-else-if="eligible">
        <svg-icon-delivery-van class="mr-2 w-26 lg:w-14" />
        <p class="text-sm text-gray-900 ml-2">
          {{ getStateMessage() }}
        </p>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("checkout", ["isAvailableNextDayDelivery"]),
    ...mapGetters("bag", ["hasQuickshipRate"]),
    ...mapState({
      quickShipHydrated: state => state.quickship.hydrated,
      bagHydrated: state => state.bag.hydrated,
    }),
    ...mapState("quickship", ["postcode"]),
    ...mapState("bag", [
      "cart_default",
      "cart_wa",
      "cart_sa",
      "cart_vic",
      "cart_nsw",
      "cart_qld",
      "cart_postcode_default",
      "cart_postcode_wa",
      "cart_postcode_sa",
      "cart_postcode_vic",
      "cart_postcode_nsw",
      "cart_postcode_qld",
      "eligible",
      "regionCode",
      "shippingRates",
      "hasAssembly",
      "hasFilteredQuickship",
    ]),
  },
  methods: {
    getStateMessage() {
      return this.regionCode && this[`cart_${this.regionCode.toLowerCase()}`]
        ? this[`cart_${this.regionCode.toLowerCase()}`]
        : this.cart_default;
    },
    getPostcodeMessage(postcode) {
      const message =
        this.regionCode &&
        this[`cart_postcode_${this.regionCode.toLowerCase()}`]
          ? this[`cart_postcode_${this.regionCode.toLowerCase()}`]
          : this.cart_postcode_default;
      return message.replace("{postcode}", postcode);
    },
  },
};
</script>
