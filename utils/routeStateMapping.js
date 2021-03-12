// TODO: v1
import { path, pathOr, pick, uniq } from "ramda";
// TODO: v2
// import { path, pathOr, pick } from "ramda";

const brandPath = path(["refinementList", "meta.snooze.brand_list"]);
const sizePath = path(["refinementList", "options.size"]);
const colorPath = path(["refinementList", "meta.snooze.color_group"]);
const feelPath = path(["refinementList", "meta.snooze.mattress_comfort_feel"]);
const quickshipPath = path(["refinementList", "named_tags.quickship"]);
const titlePath = path(["refinementList", "options.title"]);
const pricePath = path(["range", "price"]);
const sortByPath = path(["sortBy"]);
const sortByPathOr = pathOr("snooze_dev_products_recently_ordered_count_desc", [
  "sortBy",
]);

function getNormalisedValues(values) {
  return Array.isArray(values) ? values : [values].filter(Boolean);
}

export default function getStateMapping(indexName, facets, facetParams) {
  return {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];

      return {
        query: indexUiState.query,
        page: indexUiState.page,
        brands: brandPath(indexUiState),
        sizes: sizePath(indexUiState),
        colors: colorPath(indexUiState),
        price: pricePath(indexUiState),
        feel: feelPath(indexUiState),
        sortBy: sortByPath(indexUiState),
        quickship: quickshipPath(indexUiState),
        title: titlePath(indexUiState),
      };
    },
    routeToState(routeState) {
      // TODO: v1
      // const paramFacet = fromPairs([facetParams.split("-")]);

      // TODO: v2
      // NO Logic

      const sizes = getNormalisedValues(routeState.sizes);
      const brands = getNormalisedValues(routeState.brands);
      const colors = getNormalisedValues(routeState.colors);
      const feel = getNormalisedValues(routeState.feel);
      const quickship = getNormalisedValues(routeState.quickship);
      const title = getNormalisedValues(routeState.title);
      const refinementList = {
        "options.size": uniq(sizes.concat(pathOr([], ["sizes"], facetParams))),
        "meta.snooze.color_group": uniq(
          colors.concat(pathOr([], ["colors"], facetParams))
        ),
        "meta.snooze.brand_list": uniq(
          brands.concat(pathOr([], ["brands"], facetParams))
        ),
        "meta.snooze.mattress_comfort_feel": uniq(
          feel.concat(pathOr([], ["feel"], facetParams))
        ),
        "named_tags.quickship": uniq(
          quickship.concat(pathOr([], ["quickship"], facetParams))
        ),
        "options.title": uniq(title.concat(pathOr([], ["title"], facetParams))),
      };
      const sortBy = sortByPathOr(routeState);

      return {
        [indexName]: pick(facets, {
          query: routeState.query,
          refinementList,
          range: { price: routeState.price },
          sortBy,
          page: routeState.page,
        }),
      };
    },
  };
}
