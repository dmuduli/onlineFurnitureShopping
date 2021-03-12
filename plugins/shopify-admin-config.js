import https from "https";
import { createHttpLink } from "apollo-link-http";

export default function ({ $config }) {
  return {
    defaultHttpLink: false,
    link: createHttpLink({
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
      uri: `${$config.appEndPoint}/admin/api/2020-10/graphql.json`,
    }),
    httpLinkOptions: {
      headers: {
        "Content-Type": "application/graphql",
        Accept: "application/json",
      },
    },
    // persist: false,
  };
}
