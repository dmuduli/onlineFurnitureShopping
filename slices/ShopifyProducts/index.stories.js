import sliceShopifyProducts from "./mock.json";

export default {
  title: "Slices/ShopifyProducts",
};

export const ShopifyProducts = () => {
  return {
    template: `<ShopifyProducts :fields="fields" :primary="primary"/>`,
    props: {
      fields: { type: Array, default: sliceShopifyProducts.fields },
      primary: { type: Object, default: sliceShopifyProducts.primary },
    },
  };
};
