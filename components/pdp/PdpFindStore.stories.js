import PDPFindStore from "./PDPFindStore";

export default {
  title: "components/PDPFindStore",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPFindStore },
  template: `<PDPFindStore/>`,
});

export const Basic = Template.bind({});
