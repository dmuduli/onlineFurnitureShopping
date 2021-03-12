<template>
  <div>
    <div class="flex flex-wrap -mx-2">
      <div v-swiper="swiperOption" class="swiper overflow-x-hidden relative">
        <div class="swiper-wrapper">
          <collection-tile
            v-for="(item, index) in fields.slice(0, 4)"
            :key="index"
            :item="item.link"
            class="swiper-slide w-30 lg:w-1/4 px-3 border-r border-gray-500 last:border-r-0 lg:mb-0 top-categories-col overflow-hidden relative"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionTile from "~/components/Collection/CollectionTile";

export default {
  components: {
    "collection-tile": CollectionTile,
  },
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => {} },
  },
  data() {
    return {
      swiperOption: {
        slidesPerGroup: 1,
        slidesPerView: "auto",
        loop: false,
        loopFillGroupWithBlank: false,
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.swiper-slide {
  width: 18rem !important;
  height: auto !important;
}
</style>
