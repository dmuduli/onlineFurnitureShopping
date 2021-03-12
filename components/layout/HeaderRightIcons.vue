<template>
  <div
    class="main-menu-section header-right-side-icons inline-flex justify-end items-center w-auto"
  >
    <app-button
      v-if="isMegaMenuOpened"
      icon
      class="close-icon inline-block text-sm focus:outline-none ml-auto p-2 w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 -mr-3 lg:mr-0"
      @click.native="hideMegaMenu"
    >
      <svg-icon-close />
    </app-button>
    <div
      :class="{ 'hidden lg:hidden': isMegaMenuOpened }"
      class="flex items-center"
    >
      <span
        v-for="(icon, index) of headerIcons"
        :key="index"
        class="ml-2 xs:ml-4 xl:ml-3 first:ml-0 inline-block w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8"
        @mouseover="onMouseEnter(icon.icon_name)"
        @mouseleave="onMouseOut(icon.icon_name)"
      >
        <nuxt-link
          v-if="icon.icon_name !== 'search'"
          :to="$prismic.asLink(icon.icon_link)"
          class="inline-block text-sm focus:outline-none h-full"
          :class="{ relative: icon.icon_name == 'cart' }"
          :title="title[icon.icon_name]"
        >
          <component :is="`icon-${icon.icon_name}`" class="h-full" />
          <span
            v-if="icon.icon_name === 'cart' && showNotificationCount"
            class="rounded-full h-4 w-4 text-2xs bg-red-700 text-white flex items-center justify-center absolute top-0 right-4"
          >
            {{ formattedCount }}
          </span>
        </nuxt-link>
        <app-button
          v-else
          icon
          class="inline-block text-sm focus:outline-none h-full"
          :title="title[icon.icon_name]"
          @click.native="$store.dispatch('app/openSearch', isTablet)"
        >
          <component :is="`icon-${icon.icon_name}`" class="h-full" />
        </app-button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    headerIcons: { type: Array, default: () => [] },
  },
  data() {
    return {
      timerObj: null,
      title: {
        search: "Search",
        location: "Location",
        profile: "Become a Member",
        cart: "Cart",
      },
    };
  },
  computed: {
    ...mapState("app", ["isMegaMenuOpen", "activeMenuIndex"]),
    ...mapGetters("checkout", ["itemCount"]),
    showNotificationCount() {
      return !this.isCartPage && this.itemCount;
    },
    isCartPage() {
      return this.$route.path.includes("/cart");
    },
    formattedCount() {
      let count = this.itemCount + "";
      if (count.length >= 3) {
        count = count.substring(count.length - 2) + "+";
      }
      return count;
    },
    isChildMenuOpened() {
      return (
        this.activeMenuIndex > -1 &&
        (this.$device.isMobileOrTablet || this.isTablet)
      );
    },
    isMegaMenuOpened() {
      return this.isMegaMenuOpen || this.isChildMenuOpened;
    },
  },
  methods: {
    checkDesktopAndNonCartPage(icon) {
      return this.$device.isDesktop && icon === "cart" && !this.isCartPage;
    },
    hideMegaMenu() {
      this.$store.dispatch("app/closeMegaMenu");
    },
    onMouseEnter(icon) {
      if (this.checkDesktopAndNonCartPage(icon)) {
        this.$emit("onCartIconMouseEnter");
      }
    },
    onMouseOut(icon) {
      if (this.checkDesktopAndNonCartPage(icon)) {
        this.$emit("onCartIconMouseLeave");
      }
    },
    formatCount(count) {
      if (count.length >= 3) {
        count = count.substring(count.length - 2) + "+";
      }
      return count;
    },
  },
};
</script>
<style lang="postcss" scoped>
.header-right-side-icons a:after,
.header-right-side-icons button:after {
  content: " ";
  @apply block pt-1 border-b-2 border-gray-100 transform scale-x-0 transition-transform duration-300 ease-in-out origin-center;
}
.header-right-side-icons a:hover:after,
.header-right-side-icons button:hover:after,
.header-right-side-icons a.active,
.header-right-side-icons a.active:after {
  @apply scale-x-100  border-brown-100;
}
.header-right-side-icons a.active {
  @apply font-medium;
}

@media screen and (max-width: 800px) {
  .header-right-side-icons a:after,
  .header-right-side-icons button:after {
    @apply hidden;
  }
}
</style>
