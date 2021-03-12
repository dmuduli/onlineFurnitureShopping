<template>
  <div class="lg:my-4">
    <cms-rich-text
      v-if="primary.heading"
      class="prose-pages text-black mb-4"
      :field="primary.heading"
    />
    <cms-rich-text
      v-if="primary.paragraph"
      class="mb-4"
      :field="primary.paragraph"
    />
    <image-grid
      v-if="label == 'with-swipper' && isImage"
      :items="items"
    ></image-grid>
    <image-without-swiper
      v-if="label != 'with-swipper' && isImage"
      :items="items"
      :class="{ 'two-column-in-mobile': label == 'two-column-in-mobile' }"
      :flex-basis="flexBasis"
    ></image-without-swiper>
    <video-slider
      v-if="!isImage"
      :primary="primary"
      :fields="fields"
      :label="label"
    />
  </div>
</template>

<script>
import { pathOr, filter, either } from "ramda";
import ImageWithoutSwiper from "./ImageWithoutSwiper";
import ImageGrid from "./ImageGrid";
import calculateFlexBasis from "~/mixins/calculateFlexBasisMixin";
import VideoSlider from "~/slices/VideoSlider/index";

const filterItems = filter(
  either(pathOr(false, ["image"]), pathOr(false, ["video"]))
);

export default {
  components: {
    "image-without-swiper": ImageWithoutSwiper,
    "image-grid": ImageGrid,
    "video-slider": VideoSlider,
  },
  mixins: [calculateFlexBasis],
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
    label: { type: String, default: () => "" },
  },
  computed: {
    items() {
      return filterItems(this.fields);
    },
    isImage() {
      let imageAr = false;
      this.fields.forEach(element => {
        imageAr = element.image != null;
      });
      return imageAr;
    },
  },
};
</script>

<style lang="postcss">
@media (max-width: 767px) {
  .two-column-in-mobile {
    @apply flex-row flex-wrap -mx-2;
  }
  .two-column-in-mobile > div {
    flex-basis: inherit !important;
    @apply w-2/4 px-2;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .two-column-in-mobile {
    @apply flex-row flex-wrap -mx-2 justify-start;
  }
  .two-column-in-mobile > div {
    flex-basis: inherit !important;
    @apply w-1/4 px-2;
  }
}
</style>
