import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from "apollo-cache-inmemory";

import introspectionQueryResultData from "~/app/shopify/fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default function ({ $config }) {
  return {
    httpEndpoint: $config.shopifyGraphqlURL,
    httpLinkOptions: {
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": $config.shopifyStorefrontToken,
        Accept: "application/json",
      },
    },
    persist: false,
    cache: new InMemoryCache({ fragmentMatcher }),
  };
}
