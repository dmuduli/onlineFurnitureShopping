import gql from "graphql-tag";

export const mattressBrandSection = gql`
  fragment Static_page_mattress_brand_section on Static_pageBodyMattress_brand_section {
    type
    primary {
      optional_icon
      subtitle
      paragraph
      image
      video
      media_alignment
      button_label
      button_link {
        _linkType
        ... on _ExternalLink {
          url
          target
        }
        ... on _Document {
          _meta {
            uid
            type
          }
        }
      }
    }
    fields {
      icon
    }
  }
`;
