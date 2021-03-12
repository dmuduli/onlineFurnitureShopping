import BagItemsContainer from "./BagItemsContainer";

export default {
  title: "components/BagItemsContainer",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagItemsContainer },
  template: `<BagItemsContainer/>`,
});

export const Basic = Template.bind({});
