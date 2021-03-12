export default {
  computed: {
    flexBasis() {
      let totalItems = this.fields.length;
      if (this.label == "without-padding") {
        return { "flex-basis": 100 / totalItems + "%" };
      } else {
        return {
          "flex-basis": (100 - (totalItems - 1) * 3) / totalItems + "%",
        };
      }
    },
  },
};
