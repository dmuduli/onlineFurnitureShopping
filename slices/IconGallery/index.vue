<template>
  <div class="flex justify-between md:justify-center pt-6">
    <div v-for="(item, index) in fields" :key="index" class="mx-2">
      <cms-link v-if="item.icon_link" :field="item.icon_link">
        <cms-image :field="item.icon" />
      </cms-link>
      <cms-image v-else :field="item.icon" />
    </div>
  </div>
</template>

<script>
import calculateFlexBasis from "~/mixins/calculateFlexBasisMixin";
export default {
  mixins: [calculateFlexBasis],
  props: {
    fields: { type: Array, default: () => [] },
  },
};
</script>
