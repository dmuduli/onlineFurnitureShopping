import sliceImageSection from "./mock.json";

export default { title: "Slices/ImageSection" };

export const ImageSection = () => {
  return {
    template: `<BannerWithCaption :primary="primary" />`,
    props: {
      primary: { type: Object, default: sliceImageSection.primary },
    },
  };
};
