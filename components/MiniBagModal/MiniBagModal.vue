<template>
  <!-- Mini Bag 506 - HTML -->

  <div
    class="mini-bag bg-white shadow border-b-2 border-gray-500 absolute top-100 right-0 md:mr-5 xl:mr-24 w-full md:w-78"
    @mouseenter="$emit('onMiniBagModalMouseEnter')"
    @mouseleave="$emit('closeMinicart')"
  >
    <!-- Empty Bag -->
    <mini-bag-empty v-if="!itemCount" />
    <!-- Item in Bag -->
    <div v-else class="bag-content-list pt-6 pb-0 px-4 pr-0">
      <h3
        class="bag-title text-base font-para font-bold text-gray-900 mb-4 pr-4"
      >
        My Bag -
        <span class="items-count text-sm font-normal">
          {{ itemCount }} {{ itemCount > 1 ? "items" : "item" }}
        </span>
      </h3>
      <perfect-scrollbar class="products-list max-h-70 overflow-y-auto pr-4">
        <ul>
          <li
            v-for="(lineItem, key) of visibleLineItems"
            :key="key"
            class="mb-2"
          >
            <nuxt-link
              :to="getPdpUrl(lineItem.variant)"
              class="flex border pr-2 border-transparent hover:border-gray-500 hover:shadow transition-colors duration-500 ease-in-out"
            >
              <figure class="w-18 h-18 flex-shrink-0 mr-3 flex items-center">
                <shopify-image v-bind="getOptions(lineItem)" />
              </figure>
              <div class="pt-4 min-w-0 flex-auto">
                <h4
                  class="text-xs leading-4 text-gray-800 font-para truncate"
                  :title="`${lineItem.title} - ${lineItem.variant.title}`"
                >
                  {{ lineItem.title }} - {{ lineItem.variant.title }}
                </h4>
                <div class="flex justify-between">
                  <div class="text-xs text-gray-600">
                    Quantity: {{ lineItem.quantity }}
                  </div>
                  <mini-bag-price
                    :quantity="lineItem.quantity"
                    :price="lineItem.variant.price"
                    :compare-at-price="lineItem.variant.compareAtPrice"
                  />
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </perfect-scrollbar>
      <div
        class="items-total-cta border-t border-gray-500 pt-6 pb-8 px-4 mt-4 -ml-4"
      >
        <div class="amount-details flex justify-between">
          <div class="label text-sm text-gray-1500">Sub-total</div>
          <div
            class="amount text-xs text-gray-800 md:text-gray-900 line-through"
          >
            <span v-if="hasDiscount(totalPrice, cart.subTotal.amount)">
              {{ totalPrice | formatCurrency }}
            </span>
            <span
              class="discounted-amount text-base ml-3 inline-block"
              :class="{
                'text-red-700': hasDiscount(totalPrice, cart.subTotal.amount),
              }"
            >
              {{ cart.subTotal.amount | formatCurrency }}
            </span>
          </div>
        </div>
        <div class="view-bag-cta mt-4">
          <app-button
            class="block w-full"
            color="black"
            @click.native="onClickViewBag"
          >
            View Bag
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getPdpUrl } from "~/utils/shopify-utils";
import hasDiscount from "~/mixins/hasDiscount";

export default {
  mixins: [hasDiscount],
  computed: {
    ...mapState("checkout", ["cart"]),
    ...mapGetters("checkout", ["visibleLineItems", "itemCount", "totalPrice"]),
  },
  methods: {
    getPdpUrl(variant) {
      return getPdpUrl(variant.id, variant.product.handle);
    },
    onClickViewBag() {
      this.$emit("closeMinicart");
      this.$router.push({
        path: "/cart",
      });
    },
    getOptions(lineItem) {
      return {
        image: {
          src: lineItem.variant.image.src,
          altText: `${lineItem.title} - ${lineItem.variant.title}`,
        },
        widths: [60],
        "aspect-ratio": "1:1",
        "crop-top": true,
      };
    },
  },
};
</script>
