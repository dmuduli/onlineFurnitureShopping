<template>
  <cms-link :field="field.blog_link">
    <div class="mb-6 relative min-h-64 lg:min-h-72 bg-white">
      <cms-image :field="getImageField(field)" class="w-full" />
    </div>
    <cms-rich-text
      :field="field.blog_link.title"
      class="lg:text-3xl text-xl font-normal leading-9 text-black mb-4"
    />
    <cms-rich-text
      :field="getTextField(field)"
      class="w-full font-para leading-6 text-base text-gray-700 mb-8 four-line-clamp"
    />
    <span
      class="border-b-2 border-gray-500 text-sm inline-block leading-normal font-medium text-gray-900 uppercase"
    >
      Read More
    </span>
  </cms-link>
</template>

<script>
export default {
  props: {
    field: { type: Object, default: () => {} },
    getImageField: { type: Function, required: true },
    getTextField: { type: Function, required: true },
  },
};
</script>
