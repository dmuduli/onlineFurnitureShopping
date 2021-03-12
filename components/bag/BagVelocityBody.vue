<template>
  <div class="accordion-content text-sm leading-5 mt-8 text-gray-450 font-para">
    <div class="input-form">
      <bag-velocity-form v-if="!velocityLineItem" />
      <template v-else>
        <p class="w-full">
          Your Velocity account has been linked: <br />
          {{ `${firstName} ${lastName}, ${accNumber}` }}
        </p>
        <p class="mt-4">
          You’ll earn <strong>{{ velocityPoints }}</strong> points today!
        </p>
        <button
          class="font-sans uppercase font-medium mt-8 border-b-2 border-gray-500 hover:border-gray-900 pb-1 text-gray-1500"
          @click="removeVelocity"
        >
          {{ unlinkLoading ? "Unlinking ..." : "Unlink my account" }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { compose, filter, propEq, path } from "ramda";
import { mapGetters } from "vuex";

const getCustomAttribute = attr =>
  compose(path([[0], "value"]), filter(propEq("key", attr)));

export default {
  data: () => ({ unlinkLoading: false }),
  computed: {
    ...mapGetters("checkout", ["velocityLineItem"]),
    ...mapGetters("velocity", ["velocityPoints"]),
    customAttributes() {
      return this.velocityLineItem.customAttributes;
    },
    firstName() {
      return getCustomAttribute("firstName")(this.customAttributes);
    },
    lastName() {
      return getCustomAttribute("lastName")(this.customAttributes);
    },
    accNumber() {
      return getCustomAttribute("accNumber")(this.customAttributes);
    },
  },
  methods: {
    async removeVelocity() {
      this.unlinkLoading = true;
      const payload = [this.velocityLineItem.id];
      await this.$store.dispatch("checkout/REMOVE_LINE_ITEM", payload);
      this.unlinkLoading = false;
    },
  },
};
</script>
