<template>
  <div class="main-container">
    <cms-link :field="item">
      <div class="overflow-hidden relative">
        <div
          class="image-on-hover absolute bg-black w-full h-full inset-0 hidden z-10 opacity-50"
        ></div>
        <cms-image
          :field="content.banner_bg_image.HomePage"
          class="w-full h-full transition-transform duration-700 transform ease-in-out object-cover"
        />
        <cms-rich-text
          :field="content.paragraph.slice(0, 1)"
          class="caption invisible bg-white border border-gray-200 w-full left-0 absolute p-4 bottom-0 four-clamp hidden h-0 lg:block text-sm"
          style="transition: height 0.5s"
        />
      </div>
      <div
        class="w-full mt-4 relative text-base leading-5 font-medium text-gray-900 uppercase inline-flex items-center"
      >
        <span class="view-detail-link inline-flex items-center">
          <cms-rich-text
            :field="content.title"
            class="border-gray-500 border-b-2 text-sm leading-6 view-details-text"
          />
          <svg-icon-right-arrow class="w-4 h-4 invisible view-detail-arrow" />
        </span>
      </div>
    </cms-link>
  </div>
</template>

<script>
import path from "ramda/src/path";
export default {
  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      content: path(["body", [0], "primary"], this.item),
    };
  },
};
</script>
<style lang="postcss">
.main-container .four-clamp p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.main-container:hover .view-detail-link {
  @apply border-brown-100 border-b-2;
}
.main-container:hover .view-details-text {
  @apply border-none !important;
}
.main-container:hover .caption {
  @apply visible z-10 h-32;
}
.main-container:hover .view-detail-arrow {
  @apply visible;
}

.main-container .view-detail-arrow polyline {
  @apply stroke-current text-brown-100;
}

.main-container:hover img {
  @apply -translate-y-1 scale-110;
}

.main-container:hover .img-hover {
  opacity: 0.5;
}

.main-container:hover .image-on-hover {
  @apply block;
}
</style>
