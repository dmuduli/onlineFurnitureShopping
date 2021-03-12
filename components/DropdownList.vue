<template>
  <div
    class="absolute left-0 top-10 w-full shadow border bg-white max-h-64 overflow-y-auto"
  >
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <a
          class="text-base text-gray-900 font-para p-3 block hover:bg-gray-100 cursor-pointer"
          @click="$emit('item-clicked', item)"
        >
          {{ item.description }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
  },
};
</script>
