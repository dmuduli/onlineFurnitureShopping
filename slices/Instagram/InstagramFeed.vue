<template>
  <app-container>
    <div class="flex flex-wrap -mx-1">
      <div
        v-for="(item, loopIndex) in gallery"
        :key="loopIndex"
        class="w-1/2 lg:w-1/4 px-1 mb-2 lg:mb-0"
      >
        <div
          class="block cursor-pointer relative instagram-image-wrap"
          @click="onImageClick(loopIndex)"
        >
          <div
            class="image-on-hover cursor-pointer absolute bg-black w-full h-full inset-0 hidden z-10 opacity-50 items-center justify-center"
          >
            <icon-instagram class="w-6 h-6 instagram-icon" />
          </div>
          <cms-image :field="getImage(item)" class="w-full" />
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="instagram-modal-wrapper opened z-20 h-full w-full flex justify-center items-center fixed inset-0"
      aria-hidden="true"
      :style="{ top: topBannerHeight + 16 + 'px' }"
    >
      <div
        class="z-30 fixed h-full w-full inset-0 bg-black bg-opacity-75"
        @click="closeModal"
      />
      <instagram-modal
        :gallery="gallery"
        :index="index"
        :primary="primary"
        @close-modal="closeModal"
      />
    </div>
  </app-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { pathOr } from "ramda";

import InstagramModal from "./InstagramModal";

export default {
  components: { "instagram-modal": InstagramModal },

  props: { primary: { type: Object, default: () => {} } },

  data() {
    return {
      showModal: false,
      index: {},
    };
  },

  computed: {
    ...mapGetters({ getInstagram: "home/getInstagramData" }),
    ...mapState({
      topBannerHeight: s => s.app.topBannerHeight,
    }),
    gallery() {
      return this.getInstagram;
    },
  },

  methods: {
    onImageClick(index) {
      this.index = index;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    getImage(item) {
      if (item.data_type == "video" || item.data_type == "carousel") {
        return {
          url: pathOr("", ["cover_images", "medium_resolution"], item),
          alt: item.caption,
        };
      }
      return {
        url: pathOr("", ["images", "medium_resolution"], item),
        alt: item.caption,
      };
    },
  },
};
</script>

<style lang="postcss">
.instagram-modal-wrapper .closemodal {
  right: 10px;
  top: 1px;
}
.instagram-image-wrap:hover .image-on-hover {
  @apply flex;
}
.instagram-icon path {
  fill: #ffffff;
}
</style>
