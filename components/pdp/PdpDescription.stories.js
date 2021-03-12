import PDPDescription from "./PDPDescription";

export default {
  title: "components/PDPDescription",
  argTypes: {
    title: {
      type: "text",
      control: { type: "text", defaultValue: "Some title" },
      table: { category: "props" },
      description: "title of the product",
      defaultValue: "Some title",
    },
    description: {
      type: "text",
      control: { type: "text", defaultValue: "Some description" },
      table: { category: "props" },
      defaultValue: "Some description",
      description: "description of the product",
    },
    readMore: {
      action: "read more is clicked",
      table: { category: "events" },
      description: "On clicking READ MORE open the whole descriptin of product",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PDPDescription },
  template: `<PDPDescription :title="title" :description="description" @read-more="readMore"/>`,
});

export const Basic = Template.bind({});
