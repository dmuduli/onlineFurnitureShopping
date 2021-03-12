<template>
  <div class="relative random-class">
    <div
      class="cursor-pointer absolute right-4 lg:right-8 bottom-4 lg:bottom-8 z-10"
      @click="showModal = true"
    >
      <svg-icon-search-plus />
    </div>
    <div
      v-if="showModal"
      class="instagram-modal-wrapper opened z-20 h-full w-full flex justify-center items-center fixed inset-0"
      aria-hidden="true"
    >
      <!-- Overlay modal -->
      <div
        class="z-30 fixed h-full w-full inset-0 bg-black bg-opacity-75"
        @click="showModal = false"
      />
      <div
        class="modal-dialog relative p-3 md:p-4 xl:p-6 flex w-full z-30 transition duration-300 ease-in-out bg-white"
      >
        <div
          class="closemodal text-2xl z-30 absolute cursor-pointer"
          aria-hidden="true"
          @click="showModal = false"
        >
          &times;
        </div>
        <div v-swiper="swiperOptions" class="swiper overflow-x-hidden w-full">
          <div class="swiper-wrapper">
            <div
              v-for="(image, index) of images"
              :key="index"
              class="swiper-slide"
            >
              <pdp-image-zoomer
                :img-normal="image"
                :scale="2"
                :alt-text="'product'"
              />
            </div>
          </div>
          <div v-if="hasMoreImages" class="flex justify-between">
            <swiper-nav
              slot="button-prev"
              class="pdp-modal-image-button-prev border-none left-8 xl:left-16 -mt-10"
              type="prev"
              size="small"
            />
            <swiper-nav
              slot="button-next"
              class="pdp-modal-image-button-next border-none right-8 xl:right-16 -mt-10"
              size="small"
              type="next"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: { type: Array, required: true },
  },
  data: () => ({ showModal: false }),
  computed: {
    hasMoreImages() {
      return this.images.length > 1;
    },
    swiperOptions() {
      return !this.hasMoreImages
        ? {}
        : {
            autoHeight: true,
            slidesPerGroup: 1,
            slidesPerView: "auto",
            loop: true,
            nested: true,
            loopFillGroupWithBlank: false,
            navigation: {
              nextEl: ".pdp-modal-image-button-next",
              prevEl: ".pdp-modal-image-button-prev",
            },
          };
    },
  },
};
</script>

<style lang="postcss" scoped>
.closemodal {
  right: 4px;
  top: -4px;
}
.modal-dialog {
  width: 96%;
  overflow: auto;
  top: 30px;
}
@screen lg {
  .modal-dialog {
    width: 550px;
  }
  .closemodal {
    right: 4px;
    top: -6px;
  }
}
@screen xl {
  .modal-dialog {
    width: 800px;
  }
  .closemodal {
    right: 10px;
    top: 0px;
  }
}
</style>
