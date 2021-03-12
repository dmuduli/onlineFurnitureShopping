<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <div class="text-base font-normal text-gray-700 font-para">
        {{ rating.title }}
      </div>
      <div class="text-base font-normal text-gray-700 font-para">
        {{ rating.averageScore }}/5
      </div>
    </div>
    <div class="mb-8 flex items-center">
      <div
        v-for="index in 5"
        :key="index"
        class="p-2 flex-auto border border-gray-700 mr-1"
        :class="index <= rating.averageScore ? 'bg-gray-700' : 'bg-white'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: { type: Object, default: () => {} },
  },
};
</script>
