import PDPFeatureAccordian from "./PDPFeatureAccordian";

export default {
  title: "components/PDPFeaturesAccordian",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPFeatureAccordian },
  template: `<PDPFeatureAccordian/>`,
});

export const Basic = Template.bind({});
