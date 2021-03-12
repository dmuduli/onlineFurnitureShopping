<template>
  <prismic-embed v-if="field" :field="field" />
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
