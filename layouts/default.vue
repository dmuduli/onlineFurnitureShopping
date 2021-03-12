<template>
  <div
    class="bg-gray-100"
    :style="{ paddingTop: topBannerHeight + siteConfig.headerHeight + 'px' }"
  >
    <app-top-banner
      :banner-information="header.information_banner"
      class="fixed top-0 w-full right-0 flex bg-gray-500 p-2 text-white text-center items-center text-xs"
      :class="topBannerHeight == 0 ? 'z-0' : 'z-50'"
    />
    <site-header
      :header="header"
      :class="{ hidden: isFilterPanelOpen }"
      :style="{ top: topBannerHeight + 'px' }"
    />
    <transition name="fade">
      <!-- Mega Menu Overlay  -->
      <div
        v-if="activeMenuIndex > -1"
        class="w-full h-full fixed inset-0 z-40 bg-black bg-opacity-50"
      />
    </transition>
    <nuxt />
    <site-footer :footer="footer" :site-review="siteReview.bottomline" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";
import { l2PLPfacetfields } from "~/mixins/seoMixin";

export const HEADER_FOOTER_QUERY = gql`
  query SiteHeaderFooter {
    header(uid: "site-header", lang: "en-in") {
      id: _meta {
        id
      }
      site_title
      site_description
      site_logo
      mobile_banner
      mobile_banner_link {
        _linkType
        ... on _Document {
          __typename
          _meta {
            uid
            type
          }
        }
      }
      information_banner
      mega_menu_links {
        link_label
        link {
          _linkType
          ... on _Document {
            __typename
            _meta {
              uid
              type
            }
          }
        }
        second_level_menu {
          ... on Second_level_menu {
            title
            primary_banner
            primary_banner_link {
              _linkType
              ... on _Document {
                __typename
                _meta {
                  uid
                  type
                }
              }
            }
            secondary_banner
            secondary_banner_link {
              _linkType
              ... on _Document {
                __typename
                _meta {
                  uid
                  type
                }
              }
            }
            body {
              __typename
              ... on Second_level_menuBody2nd_level {
                type
                primary {
                  link_title
                  sub_title
                }
                fields {
                  second_level_link_text
                  second_level_link {
                    _linkType
                    ...L2_product_list_facet_fields
                    ... on _Document {
                      __typename
                      _meta {
                        uid
                        type
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      header_icons {
        icon_name
        icon_link {
          _linkType
          ... on _Document {
            _meta {
              uid
              type
            }
          }
        }
      }
    }
    footer(uid: "site-footer", lang: "en-in") {
      customer_service_title
      customer_service_links {
        link_label
        link {
          ... on _ExternalLink {
            url
          }
          _linkType
          ... on _Document {
            __typename
            _meta {
              uid
              type
            }
          }
        }
      }
      about_title
      about_links {
        link_label
        link {
          ... on _ExternalLink {
            url
          }
          _linkType
          ... on _Document {
            __typename
            _meta {
              uid
              type
            }
          }
        }
      }
      shop_with_us_title
      shop_with_us_links {
        link_label
        link {
          ... on _ExternalLink {
            url
          }
          _linkType
          ... on _Document {
            __typename
            _meta {
              uid
              type
            }
          }
        }
      }
      social_icons_title
      social_icons {
        icon_name
        icon_link {
          _linkType
          ... on _ExternalLink {
            url
            target
          }
          ... on _Document {
            _meta {
              id
              uid
              type
            }
          }
        }
      }
      payment_icons {
        icon_name
      }
      copyright_text
    }
  }
  ${l2PLPfacetfields}
`;

export default {
  data: () => ({ header: null, footer: null }),
  fetch() {
    const client = this.$apolloProvider.clients.prismic;

    const { header, footer } = client.readQuery({
      query: HEADER_FOOTER_QUERY,
    });
    this.header = header;
    this.footer = footer;
  },
  computed: {
    ...mapState(["siteReview", "siteConfig"]),
    ...mapState("app", [
      "activeMenuIndex",
      "isMegaMenuOpen",
      "isFilterPanelOpen",
      "topBannerHeight",
    ]),
  },
  mounted() {
    if (window.ResizeObserver == undefined) {
      return;
    }

    const resizeObserver = new ResizeObserver(entries => {
      let entry = entries[0];
      let width;
      if (entry.contentBoxSize) {
        // Checking for chrome as using a non-standard array
        if (entry.contentBoxSize[0]) {
          width = entry.contentBoxSize[0].inlineSize;
        } else {
          width = entry.contentBoxSize.inlineSize;
        }
        this.$store.commit("app/SET_WINDOW_WIDTH", width);
      } else {
        this.$store.commit("app/SET_WINDOW_WIDTH", entry.contentRect.width);
      }
    });
    resizeObserver.observe(this.$nuxt.$el, { box: "border-box" });

    this.$store.dispatch(
      "app/currentOrientation",
      window.matchMedia("(orientation: portrait)")
    );
  },
};
</script>

<style lang="postcss" scoped>
.fade-enter-active {
  transition: opacity 0.3s linear;
}
.fade-leave-active {
  transition: opacity 0.3s linear 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
