import { has } from "ramda";
import { createServerRootMixin } from "vue-instantsearch";
import algoliasearch from "algoliasearch/lite";

import getStateMapping from "~/utils/routeStateMapping";

function nuxtRouter(vueRouter) {
  return {
    read() {
      console.log("read_url");
      return vueRouter.currentRoute.query;
    },
    write(routeState) {
      console.log("write_url");
      // if routeState is empty it means state is disposed and new state is
      // created. It occurs when a user comes from seacrh bar in a PLP page
      // at that time routestate is empty and currentRoute have a query
      // the following line handles the above case
      const currentRoute = vueRouter.currentRoute;
      if (
        currentRoute.path === "/products/search" &&
        this.createURL(routeState) === "/products/search"
      ) {
        return;
      }

      if (this.createURL(routeState) === this.createURL(this.read())) {
        // Only push a new entry if the URL changed (avoid duplicated entries in the history)
        return;
      }

      vueRouter.push({
        query: routeState,
      });
    },
    createURL(routeState) {
      console.log("createUrl");
      return vueRouter.resolve({ query: routeState }).href;
    },
    onUpdate(cb) {
      if (typeof window === "undefined") return;
      this._onPopState = event => {
        // const routeState = event.state;
        // On initial load, the state is read from the URL without
        // update. Therefore, the state object isn't present. In this
        // case, we fallback and read the URL.
        // if (!routeState) {
        console.log("update");
        cb(this.read());
        // } else {
        // was getting only state key so
        // obtained from route
        // console.log({ popppp: routeState });
        // cb(routeState);
        // }
      };
      window.addEventListener("popstate", this._onPopState);
    },
    dispose() {
      if (typeof window === "undefined") return;

      window.removeEventListener("popstate", this._onPopState);
    },
  };
}

const hasEmptyFacetFilter = params =>
  has("facetFilters", params) ? !params.facetFilters : false;

const hasEmptyQueryFilter = params =>
  has("query", params) ? !params.query : false;

let searchClient = null;
function getAlgoliaClient(algoliaAppId, algoliaKey) {
  const algoliaClient = algoliasearch(algoliaAppId, algoliaKey);

  if (!searchClient) {
    searchClient = {
      search(requests) {
        if (
          requests.every(
            ({ params }) =>
              hasEmptyFacetFilter(params) || hasEmptyQueryFilter(params)
          )
        ) {
          return Promise.resolve({
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              page: 0,
              processingTimeMS: 0,
            })),
          });
        }

        return algoliaClient.search(requests);
      },
    };
  }

  return searchClient;
}

const defaultFacets = ["query", "page", "refinementList", "range", "sortBy"];

export default function ({
  indexName,
  algoliaAppId,
  algoliaKey,
  router = null,
  facets = defaultFacets,
}) {
  return {
    data() {
      // Create it in `data` to access the Vue Router
      let options = {
        searchClient: getAlgoliaClient(algoliaAppId, algoliaKey),
        indexName,
      };

      if (router) {
        const { facet, facetValue } = router.currentRoute.params;
        const facetParams = { [facet]: facetValue };
        options = {
          ...options,
          routing: {
            router: nuxtRouter(router),
            stateMapping: getStateMapping(indexName, facets, facetParams),
          },
        };
      }

      const mixin = createServerRootMixin(options);

      return { ...mixin.data() };
    },
  };
}
