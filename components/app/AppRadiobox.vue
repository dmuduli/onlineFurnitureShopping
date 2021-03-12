<template>
  <label
    class="relative flex mb-2 text-gray-900 cursor-pointer"
    @click="changeHandler"
  >
    <span class="mr-3 leading-tight custom-radio-button">
      <svg-radio-button-checked v-if="isChecked" />
      <svg-radio-button-unchecked v-else />
    </span>
    <input
      type="radio"
      class="absolute appearance-none outline-none w-4 h-4 cursor-pointer bg-transparent"
      :default-value="defaultValue"
    />
    <slot>Please put label here</slot>
  </label>
</template>

<script>
export default {
  model: { prop: "selected", event: "change" },
  props: {
    defaultValue: { type: String, default: "" },
    selected: { type: String, default: "" },
  },
  data() {
    return { isChecked: this.defaultValue == this.selected };
  },
  watch: {
    selected: {
      immediate: true,
      handler(value) {
        this.isChecked = value == this.defaultValue;
      },
    },
  },
  methods: {
    changeHandler() {
      this.$emit("change", this.defaultValue);
    },
  },
};
</script>

<style scoped lang="postcss">
input::-ms-check {
  @apply hidden;
}
</style>
