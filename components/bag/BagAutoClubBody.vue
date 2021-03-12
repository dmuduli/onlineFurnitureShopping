<template>
  <div
    v-if="!autoClubLineItem"
    class="accordion-content text-sm mt-8 text-gray-1200 font-para"
  >
    <bag-auto-club-form />
  </div>
  <div
    v-else
    class="accordion-content text-sm leading-5 mt-8 text-gray-1200 font-para"
  >
    <p>Your {{ club }} Membership has been linked: {{ number }}</p>
    <button
      class="font-sans uppercase font-medium mt-8 border-b-2 border-gray-500 hover:border-gray-900 pb-1 text-gray-1500"
      :class="{
        'cursor-not-allowed focus:outline-none': unlinkLoading,
      }"
      :disabled="unlinkLoading"
      @click="removeAutoClub"
    >
      {{ unlinkLoading ? "Unlinking..." : "Unlink my account" }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { compose, filter, propEq, path } from "ramda";

const getCustomAttribute = attr =>
  compose(path([[0], "value"]), filter(propEq("key", attr)));

export default {
  data: () => ({ unlinkLoading: false }),
  computed: {
    ...mapGetters("checkout", ["autoClubLineItem"]),
    customAttributes() {
      return this.autoClubLineItem.customAttributes;
    },
    number() {
      return getCustomAttribute("number")(this.customAttributes);
    },
    club() {
      return getCustomAttribute("club")(this.customAttributes);
    },
  },
  methods: {
    async removeAutoClub() {
      this.unlinkLoading = true;
      const payload = [this.autoClubLineItem.id];
      await this.$store.dispatch("checkout/REMOVE_LINE_ITEM", payload);
      this.unlinkLoading = false;
    },
  },
};
</script>
