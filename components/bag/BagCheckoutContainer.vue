<template>
  <div>
    <div class="bg-white px-6 py-8">
      <bag-delivery-estimator />
      <bag-price-summary />
      <bag-checkout-savings />
      <bag-checkout-button />
      <div
        class="flex justify-between items-center flex-wrap px-3 lg:px-4 py-2 payment-icons"
      >
        <div class="w-1/4 text-center py-2">
          <img src="~/assets/images/visa-logo.png" alt="Visa logo" />
        </div>
        <div class="w-1/4 text-center py-2 mastercard-logo">
          <img
            src="~/assets/images/mastercard-logo.png"
            alt="Master card logo"
          />
        </div>
        <div class="w-1/4 text-center py-2">
          <img src="~/assets/images/paypal-logo.png" alt="Paypal logo" />
        </div>
        <div class="w-1/4 text-center py-2">
          <img
            src="~/assets/images/american-express-logo.png"
            class="m-auto"
            alt="American express logo"
          />
        </div>
        <div class="w-1/4 text-center py-2">
          <img src="~/assets/images/afterpay-logo.png" alt="Afterpay logo" />
        </div>
        <div class="w-1/4 text-center py-2">
          <img src="~/assets/images/humm-logo.png" alt="Humm logo" />
        </div>
        <div class="w-1/4 text-center py-2">
          <img
            src="~/assets/images/pay-logo.png"
            class="m-auto"
            alt="Pay logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      location: "",
      stores: [],
      showList: false,
      loading: false,
      showNotFound: false,
      debouncedFindStore: null,
      selectedShippingRate: { service_name: "" },
    };
  },
  computed: {
    ...mapState("bag", ["cartItemStockStatus"]),
  },
};
</script>

<style lang="postcss" scoped>
@media screen and (min-width: 802px) and (max-width: 900px) {
  .payment-icons {
    padding: 0;
  }
  .mastercard-logo {
    width: 18%;
  }
}
</style>
