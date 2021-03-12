import gql from "graphql-tag";

export const getText = pageType => gql`
  fragment ${pageType}_text on ${pageType}BodyText {
     type
     label
     primary {
        text
     }
}`;
