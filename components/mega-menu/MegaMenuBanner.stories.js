import { withKnobs } from "@storybook/addon-knobs";
import mocks from "./mocks.json";
import MegaMenuBanner from "./MegaMenuBanner";

const bannerMock = mocks.find(slice => slice.type === "banner");

export default {
  title: "components/MegaMenuBanner",
  decorators: [withKnobs],
  argTypes: {
    bannerData: {
      type: "object",
      control: { type: "object" },
      table: {
        category: "props",
        defaultValue: {},
      },
      description: "Mega menu banner",
      defaultValue: {},
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenuBanner },
  template: `<MegaMenuBanner :banner-data="bannerData" />`,
});

export const Basic = Template.bind({});
Basic.args = { bannerData: bannerMock };
