import { pathOr } from "ramda";

export default {
  isAvailableNextDayDelivery: state =>
    state.cartItemsStockStatus.some(item => item.low_stock == true),

  lowStockStatus: state => state.cartItemsStockStatus,

  hasQuickshipItem: state => {
    return state.quickshipItems.length > 0;
  },

  hasQuickshipRate: state => {
    if (!state.shippingRates.length) return false;

    const quickshipRates = state.shippingRates.filter(rate =>
      rate.service_code.includes("CHGNXTD")
    );
    return quickshipRates.length > 0;
  },

  /**
   * Return collection of shipping lines
   */
  shippingLines: (state, getters) => {
    // Set default values for next day and standard delivery
    let nxtDelivery = 8800;
    let stnDelivery = 8000;

    if (!state.selectedShippingRate) return [];
    if (getters.quickshipRateSelected && getters.hasPartialQuickshipItems) {
      // If free delivery is offered for all products, then standard delivery will be 0
      // Also if there is at least one M2 (which is eligible for free next day delivery) order + normal next day delivery order/s, total will be 0
      // If there is at least one M2 order + standard delivery order/s, total will be 80
      // If there is at least one M2 order + postal order, total will be 10
      // If there is normal next day delivery order/s + postal item, total will be 98
      // Otherwise total is 80 + 88 = 168
      if (state.shippingRate.total_price == 0) {
        stnDelivery = 0;
      } else if (state.shippingRate.total_price == 8000) {
        nxtDelivery = 0;
      } else if (state.selectedShippingRate.total_price == 1000) {
        nxtDelivery = 0;
        stnDelivery = 1000;
      } else if (state.selectedShippingRate.total_price == 9800) {
        stnDelivery = 1000;
      }

      return [
        {
          description: getters.quickshipNextDayRateSelected
            ? "Next Day Delivery"
            : "",
          amount: nxtDelivery,
        },
        {
          description: "Standard Delivery",
          amount: stnDelivery,
        },
      ];
    }

    return [
      {
        description: state.selectedShippingRate.service_name,
        amount: state.selectedShippingRate.total_price,
      },
    ];
  },

  // Return true if a Quickship rate is selected
  quickshipRateSelected: state => {
    if (!state.selectedShippingRate) return false;
    return state.selectedShippingRate.service_code
      ? state.selectedShippingRate.service_code.includes("CHGNXTDT1")
      : false;
  },

  // Return true if a Quickship next-day rate is selected CHGDT1
  quickshipNextDayRateSelected: state => {
    if (!state.selectedShippingRate) return false;
    return state.selectedShippingRate.service_code
      ? state.selectedShippingRate.service_code.includes("CHGNXTDT1-NEXT")
      : false;
  },

  // Return true if a pickup rate is selected
  pickupRateSelected: state => {
    if (!state.selectedShippingRate) return false;
    return state.selectedShippingRate.service_code
      ? state.selectedShippingRate.service_code.includes("CUSTPICKUP")
      : false;
  },

  visibleQuickshipItems: (state, getters, rootState, rootGetters) => {
    return rootGetters["checkout/visibleLineItems"].filter(item =>
      state.quickshipItems.includes(item.variant.sku)
    );
  },

  visibleOrdinaryItems: (state, getters, rootState, rootGetters) => {
    return rootGetters["checkout/visibleLineItems"].filter(
      item => !state.quickshipItems.includes(item.variant.sku)
    );
  },
  // Fetch items in their delivery groups
  itemGroups: (state, getters, rootState, rootGetters) => {
    // Return a single unlabelled group when Quickship not available/eligible
    const serviceCode = pathOr(
      false,
      ["selectedShippingRate", "service_code"],
      state
    );
    if (!serviceCode) {
      return [
        {
          title: null,
          items: rootGetters["checkout/visibleLineItems"],
        },
      ];
    }

    // Quickship selected, split groups
    if (getters.quickshipRateSelected) {
      const quickshipItems = getters.visibleQuickshipItems;
      const ordinaryItems = getters.visibleOrdinaryItems;

      const groups = [];

      groups.push({
        title: getters.quickshipNextDayRateSelected ? "Next Day Delivery" : "",
        subtitle: ordinaryItems.length ? "Delivery 1 of 2" : null,
        items: quickshipItems.map(item => ({ ...item, quickship: true })),
      });

      if (ordinaryItems.length) {
        groups.push({
          title: "Standard Delivery",
          subtitle: "Delivery 2 of 2",
          items: ordinaryItems,
        });
      }

      return groups;
    }

    // Return a single "Pickup" group
    if (getters.pickupRateSelected) {
      return [
        {
          title: "Pickup",
          items: rootGetters["checkout/visibleLineItems"],
        },
      ];
    }

    // Return a fallback "Standard Delivery" group
    return [
      {
        title: "Standard Delivery",
        items: rootGetters["checkout/visibleLineItems"],
      },
    ];
  },
};
