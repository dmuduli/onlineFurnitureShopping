<template>
  <div class="flex flex-col lg:flex-row">
    <div class="flex">
      <div class="flex flex-col m-auto lg:flex-row bg-white w-full h-full">
        <div
          class="post-images w-auto flex items-center justify-center relative overflow-hidden"
        >
          <video
            v-if="slideVisible.data_type == 'video'"
            playsinline
            autoplay
            muted
            controls
            :src="slideVisible.video"
            class="w-screen h-screen"
          />
          <carousel-image
            v-else
            ref="carousel-image"
            :images="getImage(slideVisible)"
          />
        </div>
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
                {{ slideVisible.username }}
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
          class="product-swiper-prev border-none left-8 lg:left-28 -mt-10"
          type="prev"
          size="small"
          @click.native="clickSwiper(-1)"
        />
        <swiper-nav
          slot="button-next"
          class="product-swiper-next border-none right-8 lg:right-28 -mt-10"
          size="small"
          type="next"
          @click.native="clickSwiper(+1)"
        />
      </div>
      <p class="p-6 text-base modal-content-section">
        {{ slideVisible.caption }}
      </p>
      <div class="border-t border-gray-300 p-3 text-xs text-gray-700">
        <span class="cursor-pointer" @click="viewOnInstagram">
          View on Instagram
        </span>
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
    clickSwiper(index) {
      this.$refs["carousel-image"].imageIndex = 0;
      if (this.dataIndex == 0 && index == -1) {
        this.dataIndex = this.gallery.length - 1;
      } else {
        this.dataIndex = (this.dataIndex + index) % this.gallery.length;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.inst-modal-slider-next-prev-btns .product-swiper-prev,
.inst-modal-slider-next-prev-btns .product-swiper-next {
  @apply top-auto !important;
  @apply static !important;
  @apply m-0 !important;
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
}
.modal-body {
  @apply w-full;
}
.swiper {
  @apply w-full;
}
@screen lg {
  .post-images img,
  .post-images video {
    max-width: 500px;
    max-height: 500px;
    @apply w-auto;
  }
  .modal-content-section {
    max-height: 325px;
    @apply overflow-auto;
  }
  .modal-body {
    width: 300px;
    min-width: 300px;
  }
  .swiper {
    @apply w-auto;
  }
}
@screen xxl {
  .post-images img,
  .post-images video {
    max-width: 650px;
    max-height: 650px;
  }
  .modal-body {
    width: 350px;
    min-width: 350px;
  }
  .modal-content-section {
    max-height: 580px;
  }
}
</style>
