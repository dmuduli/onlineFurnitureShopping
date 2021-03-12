export default () => ({
  // shop metafields
  membershipDiscount: 0,
  autoClubVariantId: "",
  velocityVariantId: "",
  membershipVariantId: "",
  cart_default: "",
  cart_wa: "",
  cart_sa: "",
  cart_vic: "",
  cart_nsw: "",
  cart_qld: "",
  cart_postcode_default: "",
  cart_postcode_wa: "",
  cart_postcode_sa: "",
  cart_postcode_vic: "",
  cart_postcode_nsw: "",
  cart_postcode_qld: "",

  regionCode: "",
  eligible: "",
  postcodeCutOffTime: "",
  postcodeDeliveryDay: "",
  postcodeWarehouseId: "",
  deliveryAddress: "",
  cartItemsStockStatus: [],

  quickshipItems: [],
  hasAssembly: false,
  hasFilteredQuickship: false,

  // delivery estimate
  deliveryEstimating: false,
  updating: false,
  estimatorErrors: [],
  shippingRates: [],
  selectedShippingRate: null,
  hydrated: false,

  assemblyVariants: [],

  // Sharing cart
  showShareEmailSentMessage: false,
});
