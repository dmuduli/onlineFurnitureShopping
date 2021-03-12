export const state = () => ({
  showModal: false,
});

export const actions = {
  openModalAction({ commit }, $config) {
    commit("SET_MODAL_STATE", true);
  },
  closeModalAction({ commit }, $config) {
    commit("SET_MODAL_STATE", false);
  },
};

export const mutations = {
  SET_MODAL_STATE(state, val) {
    state.showModal = val;
  },
};

export const getters = {
  getModalState(state) {
    return state.showModal;
  },
};
