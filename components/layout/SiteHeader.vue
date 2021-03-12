<template>
  <div
    class="fixed w-full top-0 right-0 bg-gray-100 shadow"
    :class="[
      isSearchOpen || isMegaMenuOpen || !isChildMenuClosed || showMiniBag
        ? 'z-50'
        : 'z-40',
    ]"
  >
    <header
      class="border-b border-gray-500"
      :style="{ height: headerHeight + 'px' }"
    >
      <app-container>
        <nav
          class="flex items-center py-5 justify-between"
          :class="[$device.isDesktop ? 'mxl:py-0' : '']"
        >
          <!-- Back button on mobile -->
          <app-button
            v-if="isChildMenuOpened"
            icon
            class="back-to-menu p-2 w-8 h-8 -ml-2"
            @click.native="backToMainMenu"
          >
            <svg-icon-back-arrow />
          </app-button>
          <div
            class="flex items-center flex-shrink-0 lg:mr-2"
            :class="{ 'animate-center': isMegaMenuOpen }"
          >
            <!-- Ham burger icon for mobile -->
            <div
              v-if="!isMegaMenuOpen && !isChildMenuOpened"
              class="block w-8 mr-3 sm:mr-6"
              :class="{ 'mxl:hidden': $device.isDesktop }"
            >
              <app-button
                v-if="!isMegaMenuOpen"
                class="flex items-center"
                icon
                @click.native="openMegaMenu"
              >
                <svg-icon-hamburger />
              </app-button>
            </div>
            <cms-rich-text
              v-if="isChildMenuOpened"
              class="uppercase text-sm text-black font-normal leading-4 py-3"
              :field="
                hierarchicalMenu[activeMenuIndex].collection.primary.link_label
              "
            />
            <!-- Site Logo -->
            <nuxt-link
              v-if="!isChildMenuOpened"
              to="/"
              class="logo"
              :class="{ '': logoStyle }"
            >
              <svg-icon-snooze-logo />
            </nuxt-link>
          </div>

          <!-- Mega memu items -->
          <first-level-category-links
            :hierarchical-menu="hierarchicalMenu"
            :mobile-banner="header.mobile_banner"
            :mobile-banner-link="header.mobile_banner_link"
            @onMouseEntered="onKeepMenuOpen"
            @onMouseLeaved="onMouseLeave"
          />

          <!-- Right Icons -->
          <header-right-icons
            :header-icons="header.header_icons"
            @onCartIconMouseEnter="onCartIconMouseEnterHandler"
            @onCartIconMouseLeave="onCartIconMouseLeaveHandler"
          />

          <!-- Mini Bag 506 - HTML -->
          <mini-bag-modal
            v-if="showMiniBag"
            @onMiniBagModalMouseEnter="onKeepMiniBagModalOpen"
            @closeMinicart="showMiniBag = false"
          />
        </nav>

        <!-- Mega Menu container starts -->
        <mega-menu
          :hierarchical-menu="hierarchicalMenu"
          @onKeepMegaMenuOpen="onKeepMenuOpen"
        />
        <!-- Mega Menu container ends -->

        <transition name="fade">
          <search-bar v-if="isSearchOpen" />
        </transition>
        <!-- Overlay for search on mobile devices -->
        <div
          v-if="$device.isMobileOrTablet"
          class="overlay fixed top-0 left-0 bottom-0 right-0 bg-black opacity-50"
          :class="isSearchOpen ? 'block' : 'hidden'"
        />
      </app-container>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { pathOr } from "ramda";

