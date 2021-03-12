<template>
  <div
    v-if="children && Object.keys(children).length"
    class="mega-menu-content xl:px-27 lg:py-10 flex flex-wrap mobile-view px-5 py-8"
  >
    <!-- collection columns -->
    <mega-menu-columns
      v-for="(col, colIndex) in children"
      :key="colIndex"
      :col="col"
      class="mega-menu-child first:pl-0 first:border-l-0 w-full lg:pr-6"
      :class="[
        colIndex > 1 && !col[1].primary.link_title
          ? 'pt-3 md:mt-8 category-child'
          : '',
        colIndex > 1 && col[1].primary.link_title
          ? 'mt-5 pt-8 shop-by-size border-t border-opacity-100 border-gray-500'
          : '',
        $device.isDesktop
          ? 'mxl:w-1/4 mxl:border-l border-gray-500 mxl:border-opacity-50 mxl:mt-0  mxl:border-t-0 mxl:pl-6 mxl:pt-0'
          : '',
      ]"
    />
    <template v-if="$device.isDesktop">
      <mega-menu-banner
        v-if="showPrimaryBanner"
        :image="primaryBanner"
        :link="primaryBannerLink"
        class="menu-banner lg:mt-0 self-start ml-auto"
      />
      <mega-menu-banner
        v-if="showSecondaryBanner"
        :image="secondaryBanner"
        :link="secondaryBannerLink"
        class="menu-banner lg:mt-0 self-start"
        :class="{ 'ml-auto': !showPrimaryBanner }"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    children: { type: Object, default: () => {} },
    primaryBanner: { type: Object, default: () => {} },
    primaryBannerLink: { type: Object, default: () => {} },
    secondaryBanner: { type: Object, default: () => {} },
    secondaryBannerLink: { type: Object, default: () => {} },
  },
  computed: {
    hasPrimaryBanner() {
      return this.primaryBanner.url && this.primaryBannerLink._meta;
    },
    showPrimaryBanner() {
      return Object.keys(this.children).length < 4 && this.hasPrimaryBanner;
    },
    hasSecondaryBanner() {
      return this.secondaryBanner.url && this.secondaryBannerLink._meta;
    },
    showSecondaryBanner() {
      return (
        this.hasSecondaryBanner &&
        (Object.keys(this.children).length < 3 ||
          (!this.hasPrimaryBanner && Object.keys(this.children).length < 4))
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
@media screen and (min-width: 768px) and (max-width: 800px) {
  .mega-menu-content .menu-banner {
    @apply mt-5 pl-6;
  }
}
</style>
