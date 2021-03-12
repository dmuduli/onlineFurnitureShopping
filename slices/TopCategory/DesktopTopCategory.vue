<template>
  <div>
    <div class="flex flex-wrap -mx-3">
      <collection-tile
        v-for="(item, index) in fields.slice(0, 4)"
        :key="index"
        :item="item.link"
        class="w-full lg:w-1/4 px-3 mb-4 lg:mb-0 overflow-hidden relative"
      />
    </div>
  </div>
</template>

<script>
import CollectionTile from "~/components/Collection/CollectionTile";

export default {
  name: "TopCategryDesktop",
  components: {
    "collection-tile": CollectionTile,
  },
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => {} },
  },
};
</script>
