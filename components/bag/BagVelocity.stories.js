import BagVelocity from "./BagVelocity";

export default {
  title: "components/BagVelocity",
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { BagVelocity },
  props: Object.keys(argTypes),
  template: `<div class="w-1/2"><BagVelocity></BagVelocity></div>`,
});

export const Basic = Template.bind({});
