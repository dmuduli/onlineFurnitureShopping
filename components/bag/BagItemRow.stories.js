import BagItemRow from "./BagItemRow";

const mocks = {
  title:
    "Slumberland Tapered Button Headboard & Standard Base very long title for example",
  variant: {
    quantity: 7,
    image: {
      originalSrc:
        "https://cdn.shopify.com/s/files/1/2657/7564/products/SNZ1448_oceangrove_bedframe_QS_crossthatch_alt1.jpg?v=1590471791",
    },
    priceV2: {
      amount: "999.0",
    },
    compareAtPriceV2: {
      amount: "1399.0",
    },
    selectedOptions: [
      { name: "Size", value: "Queen" },
      { name: "Colour", value: "Brownwash" },
    ],
  },
};

export default {
  title: "components/BagItemRow",
  argTypes: {
    lineItem: {
      type: "object",
      control: { type: "object" },
      table: { category: "props", defaultValue: mocks },
      description: "line items",
      defaultValue: mocks,
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { BagItemRow },
  props: Object.keys(argTypes),
  template: `<BagProductRow :line-item="lineItem"/>`,
});

export const Basic = Template.bind({});
// Basic.bind({ lineItem: mocks });
