<template>
  <div class="flex items-center">
    <svg
      v-for="(star, index) in stars"
      :key="index"
      class="flex mr-2"
      :width="width"
      :height="height"
      fill="none"
      :viewBox="viewBox"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        :points="starPointsToString"
        :stroke="style.fullStarColor"
        stroke-width="4"
        :fill="`url(#gradient${star.raw})`"
      />
      <polygon
        :points="starPointsToString"
        :fill="`url(#gradient${star.raw})`"
      />
      <defs>
        <!--
            id has to be unique to each star fullness(dynamic offset) - it indicates fullness above
          -->
        <linearGradient
          :id="`gradient${star.raw}`"
          x1="0"
          x2="100%"
          y1="0"
          y2="0"
        >
          <stop
            id="stop1"
            :offset="star.percent"
            :stop-color="style.fullStarColor"
          ></stop>
          <stop
            id="stop2"
            :offset="star.percent"
            :stop-color="style.emptyStarColor"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
    <div v-if="isIndicatorActive" class="indicator">{{ config.rating }}</div>
  </div>
</template>

<script>
import { starPointsList } from "../app.config";
import { colors } from "~/colors.config";

export default {
  props: {
    rating: { type: Number, default: () => {} },
    width: { type: Number, default: 24 },
    height: { type: Number, default: 24 },
    customerRatingViewBox: { type: String, default: "" },
  },
  data: () => ({
    starPoints: starPointsList,
    stars: [],
    emptyStar: 0,
    fullStar: 1,
    totalStars: 5,
    isIndicatorActive: false,
    style: {
      fullStarColor: colors.brown[100],
      emptyStarColor: colors.white,
    },
  }),
  computed: {
    starPointsToString() {
      return this.starPoints.join(",");
    },
    maxSize() {
      return this.starPoints.reduce(function (a, b) {
        return Math.max(a, b);
      });
    },
    viewBox() {
      if (this.customerRatingViewBox) return this.customerRatingViewBox;
      return `0 0 ${this.maxSize + 4} ${this.maxSize + 2}`;
    },
  },
  watch: {
    rating: {
      immediate: true,
      handler() {
        this.stars = [];
        this.initStars();
        this.setStars();
        this.calculatePoints();
      },
    },
  },
  methods: {
    initStars() {
      for (let i = 0; i < this.totalStars; i++) {
        this.stars.push({
          raw: this.emptyStar,
          percent: this.emptyStar + "%",
        });
      }
    },

    setStars() {
      let fullStarsCounter = Math.floor(this.rating);
      for (let i = 0; i < this.stars.length; i++) {
        if (fullStarsCounter !== 0) {
          this.stars[i].raw = this.fullStar;
          this.stars[i].percent = this.calcStarFullness(this.stars[i]);
          fullStarsCounter--;
        } else {
          let surplus = Math.round((this.rating % 1) * 10) / 10;
          // Support just one decimal
          let roundedOneDecimalPoint = Math.round(surplus * 10) / 10;
          this.stars[i].raw = roundedOneDecimalPoint;
          return (this.stars[i].percent = this.calcStarFullness(this.stars[i]));
        }
      }
    },
    calculatePoints() {
      this.starPoints = this.starPoints.map((point, i) => {
        const offset = i % 2 === 0 ? 4 * 1.5 : 0;
        return (20 / 30) * point + offset;
      });
    },
    calcStarFullness(starData) {
      let starFullnessPercent = starData.raw * 100 + "%";
      return starFullnessPercent;
    },
  },
};
</script>
