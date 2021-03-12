import gql from "graphql-tag";

export const getTopCategory = pageType => gql`
  fragment ${pageType}_top_category on ${pageType}BodyTop_category {
     type
     label
     primary {
       title
     }
     fields {
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
 }`;
