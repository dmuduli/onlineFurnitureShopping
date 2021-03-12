import PDPTilesForColor from "./PDPTilesForColor";

const optionsMock = {
  name: "Colour",
  values: ["Rebecca Purple", "White", "Black"],
};

export default {
  title: "components/PDPTilesForColor",
  argTypes: {
    metaColors: {
      type: "object",
      control: { type: "object" },
      table: {
        category: "props",
        defaultValue: { "Rebecca Purple": "#663399" },
      },
      description: "meta colours",
      defaultValue: { "Rebecca Purple": "#663399" },
    },
    options: {
      type: "array",
      control: { type: "array" },
      table: { category: "props", defaultValue: optionsMock },
      description: "color options",
      defaultValue: optionsMock,
    },
    initSelectedColor: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "Rebecca Purple" },
      defaultValue: "Rebecca Purple",
    },
    handleVariantSelect: {
      type: "string",
      control: { type: "text" },
      table: { category: "props" },
      description: "nuxt link",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { PDPTilesForColor },
  template: `<PDPTilesForColor :meta-colors="metaColors" :options="options" :initSelectedColor="initSelectedColor" :handleVariantSelect="handleVariantSelect"/>`,
});

export const Basic = Template.bind({});
