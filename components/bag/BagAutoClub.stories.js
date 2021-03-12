import BagAutoClub from "./BagAutoClub";

export default {
  title: "components/BagAutoClub",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagAutoClub },
  props: Object.keys(argTypes),
  template: `<div class="w-1/2"><BagAutoClub></BagAutoClub></div>`,
});

export const Basic = Template.bind({});
