import sliceListOfArticles from "./mock.json";

export default {
  title: "Slices/ListOfArticles",
};

export const ListOfArticles = () => {
  return {
    template: `<ListOfArticles :primary="primary" :fields="fields"/>`,
    props: {
      primary: { type: Object, default: sliceListOfArticles.primary },
      fields: { type: Array, default: sliceListOfArticles.fields },
    },
  };
};
