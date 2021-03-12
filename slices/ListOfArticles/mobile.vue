<template>
  <div class="h-full -mx-3">
    <div
      v-swiper="swiperOption"
      class="swiper overflow-x-hidden w-auto relative"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(field, index) in fields.slice(0, 4)"
          :key="index"
          class="swiper-slide mb-4 px-3 border-r border-gray-500 last:border-r-0 relative"
        >
          <related-article
            :field="field"
            :get-image-field="getImageField"
            :get-text-field="getTextField"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RelatedArticle from "./RelatedArticle";

export default {
  components: { "related-article": RelatedArticle },
  props: {
    fields: { type: Array, default: () => {} },
    getImageField: { type: Function, required: true },
    getTextField: { type: Function, required: true },
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
.tooltip:hover .tooltip div {
  @apply block;
}

.swiper-slide {
  @apply w-72 !important;
}
</style>