export default {
  props: {
    header: { type: Object, default: () => {} },
  },
  data() {
    return {
      timerObj: null,
      minibagTimerObj: null,
      showMiniBag: false,
      showInformationBanner: true,
    };
  },
  computed: {
    ...mapState("app", ["isSearchOpen", "isMegaMenuOpen", "activeMenuIndex"]),
    ...mapState({
      headerHeight: s => s.siteConfig.headerHeight,
    }),
    isChildMenuOpened() {
      return (
        this.activeMenuIndex > -1 &&
        (this.$device.isMobileOrTablet || this.isTablet)
      );
    },
    isChildMenuClosed() {
      return this.activeMenuIndex == -1;
    },
    rowsLimit() {
      return pathOr(
        15,
        ["state", "siteConfig", "megaMenu", "rowsLimit"],
        this.$store
      );
    },
    menuData() {
      return pathOr([], ["mega_menu_links"], this.header);
    },
    hierarchicalMenu() {
      let results = {};
      for (let i = 0; i < this.menuData.length; i++) {
        let children = {};

        // prepare data for L1 categories and banners
        results[i] = {
          collection: {
            primary: {
              link: this.menuData[i].link,
              link_label: this.menuData[i].link_label,
            },
          },
          primaryBanner: this.bannerData(i, "primary_banner"),
          primaryBannerLink: this.bannerData(i, "primary_banner_link"),
          secondaryBanner: this.bannerData(i, "secondary_banner"),
          secondaryBannerLink: this.bannerData(i, "secondary_banner_link"),
          children,
        };

        const l2Items = JSON.parse(JSON.stringify(this.bannerData(i, "body")));

        let colIndex = 0;
        let blockIndex = 0;
        let itemsInCol = 0;

        const resetVars = () => {
          itemsInCol = 0;
          blockIndex = 1;
          colIndex++;
          children[colIndex] = {};
        };

        for (let j = 0; j < l2Items.length; j++) {
          // a local function to insert L2 categories
          const setChildren = () => {
            l2Items[j].fields = l2Items[j].fields.filter(
              link => link.second_level_link_text && link.second_level_link
            );
            children[colIndex][blockIndex] = l2Items[j];
          };

          if (l2Items[j].primary.link_title) {
            resetVars();
            setChildren();

            itemsInCol += 2 + l2Items[j].fields.length; // count for max 15 rows in a column
          } else {
            blockIndex++;

            itemsInCol += 1 + l2Items[j].fields.length; // count for max 15 rows in a column

            // if rows exceeds 15 move items into next column
            if (itemsInCol > this.rowsLimit) {
              resetVars();
            }
            setChildren();
          }
        }
      }

      return results;
    },
    isOverlayShown() {
      if (
        this.activeMenuIndex >= 0 &&
        this.hierarchicalMenu[this.activeMenuIndex].children.length
      ) {
        return "block";
      } else {
        return "hidden";
      }
    },
    logoStyle() {
      return this.$device.isMobileOrTablet && this.isMegaMenuOpen;
    },
  },

  watch: {
    $route() {
      this.closeDesktopMegaMenu();
    },
    isMegaMenuOpen(isFirstScreeOpened) {
      if (this.$device.isMobileOrTablet || this.isTablet) {
        this.$store.commit(
          "SET_TOGGLE_OVERFLOW_HIDDEN_BODY",
          isFirstScreeOpened,
          {
            root: true,
          }
        );
      }
    },
    activeMenuIndex(newVal) {
      if (this.$device.isMobileOrTablet || this.isTablet) {
        this.$store.commit(
          "SET_TOGGLE_OVERFLOW_HIDDEN_BODY",
          newVal > -1 && !this.isMegaMenuOpen,
          {
            root: true,
          }
        );
      }
    },
  },
  mounted() {
    // cancel menu close event mouse leave and enter again on L1 link
    this.$nuxt.$on("L1MouseEnter", this.onKeepMenuOpen);
  },
  methods: {
    onMouseLeave() {
      this.timerObj = setTimeout(() => {
        this.closeDesktopMegaMenu();
      }, 1000);
    },
    onKeepMenuOpen() {
      clearTimeout(this.timerObj);
    },
    async onCartIconMouseEnterHandler() {
      this.onKeepMiniBagModalOpen();
      this.showMiniBag = true;
      await this.$store.dispatch("app/closeAddedToBag");
    },
    onCartIconMouseLeaveHandler() {
      this.minibagTimerObj = setTimeout(() => {
        this.showMiniBag = false;
      }, 1000);
    },
    openMegaMenu() {
      this.$store.dispatch("app/showMegaMenu");
    },
    backToMainMenu() {
      this.$store.dispatch("app/setActiveMenuIndex", -1);
      this.openMegaMenu();
    },
    closeDesktopMegaMenu() {
      if (this.activeMenuIndex >= 0) {
        this.$store.dispatch("app/setActiveMenuIndex", -1);
      }
    },
    onKeepMiniBagModalOpen() {
      clearTimeout(this.minibagTimerObj);
    },
    bannerData(i, key) {
      return pathOr({}, [[i], "second_level_menu", key], this.menuData);
    },
  },
};
</script>

<style lang="postcss" scoped>
/* had to use non standard ":" becuase of IE 11 support */
.fade-enter-active,
.fade-leave-active {
  @apply duration-700 transition-opacity;
}
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
@media screen and (max-width: 800px) {
  .main-menu-section a:after,
  .main-menu-section button:after {
    @apply hidden;
  }
}

.main-menu-section,
.mega-menu-container {
  max-height: calc(100vh - 70px);
}

.animate-center {
  @apply relative;
  animation: tocenter 1s ease 0s 1 normal forwards;
  transition: all 1s ease-in;
}

@keyframes tocenter {
  0% {
    -webkit-transform: translateX(0%);
    -ms-transform: translateX(0%);
    transform: translateX(0%);
    @apply left-0;
  }
  100% {
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    @apply left-1/2;
  }
}
</style>
