<template>
  <div class="m-auto flex flex-col md:flex-row items-center lg:pb-4 mb-4 mt-8">
    <div
      class="lg:flex-1 w-full md:w-1/2 mb-6 lg:mb-0"
      :class="{
        'order-1 md:ml-8 mr-0': isRight,
        'md:mr-8': !isRight,
      }"
    >
      <cms-image :field="primary.image" class="w-full" />
      <cms-embed
        v-if="primary.video"
        class="w-full h-full iframe-video my-6 lg:my-0"
        :field="primary.video"
      />
    </div>
    <div class="w-full md:w-1/2">
      <cms-image :field="primary.optional_icon" />
      <cms-rich-text
        class="w-full prose prose-pages max-w-none"
        :field="primary.subtitle"
      />
      <div class="w-full prose prose-pages max-w-none">
        <cms-rich-text :field="primary.paragraph" />
      </div>
      <icon-gallery class="icon-gallery" :fields="fields" />
      <!-- shop now button -->
      <div class="mt-4">
        <cms-link
          v-if="primary.button_label && primary.button_link"
          class="px-10 inline-flex transition-colors duration-500 ease-in-out leading-5 text-white text-xs block md:inline-block text-center p-3 uppercase bg-gray-500 font-normal hover:bg-gray-700"
          :class="primary.optional_button_color"
          :field="primary.button_link"
          font-weight="font-normal"
        >
          {{ primary.button_label }}
        </cms-link>
      </div>
    </div>
  </div>
</template>

<script>
import IconGallery from "~/slices/IconGallery/index";

export default {
  components: { "icon-gallery": IconGallery },
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
  },
  computed: {
    isRight() {
      return this.primary.media_alignment.toLowerCase() === "right";
    },
  },
};
</script>

<style lang="postcss">
@screen md {
  .icon-gallery {
    @apply justify-between !important;
  }
}
</style>
