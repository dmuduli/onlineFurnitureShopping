<template>
  <div v-if="showTopBanner" ref="top-banner">
    <cms-rich-text class="m-auto" :field="bannerInformation" />
    <app-button color="black" block icon="icon" @click.native="closeTopBanner">
      <svg-icon-cross />
    </app-button>
  </div>
</template>

<script>
export default {
  props: {
    bannerInformation: { type: Array, default: () => [] },
  },
  data() {
    return {
      showTopBanner: true,
    };
  },
  mounted() {
    this.$store.dispatch(
      "app/setTopBannerHeight",
      this.$refs["top-banner"].clientHeight
    );
  },
  methods: {
    closeTopBanner() {
      this.$store.dispatch("app/setTopBannerHeight", 0);
      this.showTopBanner = false;
    },
  },
};
</script>

<style></style>
