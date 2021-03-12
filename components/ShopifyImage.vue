<template>
  <img
    v-if="image.src"
    :srcset="getSrcSet()"
    :sizes="sizes"
    class="w-full"
    :alt="image.altText"
  />
</template>

<script>
export default {
  props: {
    image: { type: Object, default: () => {} },
    widths: { type: Array, default: () => [] },
    sizes: { type: String, default: "" },
    cropTop: { type: Boolean, default: false },
    aspectRatio: { type: String, default: "none" },
  },
  methods: {
    getSrcSet() {
      return this.widths.map(w => this.getModifiedSrc(w));
    },
    getModifiedSrc(width) {
      let url;
      if (this.image.src == null) {
        url =
          "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABBCAQAAACNislaAAAATUlEQVR42u3PAQ0AAAwCoNs/tO/hoAFpb0JEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREpiMP85KBwEiuOPgAAAAASUVORK5CYII=";
      } else {
        let dimRegex = /_\d+x\d+/gi;
        if (dimRegex.test(this.src)) {
          // for image path which already resized
          return this.image.src.replace(
            dimRegex,
            `_${this.width}x${this.width}`
          );
        } else {
          const height = this.aspectRatio == "none" ? "auto" : width;
          url = `${this.image.src.substr(
            0,
            this.image.src.lastIndexOf(".")
          )}_${width}x${height}${
            this.cropTop === true ? "_crop_top" : ""
          }${this.image.src.substr(this.image.src.lastIndexOf("."))}`;
        }
      }
      return `${url} ${width}w`;
    },
  },
};
</script>
