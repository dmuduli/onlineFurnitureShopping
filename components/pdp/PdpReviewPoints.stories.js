import PDPReviewPoints from "./PDPReviewPoints";

export default {
  title: "components/PDPReviewPoints",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPReviewPoints },
  template: `<PDPReviewPoints/>`,
});

export const Basic = Template.bind({});
