export default {
  methods: {
    loadGoogleMapScript() {
      const { gooogleMapsApi } = this.$config;
      let myScript = document.createElement("script");
      myScript.setAttribute(
        "src",
        `https://maps.googleapis.com/maps/api/js?key=${gooogleMapsApi}&libraries=places,geometry`
      );
      myScript.setAttribute("async", "true");
      document.head.appendChild(myScript);
    },
  },
};
