<template>
  <div class="h-12 lg:h-14 mb-4">
    <nuxt-link
      :to="`/products/${handle}?variant=${selectedVariantId}`"
      :title="title"
      class="w-full leading-normal font-normal text-gray-900 text-base lg:text-lg product-title two-line-clamp"
    >
      {{ title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    handle: { type: String, required: true },
    selectedVariantId: { type: [Number, String], required: true },
  },
};
</script>
