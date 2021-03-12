<template>
  <app-container>
    <div class="flex flex-col lg:flex-row mb-12">
      <pdp-review-points class="w-full lg:w-5/12" />
      <div class="w-full lg:w-7/12">
        <h2 v-if="reviews.length" class="text-xl text-gray-700 mb-5">
          Most helpful reviews
        </h2>

        <pdp-review-list-item
          v-for="(item, key) in reviews"
          :key="key"
          :review-item="item"
        />
        <app-button
          v-if="remainingReviews"
          size="link"
          color="link"
          :class="{
            'opacity-50 cursor-not-allowed focus:outline-none': loading,
          }"
          :disabled="loading"
          @click.native="loadMore"
        >
          <span class="flex items-center">
            Read Reviews ({{ remainingReviews }})
            <svg-icon-circle v-if="loading" class="text-gray-900 ml-2" />
          </span>
        </app-button>
      </div>
    </div>
  </app-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    productId: { type: String, required: true },
  },
  data() {
    return {
      page: 1,
      loading: false,
    };
  },
  computed: {
    ...mapState("pdp", ["bottomline", "reviews"]),
    remainingReviews() {
      return this.bottomline.total_review - this.reviews.length || 0;
    },
  },
  methods: {
    async loadMore() {
      this.loading = true;
      await this.$store.dispatch("pdp/getReviewRating", {
        productId: this.productId,
        page: this.page + 1,
      });
      this.loading = false;
    },
  },
};
</script>
