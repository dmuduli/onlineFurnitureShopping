import sliceCallToAction from "./mock.json";

export default {
  title: "Slices/CallToAction",
};

export const CallToAction = () => {
  return {
    template: `<CallToAction :primary="primary"/>`,
    props: { primary: { type: Object, default: sliceCallToAction.primary } },
  };
};
