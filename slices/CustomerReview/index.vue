<template>
  <app-container class="pr-0 lg:pr-5 pt-10 pb-14 lg:pt-12 lg:pb-8">
    <cms-rich-text
      :field="primary.subtitle"
      class="font-normal text-gray-333 text-lg lg:text-3xl mb-4 section-title-size"
    />

    <mobile-reviews v-if="isMobile" :site-review="siteReview" />
    <desktop-reviews v-else :site-review="siteReview" />
  </app-container>
</template>

<script>
import { pathOr } from "ramda";

import DesktopReviews from "./DesktopReviews";
import MobileReviews from "./MobileReviews";

export default {
  components: {
    "desktop-reviews": DesktopReviews,
    "mobile-reviews": MobileReviews,
  },

  props: {
    primary: { type: Object, default: () => {} },
    footer: { type: Object, default: null },
  },

  computed: {
    siteReview() {
      return pathOr([], ["state", "siteReview", "reviews"], this.$store).slice(
        0,
        4
      );
    },
  },
};
</script>

<style lang="postcss">
.customer-review-tile:last-child .tooltip {
  left: auto;
  right: 6.8rem;
}
.customer-review-tile:last-child .tooltip-left-arrow:after,
.customer-review-tile:last-child .tooltip-left-arrow:before {
  left: 100%;
  top: 20px;
  border: solid transparent;
  content: " ";
}

.customer-review-tile:last-child .tooltip-left-arrow:after {
  border-color: rgba(255, 255, 255, 0);
  border-left-color: white;
  border-width: 8px;
}
.customer-review-tile:last-child .tooltip-left-arrow:before {
  border-color: rgba(239, 233, 229, 0);
  border-left-color: #efe9e5;
  border-width: 11px;
  margin-top: -11px;
}
</style>
