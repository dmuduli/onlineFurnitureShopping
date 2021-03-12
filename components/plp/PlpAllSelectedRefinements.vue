<template>
  <div
    v-if="state && items.length != 0"
    v-swiper="swiperOptions"
    class="swiper filters-panel flex flex-1 py-4 px-5 lg:px-0 lg:py-1 relative overflow-hidden"
    :class="{ 'last-element': isLastElement }"
  >
    <div class="swiper-wrapper flex flex-1 flex-no-wrap">
      <plp-chip
        v-for="{ refine, ...refinement } of items"
        :key="
          [
            refinement.attribute,
            refinement.type,
            refinement.value,
            refinement.operator,
          ].join(':')
        "
        class="swiper-slide"
        :label="refinement.label"
        :href="state.createURL(refinement)"
        @remove="refine(refinement)"
      />
    </div>
    <swiper-nav
      slot="button-prev"
      class="refinement-prev left-2 lg:left-4"
      type="prev"
      size="small"
    />
    <swiper-nav
      slot="button-next"
      class="refinement-next right-2 lg:right-4"
      type="next"
      size="small"
    />
  </div>
</template>

<script>
import { toLower, map, compose, flatten, path, sortBy } from "ramda";
import { createWidgetMixin } from "vue-instantsearch";
import { connectCurrentRefinements } from "instantsearch.js/es/connectors";
import { mapGetters } from "vuex";

import multiSortMixin from "~/mixins/multiSortMixin";

export default {
  mixins: [
    createWidgetMixin({ connector: connectCurrentRefinements }),
    multiSortMixin,
  ],

  data() {
    return {
      isLastElement: false,
      isAway: false,
    };
  },

  computed: {
    ...mapGetters(["shownFacets"]),
    widgetParams() {
      return {
        transformItems: this.transformItems,
        includedAttributes: this.shownFacets.map(f => f.name),
      };
    },
    swiperOptions() {
      return {
        slidesPerGroup: 3,
        slidesPerView: "auto",
        loop: false,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: ".refinement-next",
          prevEl: ".refinement-prev",
        },
        on: {
          reachEnd: () => {
            this.isLastElement = true;
          },
          fromEdge: swiper => {
            if (!swiper.isEnd) {
              this.isLastElement = false;
            }
          },
        },
      };
    },
    items() {
      const getRefinementItems = ({ refinements, refine }) => {
        return refinements.map(refinement => ({ ...refinement, refine }));
      };
      const getRefinements = compose(flatten, map(getRefinementItems));

      return this.state ? getRefinements(this.state.items) : [];
    },
  },

  methods: {
    transformItems(items) {
      const newItems = items.map(item => {
        const refinements = sortBy(compose(toLower, path(["label"])))(
          item.refinements
        );
        return { ...item, refinements };
      });

      return this.multiSort(newItems, this.shownFacets, "label", "name");
    },
  },
};
</script>

<style scoped lang="postcss">
.filters-panel:after {
  @apply absolute top-0 bottom-0 right-0 w-2/12 block opacity-50;
  z-index: 8;
  content: "";
  background-image: linear-gradient(to right, rgba(245, 245, 245, 0), #f5f5f5);
}
@screen md {
  .filters-panel {
    @apply ml-27 !important;
  }
}
.swiper .refinement-prev,
.swiper .refinement-next {
  /* @apply box-border !important; */
  /* box-sizing: border-box !important; */
  /* for middle 50% minus the width of the item and minus the padding on parent as it is a content-box  */
  top: calc(50% - 0.5rem - 0.25rem);
}
@screen lg {
  .swiper .refinement-prev,
  .swiper .refinement-next {
    top: calc(50% - 1rem - 0.25rem);
  }
}

.swiper-slide {
  @apply w-auto !important;
}
.swiper-button-disabled {
  @apply hidden;
}
.last-element.filters-panel:after {
  display: none;
}
</style>
