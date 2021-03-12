<template>
  <div class="block mt-6">
    <div class="lg:px-6 px-5 pb-6">
      <div class="text-xl text-gray-900 mb-6">
        Find your Snooze nearest store today
      </div>
      <div
        class="border border-gray-500 bg-white flex items-center justify-between pr-4 relative"
      >
        <input
          v-model="location"
          placeholder="Enter your suburb or postcode"
          type="text"
          class="px-4 py-3 w-11/12 text-sm text-gray-700 focus:outline-none"
          @input="debouncedFindStore($event)"
        />
        <svg-find-my-store-icon></svg-find-my-store-icon>
        <div
          v-if="showList"
          class="absolute z-10 left-0 top-10 w-full shadow border bg-white max-h-64 overflow-y-auto"
        >
          <ul>
            <li v-for="(item, index) in stores" :key="index">
              <a
                class="text-base text-gray-900 font-para p-3 block hover:bg-gray-100 cursor-pointer"
                @click="showSelectedStore(item.description)"
                >{{ item.description }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center p-6 bg-gray-300 text-base font-medium text-gray-900"
    >
      <span> Loading.... </span>
    </div>
    <div
      v-if="showNotFound"
      class="flex items-center justify-center p-6 bg-gray-300 text-base font-medium text-gray-900"
    >
      <span> Sorry, we couldn't find that address. </span>
    </div>
    <pdp-find-store-item :selected-store="selectedStore" />
  </div>
</template>

<script>
import { debounce } from "~/utils/underscore-utils";
import autoCompleteMixin from "~/mixins/autoCompleteMixin";
export default {
  mixins: [autoCompleteMixin],
  data() {
    return {
      location: "",
      stores: [],
      selectedStore: [],
      showList: false,
      active: false,
      loading: false,
      showNotFound: false,
      debouncedFindStore: null,
    };
  },
  mounted() {
    this.debouncedFindStore = debounce(this.checkValue, 500);
  },
  methods: {
    async checkValue(event) {
      this.showList = false;
      this.showNotFound = false;
      this.selectedStore = [];
      this.stores = [];

      if (event.target.value.length > 0) {
        try {
          const autoCompleteResult = await this.autocompleApi(
            event.target.value
          );
          if (autoCompleteResult.length > 0) {
            this.stores = autoCompleteResult;
            this.showList = true;
          } else {
            this.showNotFound = true;
          }
        } catch (err) {
          this.loading = false;
          this.error = true;
          console.log(err);
        }
      }
    },
    showSelectedStore(location) {
      this.location = location;
      this.selectedStore = [];
      this.showList = false;
      this.loading = true;
      this.$axios
        .get(`${this.$config.snoozeEcom}/ecom/stores?address="${location}"`)
        .then(result => {
          this.selectedStore = result.data.data.slice(0, 3);
          this.loading = false;
        });
    },
  },
};
</script>
