<template>
  <div>
    <h1 class="text-sm lg:text-18px leading-6 text-gray-900 font-normal mb-2">
      {{ lineItem.title }}
    </h1>
    <p class="text-xs text-gray-700 mb-4">
      {{ lineItem.variant.sku }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
};
</script>
