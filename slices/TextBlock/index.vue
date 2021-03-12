<template>
  <div class="prose">
    <cms-rich-text :field="primary.sub_title" />
    <cms-rich-text :field="primary.paragraph" />
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, required: true },
  },
};
</script>
