<template>
  <div
    class="fixed inset-0 lg:m-auto bg-white shadow-lg w-full lg:w-79 h-74 p-6 lg:z-20 z-50 top-0"
  >
    <div class="flex items-end mb-6">
      <app-button
        color="black"
        block
        icon="icon"
        class="ml-auto"
        @click.native="$emit('close-sharing-modal')"
      >
        <svg-icon-cross />
      </app-button>
    </div>
    <div class="flex flex-col justify-center">
      <div class="text-2xl text-black mb-8 text-center">Share your Bag</div>
      <div class="mb-6">
        <input
          v-model="email"
          type="text"
          placeholder="Email address"
          class="border border-gray-300 w-full p-4"
          :class="{ 'border-red-500': errors.length }"
          @blur="validate"
        />
        <span v-if="errors.length" class="text-red-500 text-xs mt-2 leading-4">
          {{ errors[0] }}
        </span>
      </div>
      <app-button
        :class="{
          'opacity-50 cursor-not-allowed focus:outline-none': loading,
        }"
        color="black"
        :disabled="loading"
        block
        @click.native="submit"
      >
        <span v-if="loading"><svg-icon-circle class="w-full" /></span>
        <span v-else>Send Email</span>
      </app-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import validation from "~/mixins/formValidation";
import { getPdpUrl } from "~/utils/shopify-utils";

export default {
  mixins: [validation],
  data: () => ({ email: "", errors: [], loading: false }),
  computed: {
    ...mapGetters("checkout", ["visibleLineItems"]),
    ...mapState("checkout", ["checkout"]),
    ...mapState({ appEndPoint: s => s.siteConfig.appEndPoint }),
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

      const result = await this.$axios.post(
        `${this.appEndPoint}/api/bag/share-cart`,
        {
          email: this.email,
          checkoutUrl: this.checkout.webUrl,
          cartItems: this.createPdpData(),
        }
      );

      if (result.status === 500) {
        this.errors.push(result.data.message);
        this.loading = false;
        return;
      }
      this.$emit("email-sent"); // for closing modal
      this.$store.dispatch("bag/setShareCardMailMessage");
      this.loading = false;
    },
    createPdpData() {
      return this.visibleLineItems.map(item => ({
        title: item.title,
        quantity: item.quantity,
        url:
          this.appEndPoint +
          getPdpUrl(item.variant.id, item.variant.product.handle),
      }));
    },
  },
};
</script>
