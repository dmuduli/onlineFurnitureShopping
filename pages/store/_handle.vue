<template>
  <app-container class="lg:max-w-3/4 w-full mt-10 store-location-container">
    <h1
      class="text-2xl lg:text-4xl text-black font-medium mb-6 text-center uppercase animated animatedFadeInUp fadeInUp duration-1000"
    >
      <cms-rich-text :field="storeName" />
    </h1>
    <store-details-map
      :primary="storeApi"
      class="animated animatedFadeInUp fadeInUp duration-1000"
    />

    <store-open-details :primary="storeApi" :open-hour="openingHourText" />
    <store-details-review v-if="storeReviewId" :storeid="storeReviewId" />
    <slice-zone :slices="slices" />
    <store-feedback-form />
  </app-container>
</template>
<script>
import gql from "graphql-tag";
import { path, pathOr } from "ramda";

const QUERY_PAGES = gql`
  query allStore_pages($uid: String) {
    allStore_pages(uid: $uid) {
      edges {
        node {
          store_name
          opening_hours_text
          store_review_id
          store_api
          store_page_content {
            _linkType
            ... on Store_page_content {
              title
              body {
                __typename
                ... on Store_page_contentBodyQuick_links {
                  type
                  label
                  primary {
                    title
                    links_field
                    customer_support_title
                    customer_support_detail
                    link_name
                    email_to
                  }
                }
                ... on Store_page_contentBodyStore_finance_block {
                  type
                  label
                  primary {
                    title
                    description
                    link {
                      __typename
                      _linkType
                      ... on _ExternalLink {
                        _linkType
                        url
                        target
                      }
                      ... on _Document {
                        __typename
                        _meta {
                          uid
                          id
                          type
                        }
                      }
                    }
                    link_name
                    banner_title
                    banner_description
                    banner_image
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default {
  beforeRouteLeave(to, from, next) {
    const payload = {
      title: { text: "Store" },
      url: from.fullPath,
    };
    this.$store.dispatch("app/setRedirectFrom", payload);
    next();
  },
  async asyncData({ app, route: { params } }) {
    const { handle } = params;

    const client = app.apolloProvider.clients.prismic;
    const { data } = await client.query({
      query: QUERY_PAGES,
      variables: { uid: handle },
    });

    const bodyData = path(["allStore_pages", "edges", [0], "node"], data);
    const slices = pathOr([], ["store_page_content", "body"], bodyData);
    const storeName = path(["store_name"], bodyData);
    const storeApi = path(["store_api"], bodyData);
    const openingHourText = path(["opening_hours_text"], bodyData);
    const storeReviewId = path(["store_review_id"], bodyData);
    return {
      slices,
      storeName,
      openingHourText,
      storeReviewId,
      storeApi,
    };
  },
};
</script>
<style lang="postcss" scoped>
.store-location-container {
  @apply ml-auto !important mr-auto !important;
}
</style>
