import { compose, path, filter, map, complement, both } from "ramda";
import store from "store";
import expirePlugin from "store/plugins/expire";

store.addPlugin(expirePlugin);

const getAvailableSkus = compose(
  map(path(["sku"])),
  filter(path(["available"]))
);

const getLowStockSkus = compose(
  map(path(["sku"])),
  filter(both(path(["low_stock"]), complement(path(["insufficient_stock"])))),
  filter(path(["available"]))
);

const getInsufficientStockSkus = compose(
  map(path(["sku"])),
  filter(path(["insufficient_stock"]))
);

export const state = () => ({
  availableSkus: [],
  postcode: "",
  hydrated: false,
});

export const getters = {
  isSkuAvailable: state => (sku, tags) =>
    state.availableSkus.includes(sku) ||
    (tags && tags.includes("plp-quickship-icon-enabled")),
};

export const actions = {
  async hydrate({ dispatch, commit, rootGetters }) {
    commit("setHydrated", { hydrated: false });
    // const shippingPostcode = rootGetters["checkout/shippingPostCode"];
    const postcode = store.get("quickshipPostcode");
    // const postcode =
    // shippingPostcode != "" ? shippingPostcode : storagePostcode;

    console.log({ postcode });
    if (postcode) {
      await dispatch("setPostcode", { postcode });
    }
    commit("setHydrated", { hydrated: true });
  },

  async fetchAvailableSkus({ commit, getters }, { skus, quantities }) {
    const skuStr = skus.join(",");
    let checkAvailableSkusURL = `https://api.system.snooze.com.au/staging/ecom/stock?skus=${skuStr}`;
    if (quantities) {
      checkAvailableSkusURL += `&quantities=${quantities.join(",")}`;
    }
    checkAvailableSkusURL += `&warehouse_id=${getters.postcodeWarehouseId}`;

    const response = await fetch(checkAvailableSkusURL);
    const data = await response.json();

    commit("setAvailableSkus", { availableSkus: getAvailableSkus(data) });

    commit("setLowStockSkus", { lowStockSkus: getLowStockSkus(data) });

    commit("setInsufficientStockSkus", {
      insufficientStockSkus: getInsufficientStockSkus(data),
    });
  },

  setPostcode({ commit }, { postcode }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("quickshipPostcode", postcode, duration);
    commit("setPostcode", { postcode });
  },
};

export const mutations = {
  setAvailableSkus: (state, { availableSkus }) => {
    state.availableSkus = availableSkus;
  },
  setLowStockSkus: (state, { lowStockSkus }) => {
    state.lowStockSkus = lowStockSkus;
  },
  setInsufficientStockSkus: (state, { insufficientStockSkus }) => {
    state.insufficientStockSkus = insufficientStockSkus;
  },
  setPostcode: (state, { postcode }) => (state.postcode = postcode),

  setHydrated(state, { hydrated }) {
    state.hydrated = hydrated;
  },
};
