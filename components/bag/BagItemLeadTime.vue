<template>
  <div
    v-if="leadTimeText"
    class="flex items-center bg-blue-200 mt-2 px-2 py-4 lg:px-4"
  >
    <svg-icon-info />
    <p class="text-sm text-gray-900 ml-2">
      {{ leadTimeText }}
    </p>
  </div>
</template>

<script>
import { path } from "ramda";

export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  computed: {
    leadTimeText() {
      return path(["variant", "lead_time_text", "value"], this.lineItem);
    },
  },
};
</script>
