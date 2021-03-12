import { pathOr, compose, map, path, join } from "ramda";
import { byId } from "~/utils/shopify-utils";

const getAssemblyVariant = (rootState, lineItem) => {
  const assemblySku = pathOr(
    "",
    ["variant", "assembly_sku", "value"],
    lineItem
  );
  const assemblyVariants = pathOr([], ["bag", "assemblyVariants"], rootState);

  return assemblySku
    ? assemblyVariants.find(item => item.node.sku == assemblySku)
    : null;
};

const getAssemblyItem = (getters, lineItem) => {
  const itemVariantId = pathOr("", ["variant", "id"], lineItem);
  let assemblyItem = getters.lineItems.find(item =>
    item.customAttributes.find(
      attr => attr.key == "_assembly-for-key" && attr.value == itemVariantId
    )
  );

  if (!assemblyItem) {
    const itemVariantSku = pathOr("", ["variant", "sku"], lineItem);
    assemblyItem = getters.lineItems.find(item =>
      item.customAttributes.find(
        attr => attr.key == "_assembly-for" && attr.value == itemVariantSku
      )
    );
  }

  return assemblyItem;
};

const getTotalDiscount = items =>
  items
    .map(item => item.discountAllocations)
    .flat()
    .reduce((acc, v) => {
      return (acc += Number(
        pathOr("0", ["discountApplication", "value", "amount"], v)
      ));
    }, 0);

export default {
  checkoutId: state => state.checkout.id,

  checkoutAttributes: state =>
    compose(byId("key"), pathOr([], ["checkout", "customAttributes"]))(state),

  lineItems: state =>
    compose(
      map(path(["node"])),
      pathOr([], ["checkout", "lineItems", "edges"])
    )(state),

  visibleLineItems: (state, getters, rootState) =>
    getters.lineItems
      .filter(
        item =>
          ![
            "Velocity Member",
            "Auto Club",
            "Membership",
            "Snooze Assembly Service",
          ].includes(item.title)
      )
      .map(item => ({
        ...item,
        assemblyVariant: getAssemblyVariant(rootState, item),
        assemblyItem: getAssemblyItem(getters, item),
      })),

  itemCount: (state, getters) =>
    getters.visibleLineItems.reduce((acc, val) => (acc += val.quantity), 0),

  cartSubTotal: s => s.cart.subTotal.amount,

  isCheckoutComplete: s => !!s.checkout.completedAt,

  autoClubLineItem: (state, getters) =>
    getters.lineItems.find(item => item.title === "Auto Club"),

  velocityLineItem: (state, getters) =>
    getters.lineItems.find(item => item.title === "Velocity Member"),

  membershipLineItem: (state, getters) =>
    getters.lineItems.find(item => item.title === "Membership"),

  AssembalyLineItem: (state, getters) =>
    getters.lineItems.filter(item => item.title === "Snooze Assembly Service"),

  discountValue: (state, getters) => getTotalDiscount(getters.visibleLineItems),

  taxableLineItems: (state, getters) =>
    getters.lineItems.filter(item =>
      item.customAttributes.some(
        childItem => childItem.key === "taxable" && childItem.value === "true"
      )
    ),

  gstAmount(state, getters) {
    const totalGST = getters.taxableLineItems.reduce(
      (acc, v) =>
        acc +
        Number(pathOr(0, ["variant", "priceV2", "amount"], v)) * v.quantity,
      0
    );

    const totalGSTDiscount = getTotalDiscount(getters.taxableLineItems);

    // Todo add assembly amount for GST
    const gstAmount = totalGST - totalGSTDiscount;
    return gstAmount ? gstAmount / 11 : gstAmount;
  },

  productSkus: (state, getters) =>
    getters.visibleLineItems
      .filter(({ variant }) => variant.sku.length)
      .map(({ variant }) => variant.sku),

  productQuantities: (state, getters) =>
    getters.visibleLineItems.map(item => item.quantity),

  shippingSimpleItems: (state, getters) =>
    getters.lineItems
      .filter(({ variant }) => variant.sku.length)
      .map(({ variant, ...item }) => ({
        sku: variant.sku,
        grams: variant.weight * (variant.weightUnit == "KILOGRAMS" ? 1000 : 1),
        price: Number(pathOr(0, ["priceV2", "amount"], variant)),
        quantity: item.quantity,
      })),

  shippingCharge: state => state.delivery,

  totalPrice: (state, getters) =>
    getters.visibleLineItems.reduce(
      (total, item) =>
        (total += Number(item.variant.compareAtPrice) * item.quantity),
      0
    ),

  isAvailableNextDayDelivery: (state, getters) => {
    return getters.visibleLineItems.some(item => {
      const tags = pathOr(false, ["variant", "product", "tags"], item);
      return tags.includes("quickship: Next Day Delivery");
    });
  },

  addedAssemblyAmount: (state, getters) => {
    let assemblyAmount = 0;
    const assemblyLineItem = getters.lineItems.filter(
      item => item.title === "Snooze Assembly Service"
    );
    // assemblyLineItem.reduce((acc, val) => (acc += val.quantity), 0),
    assemblyAmount = assemblyLineItem.reduce(
      (acc, val) => (acc += val.quantity * Number(val.variant.price)),
      0
    );
    return assemblyAmount;
  },
  shippingPostCode(state) {
    return pathOr("", ["checkout", "shippingAddress", "zip"], state);
  },
  shippingFormattedAddress(state) {
    return compose(
      join(", "),
      pathOr([], ["checkout", "shippingAddress", "formatted"])
    )(state);
  },
};
