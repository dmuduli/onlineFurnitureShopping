<template>
  <div class="flex items-center flex-wrap lg:mb-6 -mx-1 lg:-mx-4">
    <div
      v-for="option of selectedOptions"
      :key="`${option.name}${option.value}`"
      class="inline-flex items-center font-para text-xs text-gray-600 px-1 leading-normal lg:px-4"
    >
      {{ option.name }}:
      <strong class="ml-2">{{ option.value }}</strong>
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";

export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  computed: {
    selectedOptions() {
      return pathOr([], ["lineItem", "variant", "selectedOptions"], this);
    },
  },
};
</script>
