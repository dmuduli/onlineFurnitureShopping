<template>
  <div>
    <!-- Mega Menu container starts -->
    <div
      v-for="(
        {
          children,
          primaryBanner,
          primaryBannerLink,
          secondaryBanner,
          secondaryBannerLink,
        },
        index
      ) of hierarchicalMenu"
      :key="index"
    >
      <mega-menu-container
        :children="children"
        :index="index"
        :primary-banner="primaryBanner"
        :primary-banner-link="primaryBannerLink"
        :secondary-banner="secondaryBanner"
        :secondary-banner-link="secondaryBannerLink"
        @onKeepMegaMenuOpen="$emit('onKeepMegaMenuOpen')"
      />
    </div>
    <!-- Mega Menu container ends -->
  </div>
</template>

<script>
export default {
  props: {
    hierarchicalMenu: { type: Object, default: () => {} },
  },
};
</script>
