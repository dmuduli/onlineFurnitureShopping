import PDPFeatureTiles from "./PDPFeatureTiles";

export default {
  title: "components/PDPFeatureTiles",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPFeatureTiles },
  template: `<PDPFeatureTiles/>`,
});

export const Basic = Template.bind({});
