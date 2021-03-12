<template>
  <div
    v-scrollanimation
    class="flex flex-col md:flex-row border-t border-b border-gray-500 my-8"
  >
    <div
      class="w-full md:w-1/2 prose prose-store max-w-none lg:border-r border-gray-500 py-8 pr-8 mr-8 animated animatedFadeInUp fadeInUp duration-1000"
    >
      <cms-rich-text :field="primary.title" />
      <cms-rich-text :field="primary.links_field" />
    </div>
    <div
      class="w-full md:w-1/2 py-8 prose prose-store max-w-none animated animatedFadeInUp fadeInUp duration-1000"
    >
      <cms-rich-text :field="primary.customer_support_title" />
      <cms-rich-text :field="primary.customer_support_detail" />
      <a
        class="md:px-10 px-4 transition-colors duration-500 ease-in-out leading-5 text-white text-sm inline-block text-center p-3 bg-gray-500 font-normal hover:bg-gray-700"
        target="_blank"
        :href="`mailto:${primary.email_to}`"
        >{{ primary.link_name }}</a
      >
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
