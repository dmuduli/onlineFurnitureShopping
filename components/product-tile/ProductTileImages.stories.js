import ProductImages from "./ProductTileImages";

const tagsMock = [
  "afterpay-bedroom-furniture",
  "autoclub-20",
  "bed",
  "bed-frame",
  "bed-frames",
  "beds",
  "campaign:black-friday-20201123",
  "canopy",
  "double",
  "double-beds",
  "EOFY-beds-bedroom-furniture",
  "kids-bedroom",
  "king-single",
  "king-single-beds",
  "mattress-furniture",
  "min_from_price:899.00",
  "new",
  "queen",
  "queen-beds",
  "sale",
  "top-reviewed",
  "yotpo-reviewed",
];

export default {
  title: "components/ProductTileImages",
  argTypes: {
    allImages: {
      type: "array",
      control: { type: "array" },
      table: { category: "props" },
      defaultValue: [
        "https://cdn.shopify.com/s/files/1/2657/7564/products/SNZ30905_Clovelly-Underbed-Storage_QS_Bedframe_Driftwood-Earth_Lifestyle_FrontHero_Light-On.jpg?v=1590471793",
        "https://cdn.shopify.com/s/files/1/2657/7564/products/SNZ1448_oceangrove_bedframe_QS_crossthatch_alt1.jpg?v=1590471791",
      ],
      description: "images with swiper",
    },
    saleTagText: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "Clearance sale" },
      description: "sale tag text",
      defaultValue: "Clearance sale",
    },
    saleTagBgColor: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "#FFC0CB" },
      description: "Sale tag background hex value",
      defaultValue: "#FFC0CB",
    },
    handle: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "product-handle" },
      description: "handle of product",
      defaultValue: "product-handle",
    },
    tags: {
      type: "array",
      control: { type: "array" },
      table: { category: "props", defaultValue: tagsMock },
      description: "product tags ",
      defaultValue: tagsMock,
    },
    metafields: {
      type: "object",
      control: { type: "object" },
      table: { category: "props", defaultValue: { australian_made: 1 } },
      description: "meta fields for autsralian made and delivery truck",
      defaultValue: { australian_made: 1, delivery_truck: 1 },
    },
    selectedVariantId: {
      type: "string",
      control: { type: "text" },
      table: { category: "props", defaultValue: "123444" },
      description: "variant id",
      defaultValue: "123444",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProductImages },
  template: `<ProductImages :allImages="allImages" :saleTagText="saleTagText" :saleTagBgColor="saleTagBgColor" :handle="handle" :tags="tags" :metafields="metafields" :selectedVariantId="selectedVariantId"/>`,
});

export const Basic = Template.bind({});
