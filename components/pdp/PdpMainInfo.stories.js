import PDPMainInfo from "./PDPMainInfo";

export default {
  title: "components/PDPMainInfo",
  argTypes: {
    title: {
      type: "text",
      control: { type: "text", defaultValue: "Some title" },
      table: { category: "props" },
      description: "title of the product",
      defaultValue: "Some title",
    },
    varinatTitle: {
      type: "text",
      control: { type: "text", defaultValue: "King Size" },
      table: { category: "props" },
      description: "title of the product variant",
      defaultValue: "King Size",
    },
    sku: {
      type: "text",
      control: { type: "text", defaultValue: "SNZ-28645" },
      table: { category: "props" },
      description: "SKU of the product variant",
      defaultValue: "SNZ-28645",
    },
    productReview: {
      type: "text",
      control: {
        type: "text",
        defaultValue: { reviews_average: 3.4, reviews_count: 2344 },
      },
      table: { category: "props" },
      description: "Review of the product",
      defaultValue: { reviews_average: 3.4, reviews_count: 2344 },
    },
    compareAtPrice: {
      type: "text",
      control: { type: "text", defaultValue: "122.34" },
      table: { category: "props" },
      description: "CompateAtPrice the product variant",
      defaultValue: "122.34",
    },
    price: {
      type: "text",
      control: { type: "text", defaultValue: "152.34" },
      table: { category: "props" },
      description: "Price the product variant",
      defaultValue: "152.34",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PDPMainInfo },
  template: `<PDPMainInfo :title="title" :varinat-title="varinatTitle" :sku="sku" :product-review="productReview" :compare-at-price="compareAtPrice" :price="price"/>`,
});

export const Basic = Template.bind({});
