export default {
  methods: {
    hasDiscount: (compareAtPrice, price) => {
      return Number(compareAtPrice) && Number(price) < Number(compareAtPrice);
    },
  },
};
