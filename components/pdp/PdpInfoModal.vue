<template>
  <div
    v-if="showDialog"
    class="absolute m-auto z-20 feature-detail bg-white shadow tooltip border min-w-48 info-modal-wrapper"
  >
    <div class="flex justify-between pt-4 pr-4 w-full">
      <div
        class="text-base font-medium capitalize text-gray-700 px-6 flex-shrink"
      >
        <slot name="title"></slot>
      </div>
      <svg-icon-close
        class="cursor-pointer w-3 h-3 flex-shrink-0"
        aria-hidden="true"
        @click.native="closeModal"
      />
    </div>
    <slot name="information"></slot>
  </div>
</template>

<script>
export default {
  props: {
    infoDialog: { type: Boolean, default: () => false },
  },
  computed: {
    showDialog() {
      return this.infoDialog;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
