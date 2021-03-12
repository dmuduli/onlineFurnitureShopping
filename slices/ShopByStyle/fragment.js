import gql from "graphql-tag";

export const shopByStyle = gql`
  fragment Homepage_shop_by_style on HomepageBodyShop_by_style {
    type
    label
    primary {
      subTitle
    }
    fields {
      linkLabel
      link {
        _linkType
        ... on _Document {
          _meta {
            uid
            type
          }
        }
        _linkType
        ... on Collection_page {
          body {
            __typename
            ... on Collection_pageBodyHero_banner {
              label
              primary {
                title
                paragraph
                banner_bg_image
              }
            }
          }
        }
      }
    }
  }
`;
