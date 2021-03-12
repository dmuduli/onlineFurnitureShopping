const fs = require("fs");
const path = require("path");
const axios = require("axios");
const gql = require("graphql-tag");
const { print } = require("graphql");
require("dotenv").config();

const graphqlUrl = "https://snooze-dev.myshopify.com/api/2020-07/graphql.json";
const resultsFileName = path.join(__dirname, "fragmentTypes.json");
const shopifyStorefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

const FRAGMENT_QUERY = gql`
  query {
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }
`;

const fetchFragments = async () => {
  const { data } = await axios.post(
    graphqlUrl,
    { query: print(FRAGMENT_QUERY) },
    {
      headers: {
        Accept: "application/json",
        "x-shopify-storefront-access-token": shopifyStorefrontToken,
      },
    }
  );
  return data;
};

const writeFile = data => {
  fs.writeFileSync(resultsFileName, JSON.stringify(data), error => {
    if (error) {
      console.error("Error writing fragmentTypes file", error);
    } else {
      console.log("Fragment types successfully extracted!");
    }
  });
};

const runScript = async () => {
  const response = await fetchFragments();
  console.log(response);

  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = response.data.__schema.types.filter(
    type => type.possibleTypes !== null
  );

  let result = { __schema: { types: {} } };
  result.__schema.types = filteredData;
  writeFile(result);
};

runScript()
  .then(() => console.log("script ran successfully"))
  .catch(err => console.log(err));
