<template>
  <div>
    <slot
      v-for="(item, itemIndex) of items"
      name="item"
      :item="item"
      :itemIndex="itemIndex"
      :open="isItemOpen(itemIndex)"
    >
      Here comes item
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    multiple: { type: Boolean, default: false },
  },
  data() {
    return {
      activeIndex: -Infinity,
      activeIndexes: [],
    };
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (to.name !== from.name) {
        this.active = false;
      }
    },
    open(val) {
      this.active = val;
    },
  },
  mounted() {
    this.$on("item-clicked", itemIndex => {
      if (this.multiple) {
        this.activeIndexes.push(itemIndex);
      } else {
        this.activeIndex = itemIndex;
      }
    });
  },
  methods: {
    isItemOpen(itemIndex) {
      return this.multiple
        ? this.activeIndexes.includes(itemIndex)
        : itemIndex == this.activeIndex;
    },
  },
};
</script>
