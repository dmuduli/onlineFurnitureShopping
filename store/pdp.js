export const state = () => ({
  bottomline: {
    average_score: 0,
    total_review: 0,
  },
  reviews: [],
});

export const actions = {
  async getReviewRating({ commit, rootState, state }, { productId, page }) {
    const { yotpoReviewUrl } = this.$config;
    const reviewsPerPage = rootState.siteConfig.reviewsPerPage;
    // todo: remove this after testing
    // productId = "4372338966615" || productId;
    const url = yotpoReviewUrl.replace("$productIdPage", productId);
    const updatedUrl = `${url}?page=${page}&per_page=${reviewsPerPage}`;
    await this.$axios
      .get(updatedUrl)
      .then(res => {
        commit("setReviewRating", { data: res.data.response, page });
      })
      .catch(e => {
        console.log("Some error in api request");
      });
  },
};

export const mutations = {
  setReviewRating(state, { data, page }) {
    const { bottomline, reviews } = data;
    state.bottomline = bottomline;
    // swiching product it begain from page 1, will not append in it. and after clicking on load more button than it append.
    state.reviews = page == 1 ? reviews : [...state.reviews, ...reviews];
  },
};
