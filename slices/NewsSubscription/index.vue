<template>
  <div class="bg-gray-300" :class="primary.background_color">
    <app-container>
      <div
        class="subscribe-news-wrapper flex lg:items-center justify-between flex-col lg:flex-row py-10 lg:py-20"
      >
        <div class="lg:flex-1 self-start lg:self-center lg:mr-30 lg:mx-0">
          <cms-rich-text
            class="font-sans text-3xl leading-9 lg:leading-11 lg:text-4xl font-normal text-gray-900 mb-2"
            :field="primary.title"
          />
          <cms-rich-text
            class="font-para text-sm lg:text-base font-normal leading-5 text-gray-333 mb-4 lg:mb-0"
            :field="primary.paragraph"
          />
        </div>
        <div
          class="self-start lg:self-center w-full lg:w-2/5 sm:mx-auto lg:mx-0"
        >
          <form
            class="w-full mb-2"
            method="post"
            @submit.prevent="newsletterHandler()"
          >
            <div v-if="!hideForm" class="flex items-center mb-2">
              <input
                v-model="email"
                class="border border-gray-400 placeholder-gray-1900 bg-white w-full h-12 py-1 px-4 leading-tight text-sm text-gray-700 focus:outline-none"
                type="text"
                :placeholder="primary.email_input_placeholder"
                aria-label="Full name"
                name="email"
                @keyup="emailValidation()"
              />
              <app-button
                size="xl"
                class="flex-shrink-0 h-12 focus:outline-none py-1 px-4 font-bold tracking-wide"
                :disabled="disabled"
                @click.prevent="newsletterHandler"
              >
                {{ primary.button_label }}
              </app-button>
            </div>

            <div class="relative">
              <!-- Error Message Div -->
              <div v-if="errMessage" class="text-red-600 text-base font-para">
                <svg-icon-error-message
                  class="fill-current text-red-600 w-5 h-5 inline-block"
                />
                {{ errMessage }}
              </div>

              <!-- Succeess Message Div -->
              <div
                v-if="hideForm"
                class="text-black text-center success-message"
              >
                <strong class="text-2xl font-medium"
                  >Thanks for subscribing!</strong
                ><br />
                <p class="text-lg">
                  Check your email for a confirmation message.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </app-container>
  </div>
</template>

<script>
import { debounce } from "~/utils/underscore-utils.js";
import validation from "~/mixins/formValidation";
export default {
  mixins: [validation],
  props: {
    primary: { type: Object, default: () => {} },
  },
  data() {
    return {
      email: "",
      errMessage: "",
      disabled: false,
      hideForm: false,
    };
  },
  mounted() {
    //  ...
    this.emailValidation = debounce(this.emailValidation, 1000);
  },
  methods: {
    emailValidation() {
      if (this.email == "") {
        this.errMessage = "This field is required";
        this.disabled = true;
      } else if (this.validateEmail(this.email)) {
        this.errMessage = "";
        this.disabled = false;
      } else {
        this.errMessage = "Please enter a valid email";
        this.disabled = true;
      }
    },
    newsletterHandler() {
      this.emailValidation();
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      const url = this.$config.newsSubscriptionUrl;
      fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `email=${this.email}`,
      })
        .then(response => response.json())
        .then(data => {
          if (data.customer_id) {
            this.errMessage = "";
            this.hideForm = true;
            this.disabled = false;
          } else {
            this.errMessage = "This email has been taken";
            this.disabled = true;
          }
        })
        .catch(err => {
          console.dir("Request failed", err);
        });
    },
  },
};
</script>

<style lang="postcss" scoped>
input[type="text"]::-ms-clear {
  display: none;
}
[disabled="disabled"] {
  opacity: 0.5;
}
</style>
