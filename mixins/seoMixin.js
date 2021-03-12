import gql from "graphql-tag";

export const getSeoFields = pageType => gql`
  fragment ${pageType}SEOFields on ${pageType} {
    meta_title
    meta_description
    meta_robots
  }
`;

export const l2PLPfacetfields = gql`
  fragment L2_product_list_facet_fields on L2_product_list_page {
    __typename
    facetParameterKey: facet_parameter_key
    facetParameterValue: facet_parameter_value
    _meta {
      uid
      type
    }
  }
`;

export const getMetaFields = pageType => gql`
  fragment ${pageType}MetaFields on ${pageType} {
    _linkType
    _meta {
      id
      uid
      type
    }
  }
`;

export default {
  head() {
    return {
      title: this.metaTitle || "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription || "",
        },
        {
          hid: "robots",
          name: "robots",
          content: this.metaRobots || "follow, index",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: this.$prismic.asLink(this.metaFields) || "/",
        },
      ],
    };
  },
};
