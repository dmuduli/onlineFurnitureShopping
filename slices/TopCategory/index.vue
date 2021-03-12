<template>
  <app-container v-if="!hideTopCategory" class="py-10 pr-0 lg:pr-5">
    <cms-rich-text
      :field="primary.title"
      class="font-normal text-gray-333 lg:text-3xl text-xl mb-5"
    />
    <mobile-top-category
      class="block lg:hidden overflow-x-hidden"
      :primary="primary"
      :fields="items"
    />
    <desktop-top-category
      class="hidden lg:block"
      :primary="primary"
      :fields="items"
    />
  </app-container>
</template>

<script>
import { mapGetters } from "vuex";

import { pathOr, filter, allPass } from "ramda";
import MobileTopCategory from "./MobileTopCategory";
import DesktopTopCategory from "./DesktopTopCategory";

const filterItems = filter(
  allPass([
    pathOr(false, ["link", "body", [0], "primary", "title", [0], "text"]),
    pathOr(false, ["link", "body", [0], "primary", "paragraph", [0], "text"]),
    pathOr(false, ["link", "body", [0], "primary", "banner_bg_image"]),
  ])
);

export default {
  components: { MobileTopCategory, DesktopTopCategory },
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => {} },
  },
  computed: {
    ...mapGetters("checkout", ["itemCount"]),
    isCartPage() {
      return this.$route.path.includes("/cart");
    },
    hideTopCategory() {
      return this.isCartPage && this.itemCount > 0;
    },
    items() {
      return filterItems(this.fields);
    },
  },
};
</script>
