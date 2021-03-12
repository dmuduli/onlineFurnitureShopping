import PDPTilesForSize from "./PDPTilesForSize";

export default {
  title: "components/PDPTilesForSize",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPTilesForSize },
  template: `<PDPTilesForSize/>`,
});

export const Basic = Template.bind({});
