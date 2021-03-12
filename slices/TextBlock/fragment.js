import gql from "graphql-tag";

export const getTextBlock = pageType => gql`
  fragment ${pageType}_text_block on ${pageType}BodyText_block {
     type
     label
     primary {
        sub_title
        paragraph
     }
}`;
