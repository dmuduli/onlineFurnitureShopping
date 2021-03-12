import { pathOr, compose, head, values, mapObjIndexed, map, pick } from "ramda";

import {
  CheckoutCreate,
  CheckoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutLineItemsAdd,
  checkoutAttributesUpdateV2,
} from "~/gql/mutations/Shopify.gql";
import { CheckoutById } from "~/gql/queries/Shopify.gql";

const normalizeCustomAttributes = map(
  compose(
    head,
    values,
    mapObjIndexed((v, k) => ({ key: k, value: v }))
  )
);

export default {
  // Creates a checkout in Shopify, and then stores the results as checkout and cart
  async CREATE_CHECKOUT({ commit }, { variantId, quantity = 1 } = {}) {
    let client = this.app.apolloProvider.defaultClient;

    let variables = { input: {} };
    if (variantId && quantity) {
      variables = { input: { variantId, quantity } };
    }
    const checkoutData = await client.mutate({
      mutation: CheckoutCreate,
      variables,
    });
    const checkout = pathOr(
      {},
      ["data", "checkoutCreate", "checkout"],
      checkoutData
    );

    commit("SET_CHECKOUT", checkout);
    this.app.$checkout.setCheckoutId(checkout.id);
  },

  // This allows you to set quantity of multple line items at once. Useful for cart pages.
  // To remove a product, set its quantity to 0
  async UPDATE_QUANTITY({ state, commit }, lineItems) {
    let client = this.app.apolloProvider.defaultClient;

    const checkoutData = await client.mutate({
      mutation: CheckoutLineItemsUpdate,
      variables: { checkoutId: state.checkout.id, lineItems },
    });

    const checkout = pathOr(
      {},
      ["data", "checkoutLineItemsUpdate", "checkout"],
      checkoutData
    );

    commit("SET_CHECKOUT", checkout);
  },

  /**
   *
   * @param {object} context
   * @param {Object[]} lineItems
   * @param {string} lineItems[].variantId
   * @param {Object[]} lineItems[].customAttributes
   * @param {string} lineItems[].customAttributes[].key
   * @param {string} lineItems[].customAttributes[].value
   */
  async ADD_LINE_ITEM({ state, commit }, lineItems = []) {
    let client = this.app.apolloProvider.defaultClient;
    // Add quantity 1 to every line item
    // and normalize customAttributes according to shopify lineItems
    lineItems = lineItems.map(
      ({ variantId, quantity = 1, customAttributes = [] }) => ({
        variantId,
        quantity,
        customAttributes: normalizeCustomAttributes(customAttributes),
      })
    );

    const checkoutData = await client.mutate({
      mutation: checkoutLineItemsAdd,
      variables: { checkoutId: state.checkout.id, lineItems },
    });

    const checkout = pathOr(
      {},
      ["data", "checkoutLineItemsAdd", "checkout"],
      checkoutData
    );

    commit("SET_CHECKOUT", checkout);
  },

  async REMOVE_LINE_ITEM({ state, commit }, lineItemIds = []) {
    let client = this.app.apolloProvider.defaultClient;

    const checkoutData = await client.mutate({
      mutation: checkoutLineItemsRemove,
      variables: { checkoutId: state.checkout.id, lineItemIds },
    });

    const checkout = pathOr(
      {},
      ["data", "checkoutLineItemsRemove", "checkout"],
      checkoutData
    );

    commit("SET_CHECKOUT", checkout);
  },

  // updates the customattributes of the checkout provided in the following format
  // {key1: "value1"}
  async UPDATE_CUSTOM_ATTRIBUTES({ state, commit }, customAttributes = []) {
    let client = this.app.apolloProvider.defaultClient;
    const updatedCustomAttributes = [
      ...state.checkout.customAttributes.map(pick(["key", "value"])),
      ...normalizeCustomAttributes(customAttributes),
    ];

    const checkoutData = await client.mutate({
      mutation: checkoutAttributesUpdateV2,
      variables: {
        checkoutId: state.checkout.id,
        input: { customAttributes: updatedCustomAttributes },
      },
    });

    const checkout = pathOr(
      {},
      ["data", "checkoutAttributesUpdateV2", "checkout"],
      checkoutData
    );

    commit("SET_CHECKOUT", checkout);
  },

  // This is used to make sure the current checkout hasn't completed.
  // It's a good idea to run this on Layout mounted()
  async GET_CHECKOUT({ commit }, checkoutId) {
    let client = this.app.apolloProvider.defaultClient;
    if (!checkoutId) {
      return;
    }

    const response = await client.query({
      query: CheckoutById,
      variables: { checkoutId },
    });

    // Check that this checkout wasn't completed already
    const checkout = pathOr({}, ["data", "node"], response);
    commit("SET_CHECKOUT", checkout);
  },

  CLEAR_CHECKOUT({ commit }) {
    commit("CLEAR_CHECKOUT");
  },
};
