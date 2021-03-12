<template>
  <div class="input-form">
    <form novalidation @submit.prevent="submit">
      <div class="form-row mb-5 relative">
        <label
          class="text-label text-xs text-black block mb-1 font-sans font-normal"
        >
          Select your Auto Club
        </label>
        <div class="dropdown relative">
          <select
            v-model="club"
            class="block appearance-none w-full bg-white border border-gray-500 text-gray-900 text-sm py-3 px-4 pr-8 leading-tight focus:outline-none"
            :class="{ 'border-red-500': errors.club.length }"
            @blur="validateClub"
          >
            <option disabled :value="null">Auto Club</option>
            <option v-for="option in clubOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <svg-icon-down-arrow
            class="absolute right-4 top-7 -mt-2"
            @click="isDialogOpen = !isDialogOpen"
          />
          <span v-if="errors.club.length" class="text-red-500 text-xs mt-2">
            {{ errors.club[0] }}
          </span>
        </div>
      </div>
      <div class="form-row mb-5">
        <input
          v-model="number"
          class="text-input w-full text-sm text-gray-700 placeholder-gray-600 border font-para px-4 py-3 border-gray-500"
          :class="{ 'border-red-500': errors.number.length }"
          type="text"
          placeholder="Membership number"
          @blur="validateNumber"
        />
        <span v-if="errors.number.length" class="text-red-500 text-xs mt-2">
          {{ errors.number[0] }}
        </span>
      </div>
      <div class="form-row action-cta mt-8">
        <app-button
          class="px-8 w-full font-sans text-xs"
          font-weight="bold"
          type="submit"
          :class="{
            'opacity-50 cursor-not-allowed focus:outline-none': checkMemershipLoading,
          }"
          w-full
        >
          <svg-icon-circle v-if="checkMemershipLoading" class="w-full" />
          <span v-else>Check Membership</span>
        </app-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

import validation from "~/mixins/formValidation";

export default {
  mixins: [validation],
  data: () => ({
    number: null,
    club: null,
    errors: { number: [], club: [] },
    checkMemershipLoading: false,
  }),
  computed: {
    ...mapState({ appEndPoint: s => s.siteConfig.appEndPoint }),
    ...mapState("bag", ["autoClubVariantId"]),
    clubOptions() {
      return ["AANT", "NRMA", "RAA", "RACQ", "RACT", "RACV", "RAC"];
    },
    autoClubStorefrontId() {
      return btoa(`gid://shopify/ProductVariant/${this.autoClubVariantId}`);
    },
  },
  methods: {
    initValidations() {
      this.errors = { club: [], number: [] };
    },
    validateNumber() {
      this.errors.number = [];
      if (!this.number) {
        this.errors.number.push("Please enter your member number");
      }
    },
    validateClub() {
      this.errors.club = [];
      if (!this.club) {
        this.errors.club.push("Please select your membership type");
      }
    },
    validate() {
      this.validateNumber();
      this.validateClub();
    },
    async submit(e) {
      this.checkMemershipLoading = true;
      this.validate();
      if (this.hasErros()) {
        this.checkMemershipLoading = false;
        return;
      }

      let isResponseOK = true;
      try {
        const body = { number: this.number, club: this.club };
        const { data } = await this.$axios.post(
          `${this.appEndPoint}/api/bag/auto-club`,
          body
        );
        if (data.status !== "success") {
          isResponseOK = false;
        }
      } catch (e) {
        isResponseOK = false;
      }

      if (isResponseOK) {
        this.initValidations();
        await this.addAutoClub();
      } else {
        this.errors.number.push(
          "Invalid Auto Club number. Please check your membership and try again."
        );
      }
      this.checkMemershipLoading = false;
    },
    async addAutoClub() {
      const payload = [
        {
          variantId: this.autoClubStorefrontId,
          customAttributes: [{ number: this.number }, { club: this.club }],
        },
      ];
      await this.$store.dispatch("checkout/ADD_LINE_ITEM", payload);
    },
  },
};
</script>
