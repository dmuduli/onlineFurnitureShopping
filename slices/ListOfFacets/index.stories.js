import slicePlaceholderSection from "./mock.json";

export default {
  title: "Slices/FacetsSection",
};

export const FacetsSection = () => {
  return {
    template: `<PlaceholderSection :primary="primary"><AlgoliaCollectionFacets/></PlaceholderSection>`,
    props: {
      primary: { type: Object, default: slicePlaceholderSection.primary },
    },
  };
};
