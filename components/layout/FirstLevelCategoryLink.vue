<template>
  <nuxt-link
    :to="$prismic.asLink(link)"
    class="text-xs mxl:min-h-20 xxl:text-sm block lg:inline-block uppercase font-normal text-black leading-4 focus:outline-none mobile-view-styles relative pt-6 pb-5 pr-4 lg:py-7 lg:mr-0 lg:px-3 border-b border-gray-500 mxl:border-b-0"
    :class="{ active: activeMenuIndex == index }"
    :title="$prismic.asText(linkLabel)"
    @mouseenter.native.self="onMouseEnter(index)"
    @mouseleave.native.self="onMouseLeave"
  >
    <cms-rich-text :field="linkLabel" />
  </nuxt-link>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    hierarchicalMenu: { type: Object, default: () => {} },
    index: { type: String, default: -1 },
    link: { type: Object, default: () => {} },
    linkLabel: { type: Array, default: () => [] },
  },
  data: () => ({ timerObj: null }),
  computed: {
    ...mapState("app", ["activeMenuIndex"]),
    hasChildren() {
      return Object.keys(this.hierarchicalMenu[this.index].children).length;
    },
  },
  methods: {
    onMouseEnter() {
      // emit event to cancel menu close event, if mouse leave and then enter again on L1 link
      // to keep mega menu opened
      if (this.hasChildren) {
        this.$nuxt.$emit("L1MouseEnter");

        this.timerObj = setTimeout(() => {
          this.$emit("onMouseEnter", this.index);
        }, 300);
      }
    },
    onMouseLeave() {
      if (this.hasChildren) {
        clearTimeout(this.timerObj);
        this.$emit("onMouseLeave");
      }
    },
  },
};
</script>
