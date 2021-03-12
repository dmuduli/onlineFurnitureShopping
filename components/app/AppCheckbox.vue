<template>
  <label class="relative flex items-center mb-6 text-gray-900 cursor-pointer">
    <span class="mr-4 leading-tight">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current w-4.5 h-4.5 text-brown-100"
        viewBox="0 0 24 24"
        role="img"
      >
        <rect
          width="18"
          height="18"
          class="fill-current text-white"
          x="0.25"
          y="0.25"
        ></rect>
        <path
          v-if="isChecked"
          d="M0 0v24h24v-24h-24zm11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z"
        ></path>

        <path v-else d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"></path>
      </svg>
    </span>
    <input
      type="checkbox"
      class="absolute appearance-none outline-none w-4 h-4 cursor-pointer bg-transparent"
      :checked="checked"
      @change="checkBoxClick"
    />
    <slot>Please put label here</slot>
  </label>
</template>

<script>
export default {
  model: { prop: "checked", event: "change" },
  props: {
    checked: { type: Boolean, default: false },
  },
  data() {
    return { isChecked: this.checked };
  },
  watch: {
    checked: {
      immediate: true,
      handler(value) {
        this.isChecked = value;
      },
    },
  },
  methods: {
    checkBoxClick() {
      this.isChecked = !this.isChecked;
      this.$emit("change");
    },
  },
};
</script>

<style scoped lang="postcss">
input::-ms-check {
  @apply hidden;
}
</style>
