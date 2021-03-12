<template>
  <div class="flex customer-review-container">
    <div
      v-for="item in siteReview"
      :key="item.id"
      class="w-1/4 px-3 customer-review-tile"
    >
      <collection-review :item="item"></collection-review>
    </div>
  </div>
</template>

<script>
import CollectionReview from "~/components/Collection/CollectionReview";

export default {
  components: {
    "collection-review": CollectionReview,
  },
  props: { siteReview: { type: Array, default: () => [] } },
};
</script>

<style lang="postcss" scoped>
.customer-review-container {
  margin-left: -9px;
}
</style>
