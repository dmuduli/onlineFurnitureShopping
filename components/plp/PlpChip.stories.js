import PLPChip from "./PLPChip";

export default {
  title: "components/PLPChip",
  argTypes: {
    label: {
      type: "string",
      control: { type: "text" },
      table: { category: "label" },
      required: true,
      description: "label of the checkbox",
    },
    remove: { action: "removed" },
  },
};

const Template = (args, { argTypes }) => ({
  components: { PLPChip },
  props: Object.keys(argTypes),
  template: '<PLPChip :label="label" @remove="remove"></PLPChip>',
});

export const Basic = Template.bind({});
Basic.args = { label: "My Chip" };
