import gql from "graphql-tag";

export const getListOfArticle = pageType => gql`
  fragment ${pageType}_listOfArticle on ${pageType}BodyList_of_articles {
    type
    primary {
      title
    }
    fields {
      blog_link {
        _linkType
        ... on _Document{
          _meta{
            id
            uid
            type
          }
          ... on Blog {
            title
            feature_image
            description
          }
        }
      }
    }
  }
`;
