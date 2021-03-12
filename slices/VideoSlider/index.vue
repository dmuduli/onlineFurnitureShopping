<template>
  <!-- video crousel -->
  <div>
    <div v-if="label == 'with-swipper'" class="my-4">
      <div
        v-swiper="swiperOption"
        class="swiper overflow-x-hidden w-full relative"
        @mouseenter.self="onMouseEnter"
        @mouseleave.self="onMouseLeave"
      >
        <div class="swiper-wrapper -mx-2">
          <div
            v-for="(item, index) in videoFields"
            :key="index"
            class="swiper-slide p-2"
          >
            <cms-embed
              :field="item.video"
              class="w-full snooze-video-wrap p-4 shadow bg-white border"
            />
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
      <!-- end -->
    </div>
    <div v-else>
      <div v-for="(item, index) in videoFields" :key="index" class="p-2">
        <cms-embed
          :field="item.video"
          class="w-full snooze-video-wrap p-4 shadow bg-white border"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
    label: { type: String, default: () => "" },
  },
  data: () => ({
    showNav: false,
    currentImageIndex: 0,
  }),
  computed: {
    swiperOption() {
      return {
        slidesPerGroup: 1,
        slidesPerView: this.isTablet ? "auto" : 3,
        loop: false,
        nested: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
      };
    },
    videoFields() {
      return this.fields.filter(field => field.video);
    },
  },
  methods: {
    onMouseEnter(e) {
      if (this.$swiper.destroyed) {
        return;
      }
      this.showNav = !this.isMobile;
    },
    onMouseLeave() {
      if (this.$swiper.destroyed) {
        return;
      }

      this.showNav = false;
    },
  },
};
</script>
<style lang="postcss" scoped>
.swiper-button-disabled {
  @apply hidden;
}
</style>
<style lang="postcss">
.snooze-video-wrap iframe {
  @apply w-full !important;
}
</style>
