import { tryCatch, isEmpty, isNil } from "ramda";

export const state = () => ({
  variantImages: {},
  productsFetchingStatus: {},
});

export const getters = {
  varinatImages(state) {
    return (productId, variantId) => {
      if (
        isEmpty(state.variantImages) ||
        isNil(state.variantImages[productId]) ||
        isNil(state.variantImages[productId][variantId])
      ) {
        return [];
      }

      return state.variantImages[productId][variantId].split(",");
    };
  },
  getProductFetchingStatus(state) {
    return productHandle =>
      state.productsFetchingStatus[productHandle] ?? false;
  },
};

export const actions = {
  async getVariantImages(
    { commit, rootState, state },
    { uri, productsForVarints, source }
  ) {
    // make this like cache so that if data is present
    // it will not make any request until user refreshes the page
    let urls = productsForVarints
      .filter(p => state.variantImages[p.productId] == null)
      .map(p => ({
        productId: p.productId,
        url: `${rootState.siteConfig.appEndPoint}/${uri}?handle=${p.handle}&productid=${p.productId}&shop=snooze-dev.myshopify.com`,
      }));
    // console.log({ urls });
    const allRequests = urls.map(({ url, productId }) =>
      this.$axios
        .get(url, { cancelToken: source.token })
        .then(response => response.data)
        .then(
          tryCatch(
            response => ({
              variantIds: JSON.parse(
                response.split("VIG.variants = ")[1].split(";")[0]
              ),
              productId,
            }),
            () => ({ variantIds: {}, productId })
          )
        )
    );

    const responses = await Promise.all(allRequests);

    responses.forEach(response => {
      commit("setVariantImages", response);
    });
  },
  setProductsFetching({ commit }, { productHandles, isFetching = true }) {
    productHandles.forEach(productHandle => {
      commit("setProductsFetchingStatus", {
        productHandle,
        isFetching,
      });
    });
  },
};

export const mutations = {
  setVariantImages(state, { productId, variantIds }) {
    state.variantImages[productId] = {
      ...state.variantImages[productId],
      ...variantIds,
    };
  },
  setProductsFetchingStatus(state, { productHandle, isFetching }) {
    state.productsFetchingStatus = {
      ...state.productsFetchingStatus,
      [productHandle]: isFetching,
    };
  },
};
