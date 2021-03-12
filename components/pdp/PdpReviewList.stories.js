import PDPReviewList from "./PDPReviewList";

export default {
  title: "components/PDPReviewList",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPReviewList },
  template: `<PDPReviewList/>`,
});

export const Basic = Template.bind({});
