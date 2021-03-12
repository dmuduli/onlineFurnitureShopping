export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_QUANTITY = "SET_QUANTITY";
export const UPDATE_START = "UPDATE_START";
export const UPDATE_END = "UPDATE_END";
export const ASSEMBLY_UPDATE_START = "ASSEMBLY_UPDATE_START";
export const BRACKET_UPDATE_START = "BRACKET_UPDATE_START";
export const SAVE_START = "SAVE_START";
export const SAVE_END = "SAVE_END";
export const MARK_SAVED = "MARK_SAVED";
export const ITEM_DELETE_START = "ITEM_DELETE_START";
export const AUTOCLUB_ADD_START = "AUTOCLUB_ADD_START";
export const MEMBERSHIP_ADD_START = "MEMBERSHIP_ADD_START";
export const DELIVERY_ESTIMATING_START = "DELIVERY_ESTIMATING_START";
export const DELIVERY_ESTIMATING_END = "DELIVERY_ESTIMATING_END";
export const ADD_ESTIMATOR_ERROR = "ADD_ESTIMATOR_ERROR";
export const CLEAR_ESTIMATOR_ERRORS = "CLEAR_ESTIMATOR_ERRORS";
export const REFRESH_CART = "REFRESH_CART";

export default {
  setQuickshipItems(state, { items }) {
    state.quickshipItems = items;
  },
  SET_ASSEMBLY_VARIANTS(state, { assemblyVariants }) {
    state.assemblyVariants = assemblyVariants;
  },
  SET_SHOP_METAFIELDS(state, payload) {
    for (const [key, { value }] of Object.entries(payload)) {
      state[key] = value;
    }
  },
  SET_REGION_CODE(state, { regionCode }) {
    state.regionCode = regionCode;
  },
  SET_ELIGIBLE(state, { eligible }) {
    state.eligible = eligible;
  },
  SET_POSTCODE_CUT_OFF_TIME(state, { postcodeCutOffTime }) {
    state.postcodeCutOffTime = postcodeCutOffTime;
  },
  SET_POSTCODE_DELIVERY_DAY(state, { postcodeDeliveryDay }) {
    state.eligible = postcodeDeliveryDay;
  },
  SET_POSTCODE_WAREHOUSE_ID(state, { postcodeWarehouseId }) {
    state.postcodeWarehouseId = postcodeWarehouseId;
  },
  SET_DELIVERY_ADDRESS(state, { deliveryAddress }) {
    state.deliveryAddress = deliveryAddress;
  },
  SET_LOW_STOCKS(state, response) {
    state.cartItemsStockStatus = response;
  },
  // Set updating flag
  [UPDATE_START](state) {
    state.updating = true;
  },

  // Clear updating flag
  [UPDATE_END](state) {
    state.updating = false;
  },
  [DELIVERY_ESTIMATING_START](state) {
    state.deliveryEstimating = true;
  },
  [DELIVERY_ESTIMATING_END](state) {
    state.deliveryEstimating = false;
  },
  [ADD_ESTIMATOR_ERROR](state, { error }) {
    state.estimatorErrors.push(error);
  },
  [CLEAR_ESTIMATOR_ERRORS](state) {
    state.estimatorErrors = [];
  },
  setShippingRates(state, { rates }) {
    state.shippingRates = rates;
  },
  selectShippingRate(state, { shippingRate }) {
    state.selectedShippingRate = shippingRate;
  },
  setHasAssembly(state, { hasAssembly }) {
    state.hasAssembly = hasAssembly;
  },
  setHasFilteredQuickship(state, { hasFilteredQuickship }) {
    state.hasFilteredQuickship = hasFilteredQuickship;
  },
  setHydrated(state, { hydrated }) {
    state.hydrated = hydrated;
  },
  addPickupToShippingRates(state) {
    const id = state.shippingRates.findIndex(
      rate => rate.service_code === "CUSTPICKUP"
    );
    if (id === -1) {
      const item = {
        description:
          "Pickup your order when it is available from a Snooze store of your choice.",
        service_code: "CUSTPICKUP",
        service_name: "Pickup",
        store: null,
        total_price: 0,
      };
      state.shippingRates = [item, ...state.shippingRates];
    }
  },
  SET_MAIL_SEND_MESSAGE(state, isSuccess) {
    state.showShareEmailSentMessage = isSuccess;
  },
};
