import PDPBonusOffer from "./PDPBonusOffer";

export default {
  title: "components/PDPBonusOffer",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { PDPBonusOffer },
  template: `<PDPBonusOffer/>`,
});

export const Basic = Template.bind({});
