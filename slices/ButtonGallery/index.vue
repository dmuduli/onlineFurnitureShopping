<template>
  <app-container class="flex justify-between md:justify-center">
    <div v-for="(item, index) in fields" :key="index" class="mx-2">
      <cms-link v-if="item.button_link" :field="item.button_link">
        <span
          v-if="item.button_label"
          class="transition-colors duration-500 ease-in-out leading-5 text-white text-xs block md:inline-block text-center p-3 uppercase bg-gray-500 font-normal hover:bg-gray-700 px-6 mt-4 self-start"
          >{{ item.button_label }}</span
        >
      </cms-link>
    </div>
  </app-container>
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
