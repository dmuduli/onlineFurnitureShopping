<template>
  <slice-zone :slices="slices" />
</template>

<script>
import gql from "graphql-tag";
import { compose, pathOr, isNil } from "ramda";

import { getPrismicProducts } from "~/utils/getPrismicProducts";
import { getListOfArticle } from "~/slices/ListOfArticles/fragment";
import { getShopifyProducts } from "~/slices/ShopifyProducts/fragment";
import { getCallToAction } from "~/slices/CallToAction/fragment";
import { getNewsSubscription } from "~/slices/NewsSubscription/fragment";
import { getTopCategory } from "~/slices/TopCategory/fragment";
import { shopByStyle } from "~/slices/ShopByStyle/fragment";
import { instagram } from "~/slices/Instagram/fragment";

import seoMixin, { getSeoFields } from "~/mixins/seoMixin";

const QUERY_HOMEPAGE = gql`
  query {
    allHomepages {
      edges {
        node {
          _linkType
          ...HomepageSEOFields
          body {
            __typename
            ... on HomepageBodyHero_carousel {
              type
              primary {
                time_interval
              }
              fields {
                cta_banner
                media_url
                cta_link {
                  _linkType
                  ... on _Document {
                    _meta {
                      type
                      uid
                    }
                  }
                }
                ... on HomepageBodyHero_carouselFields {
                  campaign_sale_link {
                    ... on Campaign_sale {
                      title
                      sale_type
                      campaigns {
                        sale_percentage_text
                        sale_percentage
                        sale_items
                      }
                      sale_banner_color
                      is_gradient
                      start_color
                      end_color
                      gradient_direction
                      button_label
                      button_link {
                        _linkType
                        ... on _Document {
                          _meta {
                            type
                            uid
                          }
                        }
                      }
                      button_color
                      information_title
                      information_instruction
                      information_instruction_second
                      information_instruction_third
                      information_instruction_four
                      plus_background_color
                      is_gradient1
                      start_color1
                      end_color1
                      gradient_direction1
                    }
                  }
                }
              }
            }
            ...Homepage_Shopify_products
            ...Homepage_instagram
            ... on HomepageBodyCustomer_review {
              type
              primary {
                subtitle
              }
            }
            ...Homepage_top_category
            ...Homepage_call_to_action
            ...Homepage_shop_by_style
            ...Homepage_listOfArticle
            ...Homepage_news_subscription
          }
        }
      }
    }
  }
  ${getListOfArticle("Homepage")}
  ${getShopifyProducts("Homepage")}
  ${getSeoFields("Homepage")}
  ${getCallToAction("Homepage")}
  ${getNewsSubscription("Homepage")}
  ${getTopCategory("Homepage")}
  ${shopByStyle}
  ${instagram}
`;

async function getPrismicData(app) {
  const client = app.apolloProvider.clients.prismic;
  const result = await client.query({
    query: QUERY_HOMEPAGE,
  });

  return pathOr(
    { body: null },
    ["data", "allHomepages", "edges", [0], "node"],
    result
  );
}

async function dispatchVariantImages({ products, store, $config, source }) {
  const productsForVarints = products.map(field => ({
    handle: field.product.handle,
    productId: field.product.id,
  }));

  await store.dispatch("products/getVariantImages", {
    productsForVarints,
    uri: $config.shopifyVariantsEndPoint,
    source,
  });
}

async function dispatchInstagramFeeds(store, $config) {
  await store.dispatch("home/GET_INSTAGRAM_FEEDS", $config);
}

export default {
  mixins: [seoMixin],
  beforeRouteLeave(to, from, next) {
    const payload = {
      title: { text: "Homepage" },
      url: from.fullPath,
    };
    this.$store.dispatch("app/setRedirectFrom", payload);
    next();
  },
  async asyncData({ $axios, store, $config, app, error }) {
    const {
      body: slices,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_robots: metaRobots,
    } = await getPrismicData(app);

    if (isNil(slices)) {
      return error({
        statusCode: 404,
        message: "Home page not found in the app",
      });
    }

    const source = $axios.CancelToken.source();
    await compose(
      xs => Promise.all(xs),
      products => [
        dispatchVariantImages({ products, store, $config, source }),
        dispatchInstagramFeeds(store, $config),
      ],
      getPrismicProducts
    )(slices);

    return {
      slices,
      source: process.server ? null : source,
      metaTitle,
      metaDescription,
      metaRobots,
    };
  },
  beforeDestroy() {
    if (this.source) {
      this.source.cancel();
    }
  },
};
</script>
