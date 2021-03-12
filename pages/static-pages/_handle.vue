<template>
  <div class="container mx-auto xl:px-27 px-5 py-10 max-w-none">
    <h1 v-if="title" class="text-4xl font-black text-gray-900 text-center">
      <cms-rich-text :field="title" />
    </h1>
    <h3
      v-if="description"
      class="text-2xl font-300 text-gray-900 text-center uppercase mb-6"
    >
      {{ description }}
    </h3>
    <slice-zone :slices="slices" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import { path, pathOr } from "ramda";

import trackRoutes from "~/mixins/trackRoutes";
import { getText } from "~/slices/Text/fragment";
import { getTextBlock } from "~/slices/TextBlock/fragment";

import { mattressBrandSection } from "~/slices/MattressBrandSection/fragment";

const QUERY_PAGES = gql`
  query allStatic_pages($uid: String) {
    allStatic_pages(uid: $uid) {
      edges {
        node {
          title
          description
          body {
            ... on Static_pageBodyImage_section {
              type
              primary {
                image
              }
            }
            ... on Static_pageBodyScript_section {
              type
              primary {
                id
                src
              }
            }
            ... on Static_pageBodyHtml_section {
              type
              primary {
                html
              }
            }
            ... on Static_pageBodySmall_text {
              type
              primary {
                text
              }
            }
            ...Static_page_mattress_brand_section
            ... on Static_pageBodyCall_to_action_banner {
              type
              primary {
                optional_image
                subtitle
                paragraph
                text_color
                bgColor
                optional_call
                optional_email
                button_label
                button_link {
                  _linkType
                  ... on _Document {
                    _meta {
                      uid
                      type
                    }
                  }
                  ... on _ExternalLink {
                    url
                    target
                  }
                }
              }
            }
            ... on Static_pageBodyText_alternate_grid {
              type
              label
              primary {
                bg_color
              }
              fields {
                optional_icon
                subtitle
                paragraph
                optional_button_label
                optional_button_link {
                  _linkType
                  ... on _Document {
                    _meta {
                      uid
                      type
                    }
                  }
                  ... on _ExternalLink {
                    url
                    target
                  }
                }
              }
            }
            ...Static_page_text
            ... on Static_pageBodyButton_gallery {
              type
              fields {
                button_label
                button_link {
                  _linkType
                  ... on _Document {
                    _meta {
                      uid
                      type
                      id
                    }
                  }
                  ... on _ExternalLink {
                    url
                    target
                  }
                }
              }
            }
            ... on Static_pageBodyIcon_gallery {
              type
              fields {
                icon
                icon_link {
                  ... on _ExternalLink {
                    url
                    target
                  }
                }
              }
            }
            ... on Static_pageBodyMedia_alternate_grid {
              type
              label
              primary {
                heading
                paragraph
              }
              fields {
                video
                image
                optional_subtitle
                link {
                  _linkType
                  ... on _ExternalLink {
                    url
                    target
                  }
                  ... on _Document {
                    _meta {
                      uid
                      id
                      type
                    }
                  }
                }
              }
            }
            ...Static_page_text_block
            ... on Static_pageBodyAlternate_grid {
              type
              label
              fields {
                optional_icon
                item_title
                item_description
              }
              primary {
                image_align
                optional_icon
                subtitle
                paragraph
                image
                video
                media_alignment
                button_label
                optional_button_color
                button_link {
                  _linkType
                  ... on _ExternalLink {
                    url
                    target
                  }
                  ... on _Document {
                    _meta {
                      type
                      uid
                    }
                  }
                }
              }
            }
            ... on Static_pageBodyAccordian {
              type
              label
              primary {
                accordian_title
              }
              fields {
                optional_icon
                item_title
                accordDesc: item_description
              }
            }
          }
        }
      }
    }
  }
  ${getText("Static_page")}
  ${getTextBlock("Static_page")}
  ${mattressBrandSection}
`;

export default {
  mixins: [trackRoutes],
  async asyncData({ app, error, route: { params } }) {
    const { handle } = params;

    const client = app.apolloProvider.clients.prismic;
    const { data } = await client.query({
      query: QUERY_PAGES,
      variables: { uid: handle },
    });
    const bodyData = path(["allStatic_pages", "edges", [0], "node"], data);
    if (!bodyData) {
      error({ statusCode: 404, message: "Page not found" });
    }

    const slices = pathOr([], ["body"], bodyData);
    const title = path(["title"], bodyData);
    const description = path(["description"], bodyData);

    return {
      slices,
      title,
      description,
    };
  },
};
</script>
<style lang="postcss">
#humm-landing-content {
  @apply bg-gray-100 !important;
}
.humm-card.store-icons {
  @apply flex items-center justify-center mb-2;
}
.humm-card a:first-child {
  @apply mr-2;
}
.humm-card a img {
  @apply w-30;
}
</style>
