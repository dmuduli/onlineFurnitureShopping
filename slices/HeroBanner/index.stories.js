import sliceBanner from "./mock.json";

export default {
  title: "Slices/HeroBanner",
};

export const HeroBanner = () => {
  return {
    template: `<HeroBanner :primary="primary"/>`,
    props: { primary: { type: Object, default: sliceBanner.primary } },
  };
};
