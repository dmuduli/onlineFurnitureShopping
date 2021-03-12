import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("app", ["windowWidth"]),

    isMobile() {
      return this.isDevice(767);
    },
    isTablet() {
      return this.isDevice(1200);
    },
  },
  methods: {
    isDevice(width) {
      const plateform = this.$store.state.plateform;
      // ssr handling
      if (typeof window == "undefined") {
        if (plateform == "mobile") {
          return true;
        } else {
          return false;
        }
      }

      // else depend on window with
      let windowWidth = this.windowWidth;

      if (!windowWidth) {
        windowWidth = window.outerWidth;
      }

      return windowWidth <= width;
    },
  },
};
