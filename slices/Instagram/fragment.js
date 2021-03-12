import gql from "graphql-tag";

export const instagram = gql`
  fragment Homepage_instagram on HomepageBodyInstagram {
    type
    primary {
      subtitle
      username
      instagram_link {
        _linkType
        ... on _ExternalLink {
          url
          target
        }
      }
    }
  }
`;
