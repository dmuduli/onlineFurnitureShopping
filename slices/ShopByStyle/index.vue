<template>
  <app-container class="pt-10 lg:py-10 clearfix">
    <div
      class="font-normal text-gray-900 text-xl leading-7 mb-4 lg:text-3xl lg:leading-8 lg:mb-2"
    >
      <cms-rich-text :field="primary.subTitle" />
    </div>
    <div class="clearfix inline-block w-auto lg:w-full -mx-1 lg:-mx-2">
      <div
        v-for="(item, index) in tiles"
        :key="index"
        class="p-1 xl:p-2 flex shop-bye-style overflow-hidden relative"
        :class="{
          'w-full lg:w-1/2 h-75 lg:h-146 float-left': index == 2,
          'w-1/2 lg:w-1/4 h-42 md:h-43 lg:h-71 float-right': index != 2,
        }"
      >
        <cms-link :field="item.link">
          <shop-by-style-tile :item="item" />
        </cms-link>
      </div>
    </div>
  </app-container>
</template>

<script>
import { pathOr, filter, allPass } from "ramda";

import ShopByStyleTile from "./ShopByStyleTile";

const filterItems = filter(
  allPass([
    pathOr(false, ["linkLabel", [0], "text"]),
    pathOr(false, ["link", "body", [0], "primary", "title", [0], "text"]),
    pathOr(false, ["link", "body", [0], "primary", "paragraph", [0], "text"]),
    pathOr(false, ["link", "body", [0], "primary", "banner_bg_image"]),
  ])
);

export default {
  components: { "shop-by-style-tile": ShopByStyleTile },

  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
  },

  computed: {
    items() {
      return filterItems(this.fields);
    },
    tiles() {
      let [firstItem, ...rest] = this.items;
      rest.splice(2, 0, firstItem);
      return rest.slice(0, 5);
    },
    bigTile() {
      return this.tiles.slice(0, 1)[0];
    },
    smallTiles() {
      let data = this.tiles.slice();
      return data.slice(1);
    },
  },
};
</script>

<style lang="postcss" scoped>
.shop-bye-style .caption {
  @apply invisible;
  bottom: 0.5rem;
}
.shop-bye-style:hover .caption {
  @apply visible;
}
.shop-bye-style:hover img {
  @apply -translate-y-1 scale-110;
}
.shop-bye-style:hover .shop-by-style-title em {
  @apply hidden;
}
.shop-bye-style:hover .shop-bye-style-image {
  @apply block;
}
</style>
