<template>
  <div class="py-4">
    <div class="text-gray-700 font-medium">{{ title }}</div>
    <div v-if="subtitle" class="text-gray-700">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
  },
};
</script>
