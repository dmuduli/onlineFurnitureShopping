<template>
  <div v-scrollanimation class="flex flex-col md:flex-row">
    <div
      class="w-full md:w-1/2 md:pr-6 mb-8 md:mb-0 animated animatedFadeInUp fadeInUp duration-1000 border-t border-gray-500 pt-8"
    >
      <cms-rich-text
        class="text-2xl text-gray-900 font-medium mb-4"
        :field="primary.title"
      />
      <cms-rich-text
        class="text-sm text-gray-900 mb-4"
        :field="primary.description"
      />
      <cms-link
        v-if="primary.link"
        :field="primary.link"
        class="md:px-10 px-4 transition-colors duration-500 ease-in-out leading-5 text-white text-sm inline-block text-center p-3 bg-gray-500 font-normal hover:bg-gray-700"
      >
        {{ primary.link_name }}
      </cms-link>
    </div>
    <div
      v-if="primary.banner_image"
      class="w-full md:w-1/2 min-h-45 md:min-h-70 pl-4 pt-4 pb-4 lg:pb-0 md:pl-8 md:pt-8 bg-no-repeat animated animatedFadeInUp fadeInUp duration-1000"
      :style="`
        background-image: url('${primary.banner_image.url}');
        background-position: right;
      `"
    >
      <div class="text-content here-to-help w-1/2 xl:pl-6">
        <cms-rich-text
          class="text-2xl text-gray-900 font-medium mb-4"
          :field="primary.banner_title"
        />
        <cms-rich-text
          class="text-sm text-gray-900"
          :field="primary.banner_description"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    primary: { type: Object, default: () => {}, required: true },
  },
};
</script>
