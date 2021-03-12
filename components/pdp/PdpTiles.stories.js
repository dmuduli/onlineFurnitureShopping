import PDPTiles from "./PDPTiles";

export default {
  title: "components/PDPTiles",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPTiles },
  template: `<PDPTiles/>`,
});

export const Basic = Template.bind({});
