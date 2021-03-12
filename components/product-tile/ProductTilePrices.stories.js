import ProductTilePrices from "./ProductTilePrices";

export default {
  title: "components/ProductTilePrices",
  argTypes: {
    price: {
      type: "number",
      control: { type: "number" },
      table: { category: "props", defaultValue: "999" },
      description: "product price",
      defaultValue: "999",
    },
    compareAtPrice: {
      type: "number",
      control: { type: "number" },
      table: { category: "props", defaultValue: "1199" },
      description: "strike through product price",
      defaultValue: "1199",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProductTilePrices },
  template: `<ProductTilePrices :price="price" :compare-at-price="compareAtPrice"/>`,
});

export const Basic = Template.bind({});
