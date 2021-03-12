import { pathOr } from "ramda";
export const state = () => ({
  velocityPoints: {
    products: [],
    total_base: 0,
  },
});

export const actions = {
  fetchVelocityPoints({ commit }, reqBody) {
    this.$axios
      .post(`${this.$config.appEndPoint}/api/velocity/calculte-points`, reqBody)
      .then(result => {
        commit("SET_VELOCITY_STATE", result.data.data);
      });
  },
};

export const mutations = {
  SET_VELOCITY_STATE(state, points) {
    state.velocityPoints = Object.assign({}, points);
  },
};

export const getters = {
  getVelocityPoints: state => variant => {
    let point = state.velocityPoints.products.find(
      item => item.sku == variant.sku
    );
    return point ? point.base : 0;
  },
  getTotalVelocityPoint(state) {
    return state.velocityPoints.total_base;
  },
  velocityPoints: (state, getters, rootState, rootGetters) => {
    const discount = pathOr(0, ["checkout/discountValue"], rootGetters);
    const computedVelocity = getters.getTotalVelocityPoint - discount;
    return Math.floor(computedVelocity);
  },
};
