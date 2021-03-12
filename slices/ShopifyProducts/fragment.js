import gql from "graphql-tag";

export const getShopifyProducts = pageType => gql`
  fragment ${pageType}_Shopify_products on ${pageType}BodyShopify_products {
    type
    label
    primary {
      list_title
      max_products_limit
      from_rebuy
    }
    fields {
      product
    }
  }
`;
