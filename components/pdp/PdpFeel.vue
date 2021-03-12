<template>
  <div v-if="feelImage" class="w-full p-4 lg:p-10 feel-bg-image">
    <div class="flex lg:items-center lg:flex-row flex-col lg:justify-between">
      <div class="flex flex-col mb-8 lg:mb-0 lg:flex-1">
        <h1 class="text-4xl text-gray-900 mb-10">Overall feel</h1>
        <div class="flex items-center mb-4 relative">
          <span class="text-base text-gray-900 mr-12">Comfort Layer</span>

          <span v-click-outside="closeModal">
            <svg-icon-info
              class="cursor-pointer"
              @click.native="infoDialog = true"
            />
          </span>
          <pdp-info-modal
            :info-dialog="infoDialog"
            class="comfort-layer-modal"
            @close-modal="closeModal"
          >
            <template #title> Overall Feel </template>
            <template #information>
              <div class="text-sm text-gray-900 font-para py-4 px-6 w-full">
                The more clouds, the softer the comfort layers in the mattress,
                which can help reduce pressure on your body while you are
                sleeping.
              </div>
            </template>
          </pdp-info-modal>
        </div>
        <div class="flex items-center">
          <svg-cloud-fill
            v-for="(item, index) in cloudRating"
            :key="index"
            class="pr-6"
          ></svg-cloud-fill>
          <svg-cloud-blank
            v-for="(item, index) in 5 - cloudRating"
            :key="'e' + index"
            class="pr-6"
          ></svg-cloud-blank>
        </div>
      </div>
      <template v-if="feelImage == 'Medium'">
        <img src="~/assets/images/feel-meter.png" alt="Feel meter" />
      </template>
      <template v-else-if="feelImage == 'Plush'">
        <img src="~/assets/images/dial_plush.png" alt="Dial plush" />
      </template>
      <template v-else-if="feelImage == 'Firm'">
        <img src="~/assets/images/dial_firm.png" alt="Dial firm" />
      </template>
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";
import ClickOutside from "vue-click-outside";
export default {
  directives: { ClickOutside },
  props: { variants: { type: Object, default: () => {} } },
  data() {
    return {
      infoDialog: false,
    };
  },
  computed: {
    cloudRating() {
      return this.variants.cloud_rating != null
        ? Number(this.variants.cloud_rating.value)
        : 0;
    },
    feelImage() {
      const comfortFeel = pathOr(
        "",
        ["variants", "mattress_comfort_feel", "value"],
        this
      );
      return comfortFeel;
    },
  },
  methods: {
    closeModal() {
      this.infoDialog = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.feel-bg-image {
  background: url(~assets/images/pdp-feel-bg.png) no-repeat center center /
    cover;
}
.comfort-layer-modal {
  width: 100%;
  bottom: 100px;
  left: 0;
}
@screen xl {
  .comfort-layer-modal {
    width: 45% !important;
  }
}
@screen lg {
  .comfort-layer-modal {
    width: 60%;
    bottom: 95px;
  }
}
</style>
