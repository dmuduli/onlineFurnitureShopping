export default {
  methods: {
    validateEmail(email) {
      /* eslint-disable no-useless-escape */
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateLengthNumber(value) {
      const re = /^[0-9]{10}$/;
      return re.test(value);
    },
    fieldValidation(target) {
      let obj = {};
      let errObj = {};
      let successObj = {};
      const targetEle = target;
      const fieldName = targetEle.name;
      obj.value = targetEle.value;
      if (targetEle.required) {
        if (targetEle.value == "") {
          obj.msg = targetEle.getAttribute("data-msg-required");
          errObj = this.setErrData(targetEle.name, "data-msg-required");
          obj = {
            ...obj,
            ...errObj,
          };
          return obj;
        } else if (targetEle.type == "email") {
          const isValideEmail = this.validateEmail(obj.value);
          if (isValideEmail) {
            successObj = this.setSuccessData(fieldName);
          } else {
            errObj = this.setErrData(targetEle.name, "data-msg-email");
          }
        } else if (targetEle.dataset.length) {
          const isValidNumber = this.validateLengthNumber(obj.value);
          if (isValidNumber) {
            successObj = this.setSuccessData(fieldName);
          } else {
            errObj = this.setErrData(targetEle.name, "data-msg-digits");
          }
        } else {
          successObj = this.setSuccessData(fieldName);
        }
        return { ...obj, ...errObj, ...successObj };
      }
    },
    setErrData(fieldName, errAttrField) {
      const err = true;
      const msg = document.getElementById(fieldName).getAttribute(errAttrField);
      const isValid = false;
      return {
        err,
        msg,
        isValid,
      };
    },

    setSuccessData(fieldName) {
      return {
        err: false,
        msg: "",
      };
    },
    // form validation and helper methods
    hasErros() {
      let errors = false;
      for (const value of Object.values(this.errors)) {
        if (value.length >= 1) {
          errors = true;
          break;
        }
      }

      return errors;
    },
  },
};
