<template>
  <div>
    <div class="overflow-x-hidden w-full relative">
      <img
        :src="imageVisible.url"
        :alt="imageVisible.altText"
        class="w-full h-auto"
      />
      <div
        style="bottom: 2rem"
        class="carousel-image-swiper-pagination absolute z-20 w-full flex justify-center px-4"
      />
      <div v-if="hasMoreImages" class="flex justify-between">
        <swiper-nav
          slot="button-prev"
          class="carousel-image-button-prev border-none left-8 lg:left-28 -mt-10"
          type="prev"
          size="small"
          @click.native="clickSwiper(-1)"
        />
        <swiper-nav
          slot="button-next"
          class="carousel-image-button-next border-none right-8 lg:right-28 -mt-10"
          size="small"
          type="next"
          @click.native="clickSwiper(+1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: { type: Array, required: true },
  },
  data() {
    return {
      imageIndex: 0,
    };
  },
  computed: {
    hasMoreImages() {
      return this.images.length > 1;
    },
    imageVisible() {
      return this.images[this.imageIndex];
    },
  },
  methods: {
    clickSwiper(index) {
      if (this.imageIndex == 0 && index == -1) {
        this.imageIndex = this.images.length - 1;
      } else {
        this.imageIndex = (this.imageIndex + index) % this.images.length;
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
