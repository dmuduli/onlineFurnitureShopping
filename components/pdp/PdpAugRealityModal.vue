<template>
  <div class="relative">
    <div
      v-if="threeDUrl != ''"
      class="cursor-pointer absolute right-4 lg:right-8 bottom-10 lg:bottom-20 z-10"
      @click="showModal = true"
    >
      <svg-icon-3d-rotation />
    </div>
    <div
      v-if="showModal"
      class="instagram-modal-wrapper opened z-20 h-full w-full flex justify-center items-center fixed inset-0"
      aria-hidden="true"
    >
      <!-- overlay -->
      <div
        class="z-30 fixed h-full w-full inset-0 bg-black bg-opacity-75"
        @click="closeModal"
      />
      <div
        class="modal-dialog items-start flex xl:items-center justify-center w-full h-full z-30 transition duration-300 ease-in-out bg-white relative"
      >
        <iframe
          ref="frame"
          :src="embedUrl"
          class="h-full w-full"
          allow="camera; vr; autoplay"
          allowfullscreen
        />
        <div
          class="closemodal text-xl absolute cursor-pointer"
          aria-hidden="true"
          @click="showModal = false"
        >
          &times;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { threeDUrl: { type: String, default: "" } },

  data: () => ({ showModal: false }),

  computed: {
    embedUrl() {
      return `${this.$config.augModalUrl}?sceneId=${this.threeDUrl}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.closemodal {
  right: 10px;
  top: 1px;
}
.closemodal {
  right: 10px;
  top: 1px;
}
.modal-dialog {
  width: 96%;
  height: 80vh;
  overflow: auto;
  top: 30px;
}
@screen lg {
  .modal-dialog {
    width: 800px;
    height: 500px;
    top: 0;
  }
}
@screen xl {
  .modal-dialog {
    width: 1000px;
    height: 650px;
  }
}
</style>
