<template>
  <div>
    <div
      v-if="saleTagText || quickship"
      class="flex items-center justify-between mt-4 lg:mt-0 lg:mb-10"
    >
      <div
        v-if="saleTagText"
        class="text-white text-sm font-normal flex items-center justify-center py-2 px-6"
        :style="{ backgroundColor: saleTagBgColor }"
      >
        {{ saleTagText }}
      </div>
      <svg-icon-delivery-van v-if="quickship" class="w-1/6" />
    </div>
    <h1
      class="text-3xl lg:text-4xl text-black font-normal leading-10 mt-10 lg:mt-0 mb-6"
    >
      {{ title }} - {{ selectedVariant.title }}
    </h1>
    <p class="text-xs text-gray-700 mb-8">{{ selectedVariant.sku }}</p>
    <pdp-yotpo-rating
      :reviews-average="reviews.reviewsAverage"
      :reviews-count="reviews.reviewsCount"
      class="mb-8 cursor-pointer"
      @click.native="$emit('scroll-to-reviews')"
    />
    <pdp-price
      :price="selectedVariant.price"
      :compare-at-price="selectedVariant.compareAtPrice"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    title: { type: String, required: true },
    selectedVariant: { type: Object, default: () => {} },
    saleTagText: { type: String, default: "" },
    saleTagBgColor: { type: String, default: "" },
    quickship: { type: Boolean, default: false },
  },
  computed: {
    ...mapState("pdp", ["bottomline"]),
    reviews() {
      return {
        reviewsAverage: this.bottomline.average_score,
        reviewsCount: this.bottomline.total_review,
      };
    },
  },
};
</script>
