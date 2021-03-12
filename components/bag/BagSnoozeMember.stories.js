import BagSnoozeMember from "./index";

export default {
  title: "components/BagSnoozeMember",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagSnoozeMember },
  props: Object.keys(argTypes),
  template: "<BagSnoozeMember></BagSnoozeMember>",
});

export const Basic = Template.bind({});
