import gql from "graphql-tag";

export const heroBanner = gql`
  fragment Collection_page_hero_banner on Collection_pageBodyHero_banner {
    type
    primary {
      title
      paragraph
      button_label
      button_link {
        _linkType
        ... on _ExternalLink {
          url
        }
        ... on _Document {
          _meta {
            type
            uid
          }
        }
      }
      button_color
      sale_type
      sale_percentage
      sale_percentage_text
      sale_items
      sale_banner_color
      banner_bg_image
    }
  }
`;
