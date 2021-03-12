<template>
  <form id="velocityForm" novalidate @submit.prevent="submitVelocityForm">
    <div class="form-row mb-5">
      <input
        id="first_name"
        v-model="form.first_name.value"
        name="first_name"
        class="text-input w-full text-sm text-gray-700 placeholder-gray-600 border font-para px-4 py-3 border-gray-500"
        :class="form.first_name.err ? 'border-red-500' : 'border-gray-500'"
        type="text"
        placeholder="First Name"
        required
        data-msg-required="Please enter your first name."
        @keyup="formValidation"
        @blur="formValidation"
      />
      <span v-if="form.first_name.err" class="text-red-500 text-xs mt-2">
        {{ form.first_name.msg }}
      </span>
    </div>
    <div class="form-row mb-5">
      <input
        id="last_name"
        v-model="form.last_name.value"
        name="last_name"
        class="text-input w-full text-sm text-gray-700 placeholder-gray-600 border font-para px-4 py-3 border-gray-500"
        :class="form.last_name.err ? 'border-red-500' : 'border-gray-500'"
        type="text"
        placeholder="Last Name"
        required
        data-msg-required="Please enter your last name."
        @keyup="formValidation"
        @blur="formValidation"
      />
      <span v-if="form.last_name.err" class="text-red-500 text-xs mt-2">
        {{ form.last_name.msg }}
      </span>
    </div>
    <div class="form-row mb-5">
      <input
        id="velocity_id"
        v-model="form.velocity_id.value"
        name="velocity_id"
        class="text-input w-full text-sm text-gray-700 placeholder-gray-600 border font-para px-4 py-3 border-gray-500"
        :class="form.velocity_id.err ? 'border-red-500' : 'border-gray-500'"
        type="text"
        data-length="10"
        placeholder="Account number"
        required
        data-msg-required="Please enter your Velocity member number."
        data-msg-digits="Your Velocity membership ID should be a digit 10 number."
        @keyup="formValidation"
        @blur="formValidation"
      />
      <span v-if="form.velocity_id.err" class="text-red-500 text-xs mt-2">
        {{ form.velocity_id.msg }}
      </span>
    </div>
    <div class="form-row action-cta mt-8">
      <app-button
        class="bg-gray-500 hover:bg-gray-600 transition-colors duration-1000 ease-in-out text-white py-2 px-10 w-full focus:outline-none font-sans font-normal uppercase"
        type="submit"
        :class="{
          'opacity-50 cursor-not-allowed': loading,
          'focus:outline-none': loading,
        }"
        :disabled="loading"
        w-full
      >
        <span v-if="loading"><svg-icon-circle class="w-full" /></span>
        <span v-else>Link my account</span>
      </app-button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import validation from "~/mixins/formValidation";

export default {
  mixins: [validation],
  data() {
    return {
      form: {
        first_name: { value: "", err: false, msg: "", isValid: true },
        last_name: { value: "", err: false, msg: "", isValid: false },
        velocity_id: { value: "", err: false, msg: "", isValid: false },
      },
      isValid: true,
      // velocityPoints: "",
      loading: false,
    };
  },
  computed: {
    ...mapState("bag", ["velocityVariantId"]),
    ...mapGetters("checkout", ["velocityLineItem"]),
    ...mapState({ appEndPoint: s => s.siteConfig.appEndPoint }),
    velocityStorefrontId() {
      return btoa(`gid://shopify/ProductVariant/${this.velocityVariantId}`);
    },
  },
  methods: {
    formValidation(event) {
      const fieldName = event.target.name;
      const fieldObj = this.fieldValidation(event.target);
      this.form[fieldName] = fieldObj;
    },
    submitVelocityForm(e) {
      const formEle = document.getElementById(e.target.id).elements;
      for (let i = 0; i < formEle.length; i++) {
        if (formEle[i].required) {
          const fieldObj = this.fieldValidation(formEle[i]);
          this.form[formEle[i].id] = fieldObj;
        }
      }
      // check all fields is valid
      this.isValid = Object.keys(this.form).every(obj => {
        return !this.form[obj].err;
      });
      if (!this.isValid) {
        return false;
      }
      this.postVelocityapi();
    },

    async postVelocityapi() {
      this.loading = true;
      const payload = {
        firstName: this.form.first_name.value,
        lastName: this.form.last_name.value,
        velocityId: this.form.velocity_id.value,
      };
      const { data } = await this.$axios.post(
        `${this.appEndPoint}/api/bag/velocity`,
        payload
      );
      if (data.status == "success") {
        if (data.data.valid) {
          // add velocity in line item
          await this.addVelocityInLineItem();
        } else {
          Object.keys(data.data.errors).forEach((item, keys) => {
            this.form[item].msg = data.data.errors[item];
            this.form[item].err = true;
          });
        }
      }
      this.loading = false;
    },

    async addVelocityInLineItem(value) {
      const payload = [
        {
          variantId: this.velocityStorefrontId,
          customAttributes: [
            { firstName: this.form.first_name.value },
            { lastName: this.form.last_name.value },
            { velocityMemberNumber: this.form.velocity_id.value },
          ],
        },
      ];
      await this.$store.dispatch("checkout/ADD_LINE_ITEM", payload);
    },
    async removeVelocity() {
      const payload = [this.velocityLineItem.id];
      await this.$store.dispatch("checkout/REMOVE_LINE_ITEM", payload);
    },
  },
};
</script>
