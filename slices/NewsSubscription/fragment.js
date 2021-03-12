import gql from "graphql-tag";

export const getNewsSubscription = pageType => gql`
  fragment ${pageType}_news_subscription on ${pageType}BodyNews_subscription {
    type
    label
    primary {
       title
       paragraph
       button_label
       email_input_placeholder
       button_color
       checkbox_label
       background_color
    }
 }`;
