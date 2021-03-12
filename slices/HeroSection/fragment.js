import gql from "graphql-tag";

export const getHeroSection = pageType => gql`
  fragment ${pageType}_hero_section on ${pageType}BodyHero_section {
     type
     primary {
        title
        description
     }
}`;
