<template>
  <app-container>
    <div class="contact-us-wrapper my-10">
      <div class="prose mb-4 my-10">
        <h1>Contact Us</h1>
      </div>
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="contact-us-form w-full lg:w-1/2 prose">
          <form class="w-full" novalidate @submit.prevent="sendMail">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <div class="relative">
                  <select
                    id="enquiry"
                    v-model="form.enquiry.value"
                    class="block appearance-none w-full bg-white border border-gray-500 text-gray-900 text-sm py-3 px-4 pr-8 leading-tight focus:outline-none"
                    :class="
                      form.enquiry.err ? 'border-red-500' : 'border-gray-500'
                    "
                    name="enquiry"
                    required
                    data-msg-required="Please fill this field"
                    @change="formValidation"
                  >
                    <option value="">Nature of Enquiry</option>
                    <option value="General">General</option>
                    <option value="Franchise">Franchise</option>
                    <option value="Complaints">Complaints</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
                <span v-if="form.enquiry.err" class="text-red-500 text-xs mt-2">
                  {{ form.enquiry.msg }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
                <input
                  id="firstName"
                  v-model="form.firstName.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border py-3 px-4 leading-tight focus:outline-none"
                  :class="
                    form.firstName.err ? 'border-red-500' : 'border-gray-500'
                  "
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  data-msg-required="Please fill this field"
                  @keyup="formValidation"
                />
                <span
                  v-if="form.firstName.err"
                  class="text-red-500 text-xs mt-2"
                >
                  {{ form.firstName.msg }}
                </span>
              </div>
              <div class="w-full lg:w-1/2 px-3">
                <input
                  id="lastName"
                  v-model="form.lastName.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border border-gray-500 py-3 px-4 leading-tight focus:outline-none"
                  :class="
                    form.lastName.err ? 'border-red-500' : 'border-gray-500'
                  "
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  data-msg-required="Please fill this field"
                  @keyup="formValidation"
                />
                <span
                  v-if="form.lastName.err"
                  class="text-red-500 text-xs mt-2"
                >
                  {{ form.lastName.msg }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <input
                  id="email"
                  v-model="form.email.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border py-3 px-4 leading-tight focus:outline-none"
                  :class="form.email.err ? 'border-red-500' : 'border-gray-500'"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  data-msg-required="Please fill this field"
                  data-msg-email="Please include @ and . in email address"
                  @keyup="formValidation"
                />
                <span v-if="form.email.err" class="text-red-500 text-xs mt-2">
                  {{ form.email.msg }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <input
                  id="suburb"
                  v-model="form.suburb.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border py-3 px-4 leading-tight focus:outline-none"
                  :class="
                    form.suburb.err ? 'border-red-500' : 'border-gray-500'
                  "
                  type="text"
                  name="suburb"
                  placeholder="Suburb"
                  data-msg-required="Please fill this field"
                  required
                  @keyup="formValidation"
                />
                <span v-if="form.suburb.err" class="text-red-500 text-xs mt-2">
                  {{ form.suburb.msg }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
                <input
                  id="postCode"
                  v-model="form.postCode.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border py-3 px-4 leading-tight focus:outline-none"
                  :class="
                    form.postCode.err ? 'border-red-500' : 'border-gray-500'
                  "
                  type="text"
                  placeholder="Postcode"
                  name="postCode"
                  required
                  data-msg-required="Please fill this field"
                  @keyup="formValidation"
                />
                <span
                  v-if="form.postCode.err"
                  class="text-red-500 text-xs mt-2"
                >
                  {{ form.postCode.msg }}
                </span>
              </div>
              <div class="w-full lg:w-1/2 px-3">
                <input
                  id="phoneNumber"
                  v-model="form.phoneNumber.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border border-gray-500 py-3 px-4 leading-tight focus:outline-none"
                  :class="
                    form.phoneNumber.err ? 'border-red-500' : 'border-gray-500'
                  "
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  data-msg-required="Please fill this field"
                  required
                  @keyup="formValidation"
                />
                <span
                  v-if="form.phoneNumber.err"
                  class="text-red-500 text-xs mt-2"
                >
                  {{ form.phoneNumber.msg }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <textarea
                  id="message"
                  v-model="form.message.value"
                  class="appearance-none block w-full bg-white text-gray-900 text-sm border border-gray-500 py-3 px-4 leading-tight focus:outline-none"
                  :class="
                    form.message.err ? 'border-red-500' : 'border-gray-500'
                  "
                  name="message"
                  placeholder="Message"
                  required
                  data-msg-required="Please fill this field"
                  @keyup="formValidation"
                ></textarea>
                <span v-if="form.message.err" class="text-red-500 text-xs mt-2">
                  {{ form.message.msg }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <vue-recaptcha
                  ref="recaptcha"
                  :sitekey="googleApiKey"
                  :load-recaptcha-script="true"
                  @verify="onVerify"
                  @expired="onCaptchaExpired"
                >
                </vue-recaptcha>
                <span v-if="errRobot" class="text-red-500 text-xs mt-2">
                  {{ errorRobotMsg }}
                </span>
              </div>
            </div>
            <div class="flex items-center mb-10 w-full lg:w-1/3">
              <app-button class="flex-1" type="submit" block>
                Submit
              </app-button>
            </div>
          </form>
        </div>
        <customer-service />
      </div>
    </div>
  </app-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import validation from "~/mixins/formValidation";

export default {
  components: {
    "vue-recaptcha": VueRecaptcha,
  },
  mixins: [validation],
  beforeRouteLeave(to, from, next) {
    const payload = {
      title: { text: "Contact Us" },
      url: from.fullPath,
    };
    this.$store.dispatch("app/setRedirectFrom", payload);
    next();
  },
  data() {
    return {
      form: {
        enquiry: { value: "", err: false, msg: "" },
        firstName: { value: "", err: false, msg: "" },
        lastName: { value: "", err: false, msg: "" },
        email: { value: "", err: false, msg: "" },
        suburb: { value: "", err: false, msg: "" },
        postCode: { value: "", err: false, msg: "" },
        phoneNumber: { value: "", err: false, msg: "" },
        message: { value: "", err: false, msg: "" },
      },
      isValid: true,
      robot: false,
      errRobot: false,
      errorRobotMsg: "To continue , make sure you are not a robot",
    };
  },
  computed: {
    googleApiKey() {
      return this.$config.googleRecaptchaApiKey;
    },
  },
  methods: {
    onVerify(response) {
      if (response) {
        this.robot = true;
        this.errRobot = false;
      } else {
        this.errRobot = true;
      }
    },
    onCaptchaExpired() {
      this.robot = false;
      this.$refs.recaptcha.reset();
    },
    formValidation(event) {
      const targetEle = event.target;
      const fieldName = event.target.name;
      this.form[targetEle.name].value = targetEle.value;
      if (targetEle.required) {
        if (this.form[fieldName].value == "") {
          this.form[fieldName].msg = targetEle.getAttribute(
            "data-msg-required"
          );
          this.setErrData(targetEle.name, "data-msg-required");
          return false;
        } else if (targetEle.type == "email") {
          const isValideEmail = this.validateEmail(this.form[fieldName].value);
          if (isValideEmail) {
            this.setSuccessData(fieldName);
          } else {
            this.setErrData(targetEle.name, "data-msg-email");
          }
        } else {
          this.setSuccessData(fieldName);
        }
      }
    },
    onSubmitFormValidation() {
      Object.keys(this.form).forEach(obj => {
        if (!this.form[obj].value) {
          this.setErrData(obj, "data-msg-required");
        } else if (obj == "email") {
          const isValideEmail = this.validateEmail(this.form[obj].value);
          if (isValideEmail) {
            this.setSuccessData(obj);
          } else {
            this.setErrData(obj, "data-msg-email");
          }
        }
      });
    },

    setErrData(fieldName, errAttrField) {
      this.form[fieldName].err = true;
      this.form[fieldName].msg = document
        .getElementById(fieldName)
        .getAttribute(errAttrField);
      this.isValid = false;
    },

    setSuccessData(fieldName) {
      this.form[fieldName].err = false;
      this.form[fieldName].msg = "";
    },

    sendMail() {
      this.onSubmitFormValidation();

      // check all fields is valid
      this.isValid = Object.keys(this.form).every(obj => {
        return !this.form[obj].err;
      });
      if (!this.isValid) {
        return false;
      }
      if (!this.robot) {
        this.errRobot = true;
        return false;
      }

      const dataBody = {
        enquiry: this.form.enquiry.value,
        firstName: this.form.firstName.value,
        lastName: this.form.lastName.value,
        email: this.form.email.value,
        suburb: this.form.suburb.value,
        postCode: this.form.postCode.value,
        phoneNumber: this.form.phoneNumber.value,
        message: this.form.message.value,
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
          this.$router.push({
            path: "/pages/contact-us/success",
          });
        })
        .catch(err => {
          console.dir("Request failed", err);
        });
    },
  },
};
</script>
