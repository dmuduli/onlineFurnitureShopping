import store from "store";
import expirePlugin from "store/plugins/expire";

import {
  DELIVERY_ESTIMATING_START,
  DELIVERY_ESTIMATING_END,
  ADD_ESTIMATOR_ERROR,
  UPDATE_START,
  UPDATE_END,
} from "./mutations";

store.addPlugin(expirePlugin);

function resolveTargetShippingRate(rates) {
  const priorities = [
    "CHGNXTDT1-NEXT", // Next day express
    "CHGNXTDT1", // Express
    "CHGD", // Truck
  ];

  for (let i = 0; i < priorities.length; i++) {
    const rate = rates.find(rate => rate.service_code.includes(priorities[i]));
    if (rate) return rate;
  }

  return rates[0]; // Fall back to first rate
}

export default {
  async hydrate({ dispatch, commit, rootState, rootGetters }) {
    commit("setHydrated", { hydrated: false });

    // const shippingAddress = rootGetters["checkout/shippingFormattedAddress"];
    const deliveryAddress = store.get("deliveryAddress");
    // console.log("get Delivery address", deliveryAddress);
    // const deliveryAddress =
    // shippingAddress != "" ? shippingAddress : storageAddress;
    // console.log({ deliveryAddress });
    if (deliveryAddress) {
      dispatch("setDeliveryAddress", { deliveryAddress });
    }

    const shippingRate = store.get("shippingRate");
    if (shippingRate) {
      await dispatch("selectShippingRate", {
        shippingRate: JSON.parse(shippingRate),
      });
    }

    const regionCode = store.get("quickshipRegionCode");
    if (regionCode) {
      dispatch("setRegionCode", { regionCode });
    }

    const eligible = store.get("quickshipEligible");
    // console.log("eligible----", eligible);
    if (eligible) {
      dispatch("setEligible", { eligible });
    }

    const postcodeCutOffTime = store.get("quickshipPostcodeCutOffTime");
    // console.log("postcodeCutOffTime----", postcodeCutOffTime);
    if (postcodeCutOffTime) {
      dispatch("setPostcodeCutOffTime", { postcodeCutOffTime });
    }

    const postcodeDeliveryDay = store.get("quickshipPostcodeDeliveryDay");
    // console.log("postcodeDeliveryDay----", postcodeDeliveryDay);
    if (postcodeDeliveryDay) {
      dispatch("setPostcodeDeliveryDay", { postcodeDeliveryDay });
    }

    const postcodeWarehouseId = await store.get("quickshipPostcodeWarehouseId");
    // console.log("postcodeWarehouseId----", postcodeWarehouseId);
    if (postcodeWarehouseId) {
      await dispatch("setPostcodeWarehouseId", { postcodeWarehouseId });
      await dispatch("resolveQuickshipItems");
    }

    // console.log(
    //   "rootState.quickship.postcode----",
    //   rootState.quickship.postcode
    // );
    // if (rootState.quickship.postcode) {
    //   await dispatch("estimateDelivery", {
    //     postcode: rootState.quickship.postcode,
    //   });
    // }

    console.log("waiting for the post code result", {
      postcodeeee: rootState.quickship.postcode,
    });

    commit("setHydrated", { hydrated: true });
  },

  setAssemblyVariants({ commit }, { assemblyVariants }) {
    commit("SET_ASSEMBLY_VARIANTS", { assemblyVariants });
  },

  setShopMetaFields({ commit }, payload) {
    commit("SET_SHOP_METAFIELDS", payload);
  },

  async checkPostcode({ dispatch }, { postcode }) {
    const { data } = await this.$axios.get(
      `${this.$config.snoozeEcom}/ecom/quickship/eligible-postcode?postcode=${postcode}`
    );
    const {
      eligible,
      state: regionCode,
      cutoff_at: postcodeCutOffTime,
      delivery_at: postcodeDeliveryDay,
      warehouse_id: postcodeWarehouseId,
    } = data;

    dispatch("setRegionCode", { regionCode });
    dispatch("setEligible", { eligible });
    dispatch("setPostcodeCutOffTime", { postcodeCutOffTime });
    dispatch("setPostcodeDeliveryDay", { postcodeDeliveryDay });
    dispatch("setPostcodeWarehouseId", { postcodeWarehouseId });
  },

  async resolveQuickshipItems({ commit, state, rootGetters }) {
    const skus = rootGetters["checkout/productSkus"].join(",");
    const quantities = rootGetters["checkout/productQuantities"].join(",");
    const wareHouseId = state.postcodeWarehouseId;
    const { data } = await this.$axios.get(
      `${this.$config.snoozeEcom}/ecom/stock?skus=${skus}&warehouse_id=${wareHouseId}&quantities=${quantities}`
    );
    const items = Array.isArray(data) ? data : [];
    commit("setQuickshipItems", {
      items: items.filter(item => item.available).map(item => item.sku),
    });
    commit("SET_LOW_STOCKS", items);
  },

  async estimateDelivery(
    { state, commit, dispatch, rootGetters },
    { postcode }
  ) {
    // State already updating, don't do anything
    if (state.updating) {
      console.log("State already updating, will not update");
      return;
    }

    // Globally apply postcode for quickship
    dispatch("quickship/setPostcode", { postcode }, { root: true });
    // add to the checkout in custom attributes

    // commit(CLEAR_ESTIMATOR_ERRORS);

    // Checkout postcode provided
    // if (!postcode) {
    //   commit(ADD_ESTIMATOR_ERROR, { error: "Please enter a postcode" });
    //   return reject();
    // }

    // Set updating flag to prevent more updates
    commit(UPDATE_START);

    // Set updating flag for spinner
    commit(DELIVERY_ESTIMATING_START);
    let response = null;
    try {
      // Fetch cart and send to save endpoint
      ({ data: response } = await this.$axios.post(
        `${this.$config.snoozeEcom}/ecom/shipping-simple`,
        {
          postcode,
          items: rootGetters["checkout/shippingSimpleItems"],
        }
      ));
    } catch (error) {
      commit(ADD_ESTIMATOR_ERROR, {
        error: "Sorry, delivery isn’t available in your area.",
      });
      commit(DELIVERY_ESTIMATING_END);
      commit("setShippingRates", { rates: [] });
      commit(UPDATE_END);
      return;
    }

    // Fetch first shipping option with a price
    const pricedOption = response.rates.find(rate => {
      return rate.total_price > 0 || rate.service_name.includes("Free");
    });

    // No option available, set error
    if (!pricedOption) {
      commit(ADD_ESTIMATOR_ERROR, {
        error: "Sorry, delivery isn’t available in your area.",
      });
    }

    dispatch("setEligible", {
      eligible:
        response.rates.filter(rate => rate.service_code.includes("CHGNXTD"))
          .length > 0,
    });

    // Set quickship eligibility if option included
    //  dispatch(
    //    "quickship/setEligible",
    //    {
    //      eligible:
    //        response.rates.filter(rate => rate.service_code.includes("CHGNXTD"))
    //          .length > 0,
    //    },
    //    { root: true }
    //  );

    // Calculate visible shipping rates
    const visibleShippingRates = response.rates.filter(
      rate => !rate.service_code.includes("POA")
    );

    commit("setShippingRates", { rates: visibleShippingRates });

    dispatch("addPickupToShippingRates");

    dispatch("setHasAssembly", { hasAssembly: response.hasAssembly });

    dispatch("setHasFilteredQuickship", {
      hasFilteredQuickship: response.hasFilteredQuickship,
    });

    dispatch("resolveQuickshipItems");

    //  // Select shipping rate if unselected or not included in new result
    if (
      !state.selectedShippingRate ||
      !state.shippingRates.find(
        rate => rate.service_code === state.selectedShippingRate.service_code
      )
    ) {
      await dispatch("selectShippingRate", {
        shippingRate: resolveTargetShippingRate(state.shippingRates),
      });
    }

    commit(DELIVERY_ESTIMATING_END);
    commit(UPDATE_END);
  },

  selectShippingRate({ commit }, { shippingRate }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("shippingRate", JSON.stringify(shippingRate), duration);
    commit("selectShippingRate", { shippingRate });
  },

  initShippingRates({ commit }) {
    commit("setShippingRates", { rates: [] });
  },

  setRegionCode({ commit }, { regionCode }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("quickshipRegionCode", regionCode, duration);
    commit("SET_REGION_CODE", { regionCode });
  },

  setEligible({ commit }, { eligible }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("quickshipEligible", eligible, duration);
    commit("SET_ELIGIBLE", { eligible });
  },

  setPostcodeCutOffTime({ commit }, { postcodeCutOffTime }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("quickshipPostcodeCutOffTime", postcodeCutOffTime, duration);
    commit("SET_POSTCODE_CUT_OFF_TIME", { postcodeCutOffTime });
  },

  setPostcodeDeliveryDay({ commit }, { postcodeDeliveryDay }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("quickshipPostcodeDeliveryDay", postcodeDeliveryDay, duration);
    commit("SET_POSTCODE_DELIVERY_DAY", { postcodeDeliveryDay });
  },

  setPostcodeWarehouseId({ commit }, { postcodeWarehouseId }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("quickshipPostcodeWarehouseId", postcodeWarehouseId, duration);
    commit("SET_POSTCODE_WAREHOUSE_ID", { postcodeWarehouseId });
  },

  setDeliveryAddress({ commit }, { deliveryAddress }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("deliveryAddress", deliveryAddress, duration);
    commit("SET_DELIVERY_ADDRESS", { deliveryAddress });
  },
  setHasAssembly({ commit }, { hasAssembly }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("hasAssembly", hasAssembly, duration);
    commit("setHasAssembly", { hasAssembly });
  },
  setHasFilteredQuickship({ commit }, { hasFilteredQuickship }) {
    const duration = new Date().getTime() + 3600000; // 1 hour
    store.set("hasFilteredQuickship", hasFilteredQuickship, duration);
    commit("setHasFilteredQuickship", { hasFilteredQuickship });
  },
  addPickupToShippingRates({ commit }) {
    commit("addPickupToShippingRates");
  },

  // Sharing card message update
  setShareCardMailMessage({ commit }) {
    commit("SET_MAIL_SEND_MESSAGE", true);
    setTimeout(() => {
      commit("SET_MAIL_SEND_MESSAGE", false);
    }, 5000);
  },
};
