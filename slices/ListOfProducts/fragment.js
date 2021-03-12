import gql from "graphql-tag";

export const getListOfProducts = pageType => gql`
fragment ${pageType}_list_of_products on ${pageType}BodyList_of_products {
    type
  }
`;
