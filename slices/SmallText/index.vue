<template>
  <div>
    <cms-rich-text class="text-xs text-center m-4" :field="primary.text" />
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
};
</script>

<style></style>
