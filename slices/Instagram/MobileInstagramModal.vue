<template>
  <div v-swiper="swiperOption" class="swiper flex flex-col lg:flex-row">
    <div class="swiper-wrapper flex">
      <div
        v-for="(item, i) in gallery"
        :key="i"
        class="swiper-slide items-start"
      >
        <div class="flex flex-col m-auto lg:flex-row bg-white w-full h-full">
          <div
            class="post-images w-auto flex items-center justify-center relative overflow-hidden"
          >
            <video
              v-if="item.data_type == 'video'"
              playsinline
              autoplay
              muted
              controls
              :src="item.video"
              class="w-screen h-screen"
            />
            <carousel-image
              v-else
              ref="carousel-image"
              :images="getImage(item)"
            />
          </div>
        </div>
        <div class="modal-body overflow-y-auto flex flex-col relative z-10">
          <div class="border-b border-gray-300">
            <div class="flex p-4 pb-2">
              <object class="w-16 mr-4">
                <cms-link :field="primary.instagram_link">
                  <svg-icon-snooze-logo class="w-full" />
                </cms-link>
              </object>
              <object class="lg:flex-1">
                <cms-link :field="primary.instagram_link">
                  <div
                    class="w-full text-xl text-gray-900"
                    data-feed-id="insta-feed"
                  >
                    {{ item.username }}
                  </div>
                  <cms-rich-text
                    :field="primary.username"
                    class="w-full text-base text-gray-700"
                  />
                </cms-link>
              </object>
            </div>
            <div
              class="closemodal text-xl absolute cursor-pointer"
              aria-hidden="true"
              @click="closeModal"
            >
              &times;
            </div>
          </div>
          <div class="flex justify-between inst-modal-slider-next-prev-btns">
            <swiper-nav
              slot="button-prev"
              class="instagram-m-modal-swiper-prev border-none left-8 lg:left-28 -mt-10"
              type="prev"
              size="small"
            />
            <swiper-nav
              slot="button-next"
              class="instagram-m-modal-swiper-next border-none right-8 lg:right-28 -mt-10"
              type="next"
              size="small"
            />
          </div>
          <div class="modal-scroll">
            <p class="p-6 text-base modal-content-section">
              {{ item.caption }}
            </p>
          </div>
          <div
            class="border-t border-gray-300 p-3 text-xs text-gray-700 cursor-pointer"
            @click="viewOnInstagram"
          >
            View on Instagram
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselImage from "./CarouselImage";

export default {
  components: { "carousel-image": CarouselImage },

  props: {
    gallery: { type: Array, default: () => {} },
    index: { type: Number, default: 0 },
    primary: { type: Object, default: () => {} },
    getImage: { type: Function, default: () => {} },
  },

  data() {
    return {
      dataIndex: this.index,
      text: {},
      swiperOption: {
        slidesPerGroup: 1,
        slidesPerView: "auto",
        initialSlide: this.index,
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: ".instagram-m-modal-swiper-next",
          prevEl: ".instagram-m-modal-swiper-prev",
        },
      },
    };
  },

  computed: {
    slideVisible() {
      return this.gallery[this.dataIndex];
    },
  },

  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    viewOnInstagram() {
      window.open(this.slideVisible.url);
    },
  },
};
</script>

<style lang="postcss" scoped>
.modal-scroll {
  height: 32vh;
  overflow: auto;
}
.inst-modal-slider-next-prev-btns .instagram-m-modal-swiper-prev,
.inst-modal-slider-next-prev-btns .instagram-m-modal-swiper-next {
  @apply top-auto !important;
  @apply static !important;
  @apply m-0 !important;
}
.inst-modal-slider-next-prev-btns .instagram-m-modal-swiper-prev {
  @apply ml-4 !important;
  @apply mt-4 !important;
}
.inst-modal-slider-next-prev-btns .instagram-m-modal-swiper-next {
  @apply mr-4 !important;
  @apply mt-4 !important;
}
.closemodal {
  right: 10px;
  top: 1px;
}
.post-images img,
.post-images video {
  max-width: inherit;
  max-height: inherit;
  @apply w-full;
  height: auto;
}
</style>
