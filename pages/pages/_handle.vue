<template>
  <div
    :style="{ 'max-width': maxWidth }"
    class="mx-auto px-5 py-10 static-page-container"
  >
    <div class="flex flex-col md:flex-row">
      <static-page-nav :nav-lable="navLable" :navigation-items="navigation" />
      <div class="right-panel lg:flex-1 prose">
        <cms-rich-text :field="title" />
        <slice-zone :slices="slices" />
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import path from "ramda/src/path";

import typographyTheme from "~/typography.config";
import trackRoutes from "~/mixins/trackRoutes";
import { getText } from "~/slices/Text/fragment";
import { getTextBlock } from "~/slices/TextBlock/fragment";

const QUERY_PAGES = gql`
  query AllPages($handle: String!) {
    allPages(uid: $handle) {
      edges {
        node {
          title
          navigation_links {
            _linkType
            __typename
            ... on Navigation {
              title
              navigation {
                navigation_label
                navigation_link {
                  _linkType
                  __typename
                  ... on _Document {
                    _meta {
                      uid
                      type
                    }
                  }
                }
              }
            }
          }
          navigation_title
          body {
            __typename
            ...Page_text
            ... on PageBodyImage_section {
              type
              label
              primary {
                image
              }
            }
            ... on PageBodyHtml_section {
              type
              primary {
                html
              }
            }
            ...Page_text_block
          }
        }
      }
    }
  }
  ${getText("Page")}
  ${getTextBlock("Page")}
`;

export default {
  mixins: [trackRoutes],
  async asyncData({ app, error, route: { params } }) {
    const { handle } = params;
    const client = app.apolloProvider.clients.prismic;
    const { data } = await client.query({
      query: QUERY_PAGES,
      variables: { handle },
    });
    const bodyData = path(["allPages", "edges", [0]], data);
    if (!bodyData) {
      error({ statusCode: 404, message: "Page not found" });
    }

    let slices = path(["node", "body"], bodyData);

    const navigation = path(
      ["node", "navigation_links", "navigation"],
      bodyData
    );
    const navLable = path(["node", "navigation_title"], bodyData);

    const title = path(["node", "title"], bodyData);
    return {
      slices,
      navLable,
      title,
      navigation,
    };
  },
  computed: {
    maxWidth() {
      return path(["default", "css", [0], "maxWidth"], typographyTheme);
    },
  },
};
</script>
<style lang="postcss" scoped>
.static-page-container {
  @apply mr-auto !important;
}
.static-page-container /deep/ .prose h3 {
  @apply mt-0;
}
.static-page-container /deep/ .prose h4 {
  @apply mb-2 font-medium;
}
.static-page-container /deep/ .prose p {
  @apply mt-0;
}
</style>
