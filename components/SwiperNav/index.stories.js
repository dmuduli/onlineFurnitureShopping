import SwiperNav from "./index.vue";

export default {
  title: "Components/SwiperNav",
  argTypes: {
    type: {
      control: { type: "select", options: ["prev", "next"] },
      defaultValue: "prev",
      table: { category: "Type" },
      description: "Type of swiper nav",
    },
    size: {
      control: { type: "select", options: ["small", "big"] },
      defaultValue: "small",
      table: { category: "Size" },
      description: "Size of swiper nav",
    },
  },
};

const Template = (args, { argTypes }) => ({
  componets: { SwiperNav },
  props: Object.keys(argTypes),
  template: `<div class="relative"><SwiperNav :type="type" :size="size"/></div>`,
});

export const Prev = Template.bind({});
Prev.args = {
  type: "prev",
};

export const Next = Template.bind({});
Next.args = {
  type: "next",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Big = Template.bind({});
Big.args = {
  size: "big",
};
