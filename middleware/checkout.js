export default async function ({ app }) {
  const checkoutId = app.$checkout.getCheckoutId();

  // Create a checkoutId, once per session and allow SSR usage
  if (!checkoutId) {
    await app.store.dispatch("checkout/CREATE_CHECKOUT");
  } else {
    // Force a checkout refresh on each page load
    await app.store.dispatch("checkout/GET_CHECKOUT", checkoutId);

    // If checkout is complete, create a new checkout Id
    if (app.store.getters["checkout/isCheckoutComplete"]) {
      await app.store.dispatch("checkout/CLEAR_CHECKOUT");
      await app.store.dispatch("checkout/CREATE_CHECKOUT");
    }
  }
}
