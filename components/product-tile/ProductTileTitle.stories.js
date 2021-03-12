import ProductTileTitle from "./ProductTileTitle";

export default {
  title: "components/ProductTileTitle",
  argTypes: {
    title: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "Ptoduct Title" },
      description: "title of product",
      defaultValue: "Ptoduct Title",
    },
    handle: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "product-handle" },
      description: "handle of product",
      defaultValue: "product-handle",
    },
    selectedVariantId: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "123444" },
      description: "variant id",
      defaultValue: "123444",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProductTileTitle },
  template: `<ProductTileTitle :title="title" :handle="handle" :selectedVariantId="selectedVariantId"/>`,
});

export const Basic = Template.bind({});
