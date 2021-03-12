<template>
  <app-expansion-panel
    v-if="state && state.items.length"
    :item-index="1"
    class="border-b border-gray-500"
    :open="open"
  >
    <div slot="title" class="text-black text-sm uppercase">
      {{ label }}
    </div>
    <div v-if="state.canRefine" class="w-full pb-4">
      <div v-for="item of state.items" :key="item.value">
        <app-checkbox
          v-if="checkbox"
          :class="{ 'text-gray-800': item.isRefined }"
          :checked="Boolean(item.isRefined)"
          @change="state.refine(item.value)"
        >
          <span class="text-sm leading-5 text-gray-800 font-para">
            {{ item.label }} ({{ item.count }})</span
          >
        </app-checkbox>
        <app-radiobox
          v-else
          class="flex items-center mb-3 text-gray-900"
          :class="{ 'text-gray-800': item.isRefined }"
          :default-value="item.value"
          :selected="Boolean(item.isRefined) == true ? item.value : ''"
          @change="state.refine(item.value)"
        >
          <span class="text-sm leading-5 text-gray-800 font-para">
            {{ item.label }} ({{ item.count }})
          </span>
        </app-radiobox>
      </div>
    </div>
  </app-expansion-panel>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectRefinementList } from "instantsearch.js/es/connectors";

export default {
  mixins: [createWidgetMixin({ connector: connectRefinementList })],
  props: {
    attribute: { type: String, required: true },
    sortBy: { type: [Function, Array], required: true },
    operator: { type: String, default: "or" },
    label: { type: String, default: "" },
    checkbox: { type: Boolean, default: true },
  },
  computed: {
    widgetParams() {
      return {
        attribute: this.attribute,
        sortBy: this.sortBy,
        operator: this.operator,
      };
    },
    open() {
      return this.state.items.some(item => item.isRefined);
    },
  },
  methods: {
    refine(v) {
      this.state.refine(v);
    },
  },
};
</script>
