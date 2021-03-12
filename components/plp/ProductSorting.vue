<template>
  <ais-sort-by
    :items="sortItems"
    class="filter-column flex pl-3 md:pl-5 lg:pl-0 items-center relative h-full border-l border-gray-500"
  >
    <template slot-scope="{ items, refine, currentRefinement }">
      <!-- <div class="border-r mx-5 border-gray-400 h-full"></div> -->
      <div
        v-click-outside="hide"
        class="ml-14 w-full justify-between items-center cursor-pointer hidden lg:flex"
        @click="active = !active"
      >
        <label
          class="mr-6 py-1 border-b-2 border-transparent hover:border-gray-400 cursor-pointer"
        >
          <span class="text-sm text-gray-333 leading-5 uppercase font-medium">
            Sort By:
          </span>
          <span
            class="text-sm text-gray-700 hidden md:inline-flex ml-2 font-para"
          >
            {{ getRefinementLabel(items, currentRefinement) }}
          </span>
        </label>
        <svg-icon-down-arrow
          class="transform duration-500 transition-transform"
        >
        </svg-icon-down-arrow>
      </div>
      <div
        class="absolute z-20 shadow transition-shadow w-full bg-white border border-gray-400 border-t-0"
        style="top: 79px; left: 0px"
        :class="{ hidden: !active, 'inline-block': active }"
      >
        <ul class="block w-full">
          <li
            v-for="item of getRefinementOptions(items, currentRefinement)"
            :key="item.objectId"
            :class="{ 'bg-gray-100': currentRefinement == item.value }"
            class="block w-full bg-white font-para text-base text-gray-800 leading-6 p-3 hover:bg-gray-100 border-b border-gray-400 cursor-pointer"
            @click="handleItemClick(refine, item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="flex items-center lg:hidden w-full relative">
        <select
          class="block appearance-none text-sm text-gray-900 uppercase bg-white leading-tight focus:outline-none w-full lg:w-32 truncate"
          @change="refine($event.target.value)"
        >
          <option
            v-for="item of items"
            :key="item.objectId"
            :value="item.value"
            :selected="currentRefinement == item.value"
          >
            {{ item.label }}
          </option>
        </select>
        <div class="pointer-events-none flex items-center text-gray-700">
          <svg-icon-down-arrow
            class="transform duration-500 transition-transform w-8 h-2"
            :class="{ 'rotate-180': active, 'rotate-0': !active }"
          >
          </svg-icon-down-arrow>
        </div>
      </div>
    </template>
  </ais-sort-by>
</template>
<script>
import ClickOutside from "vue-click-outside";

export default {
  directives: { ClickOutside },
  data: () => ({ indexName: "snooze_dev_products", active: false }),
  computed: {
    algoliaConfig() {
      return this.$store.state.algoliaConfig;
    },
    sortItems() {
      let sortOrders = [];

      this.algoliaConfig.sort_orders.forEach(({ key, desc, asc } = {}) => {
        if (desc && desc.active) {
          const value = `${this.indexName}_${key}_desc`;
          sortOrders.push({ value, label: desc.title });
        }
        if (asc && asc.active) {
          const value = `${this.indexName}_${key}_asc`;
          sortOrders.push({ value, label: asc.title });
        }
      });

      return sortOrders;
    },
  },
  methods: {
    getRefinementOptions(items, currentRefinement) {
      return items.filter(({ value }) => value !== currentRefinement);
    },
    getRefinementLabel(items, currentRefinement) {
      const item = items.find(item => currentRefinement == item.value);
      return item ? item.label : "";
    },
    handleItemClick(refine, item) {
      refine(item.value);
      this.active = false;
    },
    hide() {
      this.active = false;
    },
  },
};
</script>

<style scoped lang="postcss">
.container {
  width: 55%;
}
@screen lg {
  .container {
    @apply w-1/3;
  }
  .filter-column {
    flex: 0 0 310px;
  }
}
</style>
