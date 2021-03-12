import gql from "graphql-tag";

export const listOfFacets = gql`
  fragment Collection_page_list_of_facets on Collection_pageBodyList_of_facets {
    type
    primary {
      title1
    }
  }
`;
