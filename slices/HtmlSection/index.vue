<template>
  <!-- eslint-disable vue/no-v-html-->
  <div v-html="$prismic.asText(primary.html)"></div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
};
</script>
