<template>
  <div
    class="text-center py-3"
    :style="{ backgroundColor: primary.background_color }"
  >
    <cms-rich-text
      :style="{ color: primary.text_color }"
      :field="primary.text"
    />
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, required: true },
  },
};
</script>
