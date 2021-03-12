<template>
  <div class="flex justify-center mb-6">
    <div class="relative text-center">
      <img :src="imgSrc" alt="Product dimensions" />
      <span class="absolute dim-height"> {{ height }}cm </span>
      <span>{{ width }}cm</span>
      <span class="absolute dim-depth"> {{ depth }}cm </span>
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";

export default {
  props: {
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    depth: { type: String, default: "" },
  },
  computed: {
    imgSrc() {
      return pathOr(
        "",
        ["state", "siteConfig", "pdp", "dimensionPlaceholderImg"],
        this.$store
      );
    },
  },
};
</script>

<style scoped>
.dim-height {
  left: -50px;
  bottom: 33px;
}
.dim-depth {
  right: -60px;
  bottom: 45px;
}
</style>
