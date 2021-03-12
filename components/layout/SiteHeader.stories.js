import { withKnobs, text } from "@storybook/addon-knobs";
import mocks from "./mocks.json";
import SiteHeader from "./index";

export default {
  title: "Components/SiteHeader",
  decorators: [withKnobs],
};

const getMock = () => {
  let _mock = { ...mocks };

  _mock.header_links[0].link_label[0].text = text("Link 1", "spring sale");
  _mock.header_links[1].link_label[0].text = text("Link 2", "mattresses");
  _mock.header_links[2].link_label[0].text = text("Link 3", "beds");
  _mock.header_links[3].link_label[0].text = text(
    "Link 4",
    "bedroom furniture"
  );
  _mock.header_links[4].link_label[0].text = text("Link 5", "kids rooms");
  _mock.header_links[5].link_label[0].text = text("Link 6", "bedding");
  _mock.header_links[6].link_label[0].text = text("Link 7", "inspiration");

  return _mock;
};

export const Default = () => ({
  components: { SiteHeader },
  props: {
    header: {
      default: () => {
        return getMock();
      },
    },
  },
  template: `<SiteHeader :header="header" />`,
});
