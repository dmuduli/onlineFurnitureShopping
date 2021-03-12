import sliceHeroSection from "./mock.json";

export default {
  title: "Slices/HeroSection",
};

export const HeroSection = () => {
  return {
    template: `<HeroSection :primary="primary" />`,
    props: {
      primary: { type: Object, default: sliceHeroSection.primary },
    },
  };
};
