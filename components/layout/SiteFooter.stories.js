import { withKnobs, number } from "@storybook/addon-knobs";
import SiteFooter from "./SiteFooter";
import mocks from "./footer-mocks.json";

export default {
  title: "Components/SiteFooter",
  decorators: [withKnobs],
};

export const Default = () => ({
  components: { SiteFooter },
  props: {
    mock: { default: mocks },
    siteReviewMock: {
      default: {
        total_reviews: number("Total Reviews", 3999),
        average_score: number("Average Score", 4.356),
      },
    },
  },
  template: `<SiteFooter :footer="mock" :site-review="siteReviewMock"/>`,
});
