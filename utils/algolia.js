function sortByRefined(sortFunction) {
  return function (a, b) {
    if (a.refined !== b.refined) {
      if (a.refined) {
        return -1;
      }
      if (b.refined) {
        return 1;
      }
    }
    return sortFunction(a, b);
  };
}

export default {
  facetSortFunctions: {
    "options.size": sortByRefined(function sortSizes(a, b) {
      const sizeA = a.name.toLowerCase();
      const sizeB = b.name.toLowerCase();

      if (sizeA === "one size") {
        return false;
      } else if (sizeA === "single" && sizeB !== "one size") {
        return false;
      } else if (
        sizeA === "long single" &&
        sizeB !== "one size" &&
        sizeB !== "single"
      ) {
        return false;
      } else if (
        sizeA === "king single" &&
        sizeB !== "one size" &&
        sizeB !== "single" &&
        sizeB !== "long single"
      ) {
        return false;
      } else if (
        sizeA === "double" &&
        sizeB !== "one size" &&
        sizeB !== "single" &&
        sizeB !== "long single" &&
        sizeB !== "king single"
      ) {
        return false;
      } else if (
        sizeA === "queen" &&
        sizeB !== "one size" &&
        sizeB !== "single" &&
        sizeB !== "long single" &&
        sizeB !== "king single" &&
        sizeB !== "double"
      ) {
        return false;
      } else if (
        sizeA === "king" &&
        sizeB !== "one size" &&
        sizeB !== "single" &&
        sizeB !== "long single" &&
        sizeB !== "king single" &&
        sizeB !== "double" &&
        sizeB !== "queen"
      ) {
        return false;
      }

      return true;
    }),
    "options.color": sortByRefined(function sortAlphabetical(a, b) {
      if (a.name === b.name) {
        return a.name.localeCompare(b.name);
      }
      return a.name > b.name;
    }),
    "named_tags.type": sortByRefined(function sortAlphabetical(a, b) {
      if (a.name === b.name) {
        return a.name.localeCompare(b.name);
      }
      return a.name > b.name;
    }),
    "meta.snooze.cloud_rating": sortByRefined(function sortAlphabetical(
      a,
      b
    ) {}),
  },
};
