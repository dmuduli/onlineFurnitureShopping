<template>
  <div class="block">
    <div class="flex flex-col bg-gray-300 mt-6 lg:px-6 px-5 pb-6">
      <div class="text-xl text-gray-900 mb-6">
        Find out our delivery times for your area
      </div>
      <div
        class="border border-gray-400 bg-white flex items-center justify-between pr-4 relative"
      >
        <input
          v-model="pincode"
          type="text"
          placeholder="Enter your suburb or postcode"
          class="px-4 py-3 w-11/12 text-sm text-gray-700 focus:outline-none"
          @input="debouncedLocation($event)"
        />
        <icon-search class="cursor-pointer" @click.native="getDeliveryData" />
        <div
          v-if="showList"
          class="absolute z-10 left-0 top-10 w-full shadow border bg-white max-h-64 overflow-y-auto"
        >
          <ul>
            <li v-for="(item, index) in locations" :key="index">
              <a
                class="text-base text-gray-900 font-para p-3 block hover:bg-gray-100 cursor-pointer"
                @click="checkDelivery(item.description)"
                >{{ item.description }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center bg-gray-300 p-6 text-base font-medium text-gray-900"
    >
      <span>Loading....</span>
    </div>
    <div v-if="delivery.length > 0" class="px-6 py-6">
      <div class="text-sm text-gray-900 pb-6">
        Delivery/Pick up time - {{ variant.lead_time_text.value }}.
      </div>
      <div
        v-for="(item, index) in delivery"
        :key="index"
        class="mb-4 border-b pb-4 last:mb-0 last:pb-0 last:border-b-0"
      >
        <div class="flex text-sm text-gray-900 mb-2 justify-between">
          <div class="font-bold">{{ item.service_name }}</div>
          <div>{{ (item.total_price / 100) | formatCurrency }}</div>
        </div>
        <span class="text-sm text-gray-900">{{ item.description }}</span>
      </div>
    </div>
    <div v-if="error" class="bg-gray-300 text-sm text-red-700 text-center pb-6">
      <span>Postcode/Suburb entered is invalid.</span>
    </div>
  </div>
</template>

<script>
import { debounce } from "~/utils/underscore-utils";
import autoCompleteMixin from "~/mixins/autoCompleteMixin";
export default {
  mixins: [autoCompleteMixin],
  props: {
    open: { type: Boolean, default: false },
    variant: { type: Object, default: () => {} },
  },
  data() {
    return {
      active: this.open,
      pincode: "",
      delivery: {},
      loading: false,
      error: false,
      showList: false,
      locations: [],
    };
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (to.name !== from.name) {
        this.active = false;
      }
    },
    open(val) {
      this.active = val;
    },
  },
  mounted() {
    this.debouncedLocation = debounce(this.checkValue, 500);
  },
  methods: {
    async checkValue(event) {
      this.showList = false;
      this.locations = [];
      if (event.target.value.length > 0) {
        try {
          const autoCompleteResult = await this.autocompleApi(
            event.target.value
          );
          if (autoCompleteResult.length > 0) {
            this.locations = autoCompleteResult;
            this.showList = true;
          }
        } catch (err) {
          this.loading = false;
          this.error = true;
          console.log(err);
        }
      }
    },
    checkDelivery(location) {
      this.error = false;
      this.loading = false;
      this.delivery = {};
      this.pincode = location;
      this.getDeliveryData();
    },
    async getDeliveryData() {
      this.showList = false;
      this.delivery = {};
      this.loading = true;
      let requestBody = {
        postcode: this.pincode,
        items: [
          {
            sku: this.variant.sku,
            grams: 3,
            price: Number(this.variant.price),
            quantity: 1,
          },
        ],
      };
      try {
        const result = await this.deliveryOptionsApi(requestBody);
        this.delivery = result.data.rates.filter(
          item => item.service_name != "Store will confirm delivery cost"
        );
        if (this.delivery.length == 0) {
          this.delivery.push({
            description:
              "Pickup your order when it is available from a Snooze store of your choice.",
            service_code: "CUSTPICKUP",
            service_name: "Pickup",
            store: null,
            total_price: 0,
          });
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error = true;
        this.delivery = {};
        console.log(err);
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.slide-enter-active,
.slide-leave-active {
  @apply duration-150;
}
.slide-enter-active {
  @apply ease-in;
}

.slide-leave-active {
  @apply ease-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 415px;
  @apply overflow-hidden;
}

.slide-enter,
.slide-leave-to {
  @apply overflow-hidden;
  max-height: 0;
}
</style>
