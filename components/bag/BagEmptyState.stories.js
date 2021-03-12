import BagEmptyState from "./BagEmptyState";

export default {
  title: "components/BagEmptyState",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagEmptyState },
  template: `<BagEmptyState/>`,
});

export const Basic = Template.bind({});
