import { map, evolve, pick, isEmpty, compose, values, pathOr } from "ramda";

export default {
  methods: {
    getMetaColors(variants) {
      if (isEmpty(variants)) {
        return {};
      }

      const colours = map(
        compose(
          values,
          evolve({
            selectedOptions: pathOr("", ["Colour", "value"]),
          }),
          pick(["selectedOptions", "colourHex", "id"])
        ),
        variants
      );

      // return fromPairs(colours);
      return colours.reduce((result, [colorName, ...rest]) => {
        return { ...result, [colorName]: rest };
      }, {});
    },
  },
};
