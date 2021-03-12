<template>
  <div>
    <div class="flex items-center mb-10">
      <svg-icon-delivery-big-van class="mr-3"></svg-icon-delivery-big-van>
      <h3 class="text-sm text-gray-1200 font-bold uppercase">
        Delivery &amp; Pick-Up options
      </h3>
    </div>
    <div
      class="border border-gray-1300 bg-white flex items-center justify-between pr-4 mb-4 relative"
    >
      <input
        v-model="searchTerm"
        type="text"
        class="p-3 w-11/12 focus:outline-none text-sm"
        placeholder="Enter your suburb or postcode"
        @input="searchAddressFunc"
      />
      <icon-search
        class="cursor-pointer w-6 h-6"
        @click.native="searchAddressFunc"
      />
      <dropdown-list
        v-if="showList && addresses.length"
        :items="addresses"
        @item-clicked="onSelectedAddress($event)"
      />
    </div>
    <div
      v-if="showNotFound"
      class="flex items-center justify-center pb-2 text-sm text-gray-1500"
    >
      <span class="text-red-600"> Postcode/Suburb entered is invalid. </span>
    </div>

    <div
      v-if="!searchTerm"
      class="flex items-center justify-center pb-2 text-sm text-gray-1500"
    >
      <span> Enter your postcode above for delivery options </span>
    </div>
    <div v-if="shippingRates.length > 0" class="mb-8 mt-8">
      <div
        v-for="rate in shippingRates"
        :key="rate.service_code"
        class="flex mb-6"
      >
        <app-radiobox
          v-model="selectedShippingRate"
          :default-value="rate.service_code"
        >
          <div
            :for="rate.service_code"
            class="flex justify-between flex-shrink flex-auto"
          >
            <div class="flex flex-col mr-2">
              <div class="text-sm font-bold text-gray-900 mb-2 cursor-pointer">
                {{ rate.service_name }}
              </div>
              <div class="text-sm text-gray-900 cursor-pointer">
                {{ rate.description }}
              </div>
            </div>
            <div class="self-start text-sm text-gray-900">
              {{ (rate.total_price / 100) | formatCurrency }}
            </div>
          </div>
        </app-radiobox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import autoCompleteMixin from "~/mixins/autoCompleteMixin";
import { debounce } from "~/utils/underscore-utils";

export default {
  mixins: [autoCompleteMixin],
  data: () => ({
    delivery: [],
    searchTerm: "",
    postcode: "",
    addresses: [],
    showList: true,
    showNotFound: false,
  }),
  computed: {
    ...mapState("bag", [
      "postcodeWarehouseId",
      "deliveryEstimating",
      "estimatorErrors",
      "shippingRates",
      "membershipDiscount",
    ]),
    ...mapGetters("checkout", ["productSkus", "productQuantities"]),
    selectedShippingRate: {
      get() {
        return this.$store.state.bag.selectedShippingRate.service_code;
      },
      set(serviceCode) {
        const targetRate = this.shippingRates.find(
          rate => rate.service_code === serviceCode
        );

        this.selectShippingRate({ shippingRate: targetRate });
      },
    },
    searchAddressFunc() {
      return debounce(this.autocompleHandler, 500);
    },
  },
  watch: {
    postcode: {
      async handler(value) {
        if (value) {
          console.log({ updating1: 1222222 });
          await Promise.all([
            this.checkPostcode({ postcode: value }),
            this.estimateDelivery({ postcode: value }),
          ]).catch(e => {
            console.log("error to geting Postcode from api");
          });
        }
      },
      immediate: true,
    },
  },
  async created() {
    await this.$store.dispatch("bag/hydrate");
    this.postcode = this.$store.state.quickship.postcode;
    this.searchTerm = this.$store.state.bag.deliveryAddress;
    console.log({ postcode1111: this.postcode, searchTerm: this.searchTerm });
  },
  methods: {
    ...mapActions("bag", [
      "estimateDelivery",
      "selectShippingRate",
      "initShippingRates",
      "setDeliveryAddress",
      "checkPostcode",
      "addPickupToShippingRates",
    ]),
    initDeliveryOptions() {
      this.addresses = [];
      this.showList = true;
      this.showNotFound = false;
      this.postcode = "";
      this.initShippingRates();
      this.$store.dispatch("quickship/setPostcode", { postcode: "" });
      this.selectShippingRate({ shippingRate: [] });
    },
    async autocompleHandler() {
      this.initDeliveryOptions();
      if (this.searchTerm == "") {
        return;
      }

      try {
        this.addresses = await this.autocompleApi(this.searchTerm);
        if (this.addresses.length === 0) {
          // this.addPickupToShippingRates();
          // this.selectedShippingRate = "CUSTPICKUP";
          this.showNotFound = true;
        }
      } catch (err) {
        this.addresses = [];
        console.log(err);
      }
    },
    async onSelectedAddress(fullAddress) {
      this.searchTerm = fullAddress ? fullAddress.description : "";
      this.showList = false;
      if (this.searchTerm == "") {
        return;
      }

      // this.initShippingRates();
      const [postcode] = await Promise.all([
        this.getPostcode(fullAddress.place_id),
        this.setDeliveryAddress({ deliveryAddress: this.searchTerm }),
      ]).catch(e => {
        console.log("error to get post code from external api");
      });
      this.postcode = postcode;
    },
  },
};
</script>
