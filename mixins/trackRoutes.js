export default {
  beforeRouteLeave(to, from, next) {
    if (this.title) {
      const payload = {
        title: this.title[0],
        url: from.fullPath,
      };
      this.$store.dispatch("app/setRedirectFrom", payload);
    }
    next();
  },
};
