export default {
  title: "Slices/NewsSubscription",
};

export const NewsSubscription = () => {
  return {
    template: `<NewsSubscription :primary="primary"/>`,
    props: { primary: { type: Object, default: null } },
  };
};
