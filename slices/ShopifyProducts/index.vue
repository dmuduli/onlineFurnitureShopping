<template>
  <app-container
    v-if="products.length"
    class="pr-0 py-10 lg:pr-5 lg:pb-20 overflow-x-hidden"
  >
    <cms-rich-text
      class="font-normal text-xl text-gray-333 lg:text-gray-900 lg:text-3xl mb-4"
      :field="primary.list_title"
    />
    <div v-swiper="swiperOption" class="swiper overflow-x-hidden relative">
      <div class="swiper-wrapper -mx-4">
        <div
          v-for="(product, productIndex) in products"
          :key="productIndex"
          class="swiper-slide flex px-4 border-r border-gray-500 last:border-r-0"
        >
          <product-tile
            class="w-full"
            :product="product"
            :initial-variant-id="product.variants[0].id"
          >
            <template #images="{ productImagesProps }">
              <product-tile-images
                :title="product.title"
                v-bind="productImagesProps"
              />
            </template>
            <template #brand>
              <product-tile-brand :metafields="product.metafields" />
            </template>
            <template #title="{ selectedVariantId }">
              <product-tile-title
                :title="product.title"
                :handle="product.handle"
                :selected-variant-id="selectedVariantId"
              />
            </template>
            <template #ratings="{ selectedVariantId }">
              <product-tile-rating
                :review-html="product.bottomline || ''"
                :handle="product.handle"
                :selected-variant-id="selectedVariantId"
              />
            </template>
            <template #colors="{ productColorProps }">
              <product-tile-colors
                v-bind="productColorProps"
                :options="product.options"
              />
            </template>
            <template #sizes>
              <product-tile-sizes :options="product.options" />
            </template>
            <template #prices="{ price, compareAtPrice }">
              <product-tile-prices
                :compare-at-price="compareAtPrice"
                :price="price"
              />
            </template>
          </product-tile>
        </div>
      </div>
      <!-- hide arrows on mobile -->
      <swiper-nav
        v-if="!isMobile && products.length > 5"
        slot="button-prev"
        class="product-swiper-prev left-4 lg:left-8 hidden lg:inline-flex -mt-10"
        type="prev"
        size="big"
      />
      <swiper-nav
        v-if="!isMobile && products.length > 5"
        slot="button-next"
        class="product-swiper-next right-4 lg:right-8 hidden lg:inline-flex -mt-10"
        type="next"
        size="big"
      />
    </div>
  </app-container>
</template>

<script>
import { compose, map, filter, path } from "ramda";

import metaColourMixin from "~/mixins/metaColourMixin";

export default {
  mixins: [metaColourMixin],
  props: {
    fields: { type: Array, required: true },
    primary: { type: Object, required: true },
  },
  computed: {
    products() {
      const items = compose(
        filter(Boolean),
        map(path(["product"]))
      )(this.fields);
      const maxLimit = this.primary.max_products_limit;
      return maxLimit ? items.slice(0, maxLimit) : items;
    },
    swiperOption() {
      return {
        slidesPerGroup: this.isMobile ? 2 : 4,
        slidesPerView: "auto",
        loop: false,
        loopFillGroupWithBlank: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".product-swiper-next",
          prevEl: ".product-swiper-prev",
        },
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.swiper-slide {
  height: auto !important;
  @apply w-48 !important;
}
@screen md {
  .swiper-slide {
    @apply w-62 !important;
  }
}
.swiper-button-disabled {
  @apply hidden;
}
</style>
