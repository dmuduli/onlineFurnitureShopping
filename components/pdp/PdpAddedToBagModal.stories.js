import PDPAddedToBagModal from "./PDPAddedToBagModal";

export default {
  title: "components/PDPAddedToBagModal",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPAddedToBagModal },
  template: `<PDPAddedToBagModal/>`,
});

export const Basic = Template.bind({});
