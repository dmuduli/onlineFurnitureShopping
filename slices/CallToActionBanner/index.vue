<template>
  <div
    class="static-page-wrapper mb-4 lg:mb-10 flex items-center justify-center py-10"
    :class="primary.bgColor"
    :style="{
      backgroundImage: 'url(' + bannerImage + ')',
      minHeight: '16rem',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }"
  >
    <div class="text-center px-4 lg:px-0">
      <cms-rich-text
        :field="primary.subtitle"
        class="text-2xl lg:text-4xl font-medium mb-4 text-center"
        :class="primary.text_color"
      />
      <cms-rich-text
        :field="primary.paragraph"
        class="text-base font-normal text-center mb-6"
        :class="primary.text_color"
      />
      <div v-if="primary.button_link" class="w-full">
        <cms-link
          :field="primary.button_link"
          class="px-10 inline-flex transition-colors duration-500 ease-in-out leading-5 text-brown-300 text-sm lg:text-xl block md:inline-block text-center p-3 uppercase bg-gray-400 font-bold hover:bg-gray-700 hover:text-white"
        >
          {{ primary.button_label }}
        </cms-link>
      </div>
      <!-- optinal field -->
      <div>
        <div v-if="primary.optional_call" class="my-4">
          <span
            class="px-10 bg-teal-800 border-teal-800 text-white font-normal block md:inline-block text-center p-3"
          >
            {{ primary.optional_call }}
          </span>
        </div>
        <div v-if="primary.optional_email" class="my-4">
          <span
            class="px-10 bg-white border border-white text-teal-800 font-normal block md:inline-block text-center p-3"
          >
            {{ primary.optional_email }}
          </span>
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
  computed: {
    bannerImage() {
      return this.primary.optional_image &&
        this.primary.optional_image.url != null
        ? this.primary.optional_image.url
        : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
@media screen and (max-width: 768px) {
  .static-page-wrapper {
    height: auto;
  }
}
@media screen and (min-width: 1024px) {
  .static-page-wrapper {
    background-size: cover;
  }
}
</style>
