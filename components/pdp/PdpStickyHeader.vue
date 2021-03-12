<template>
  <div
    class="flex items-center justify-between bg-gray-100 py-2 fixed w-full top-0 z-40 h-20 lg:space-x-12"
    :style="{ top: topBannerHeight + 'px' }"
  >
    <div class="flex items-center w-full lg:w-2/3 xl:pl-27 pl-5">
      <div class="bg-white hidden md:block w-16 h-16 mr-10">
        <shopify-image v-bind="options" />
      </div>
      <div class="flex flex-col">
        <h1 class="text-xs text-black font-normal mb-2 hidden md:block">
          {{ title }} - {{ selectedVariant.title }}
        </h1>
        <div class="flex items-center">
          <span
            v-if="selectedVariant.price"
            class="text-xs mr-4"
            :class="{
              'text-red-700': hasDiscount(
                selectedVariant.compareAtPrice,
                selectedVariant.price
              ),
            }"
          >
            {{ selectedVariant.price | formatCurrency }}
          </span>
          <span
            v-if="
              hasDiscount(selectedVariant.compareAtPrice, selectedVariant.price)
            "
            class="line-through text-xs text-gray-600"
          >
            {{ selectedVariant.compareAtPrice | formatCurrency }}
          </span>
        </div>
      </div>
    </div>
    <pdp-add-to-cart
      :is-out-of-stock="isOutOfStock"
      :selected-variant="selectedVariant"
      class="w-full lg:w-1/3 xl:pr-27 pr-5"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import hasDiscount from "~/mixins/hasDiscount";

export default {
  mixins: [hasDiscount],
  props: {
    title: { type: String, required: true },
    image: { type: String, default: "" },
    isOutOfStock: { type: Boolean, required: true },
    selectedVariant: { type: Object, required: true },
  },
  computed: {
    ...mapState({
      topBannerHeight: s => s.app.topBannerHeight,
    }),
    resizedImage() {
      return (
        this.image.substring(0, this.image.lastIndexOf("_")) +
        "_60x60" +
        this.image.substring(this.image.lastIndexOf("."))
      );
    },
    options() {
      return {
        image: {
          src: this.image,
          altText: `${this.title} - ${this.selectedVariant.title}`,
        },
        widths: [60],
        "aspect-ratio": "1:1",
        "crop-top": true,
      };
    },
  },
};
</script>
