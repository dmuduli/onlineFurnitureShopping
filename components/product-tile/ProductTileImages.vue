<template>
  <div
    class="w-full mb-4 md:mb-6 bg-white relative overflow-hidden flex items-center h-36 xs:h-52 sm:h-62 md:h-46 lg:h-48 mxl:h-62"
  >
    <nuxt-link
      :to="`/products/${handle}?variant=${selectedVariantId}`"
      class="w-full"
    >
      <div
        v-swiper="imageSwiperOption"
        class="swiper overflow-x-hidden w-full relative"
        @mouseenter.self="onMouseEnter"
        @mouseleave.self="onMouseLeave"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(image, index) of allImages"
            :key="index"
            class="swiper-slide"
          >
            <shopify-image v-bind="getOptions(image)" />
          </div>
        </div>
        <swiper-nav
          slot="button-next"
          class="swiper-next right-2 -mt-10"
          size="small"
          :class="{ hidden: showNav == false }"
          type="next"
          style="transform: translate(0, 50%)"
        />
        <swiper-nav
          slot="button-prev"
          class="swiper-prev left-2 -mt-10"
          :class="{ hidden: showNav == false }"
          size="small"
          type="prev"
          style="transform: translate(0, 50%)"
        />
      </div>
      <span
        v-if="saleTagText"
        :style="{ backgroundColor: saleTagBgColor }"
        class="absolute bottom-0 w-full text-center bg-red-600 tracking-wider p-2 md:px-4 md:py-2 text-sm font-medium leading-6 text-white uppercase z-10"
      >
        {{ saleTagText }}
      </span>

      <!-- Floating tags  -->
      <div class="flex absolute z-10 top-2 right-2">
        <div
          v-if="quickship"
          class="group truck-delivery ml-4 flex items-center justify-center border border-gray-500 border-opacity-0 hover:border-opacity-100 shadow hover:shadow-none bg-white w-8 hover:w-auto h-8 rounded-full hover:px-2 transition-all duration-300 ease-in-out"
        >
          <svg-icon-delivery-big-van class="w-4 flex-shrink-0" />
          <span
            class="group-hover:opacity-100 group-hover:block group-hover:ml-1 uppercase hidden relative left:-100% text-2xs text-gray-333 font-medium"
          >
            Next Day
          </span>
        </div>

        <div
          v-if="isAustralianMade"
          class="group aus-made ml-4 flex items-center justify-center border border-gray-500 border-opacity-0 hover:border-opacity-100 shadow hover:shadow-none bg-white w-8 hover:w-auto h-8 rounded-full hover:px-2 transition-all duration-300 ease-in-out"
        >
          <svg-icon-australia-made class="w-4 flex-shrink-0" />
          <span
            class="group-hover:opacity-100 group-hover:block group-hover:ml-1 uppercase hidden relative left:-100% text-2xs text-gray-333 font-medium"
          >
            Aus made
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { compose, pathOr, equals } from "ramda";

const getMetaCondition = conditionOn =>
  compose(equals(1), pathOr(0, ["metafields", conditionOn]));

export default {
  props: {
    allImages: { type: Array, default: () => [] },
    saleTagText: { type: String, default: "" },
    saleTagBgColor: { type: String, default: "" },
    handle: { type: String, default: "" },
    tags: { type: [String, Array], default: "" },
    metafields: { type: Object, default: () => {} },
    selectedVariantId: { type: [Number, String], required: true },
    title: { type: [String, Array], default: "" },
  },
  data: () => ({
    showNav: false,
    currentImageIndex: 0,
    imageSwiperOption: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      loop: false,
      nested: true,
      loopFillGroupWithBlank: false,
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
    },
  }),
  computed: {
    isAustralianMade() {
      return getMetaCondition("australian_made")(this);
    },
    quickship() {
      return getMetaCondition("delivery_truck")(this);
    },
  },
  methods: {
    onMouseEnter(e) {
      if (this.$swiper && this.$swiper.destroyed) {
        return;
      }

      this.showNav = true;
      this.$swiper.slideNext();
    },
    onMouseLeave() {
      if (this.$swiper && this.$swiper.destroyed) {
        return;
      }

      this.showNav = false;
      this.$swiper.slidePrev();
    },
    getOptions(image) {
      return {
        image: {
          src: image,
          altText: this.title,
        },
        widths: [168, 228, 288],
        sizes: "(min-width: 768px) 288px, (min-width: 375px) 228px, 168px",
        "aspect-ratio": "1:1",
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.swiper-button-disabled {
  @apply hidden;
}

.swiper-slide {
  @apply w-full !important;
}
</style>
