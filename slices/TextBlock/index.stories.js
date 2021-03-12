import sliceTextBlock from "./mock.json";

export default { title: "Slices/TextBlock" };

export const TextBlock = () => {
  return {
    template: `<TextBlock :primary="primary" />`,
    props: {
      primary: { type: Object, default: sliceTextBlock.primary },
    },
  };
};
