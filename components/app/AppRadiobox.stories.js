import AppRadiobox from "./AppRadiobox";

export default {
  title: "components/AppRadipbox",
  argTypes: {
    checked: {
      type: "boolean",
      control: { type: "boolean", defaultValue: true },
      default: true,
      description: "checked state",
    },
    label: {
      type: "slot",
      control: { type: "text" },
      description: "label of radiobox",
      defaultValue: "radiobox label",
    },
    value: {
      type: "string",
      control: { type: "text" },
      description: "value of radiobox",
      defaultValue: "radiobox value for clicking on label",
    },
    change: { action: "state changed" },
  },
};

const Template = (args, { argTypes }) => ({
  components: { AppRadiobox },
  props: Object.keys(argTypes),
  template:
    '<AppRadiobox :checked="checked" @change="change">{{label}}</AppRadiobox>',
});

export const Basic = Template.bind({});
Basic.args = { checked: false };

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Label = Template.bind({});
Label.args = { checked: true, label: "My label" };
