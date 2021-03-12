<template>
  <div>
    <!-- Modal Window-->
    <div
      v-if="showModal"
      class="join-now-modal-wrapper z-20 h-full w-full flex justify-center items-center fixed inset-0 bg-black bg-opacity-75"
      @click.self="$emit('close-modal')"
    >
      <div
        class="join-now-modal-container z-30 bg-white p-6 pt-10 lg:pt-16 lg:p-16 relative"
        :style="{ top: topBannerHeight + 18 + 'px' }"
      >
        <a
          href=""
          class="absolute right-4 top-4 lg:right-8 lg:top-8"
          @click.prevent="$emit('close-modal')"
        >
          <svg-icon-cross />
        </a>
        <iframe
          :src="url"
          style="
            border: none;
            width: 100%;
            height: 100%;
            min-height: 472px;
            visibility: visible;
          "
          title="Iframe Example"
        ></iframe>
      </div>
    </div>
    <!-- -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    showModal: { type: Boolean, default: false },
  },
  data() {
    return {
      url: `${this.$config.joinMembershipUrl}?hideCloseButton=1`,
    };
  },
  computed: {
    ...mapState({
      topBannerHeight: s => s.app.topBannerHeight,
    }),
  },
};
</script>

<style lang="postcss">
.join-now-modal-container {
  width: 646px;
  min-height: 550px;
}
@media screen and (max-width: 768px) {
  .join-now-modal-container {
    width: 96%;
    min-height: auto;
  }
}
</style>
