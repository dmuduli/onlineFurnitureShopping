<template>
  <div
    ref="mega-menu-top"
    class="main-menu-section mobile-view-styles border-t border-gray-500 absolute top-100 w-full h-screen overflow-y-auto transition-all duration-500 bg-white p-5"
    :class="[
      isMegaMenuOpen ? 'left-0' : '-left-100',
      $device.isDesktop
        ? 'mxl:flex-grow mxl:justify-center mxl:items-center mxl:text-center mxl:block mxl:h-auto mxl:static mxl:border-0 mxl:bg-transparent mxl:w-auto mxl:p-0'
        : '',
    ]"
  >
    <template v-if="$device.isMobileOrTablet || isTablet">
      <ul>
        <template
          v-for="(
            {
              collection: {
                primary: { link, link_label },
              },
            },
            index
          ) of hierarchicalMenu"
        >
          <li
            v-if="link && link._meta"
            :key="index"
            class="mobile text-sm block uppercase font-normal text-black xl:mr-6 leading-4 focus:outline-none mobile-view-styles relative pt-5 pb-4 pr-4 border-b border-gray-500"
            :class="[
              $device.isDesktop
                ? 'mxl:inline-block mxl:mr-4 mxl:pt-0 mxl:pb-0 mxl:pr-0 mxl:border-b-0'
                : '',
            ]"
          >
            <nuxt-link
              :to="$prismic.asLink(link)"
              class="text-sm relative z-20 inline-block py-1 uppercase font-normal text-black leading-4 focus:outline-none mobile-view-styles"
              :class="{ active: activeMenuIndex == index }"
              @click.native="closeMenuFirstScreenMobile"
            >
              <cms-rich-text :field="link_label" />
            </nuxt-link>
            <span
              v-if="hasChildren(index)"
              class="absolute z-10 right-0 top-0 bottom-0 w-full text-right"
              :class="{ 'mxl:hidden': $device.isDesktop }"
              @click="toggleChildren(index, link)"
            >
              <svg-icon-right-arrow-menu />
            </span>
          </li>
        </template>
      </ul>
    </template>
    <template v-else>
      <template
        v-for="(
          {
            collection: {
              primary: { link, link_label },
            },
          },
          index
        ) of hierarchicalMenu"
      >
        <first-level-category-link
          v-if="link && link._meta"
          :key="index"
          :hierarchical-menu="hierarchicalMenu"
          :index="index"
          :link="link"
          :link-label="link_label"
          @onMouseEnter="onMouseEnter"
          @onMouseLeave="$emit('onMouseLeaved')"
        />
      </template>
    </template>
    <!-- Banner component -->
    <mega-menu-banner
      v-if="showMobileBanner"
      :image="mobileBanner"
      :link="mobileBannerLink"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    hierarchicalMenu: { type: Object, default: () => {} },
    mobileBanner: { type: Object, default: () => {} },
    mobileBannerLink: { type: Object, default: () => {} },
  },
  computed: {
    ...mapState("app", ["activeMenuIndex", "isMegaMenuOpen"]),
    showMobileBanner() {
      return this.$device.isMobileOrTablet && this.isMegaMenuOpen;
    },
  },
  watch: {
    isMegaMenuOpen(newVal, oldVal) {
      if (!newVal) {
        this.$refs["mega-menu-top"].scrollTo({
          top: 0,
          left: 0,
        });
      }
    },
  },
  methods: {
    onMouseEnter(i) {
      if (this.hasChildren(i)) {
        this.$store.dispatch("app/setActiveMenuIndex", i);
        this.$emit("onMouseEntered", i);
      }
    },
    closeMenuFirstScreenMobile() {
      this.$store.dispatch("app/closeMegaMenu");
    },
    toggleChildren(i, link) {
      this.closeMenuFirstScreenMobile();
      if (this.hasChildren(i)) {
        this.$store.dispatch("app/setActiveMenuIndex", i);
      } else {
        this.$router.push(this.$prismic.asLink(link));
      }
    },
    hasChildren(i) {
      return Object.keys(this.hierarchicalMenu[i].children).length;
    },
  },
};
</script>

<style lang="postcss" scoped>
/* had to use non standard ":" becuase of IE 11 support */

.main-menu-section a:after,
.main-menu-section button:after {
  content: " ";
  @apply block border-b-2 border-gray-100 transform scale-x-0 transition-transform duration-300 ease-in-out origin-center;
}
.main-menu-section a:hover:after,
.main-menu-section button:hover:after,
.main-menu-section a.active,
.main-menu-section a.active:after {
  @apply scale-x-100  border-primary;
}
.main-menu-section a.active {
  @apply font-medium;
}

@media screen and (max-width: 800px) {
  .main-menu-section a:after,
  .main-menu-section button:after {
    @apply hidden;
  }
  .main-menu-section {
  }
}
</style>
