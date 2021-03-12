import gql from "graphql-tag";

export const COLLECTION_BY_HANDLE = gql`
  query CollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      ruleSet {
        appliedDisjunctively
        rules {
          column
          condition
          relation
        }
      }
    }
  }
`;

export default async function ({ app, error, params }) {
  const { handle } = params;
  const client = app.apolloProvider.clients.shopifyAdmin;

  const {
    data: { collectionByHandle },
  } = await client.query({
    query: COLLECTION_BY_HANDLE,
    variables: { handle },
  });

  if (collectionByHandle == null) {
    return error({ statusCode: 404, message: "Page not found" });
  }
}
