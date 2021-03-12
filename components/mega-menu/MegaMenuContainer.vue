<template>
  <div>
    <div
      v-if="$device.isMobileOrTablet || isTablet"
      class="mega-menu-container w-full h-screen xxl:max-h-initial overflow-y-auto absolute top-100 border-t border-gray-500 transition-all duration-500 bg-white"
      :class="[
        showContainer ? 'right-0' : '-right-100',
        { hidden: hideMegaMenu },
        $device.isDesktop ? 'mxl:h-auto mxl:max-h-138' : '',
      ]"
    >
      <!-- Mega menu wrapper -->
      <mega-menu-columns-wrapper
        :children="children"
        :primary-banner="primaryBanner"
        :primary-banner-link="primaryBannerLink"
        :secondary-banner="secondaryBanner"
        :secondary-banner-link="secondaryBannerLink"
      />
      <!-- mega menu banner -->
    </div>
    <transition v-else name="fade">
      <div
        v-if="showContainer"
        class="mega-menu-container w-full h-screen lg:h-auto lg:max-h-138 xxl:max-h-initial overflow-y-auto absolute top-100 border-t border-gray-500 md:right-auto md:left-0 bg-white"
        @mouseenter.self="$emit('onKeepMegaMenuOpen')"
        @mouseleave.self="closeMegaMenu"
      >
        <!-- Mega menu wrapper -->
        <mega-menu-columns-wrapper
          :children="children"
          :primary-banner="primaryBanner"
          :primary-banner-link="primaryBannerLink"
          :secondary-banner="secondaryBanner"
          :secondary-banner-link="secondaryBannerLink"
        />
        <!-- mega menu banner -->
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    primaryBanner: { type: Object, default: () => {} },
    primaryBannerLink: { type: Object, default: () => {} },
    secondaryBanner: { type: Object, default: () => {} },
    secondaryBannerLink: { type: Object, default: () => {} },
    children: { type: Object, default: () => {} },
    index: { type: String, default: "" },
  },
  computed: {
    ...mapState("app", ["activeMenuIndex", "isMegaMenuOpen"]),
    showContainer() {
      return this.index == this.activeMenuIndex;
    },
    hideMegaMenu() {
      return !this.isMegaMenuOpen && this.activeMenuIndex == -1;
    },
  },
  methods: {
    closeMegaMenu() {
      if (this.activeMenuIndex >= 0) {
        this.$store.dispatch("app/closeMegaMenu");
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.fade-enter-active {
  transition: opacity 0.3s linear;
}
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mega-menu-container {
  max-height: calc(100vh - 70px);
}
</style>
