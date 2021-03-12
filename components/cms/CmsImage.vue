<template>
  <prismic-image v-if="field" :field="modifiedField" />
</template>

<script>
import { evolve } from "ramda";

export default {
  props: {
    field: {
      required: true,
      validator: v => v == null || typeof v == "object",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    fit: {
      type: String,
      default: "",
    },
    crop: {
      type: String,
      default: "",
    },
  },
  computed: {
    modifiedField() {
      return evolve({
        url: x =>
          `${
            x +
            (this.width ? "&w=" + this.width : "") +
            (this.height ? "&h=" + this.height : "") +
            (this.fit ? "&fit=" + this.fit : "") +
            (this.crop ? "&crop=" + this.crop : "")
          }`,
      })(this.field);
    },
  },
};
</script>
