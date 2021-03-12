import BagSharingModal from "./BagSharingModal";

export default {
  title: "components/BagSharingModal",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagSharingModal },
  template: `<BagSharingModal/>`,
});

export const Basic = Template.bind({});
