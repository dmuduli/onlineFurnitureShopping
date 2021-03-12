import findIndex from "ramda/src/findIndex";
import propEq from "ramda/src/propEq";

export default {
  methods: {
    multiSort(array, order, arrayKey, orderKey) {
      return array.slice().sort(function (a, b) {
        const aIndex = findIndex(propEq(orderKey, a[arrayKey]))(order);
        const bIndex = findIndex(propEq(orderKey, b[arrayKey]))(order);

        if (aIndex > bIndex) {
          return 1;
        } else {
          return -1;
        }
      });
    },
  },
};
