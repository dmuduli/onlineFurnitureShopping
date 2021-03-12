import sliceText from "./mock.json";

export default { title: "Slices/Text" };

export const Text = () => {
  return {
    template: `<Text :primary="primary" />`,
    props: {
      primary: { type: Object, default: sliceText.primary },
    },
  };
};
