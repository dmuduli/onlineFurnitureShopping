import { COLORS, SIZES, FONT_WEIGHTS } from "./app-button.constants";
import AppButton from "./AppButton";
import SvgIconCross from "~/components/svg/IconCross";
import SvgIconCircle from "~/components/svg/IconCircle";

export default {
  title: "components/AppButton",
  argTypes: {
    to: {
      type: "string",
      control: { type: "text" },
      table: { category: "props" },
      description: "nuxt link",
    },
    color: {
      control: { type: "select", options: COLORS },
      table: { category: "props", defaultValue: { summary: "primary" } },
      defaultValue: "primary",
      description: "button color",
    },
    fontWeight: {
      control: { type: "select", options: FONT_WEIGHTS },
      table: { category: "props", defaultValue: "bold" },
      defaultValue: "bold",
      description: "button font weight",
    },
    size: {
      control: { type: "select", options: SIZES },
      table: { category: "props", defaultValue: "md" },
      defaultValue: "md",
      description: "button size",
    },
    responsive: {
      type: "boolean",
      control: { type: "boolean" },
      table: { category: "props", defaultValue: false },
      defaultValue: false,
      description: "normal size on mobile, bigger on large devices",
    },
    block: {
      type: "boolean",
      control: { type: "boolean" },
      table: { category: "props", defaultValue: false },
      defaultValue: false,
      description: "full width on mobile, normal on large devices",
    },
    icon: {
      type: "boolean",
      control: { type: "boolean" },
      table: { category: "props", defaultValue: false },
      defaultValue: false,
      description: "icon buttons",
    },
    rounded: {
      type: "boolean",
      control: { type: "boolean" },
      table: { category: "props", defaultValue: false },
      defaultValue: false,
      description: "rounded button for colors etc...",
    },
    click: { action: "clicked", table: { category: "events" } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppButton },
  template:
    '<AppButton :to="to" :color="color"  :size="size" :responsive="responsive" :font-weight="fontWeight" :block="block" :rounded="rounded" @click.native="click">Button Text</AppButton>',
});

export const Primary = Template.bind({});
Primary.args = { color: "primary" };

export const Secondary = Template.bind({});
Secondary.args = { color: "secondary" };

export const SecondaryInverted = Template.bind({});
SecondaryInverted.args = { color: "secondary-inverted" };

export const Black = Template.bind({});
Black.args = { color: "black" };

export const Large = Template.bind({});
Large.args = { size: "lg" };

export const _3XLarge = Template.bind({});
_3XLarge.args = { size: "3xl" };

export const Responsive = Template.bind({});
Responsive.args = { responsive: true };

export const Block = Template.bind({});
Block.args = { block: true };

export const NormalFont = Template.bind({});
NormalFont.args = { fontWeight: "normal" };

export const Link = Template.bind({});
Link.args = { to: "/collection/mattresse" };

export const Rounded = Template.bind({});
Rounded.args = { rounded: true };

export const RoundedMedium = Template.bind({});
RoundedMedium.args = { rounded: true, size: "md" };

export const Icon = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppButton, SvgIconCross },
  template:
    '<AppButton :to="to" :icon="icon" @click.native="click"><SvgIconCross></SvgIconCross></AppButton>',
});
Icon.args = { icon: true };

export const Loading = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppButton, SvgIconCircle },
  template:
    '<AppButton :to="to" :color="color"  :size="size" :responsive="responsive" :font-weight="fontWeight" :block="block" :rounded="rounded" @click.native="click"><SvgIconCircle/></AppButton>',
});
Loading.args = { color: "black", block: true };
