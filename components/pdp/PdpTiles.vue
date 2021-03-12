<template>
  <div class="flex flex-wrap -mx-1">
    <div v-for="[size, price] of tiles" :key="size" class="p-1 w-1/2">
      <button
        :class="{ 'active-tile': selectedTile === size }"
        type="button"
        class="border border-gray-500 p-4 w-full flex flex-col items-center justify-center text-black hover:bg-gray-300"
      >
        <h3 class="text-base mb-2 uppercase">{{ size }}</h3>
        <h5 class="text-lg">{{ price | formatCurrency }}</h5>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tiles: { type: Array, default: () => [] },
    selectedTile: { type: String, default: () => "Single" },
  },
};
</script>

<style lang="postcss" scoped>
.active-tile {
  @apply bg-gray-500 text-white;
}
</style>
