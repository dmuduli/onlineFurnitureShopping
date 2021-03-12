<template>
  <form novalidate @submit.prevent="submit">
    <div class="form-row flex flex-wrap">
      <input
        v-model="email"
        class="text-input text-sm text-gray-700 placeholder-gray-600 border font-para px-4 py-3 border-gray-500 flex-1"
        :class="{ 'border-red-500': errors.length }"
        type="email"
        placeholder="Your email address"
        @blur="validate"
      />
      <app-button
        class="bg-gray-500 mt-8 md:mt-0 hover:bg-gray-600 transition-colors duration-1000 ease-in-out text-white py-2 px-10 w-full lg:w-auto focus:outline-none font-sans font-normal uppercase mx-auto"
        :class="{
          'opacity-50 cursor-not-allowed focus:outline-none': loading,
        }"
        type="submit"
        :disabled="loading"
        block
      >
        <svg-icon-circle v-if="loading" class="w-full md:w-auto" />
        <span v-else>Sign In</span>
      </app-button>
      <span
        v-if="errors.length"
        class="text-red-500 text-xs mt-2 w-full block flex-none"
      >
        {{ errors[0] }}
      </span>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

import validation from "~/mixins/formValidation";

export default {
  mixins: [validation],
  data: () => ({ email: "", errors: [], loading: false }),
  computed: {
    ...mapState("bag", ["membershipVariantId"]),
    membershipStorefrontId() {
      return btoa(`gid://shopify/ProductVariant/${this.membershipVariantId}`);
    },
  },
  methods: {
    validate() {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Please enter your email address.");
      }

      if (!this.validateEmail(this.email)) {
        this.errors.push("Please check your email address is valid.");
      }
    },
    async submit() {
      this.loading = true;
      this.validate();
      if (this.hasErros()) {
        this.loading = false;
        return;
      }

      let isResponseOK = true;
      const url = `${this.$config.joinMembershipUrl}api/member/check?email=${this.email}`;
      let response;
      try {
        ({ data: response } = await this.$axios.get(url));
        if (!response.email) {
          isResponseOK = false;
        }
      } catch (err) {
        isResponseOK = false;
      }

      if (isResponseOK) {
        this.errors = [];
        await this.addMembership(response.id);
      } else {
        this.errors.push(
          "Looks like you are not a Snooze Member yet, you can easily join via the Join Now button."
        );
      }

      this.loading = false;
    },

    async addMembership(memberId) {
      const payload = [
        {
          variantId: this.membershipStorefrontId,
          customAttributes: [{ email: this.email, memberId }],
        },
      ];
      await this.$store.dispatch("checkout/ADD_LINE_ITEM", payload);
    },
  },
};
</script>
