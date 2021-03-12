<template>
  <div
    class="bg-white flex-shrink-0 flex self-start w-26 h-26 lg:w-40 lg:h-40 mr-4 cart-img"
  >
    <nuxt-link
      :to="pdpUrl"
      class="bg-white flex-shrink-0 flex items-center w-26 h-26 lg:w-40 lg:h-40 mr-4 justify-center"
    >
      <shopify-image v-bind="getOptions" />
    </nuxt-link>
  </div>
</template>

<script>
import { path } from "ramda";
import { getPdpUrl } from "~/utils/shopify-utils";

export default {
  props: {
    lineItem: { type: Object, default: () => {} },
  },
  computed: {
    image() {
      return {
        ...this.variant.image,
        altText: this.variant.image.altText || this.lineItem.title,
      };
    },
    variant() {
      return path(["lineItem", "variant"], this);
    },
    pdpUrl() {
      return getPdpUrl(this.variant.id, this.variant.product.handle);
    },
    getOptions() {
      return {
        image: this.image,
        widths: [160],
        "aspect-ratio": "1:1",
      };
    },
  },
};
</script>

<style scoped lang="postcss">
.cart-img img {
  @apply w-auto max-w-26 max-h-26;
  @screen lg {
    @apply max-w-42 max-h-42;
  }
}
</style>
