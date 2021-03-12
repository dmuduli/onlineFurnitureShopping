<template>
  <app-container>
    <div class="flex justify-between items-center py-6 md:py-5">
      <!-- Removing back button as per client feedback
      <app-button
        icon
        class="flex items-center font-sans text-xs font-normal text-black"
        @click.native="onBackClick"
      >
        <svg-icon-back-arrow class="mr-2" />
        <span class="font-para text-xs leading-normal font-normal text-black">
          Back
        </span>
      </app-button> -->
      <div
        class="flex items-center font-sans text-base font-normal text-gray-767 leading-tight"
      >
        <nuxt-link
          to="/"
          class="font-para text-xs leading-normal font-normal text-gray-767 mr-2"
        >
          Home
        </nuxt-link>
        <div v-if="isPdp" class="inline-flex items-center">
          <span
            v-for="(item, index) in breadCrumbs"
            :key="index"
            class="inline-flex items-center"
          >
            /
            <nuxt-link
              v-if="item.url"
              :to="item.url"
              class="font-para text-xs leading-normal font-normal text-gray-767 mx-2"
            >
              {{ item.pageTitle }}
            </nuxt-link>
            <span
              v-else
              class="inline-block font-para text-xs font-normal text-black ml-2 capitalize"
              >{{ item.pageTitle }}</span
            >
          </span>
        </div>
        <div v-else class="inline-flex items-center">
          /
          <cms-rich-text
            :field="pageName"
            class="inline-block font-para text-xs font-normal text-black ml-2 capitalize"
          />
        </div>
      </div>
    </div>
  </app-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    pageName: { type: Array, default: () => [] },
    isPdp: { type: Boolean, default: () => false },
  },
  computed: {
    ...mapState("app", ["redirectFrom"]),
    breadCrumbs() {
      let newArr = [];
      if (
        this.redirectFrom.url.includes("collections") ||
        this.redirectFrom.url.includes("cart")
      ) {
        newArr = [this.redirectFrom, ...this.pageName];
        return newArr;
      }
      return [...this.pageName];
    },
  },
  methods: {
    // onBackClick() {
    //   this.$router.back();
    // },
  },
};
</script>
