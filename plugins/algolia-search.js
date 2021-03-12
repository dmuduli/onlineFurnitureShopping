import Vue from "vue";
import InstantSearch from "vue-instantsearch";
import algoliasearch from "algoliasearch/lite";

/**
 * Register Vue Instant Search
 */
Vue.use(InstantSearch);

export default function ({ $config }, inject) {
  const algoliaClient = algoliasearch($config.algoliaAppId, $config.algoliaKey);

  const searchClient = (searchOnEmpty = false) => ({
    search(requests) {
      if (searchOnEmpty && requests.every(({ params }) => !params.query)) {
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
  });
  inject("algolia", searchClient(false));
  inject("algoliaConditional", searchClient(true));
}
