import BagCheckoutContainer from "./BagCheckoutContainer";

export default {
  title: "components/BagCheckoutContainer",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagCheckoutContainer },
  template: `<BagCheckoutContainer/>`,
});

export const Basic = Template.bind({});
