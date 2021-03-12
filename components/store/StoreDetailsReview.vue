<template>
  <div class="mb-10 animated animatedFadeInUp fadeInUp duration-1000">
    <div
      class="productreviewwidget"
      :data-listing-id="storeid"
      data-full-width="1"
      data-num-reviews="3"
      data-order="best"
      data-layout="vertical"
      data-theme-id="light"
      data-version="1"
    />
  </div>
</template>

<script>
import googleMapMixin from "~/mixins/googleMapMixin";

export default {
  mixins: [googleMapMixin],
  props: {
    storeid: { type: String, default: "", required: true },
  },
  mounted() {
    this.async_load();
    if (window.attachEvent) {
      window.attachEvent("onload", this.async_load);
    } else {
      window.addEventListener("load", this.async_load, false);
    }
  },

  methods: {
    async_load() {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = this.$config.storeReviewUrl;
      let x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    },
  },
};
</script>
