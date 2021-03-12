<template>
  <div class="w-full mb-6">
    <cms-image :field="primary.image" class="m-auto" />
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, required: true },
  },
};
</script>
