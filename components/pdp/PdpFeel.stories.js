import PDPFeel from "./PDPFeel";

export default {
  title: "components/PDPFeel",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPFeel },
  template: `<PDPFeel/>`,
});

export const Basic = Template.bind({});
