<template>
  <div
    class="lg:absolute relative rounded-full w-36 h-36 xl:w-56 xl:h-56 p-6 shadow flex flex-col items-center justify-center self-start rounded-offer-section"
    :class="[
      field.is_gradient1
        ? `${field.gradient_direction1} ${field.start_color1} ${field.end_color1}`
        : '',
    ]"
    :style="getSectionBGStyle(field)"
  >
    <!-- plus section -->
    <cms-rich-text
      :field="field.information_title"
      class="font-BeyondInfinity text-4xl xl:text-20 leading-15 font-normal text-white absolute offer-header capitalize"
    />
    <template v-if="field.is_gradient1">
      <!-- go in the draw to section -->
      <cms-rich-text
        :field="field.information_instruction"
        class="text-sm xl:text-2xl text-center font-normal text-white uppercase break-inner-text"
      />
      <!-- win section -->
      <cms-rich-text
        :field="field.information_instruction_second"
        class="text-sm xl:text-2xl text-center font-normal text-white break-inner-text uppercase"
      />
      <!-- 1 million section -->
      <cms-rich-text
        :field="field.information_instruction_third"
        class="text-sm xl:text-2xl text-center font-normal text-white uppercase break-inner-text"
      />
    </template>
    <template v-else>
      <!-- go in the draw to section -->
      <cms-rich-text
        :field="field.information_instruction"
        class="leading-6 text-2xs xl:text-xs text-center font-normal text-white uppercase break-inner-text"
      />
      <!-- win section -->
      <cms-rich-text
        :field="field.information_instruction_second"
        class="text-4xl xl:text-6xl text-center font-medium text-white break-inner-text leading-5 xl:leading-10 my-2 uppercase"
      />
      <!-- 1 million section -->
      <cms-rich-text
        :field="field.information_instruction_third"
        class="text-sm xl:text-2xl text-center font-normal text-white uppercase break-inner-text"
      />
    </template>
    <!-- velocity points section -->
    <cms-rich-text
      :field="field.information_instruction_four"
      class="leading-6 text-2xs xl:text-xs text-center font-normal text-white uppercase break-inner-text"
    />
  </div>
</template>

<script>
import { colors } from "~/colors.config";

export default {
  props: {
    field: { type: Object, default: () => {} },
  },
  methods: {
    getSectionBGStyle(field) {
      let style = {};
      // simple red background
      // if (!field.is_gradient1) {
      style.backgroundColor =
        field.plus_background_color || colors.campaign.sale;
      // }

      return style;
    },
  },
};
</script>

<style lang="postcss" scoped>
.rounded-offer-section {
  top: 0;
  right: -55%;
}
.offer-header {
  top: -1.2rem;
  left: 1.5rem;
}
@screen lg {
  .rounded-offer-section {
    right: -46%;
  }
  .offer-header {
    top: -1.5rem;
  }
}
@screen xl {
  .rounded-offer-section {
    right: -73%;
  }
  .offer-header {
    top: -0.5rem;
  }
}
</style>
