<template>
  <div class="accordion-section mb-10">
    <cms-rich-text
      v-if="primary.accordian_title"
      :field="primary.accordian_title"
      name="title"
      class="block w-full font-sans prose-pages text-black text-center p-5"
    />
    <div v-for="(item, index) in fields" :key="index">
      <accordion-item
        v-if="item.item_title"
        :item="item"
        :open="open === index"
        :label="label"
        @click.native="clickHandler(index)"
      />
    </div>
  </div>
</template>

<script>
import AccordionItem from "./AccordionItem";

export default {
  components: {
    "accordion-item": AccordionItem,
  },
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
    label: { type: String, default: () => "" },
  },

  data: () => ({ open: false }),

  methods: {
    clickHandler(index) {
      this.open = this.open === index ? null : index;
    },
  },
};
</script>
