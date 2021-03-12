import PDPAddToCart from "./PDPAddToCart";

export default {
  title: "components/PDPAddToCart",
  argTypes: {
    addToCart: {
      action: "added to the cart",
      table: { category: "events" },
      description:
        "On clicking Add to Cart, product should be added to the cart",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PDPAddToCart },
  template: `<PDPAddToCart @add-to-cart="addToCart"/>`,
});

export const Basic = Template.bind({});
