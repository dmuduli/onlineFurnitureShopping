<template>
  <prismic-link v-if="field" :field="field">
    <slot></slot>
  </prismic-link>
  <div v-else></div>
</template>

<script>
export default {
  props: {
    field: {
      required: true,
      validator: v => v == null || typeof v == "object",
    },
  },
};
</script>
