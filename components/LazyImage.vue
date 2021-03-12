<template>
  <div class="w-full">
    <img
      v-if="src"
      ref="image"
      :src="src"
      class="w-full h-full"
      alt="loading..."
    />
    <p v-else class="w-full h-full text-center pt-32">No image</p>
    <LoadingIcon v-if="state == 'loading'" class="absolute" />
  </div>
</template>

<script>
const States = {
  PENDING: "pending",
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed",
};

export default {
  props: { src: { type: String, default: "" } },
  data() {
    return { isImageLoading: true, state: States.PENDING, img: null };
  },
  mounted() {
    this.createLoader();
    this.state = States.LOADING;
  },
  methods: {
    createLoader() {
      this.destroyLoader();
      this.img = new Image();
      this.img.onload = this.handleLoad;
      this.img.onerror = this.handleError;
      this.img.src = this.src;
    },
    destroyLoader() {
      if (this.img) {
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
    },
    handleLoad() {
      this.destroyLoader();
      this.state = States.LOADED;
      this.isImageLoading = false;
    },
    handleError() {
      this.destroyLoader();
      this.state = States.FAILED;
      this.isImageLoading = false;
    },
  },
};
</script>
