<template>
  <app-expansion-panel
    v-if="state && show"
    :item-index="1"
    :open="open"
    class="filters border-b border-gray-500"
  >
    <div slot="title" class="text-sm uppercase text-black">
      {{ label }}
    </div>
    <div class="w-full price-filters">
      <vue-slider
        class="mb-12 text-gray-900"
        :contained="true"
        :min="range.min"
        :max="range.max"
        :value="toValue()"
        :disabled="!canRefine"
        :lazy="true"
        :enable-cross="false"
        :marks="markValue()"
        :tooltip="'active'"
        :use-keyboard="false"
        tooltip-formatter="${value}"
        @change="refine({ min: $event[0], max: $event[1] })"
      >
        <template #process="{ style }">
          <div class="vue-slider-process slider-color" :style="[style]" />
        </template>
        <template #label="{ active, value }">
          <div :class="['vue-slider-mark-label', { active }]">
            $ {{ value }}
          </div>
        </template>
      </vue-slider>
    </div>
  </app-expansion-panel>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectRange } from "instantsearch.js/es/connectors";
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import { formatMoney } from "~/utils/shopify-utils";

export default {
  components: { VueSlider },
  mixins: [createWidgetMixin({ connector: connectRange })],
  props: {
    attribute: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  computed: {
    widgetParams() {
      return { attribute: this.attribute };
    },
    values() {
      const [minValue, maxValue] = this.state.start;
      const { min: minRange, max: maxRange } = this.range;

      return {
        min:
          minValue !== -Infinity && minValue !== minRange
            ? minValue
            : undefined,
        max:
          maxValue !== Infinity && maxValue !== maxRange ? maxValue : undefined,
      };
    },
    range() {
      return this.state.range;
    },
    show() {
      return !(
        this.state.range.min == 0 &&
        this.state.range.min == this.state.range.max
      );
    },
    canRefine() {
      return (
        this.state && Boolean(this.range) && this.range.min !== this.range.max
      );
    },
    open() {
      const [minValue, maxValue] = this.state.start;
      return minValue !== -Infinity || maxValue !== Infinity;
    },
  },
  methods: {
    refine({ min, max }) {
      this.state.instantSearchInstance.helper.setPage(0);
      console.log("MIN MAX REfinement", { min, max });
      this.state.refine([min, max]);
    },
    toValue() {
      let min;
      if (this.values.min == null) {
        min = this.range.min;
      } else {
        // if min selected values, range is less than minimum range values, range
        // then min range will become min selected values, range
        min =
          this.values.min < this.range.min ? this.range.min : this.values.min;
      }

      let max;
      if (this.values.max == null) {
        max = this.range.max;
      } else {
        // if max selected values, range is greater than maximum range values, range
        // then max range will become max selected values, range
        max =
          this.values.max > this.range.max ? this.range.max : this.values.max;
      }
      return [min, max];
    },
    markValue() {
      return {
        [this.range.max]: this.range.max,
        [this.range.min]: this.range.min,
      };
    },
    formatPrice(amount) {
      return formatMoney(amount, "AUD");
    },
  },
};
</script>

<style lang="postcss">
.vue-slider-process.slider-color {
  @apply bg-brown-100;
}
.vue-slider-dot-tooltip-inner {
  background: transparent !important;
  font-size: 12px !important;
  padding: 0px !important;
  color: #000 !important;
  border-color: #9e785b !important;
}
.tooltip-heading h3 {
  @apply text-gray-900 capitalize text-base font-bold leading-6;
}
.tooltip-para p {
  @apply capitalize text-xs leading-5 text-gray-800;
}
.filters .accordion-item {
  @apply leading-6;
}
.price-filters .vue-slider-ltr .vue-slider-mark {
  @apply transform-none;
  width: auto !important;
}
.price-filters
  .vue-slider-ltr
  .vue-slider-mark:nth-child(2)
  .vue-slider-mark-label {
  left: auto !important;
  right: 0;
}
.price-filters .vue-slider-ltr .vue-slider-mark-label {
  @apply left-0 transform-none;
}
</style>
