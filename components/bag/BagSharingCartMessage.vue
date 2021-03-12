<template>
  <div
    v-if="showShareEmailSentMessage"
    class="flex items-center bg-green-200 mb-2 px-2 py-4 lg:px-4 shadow-lg"
  >
    <svg-icon-tick-circle />
    <p class="text-sm text-gray-900 ml-2">Email sent</p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("bag", ["showShareEmailSentMessage"]),
  },
};
</script>
