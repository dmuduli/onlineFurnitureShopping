<template>
  <div
    class="modal-dialog items-start flex xl:items-center justify-center w-full h-full z-30 transition duration-300 ease-in-out bg-white"
  >
    <desktop-instagram-modal
      :gallery="gallery"
      :index="index"
      :primary="primary"
      :get-image="getImage"
      class="hidden lg:flex"
      @close-modal="closeModal"
    />
    <mobile-instagram-modal
      :gallery="gallery"
      :index="index"
      :primary="primary"
      :get-image="getImage"
      class="block lg:hidden"
      @close-modal="closeModal"
    />
  </div>
</template>

<script>
import DesktopInstagramModal from "./DesktopInstagramModal";
import MobileInstagramModal from "./MobileInstagramModal";

export default {
  components: {
    "desktop-instagram-modal": DesktopInstagramModal,
    "mobile-instagram-modal": MobileInstagramModal,
  },

  props: {
    gallery: { type: Array, default: () => {} },
    index: { type: Number, default: 0 },
    primary: { type: Object, default: () => {} },
  },

  data() {
    return {
      dataIndex: this.index,
      text: {},
      swiperOption: {
        slidesPerGroup: 1,
        slidesPerView: "auto",
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: ".modal-swiper-next",
          prevEl: ".modal-swiper-prev",
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
    clickSwiper(index) {
      if (this.dataIndex == 0 && index == -1) {
        this.dataIndex = this.gallery.length - 1;
      } else {
        this.dataIndex = (this.dataIndex + index) % this.gallery.length;
      }
    },
    getImage(slideVisible) {
      if (slideVisible.data_type == "carousel") {
        return slideVisible.carousel_media.map(image => ({
          url: image.standard_resolution,
          altText: slideVisible.caption,
        }));
      } else {
        return [
          {
            url: slideVisible.images.high_resolution,
            altText: slideVisible.caption,
          },
        ];
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
.modal-dialog {
  width: 96%;
  height: 98vh;
  overflow: auto;
}
@screen lg {
  .modal-dialog {
    max-width: 800px;
    max-height: 500px;
    width: auto;
    height: auto;
  }
}
@screen xxl {
  .modal-dialog {
    max-width: 1000px;
    max-height: 650px;
  }
}
</style>
