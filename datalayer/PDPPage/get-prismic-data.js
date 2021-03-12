import { pathOr } from "ramda";
import gql from "graphql-tag";
import { getShopifyProducts } from "~/slices/ShopifyProducts/fragment";

const PRODUCT_DETAIL_PAGE_QUERY = gql`
  query {
    allProduct_detail_pages(uid: "product-details") {
      edges {
        node {
          title
          meta_robots
          icon_gallery {
            icon_name
            icon_link {
              _linkType
              ... on _Document {
                _meta {
                  id
                  uid
                  type
                }
              }
              ... on _ExternalLink {
                url
                target
              }
            }
          }
          body {
            ...Product_detail_page_Shopify_products
          }
        }
      }
    }
  }
  ${getShopifyProducts("Product_detail_page")}
`;

/**
 * fetches the prismic data
 * @param {string} handle - the page handle or uid
 * @param {object} app - app from context
 */
export default async function getPrismicData(handle, app) {
  const client = app.apolloProvider.clients.prismic;
  const result = await client.query({
    query: PRODUCT_DETAIL_PAGE_QUERY,
    variables: { uid: handle },
  });

  return pathOr(
    { body: [], title: null, icon_gallery: [] },
    ["data", "allProduct_detail_pages", "edges", [0], "node"],
    result
  );
}
