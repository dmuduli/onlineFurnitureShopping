import { PrismicLink } from "apollo-link-prismic";
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from "apollo-cache-inmemory";

import introspectionQueryResultData from "../app/prismic/fragmentTypes.json";

// prismic graphql adapter
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default function ({ $config }) {
  return {
    defaultHttpLink: false,
    link: PrismicLink({ uri: $config.prismicGraphqlURL }),
    cache: new InMemoryCache({ fragmentMatcher }),
  };
}
