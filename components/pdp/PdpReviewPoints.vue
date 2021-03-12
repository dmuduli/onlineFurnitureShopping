<template>
  <div>
    <h2 class="text-3xl text-gray-700 mb-4">Customer Ratings & Reviews</h2>
    <div class="w-full lg:w-10/12">
      <div class="mb-8 flex items-center">
        <rating-stars
          :rating="bottomline.average_score"
          :width="26"
          :height="26"
        />
        <div class="">
          <span
            v-if="bottomline.average_score"
            class="text-base font-bold text-gray-700 ml-2 font-para"
          >
            {{ bottomline.average_score.toFixed(1) }}/5
          </span>
          <span class="text-sm font-normal text-gray-333 ml-1 font-para">
            ({{ bottomline.total_review }} Reviews)
          </span>
        </div>
      </div>

      <pdp-review-custom-rating
        v-for="item in customRating"
        :key="item.title"
        :rating="item"
      />
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("pdp", ["bottomline"]),
    customRating() {
      const fields = pathOr({}, ["custom_fields_bottomline"], this.bottomline);

      return Object.keys(fields).map((item, key) => {
        return {
          title: fields[item].title,
          averageScore: fields[item].average_score,
        };
      });
    },
  },
};
</script>
