export const state = () => ({
  isSearchOpen: false,
  isFilterPanelOpen: false,
  windowWidth: 0,
  isMegaMenuOpen: false,
  activeMenuIndex: -1,
  isAddedToBagOpen: false,
  addedToBagTimeoutId: null,
  isPotraitMode: true,
  isRefinementListVisible: true,
  redirectFrom: {
    pageTitle: "",
    url: "",
  },
  topBannerHeight: 0,
});

export const actions = {
  openSearch({ commit }, isTablet) {
    commit("setSearch", true);
    if (isTablet) {
      commit("SET_TOGGLE_OVERFLOW_HIDDEN_BODY", true, { root: true });
    }
  },
  closeSearch({ commit }, isTablet) {
    commit("setSearch", false);
    if (isTablet) {
      commit("SET_TOGGLE_OVERFLOW_HIDDEN_BODY", false, { root: true });
    }
  },
  TOGGLE_FILTER_PANEL({ state, commit }) {
    commit("SET_FILTER_PANEL", !state.isFilterPanelOpen);
    commit("SET_TOGGLE_OVERFLOW_HIDDEN_BODY", state.isFilterPanelOpen, {
      root: true,
    });
  },
  CLOSE_FILTER_PANEL({ state, commit }) {
    commit("SET_FILTER_PANEL", false);
    commit("SET_TOGGLE_OVERFLOW_HIDDEN_BODY", false, {
      root: true,
    });
  },
  showMegaMenu({ commit }) {
    commit("TOGGLE_MEGA_MENU", true);
  },
  setActiveMenuIndex({ commit }, index) {
    commit("SET_ACTIVE_MENU_INDEX", index);
  },
  closeMegaMenu({ commit }) {
    commit("TOGGLE_MEGA_MENU", false);
    commit("SET_ACTIVE_MENU_INDEX", -1);
  },
  hydrateRedirectFrom({ commit }) {
    let data = JSON.parse(localStorage.getItem("redirectFrom"));
    if (data && data.pageTitle) {
      let payload = {
        title: {
          text: data.pageTitle,
        },
        url: data.url,
      };
      commit("SET_REDIRECT_VALUE", payload);
    }
  },
  async openAddedToBag({ commit, dispatch, rootState }, isTablet) {
    await dispatch("closeAddedToBag");
    commit("SET_ADDED_TO_BAG", true);
    const timeoutId = setTimeout(
      () => dispatch("closeAddedToBag"),
      rootState.siteConfig.pdp.addedToBagCloseTime
    );
    commit("SET_ADDED_TO_BAG_TIMEOUT_ID", timeoutId);
    if (isTablet) {
      commit("SET_TOGGLE_OVERFLOW_HIDDEN_BODY", true, { root: true });
    }
  },
  closeAddedToBag({ commit, state }, isTablet) {
    clearTimeout(state.addedToBagTimeoutId);
    commit("SET_ADDED_TO_BAG_TIMEOUT_ID", null);
    commit("SET_ADDED_TO_BAG", false);
    if (isTablet) {
      commit("SET_TOGGLE_OVERFLOW_HIDDEN_BODY", false, { root: true });
    }
  },
  currentOrientation({ commit, state }, orientation) {
    commit("SET_ORIENTATION", orientation.matches);
  },
  setRedirectFrom({ commit }, { title, url }) {
    console.log(url);
    localStorage.setItem(
      "redirectFrom",
      JSON.stringify({ pageTitle: title.text, url })
    );
    commit("SET_REDIRECT_VALUE", { title, url });
  },
  setTopBannerHeight({ commit }, height) {
    console.log(height);
    commit("SET_TOP_BANNER_HEIGHT", height);
  },
  setRefinementListVisiblity({ commit }, isVisible) {
    commit("SET_REFINEMENT_LIST_VISIBILITY", isVisible);
  },
};

export const mutations = {
  setSearch(state, payload) {
    state.isSearchOpen = payload;
  },
  SET_WINDOW_WIDTH(state, payload) {
    state.windowWidth = payload;
  },
  SET_FILTER_PANEL(state, payload) {
    state.isFilterPanelOpen = payload;
  },
  TOGGLE_MEGA_MENU(state, payload) {
    state.isMegaMenuOpen = payload;
  },
  SET_ACTIVE_MENU_INDEX(state, payload) {
    state.activeMenuIndex = payload;
  },
  SET_ADDED_TO_BAG(state, payload) {
    state.isAddedToBagOpen = payload;
  },
  SET_ADDED_TO_BAG_TIMEOUT_ID(state, timeoutId) {
    state.addedToBagTimeoutId = timeoutId;
  },
  SET_ORIENTATION(state, orientation) {
    state.isPotraitMode = orientation;
  },
  SET_REDIRECT_VALUE(state, payload) {
    state.redirectFrom.pageTitle = payload.title.text;
    state.redirectFrom.url = payload.url;
  },
  SET_TOP_BANNER_HEIGHT(state, payload) {
    state.topBannerHeight = payload;
  },
  SET_REFINEMENT_LIST_VISIBILITY(state, payload) {
    state.isRefinementListVisible = payload;
  },
};
