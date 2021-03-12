<template>
  <app-container v-if="state">
    <template v-if="items.length !== 0">
      <slot
        :items="sortedItems"
        :label="label"
        :createURL="createURL"
        :attribute="attribute"
      />
    </template>
  </app-container>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectRefinementList } from "instantsearch.js/es/connectors";
import uniq from "ramda/src/uniq";

import { mapState } from "vuex";

export default {
  mixins: [createWidgetMixin({ connector: connectRefinementList })],

  props: {
    attribute: { type: String, default: "" },
    label: { type: String, default: "" },
    checkbox: { type: Boolean, default: true },
    sortBy: { type: [Function, Array], default: null },
    operator: { type: String, default: "or" },
  },

  computed: {
    ...mapState(["siteConfig"]),
    widgetConfig() {
      return this.siteConfig.collection.facetWidgets;
    },
    widgetParams() {
      return {
        attribute: this.attribute,
        // limit: this.widgetConfig.maxValuesPerFacet,
      };
    },
    items() {
      return this.state
        ? this.state.items.map(item => {
            const name = item.value.split(" ").join("-").toLowerCase().trim();
            const icon = `icon-${name}`;
            return { ...item, icon, name };
          })
        : [];
    },
    sortedItems() {
      if (this.attribute == this.widgetConfig.brand.shopifyName) {
        return this.items;
      }
      let newItems = [];
      if (this.attribute == this.widgetConfig.size.shopifyName) {
        const sortedItems = this.widgetConfig.size.sortOrder;
        newItems = this.sortFunction(sortedItems);
      }
      if (this.attribute == this.widgetConfig.feel.shopifyName) {
        const sortedItems = this.widgetConfig.feel.sortOrder;
        newItems = this.sortFunction(sortedItems);
      }
      // add remaining items also, but for rest maintain order
      return uniq([...newItems, ...this.items]);
    },
  },

  methods: {
    sortFunction(sortedItems) {
      const itemNames = this.items.map(item => item.name);
      const newItems = [];
      sortedItems.forEach(sortedItem => {
        const itemIndex = itemNames.indexOf(sortedItem);
        if (itemIndex != -1) {
          newItems.push(this.items[itemIndex]);
        }
      });
      return newItems;
    },
    createURL(value, attribute) {
      const routeMap = this.siteConfig.routeMap;
      const path = `${this.$route.path}/products`;
      const query = {
        [routeMap[attribute]]: value,
        sortBy: "snooze_dev_products_recently_ordered_count_desc",
      };

      return this.$router.resolve({ path, query }).href;
    },
  },
};
</script>
