<template>
  <div class="mb-5 flex items-center">
    <rating-stars :rating="rating" :width="18" :height="18" />
    <span class="text-xs leading-4 font-para font-normal text-gray-900 ml-2">
      ({{ reviewsCount }})
    </span>
  </div>
</template>

<script>
export default {
  props: {
    reviewsAverage: { type: [String, Number], default: "0" },
    reviewsCount: { type: [String, Number], default: "0" },
  },
  computed: {
    rating() {
      return Number(this.reviewsAverage);
    },
  },
};
</script>
