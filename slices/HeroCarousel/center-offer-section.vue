<template>
  <div
    class="text-center w-full lg:w-auto"
    :class="{ 'mb-16 lg:mb-0': hasMoreSales }"
  >
    <!-- Jump into our second section -->
    <cms-rich-text
      :field="field.title"
      class="text-lg font-medium leading-6 text-white break-inner-text text-shadow"
      :class="[
        { 'mb-3': hasMoreSales },
        { 'mb-3': !noBg && !hasMoreSales },
        { 'mb-0': noBg && !hasMoreSales },
      ]"
    />
    <!-- Spring Sale section -->
    <cms-rich-text
      :field="field.sale_type"
      class="font-BeyondInfinity text-9xl md:text-20 tracking-tighter md:tracking-normal font-normal text-white text-shadow"
      :class="[
        { 'leading-12': hasMoreSales },
        { 'leading-12': !noBg && !hasMoreSales },
        { 'leading-17': noBg && !hasMoreSales },
      ]"
    />
    <!-- red background section -->
    <div
      v-if="field.campaigns[0].sale_items"
      class="mx-auto text-center text-white flex items-center banner-sale-percentage mb-6"
      :class="[
        field.is_gradient
          ? `${field.gradient_direction} ${field.start_color} ${field.end_color}`
          : '',
        { 'w-full sm:w-79 lg:max-w-md': hasMoreSales },
        { 'p-6': hasMoreSales && !noBg },
        { 'w-full sm:w-79 lg:max-w-md p-6': !noBg && !hasMoreSales },
        { 'w-full lg:w-full lg:max-w-2xl': noBg && !hasMoreSales },
      ]"
      :style="getSectionBGStyle(field)"
    >
      <div
        v-for="(campaign, index) of field.campaigns"
        :key="index"
        class="flex items-center m-auto relative"
      >
        <div>
          <!-- save up to section -->
          <cms-rich-text
            :field="campaign.sale_percentage_text"
            class="font-normal text-white uppercase break-inner-text sale-save-text"
            :class="[
              { 'text-19px leading-6': hasMoreSales },
              { 'leading-6 text-19px': !noBg && !hasMoreSales },
              { 'text-4xl leading-12 lg:text-5xl': noBg && !hasMoreSales },
            ]"
          />
          <!-- 50% section -->
          <cms-rich-text
            :field="campaign.sale_percentage"
            class="font-medium text-white break-inner-text capitalize sale-percentage-number"
            :class="[
              { 'text-6xl xl:leading-17': hasMoreSales },
              { 'text-6xl leading-17': !noBg && !hasMoreSales },
              { 'text-6xl lg:text-26 lg:leading-29': noBg && !hasMoreSales },
            ]"
          />
          <!-- on selected mattresses section -->
          <cms-rich-text
            :field="campaign.sale_items"
            class="text-10px font-medium text-white uppercase break-inner-text sale-product-name"
            :class="[
              { 'lg:text-10px': hasMoreSales },
              { 'lg:text-2xl': noBg && !hasMoreSales },
            ]"
          />
        </div>
        <div
          v-if="hasMoreSales && index < field.campaigns.length - 1"
          class="sale-plus-icon text-2xl lg:text-4xl font-normal text-white break-inner-text pl-2 pr-4 absolute lg:relative -right-4 lg:right-auto"
        >
          <p><strong>+</strong></p>
        </div>
      </div>
    </div>
    <!-- shop now button -->
    <app-button
      v-if="field.button_label"
      class="inline-flex px-12 font-bold"
      size="3xl"
      :color="noBg ? 'black' : 'primary'"
      :to="$prismic.asLink(field.button_link)"
      font-weight="normal"
    >
      {{ field.button_label }}
    </app-button>
  </div>
</template>

<script>
import { colors } from "~/colors.config";

export default {
  props: {
    field: { type: Object, default: () => {} },
    noBg: { type: Boolean, default: false },
  },
  computed: {
    hasMoreSales() {
      return this.field.campaigns.length > 1;
    },
  },
  methods: {
    getSectionBGStyle(field) {
      let style = {};
      // simple red background
      // if (!field.is_gradient) {
      style.backgroundColor = field.sale_banner_color || colors.campaign.sale;
      // }
      return style;
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-shadow {
  text-shadow: -2px 3px 4px rgba(0, 0, 0, 0.2);
}
</style>
