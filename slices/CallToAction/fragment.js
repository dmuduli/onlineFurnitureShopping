import gql from "graphql-tag";

export const getCallToAction = pageType => gql`
  fragment ${pageType}_call_to_action on ${pageType}BodyCall_to_action {
    type
    label
    primary {
      title
      paragraph
      anchor_label
      background_color
      anchor_link {
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
      icon
    }
  }
`;
