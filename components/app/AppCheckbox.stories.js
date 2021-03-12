import AppCheckbox from "./AppCheckbox";

export default {
  title: "components/AppCheckbox",
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
      description: "label of checkbox",
      defaultValue: "checkbox label",
    },
    change: { action: "state changed" },
  },
};

const Template = (args, { argTypes }) => ({
  components: { AppCheckbox },
  props: Object.keys(argTypes),
  template:
    '<AppCheckbox :checked="checked" @change="change">{{label}}</AppCheckbox>',
});

export const Basic = Template.bind({});
Basic.args = { checked: false };

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Label = Template.bind({});
Label.args = { checked: true, label: "My label" };
