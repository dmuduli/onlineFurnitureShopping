<template>
  <div class="max-w-none" :class="theme">
    <cms-rich-text :field="primary.text" />
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, required: true },
    label: { type: String, default: "" },
  },
  computed: {
    theme() {
      return this.label
        ? `prose prose-${this.label} lg:prose-${this.label}-lg ${this.label}`
        : "prose";
    },
  },
};
</script>
