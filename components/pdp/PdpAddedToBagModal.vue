<template>
  <div>
    <!-- Overlay -->
    <div class="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black z-10" />
    <div
      class="fixed right-0 top-20 bg-white shadow md:mr-5 xl:mr-24 w-full lg:w-79 p-6 z-20"
      :style="{ top: topBannerHeight + headerHeight + 'px' }"
    >
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <svg-icon-item-select />
          <span class="text-base font-bold font-para text-gray-900 ml-4">
            Item added to your bag
          </span>
        </div>
        <app-button color="black" block icon="icon" @click.native="handleClose">
          <svg-icon-cross />
        </app-button>
      </div>
      <div class="flex items-center py-4 mb-6">
        <div class="bg-white w-16 mr-4">
          <shopify-image v-bind="options" />
        </div>
        <div class="flex flex-col flex-auto">
          <h1 class="text-xs text-black font-normal mb-2 truncate">
            {{ productToBeAddedTitle }}
          </h1>
          <div class="flex items-center justify-end">
            <span
              class="text-xs mr-4"
              :class="{
                'text-red-700': hasDiscount(
                  productToBeAdded.compareAtPrice,
                  productToBeAdded.price
                ),
              }"
            >
              {{ productToBeAdded.price | formatCurrency }}
            </span>
            <span
              v-if="
                hasDiscount(
                  productToBeAdded.compareAtPrice,
                  productToBeAdded.price
                )
              "
              class="text-xs text-gray-700 line-through"
            >
              {{ productToBeAdded.compareAtPrice | formatCurrency }}
            </span>
          </div>
        </div>
      </div>
      <app-button
        class="w-full md:w-full lg:px-10 mb-6"
        color="black"
        responsive
        font-weight="bold"
        block
        to="/cart"
      >
        View Bag ({{ itemCount }})
      </app-button>
      <div v-if="recommendedProduct">
        <h3 class="text-sm text-gray-700 mb-2">You might also like</h3>
        <nuxt-link
          :to="recommendedProductURL"
          class="flex py-px items-center border border-transparent hover:border-gray-500 hover:shadow transition-colors duration-500 ease-in-out"
        >
          <div class="bg-white w-16 mr-4">
            <shopify-image v-bind="recommendedImageOptions" />
          </div>
          <div class="flex flex-col flex-auto">
            <h1 class="text-xs text-black font-normal mb-2 truncate">
              {{ recommendedProduct.title }}
            </h1>
            <div class="flex items-center justify-end">
              <span
                class="text-xs mr-4"
                :class="{
                  'text-red-700': hasDiscount(
                    recommendedProductCompareAtPrice,
                    recommendedProductPrice
                  ),
                }"
              >
                {{ recommendedProductPrice | formatCurrency }}
              </span>
              <span
                v-if="
                  hasDiscount(
                    recommendedProductCompareAtPrice,
                    recommendedProductPrice
                  )
                "
                class="text-xs text-gray-700 line-through"
              >
                {{ recommendedProductCompareAtPrice | formatCurrency }}
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import hasDiscount from "~/mixins/hasDiscount";

export default {
  mixins: [hasDiscount],
  props: {
    recommendedProduct: { type: Object, default: () => {} },
    productToBeAdded: { type: Object, default: () => {} },
  },
  computed: {
    ...mapGetters("checkout", ["itemCount"]),
    ...mapState({
      topBannerHeight: s => s.app.topBannerHeight,
      headerHeight: s => s.siteConfig.headerHeight,
    }),
    recommendedProductPrice() {
      return this.recommendedProduct.variants[0].price;
    },
    recommendedProductCompareAtPrice() {
      return this.recommendedProduct.variants[0].compare_at_price;
    },
    recommendedProductURL() {
      return `/products/${this.recommendedProduct.handle}?variant=${this.recommendedProduct.variants[0].id}`;
    },
    productToBeAddedTitle() {
      const fullProductTitle = this.productToBeAdded.title;
      return fullProductTitle.length > 40
        ? `${fullProductTitle.slice(0, 40)} ...`
        : fullProductTitle;
    },
    imageOption() {
      return {
        "aspect-ratio": "1:1",
        "crop-top": true,
      };
    },
    options() {
      return {
        image: {
          src: this.productToBeAdded.image,
          altText: this.productToBeAdded.title,
        },
        widths: [60],
        ...this.imageOption,
      };
    },
    recommendedImageOptions() {
      return {
        image: {
          src: this.recommendedProduct.featuredImage,
          altText: this.recommendedProduct.title,
        },
        widths: [73],
        ...this.imageOption,
      };
    },
  },
  methods: {
    handleClose() {
      this.$store.dispatch("app/closeAddedToBag", this.isTablet);
    },
  },
};
</script>
