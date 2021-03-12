<template>
  <prismic-rich-text
    v-if="field"
    :html-serializer="htmlSerializer"
    :field="field"
    :wrapper="wrapper"
  />
  <div v-else></div>
</template>

<script>
export default {
  props: {
    field: { required: true, validator: v => v == null || Array.isArray(v) },
    htmlSerializer: { type: Function, default: () => null },
    wrapper: { type: String, required: false, default: "div" },
  },
};
</script>

<style lang="postcss">
.super-script {
  position: relative;
  top: -0.5em;
  font-size: 80%;
}
</style>
