import PDPStickyHeader from "./PDPStickyHeader";

export default {
  title: "components/PDPStickyHeader",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPStickyHeader },
  template: `<PDPStickyHeader/>`,
});

export const Basic = Template.bind({});
