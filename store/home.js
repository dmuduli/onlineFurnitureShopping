export const state = () => ({
  instagram: [],
});

export const actions = {
  async GET_INSTAGRAM_FEEDS({ commit }, $config) {
    try {
      const response = await fetch($config.instagramUrl);
      const result = await response.json();
      commit("SET_INSTAGRAM_FEEDS", result);
    } catch (err) {
      // console.log(err);
    }
  },
};

export const mutations = {
  SET_INSTAGRAM_FEEDS(state, { items }) {
    state.instagram = items;
  },
};

export const getters = {
  getInstagramData(state) {
    return state.instagram;
  },
};
