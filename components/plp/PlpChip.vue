<template>
  <div
    class="px-4 py-2 m-1 bg-white border border-gray-500 inline-flex flex-none items-center justify-between"
  >
    <span class="text-xs text-black font-medium uppercase mr-2">
      {{ label }}
    </span>
    <a :href="href" class="cursor-pointer" @click.prevent="$emit('remove')">
      <svg-icon-remove-circle-outline></svg-icon-remove-circle-outline>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    href: { type: String, required: true },
  },
};
</script>
