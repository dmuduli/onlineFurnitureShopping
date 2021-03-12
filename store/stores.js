export const state = () => ({
  mapState: false,
  siteConfig: {},
});

export const actions = {
  mapStateAction({ commit }, $config) {
    const { default: siteConfig } = require("~/app.config");
    commit("SET_MAP_STATE", siteConfig.storeLocator);
  },
};

export const mutations = {
  SET_MAP_STATE(state, val) {
    state.mapState = val;
  },
};

export const getters = {
  getMapState(state) {
    return state.mapState;
  },
};
