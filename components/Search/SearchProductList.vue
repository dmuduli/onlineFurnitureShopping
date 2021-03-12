<template>
  <div class="top-products">
    <h3 class="text-sm leading-8 text-gray-600">Top Products</h3>
    <div v-if="hits.length == 0">No products found</div>
    <ul v-else>
      <li v-for="hit of hits" :key="hit.objectID" class="mb-2">
        <nuxt-link
          class="flex border border-transparent hover:border-gray-500 hover:shadow transition-colors duration-500 ease-in-out"
          :to="`/products/${hit.handle}`"
          @click.native.prevent="closeSearch"
        >
          <figure class="w-18 flex-shrink-0 mr-3">
            <shopify-image v-bind="getOptions(hit)" />
          </figure>
          <div v-if="hit.title" class="pt-4 lg:pr-4 min-w-0">
            <h4 class="text-xs leading-4 text-gray-800 font-para truncate">
              {{ hit.title }}
            </h4>
            <p class="text-xs leading-6 text-gray-600">
              <span
                class="mr-3"
                :class="{
                  'text-red-700': hasDiscount(hit.compare_at_price, hit.price),
                }"
              >
                {{ hit.price | formatCurrency }}
              </span>
              <span
                v-if="hasDiscount(hit.compare_at_price, hit.price)"
                class="line-through"
              >
                {{ hit.compare_at_price | formatCurrency }}
              </span>
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <div v-if="hits.length > 2" class="action mt-3">
      <nuxt-link
        class="text-sm leading-normal font-medium inline-block pb-1 border-b-2 border-gray-500 text-gray-900 uppercase"
        :to="viewAllURL"
        @click.native.prevent="closeSearch"
      >
        view all
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import hasDiscount from "~/mixins/hasDiscount";

export default {
  mixins: [hasDiscount],
  props: {
    hits: { type: Array, required: true },
    currentRefinement: { type: String, required: true },
    closeSearch: { type: Function, required: true },
  },
  computed: {
    viewAllURL() {
      const queryParams = qs.stringify(
        {
          query: this.currentRefinement,
          sortBy: "snooze_dev_products_recently_ordered_count_desc",
        },
        { addQueryPrefix: true }
      );
      return `/products/search${queryParams}`;
    },
  },
  methods: {
    getOptions(hit) {
      return {
        image: { src: hit.product_image, altText: hit.title },
        widths: [73],
        "aspect-ratio": "1:1",
        "crop-top": true,
      };
    },
  },
};
</script>
