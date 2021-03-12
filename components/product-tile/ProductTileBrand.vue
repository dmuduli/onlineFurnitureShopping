<template>
  <h5
    v-if="metafields && metafields.brand_list"
    class="font-bold text-black text-xs uppercase mb-2"
  >
    {{ metafields.brand_list[0] }}
  </h5>
</template>

<script>
export default {
  props: {
    metafields: { type: Object, default: () => {} },
  },
};
</script>
