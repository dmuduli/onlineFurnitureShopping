import PDPImage from "./PDPImage";

export default {
  title: "components/PDPImage",
  argTypes: {
    images: {
      type: "array",
      control: { type: "array" },
      table: { category: "props" },
      defaultValue: [
        "https://cdn.shopify.com/s/files/1/2657/7564/products/SNZ30905_Clovelly-Underbed-Storage_QS_Bedframe_Driftwood-Earth_Lifestyle_FrontHero_Light-On_800x750.progressive.jpg?v=1590471793",
        "https://cdn.shopify.com/s/files/1/2657/7564/products/SNZ1448_oceangrove_bedframe_QS_crossthatch_alt1_800x750.progressive.jpg?v=1590471791",
      ],
      description: "images with swiper",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PDPImage },
  template: `<PDPImage :images="images"/>`,
});

export const Basic = Template.bind({});
