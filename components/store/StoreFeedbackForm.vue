<template>
  <div v-scrollanimation class="w-full">
    <div v-if="success" class="text-center text-gray-555 pb-20">
      <figure class="mb-4 inline-block">
        <img src="~/assets/images/check-icon.png" alt="Success icon" />
      </figure>
      <h3 class="mb-4 text-2xl">Thank You!</h3>
      <p class="text-sm">Your submission has been received.</p>
    </div>
    <div v-else>
      <div class="max-w-none mb-6">
        <h3 class="text-2xl text-center mb-1">Feedback</h3>
        <p class="text-base text-center mb-6">
          At Snooze we really value your feedback
        </p>
      </div>
      <form
        v-if="!success"
        id="feedbackform"
        class="w-full lg:max-w-xl mx-auto"
        novalidate
        @submit.prevent="sendMail"
      >
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
            <input
              id="name"
              v-model="form.name.value"
              type="text"
              name="name"
              placeholder="Name"
              class="appearance-none block w-full bg-white text-gray-900 text-sm border border-gray-500 py-3 px-4 leading-tight focus:outline-none"
            />
          </div>
          <div class="w-full lg:w-1/2 px-3">
            <input
              id="email"
              v-model="form.email.value"
              :class="form.email.err ? 'border-red-500' : 'border-gray-500'"
              type="email"
              name="email"
              placeholder="Email"
              class="appearance-none block w-full bg-white text-gray-900 text-sm border border-gray-500 py-3 px-4 leading-tight focus:outline-none"
              required
              data-msg-required="This field is required."
              data-msg-email="Enter a valid e-mail address"
              @keyup="formValidation"
              @blur="formValidation"
            />
            <span v-if="form.email.err" class="text-red-500 text-xs mt-2">
              {{ form.email.msg }}
            </span>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <textarea
              id="message"
              v-model="form.message.value"
              class="appearance-none block w-full bg-white text-gray-900 text-sm border border-gray-500 py-3 px-4 leading-tight focus:outline-none"
              :class="form.message.err ? 'border-red-500' : 'border-gray-500'"
              name="message"
              required
              data-msg-required="This field is required"
              @keyup="formValidation"
              @blur="formValidation"
            ></textarea>
            <span v-if="form.message.err" class="text-red-500 text-xs mt-2">
              {{ form.message.msg }}
            </span>
          </div>
        </div>
        <div class="flex items-center my-10">
          <app-button
            class="bg-gray-500 hover:bg-gray-600 transition-colors duration-1000 ease-in-out text-white py-2 px-10 w-full lg:w-auto focus:outline-none text-sm font-normal uppercase mx-auto"
            type="submit"
            block
          >
            Send
          </app-button>
        </div>
        <div v-if="!isValid" class="my-10 text-center">
          <span class="text-red-500 text-xs mt-2">
            There are errors on the form. Please fix them before continuing.
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import validation from "~/mixins/formValidation";
export default {
  mixins: [validation],
  data() {
    return {
      form: {
        name: { value: "", err: false, msg: "", isValid: true },
        email: { value: "", err: false, msg: "", isValid: false },
        message: { value: "", err: false, msg: "", isValid: false },
      },
      isValid: true,
      errorMsg: "To continue , make sure you are not a robot",
      success: false,
    };
  },
  methods: {
    formValidation(event) {
      const fieldName = event.target.name;
      const fieldObj = this.fieldValidation(event.target);
      this.form[fieldName] = fieldObj;
    },

    sendMail(e) {
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
      const dataBody = {
        name: this.form.name.value,
        email: this.form.email.value,
        message: this.form.message.value,
        formName: "feedback",
      };

      fetch("/api/send-mail", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      })
        .then(response => response.json())
        .then(data => {
          this.success = true;
        })
        .catch(err => {
          console.dir("Request failed", err);
        });
    },
  },
};
</script>
