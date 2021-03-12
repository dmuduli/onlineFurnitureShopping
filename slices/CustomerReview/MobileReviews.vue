<template>
  <div class="flex">
    <div v-swiper="swiperOption" class="swiper overflow-x-hidden relative">
      <div class="swiper-wrapper -mx-3">
        <div
          v-for="item in siteReview"
          :key="item.id"
          class="swiper-slide w-1/2 px-3 border-r border-gray-500 last:border-r-0 lg:border-r-0"
        >
          <collection-review :item="item"></collection-review>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionReview from "~/components/Collection/CollectionReview";

export default {
  components: {
    "collection-review": CollectionReview,
  },
  props: { siteReview: { type: Array, default: () => [] } },
  data() {
    return {
      swiperOption: {
        slidesPerGroup: 1,
        slidesPerView: "auto",
        loop: false,
        loopFillGroupWithBlank: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.swiper-slide {
  @apply w-72 !important;
  @apply h-auto !important;
}
@screen lg {
  .swiper-slide {
    @apply w-1/4 !important;
    @apply h-auto !important;
  }
}
</style>
