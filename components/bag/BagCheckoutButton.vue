<template>
  <div class="mb-10">
    <app-button
      class="w-full md:w-full lg:px-10 cursor-pointer"
      :class="{
        'opacity-50 cursor-not-allowed focus:outline-none': updatingAttrs,
      }"
      color="black"
      :disabled="updatingAttrs"
      responsive
      block
      external
      @click.native="onCheckoutClick"
    >
      <svg-icon-circle v-if="updatingAttrs" class="w-full" />
      <span v-else>Checkout</span>
    </app-button>
    <span v-if="showCheckoutError" class="text-red-500 text-xs mt-2">
      Data is not hydrated yet
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({ updatingAttrs: false, showCheckoutError: false }),
  computed: {
    ...mapState("checkout", ["checkout"]),
    ...mapState("quickship", ["postcode"]),
    ...mapState("bag", [
      "regionCode",
      "eligible",
      "postcodeCutOffTime",
      "postcodeDeliveryDay",
      "postcodeWarehouseId",
      "hasAssembly",
      "hasFilteredQuickship",
      "selectedShippingRate",
    ]),
    ...mapState({
      quickShipHydrated: state => state.quickship.hydrated,
      bagHydrated: state => state.bag.hydrated,
    }),
    webUrl() {
      const url = new URL(this.checkout.webUrl);
      url.hostname = this.$config.shopifyThemeHost;
      return url.href;
    },
  },
  methods: {
    async onCheckoutClick() {
      this.updatingAttrs = true;
      this.showCheckoutError = false;

      if (!(this.quickShipHydrated && this.bagHydrated)) {
        this.showCheckoutError = true;
        this.updatingAttrs = false;
        return;
      }

      await this.$store.dispatch(
        "checkout/UPDATE_CUSTOM_ATTRIBUTES",
        [
          { quickshipPostcode: this.postcode },
          { quickshipRegionCode: this.regionCode },
          { quickshipEligible: this.eligible ? "true" : "false" },
          { quickshipPostcodeCutOffTime: this.postcodeCutOffTime },
          { quickshipPostcodeDeliveryDay: this.postcodeDeliveryDay },
          { quickshipPostcodeWarehouseId: this.postcodeWarehouseId },
          { hasAssembly: this.hasAssembly ? "true" : "false" },
          {
            hasFilteredQuickship: this.hasFilteredQuickship ? "true" : "false",
          },
          { shippingRate: JSON.stringify(this.selectedShippingRate) },
        ].filter(item => Boolean(Object.values(item)[0]))
      );
      window.location.href = this.webUrl;
    },
  },
};
</script>
