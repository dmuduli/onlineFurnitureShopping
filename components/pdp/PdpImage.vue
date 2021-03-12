<template>
  <div>
    <div
      v-show="hasMoreImages"
      v-swiper:mySwiper="swiperOptions"
      class="swiper overflow-x-hidden w-full relative"
    >
      <div class="swiper-wrapper">
        <div v-for="(image, index) of images" :key="index" class="swiper-slide">
          <img :src="image" :alt="altText" class="w-full h-auto" />
        </div>
      </div>
      <div
        style="bottom: 2rem"
        class="pdp-swiper-pagination absolute z-20 w-full flex justify-center px-4"
      />
      <div class="flex justify-between">
        <swiper-nav
          slot="button-prev"
          class="pdp-image-desc-button-prev border-none left-8 lg:left-28 -mt-10"
          type="prev"
          size="small"
        />
        <swiper-nav
          slot="button-next"
          class="pdp-image-desc-button-next border-none right-8 lg:right-28 -mt-10"
          size="small"
          type="next"
        />
      </div>
    </div>
    <div v-show="!hasMoreImages">
      <img :src="images[0]" :alt="altText" class="w-full h-auto" />
    </div>
    <pdp-aug-reality-modal :three-d-url="threeDUrl" />
    <pdp-image-modal :images="images" />
  </div>
</template>

<script>
export default {
  props: {
    images: { type: Array, required: true },
    threeDUrl: { type: String, default: () => "" },
    altText: { type: String, default: () => "" },
  },
  computed: {
    hasMoreImages() {
      return this.images.length > 1;
    },
    swiperOptions() {
      return {
        autoHeight: true,
        slidesPerGroup: 1,
        slidesPerView: "auto",
        loop: this.hasMoreImages,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: ".pdp-image-desc-button-next",
          prevEl: ".pdp-image-desc-button-prev",
        },
        pagination: {
          el: ".pdp-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">&nbsp;&nbsp;</span>`,
        },
      };
    },
  },
  watch: {
    images(val) {
      if (this.hasMoreImages) {
        this.mySwiper.updateSlides();
        this.$nextTick(() => {
          this.mySwiper.slideToLoop(0);
        });
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.swiper-slide {
  @apply w-full !important;
}
</style>
<style lang="postcss">
.swiper-pagination-bullet {
  @apply bg-gray-500 cursor-pointer inline-block rounded-2xl w-14 opacity-100 shadow-lg;
  height: 3px;
  margin: 8px 2px 0 2px;
}
.swiper-pagination-bullet-active {
  @apply bg-white;
}
@screen md {
  .swiper-pagination-bullet {
    margin-top: 0;
  }
}
</style>
