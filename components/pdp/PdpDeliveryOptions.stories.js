import PDPDeliveryOptions from "./PDPDeliveryOptions";

export default {
  title: "components/PDPDeliveryOptions",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPDeliveryOptions },
  template: `<PDPDeliveryOptions/>`,
});

export const Basic = Template.bind({});
