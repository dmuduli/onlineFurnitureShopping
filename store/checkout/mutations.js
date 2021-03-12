import Vue from "vue";

import { stripLineItems } from "~/utils/shopify-utils.js";

export default {
  SET_CHECKOUT(state, checkout = {}) {
    state.checkout = checkout;

    // Set line items and totals
    let lineItems = stripLineItems(checkout.lineItems);
    const cart = {
      subTotal: checkout.lineItemsSubtotalPrice,
      lineItems,
    };
    state.cart = cart;
  },

  CLEAR_CHECKOUT(state) {
    Vue.set(state, "checkout", {
      id: "",
      webUrl: "",
      completedAt: null,
    });

    Vue.set(state, "cart", {
      subTotal: {},
      lineItems: [],
    });
  },
};
