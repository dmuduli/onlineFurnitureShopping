import { equals } from "ramda";

function getStateWithoutPage(state) {
  const { page, ...rest } = state || {};
  return rest;
}

function isFirstPage(state) {
  const { page } = state || {};
  return page == 1;
}

const KEY = "ais.infiniteHits";

function hasSessionStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
}

export default function createInfiniteHitsSessionStorageCache(page) {
  return {
    read({ state }) {
      if (!hasSessionStorage()) {
        return null;
      }
      try {
        const cache = JSON.parse(
          // @ts-ignore JSON.parse() requires a string, but it actually accepts null, too.
          window.sessionStorage.getItem(KEY)
        );

        // Was responsible for deleting the very first entry
        // so added this line of code
        if (cache && isFirstPage(state)) {
          return cache.hits;
        }

        return cache && equals(cache.state, getStateWithoutPage(state))
          ? cache.hits
          : null;
      } catch (error) {
        if (error instanceof SyntaxError) {
          try {
            window.sessionStorage.removeItem(KEY);
          } catch (err) {
            // do nothing
          }
        }
        return null;
      }
    },
    write({ state, hits }) {
      if (!hasSessionStorage()) {
        return;
      }

      try {
        window.sessionStorage.setItem(
          KEY,
          JSON.stringify({
            state: getStateWithoutPage(state),
            hits,
          })
        );
      } catch (error) {
        // do nothing
      }
    },
  };
}
