import { withKnobs, text } from "@storybook/addon-knobs";
import AppBreadCrumb from "./index.vue";

export default {
  title: "Components/AppBreadCrumb",
  decorators: [withKnobs],
};

const getMock = () => {
  let _mock = [{ type: "heading1", text: "MATTRESSES", spans: [] }];

  _mock[0].text = text("AppBreadCrumb Title", "mattresses");

  return _mock;
};

export const Default = () => ({
  componets: { AppBreadCrumb },
  props: { mock: { default: () => getMock() } },
  template: `<AppBreadCrumb :page-name="mock"></AppBreadCrumb>`,
});
