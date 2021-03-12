<template>
  <div class="my-4">
    <div
      v-swiper="imageSwiperOption"
      class="swiper overflow-x-hidden w-full relative"
    >
      <div class="swiper-wrapper space-x-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="swiper-slide px-2 py-4"
        >
          <cms-link v-if="item.link" :field="item.link">
            <div>
              <cms-image class="m-auto w-full" :field="item.image" />
            </div>
            <cms-rich-text
              v-if="item.optional_subtitle"
              class="mt-2 prose-pages text-center text-gray-900"
              :field="item.optional_subtitle"
            />
          </cms-link>
          <div v-else>
            <cms-image class="m-auto w-full" :field="item.image" />
            <cms-rich-text
              v-if="item.optional_subtitle"
              class="mt-2 prose-pages text-center text-gray-900"
              :field="item.optional_subtitle"
            />
          </div>
        </div>
      </div>
      <swiper-nav
        slot="button-next"
        class="swiper-next right-2 -mt-10"
        :class="{ hidden: showNav == false }"
        type="next"
        size="small"
        style="transform: translate(0, 50%)"
      />
      <swiper-nav
        slot="button-prev"
        class="swiper-prev left-2 -mt-10"
        :class="{ hidden: showNav == false }"
        type="prev"
        size="small"
        style="transform: translate(0, 50%)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
    items: { type: Array, default: () => [] },
    label: { type: String, default: () => "" },
  },
  data: () => ({
    showNav: false,
    currentImageIndex: 0,
    imageSwiperOption: {
      slidesPerGroup: 1,
      slidesPerView: "auto",
      loop: false,
      nested: true,
      loopFillGroupWithBlank: false,
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
    },
  }),
};
</script>
<style lang="postcss" scoped>
.swiper-slide {
  @apply w-auto !important;
}
.swiper-button-disabled {
  @apply hidden;
}
</style>
<style lang="postcss">
.snooze-video-wrap iframe {
  @apply w-full h-76 !important;
}
</style>
