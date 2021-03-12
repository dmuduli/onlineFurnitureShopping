<template>
  <div v-if="tags.length > 0" class="relative">
    <h2 class="text-xl text-gray-700 mb-6">Features</h2>
    <div
      class="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 mxl:grid-cols-4 mxl:gap-5 xxl:grid-cols-6 xxl:gap-3 mb-10"
    >
      <div v-for="(tag, key) in tags" :key="key" class="feature-tiles-box">
        <div class="h-full">
          <div
            class="relative border border-gray-400 hover:border-brown-100 w-full h-full flex flex-col items-center justify-center"
            :class="{ selectedTile: seletecFeature === key }"
          >
            <div
              class="relative w-full h-full flex flex-col items-center justify-center px-2 pt-10 pb-6"
            >
              <span
                v-click-outside="hideTooltip"
                class="self-end cursor-pointer absolute feature-info-icon top-2 right-2"
              >
                <svg-icon-info-light
                  class="features-info-icon"
                  @click.native="seletecFeature = key"
                />
              </span>
              <div class="overflow-hidden mb-2 flex items-center">
                <cms-image v-if="tag.tag_image" :field="tag.tag_image" />
                <p v-else class="text-center">No image found</p>
              </div>
              <h3
                class="text-sm text-black uppercase font-medium text-center two-line-clamp w-full"
              >
                {{ tag.display_name }}
              </h3>
            </div>
            <!-- tooltip  -->
            <div
              v-if="seletecFeature === key"
              :class="[key === seletecFeature ? 'block' : 'hidden']"
              class="absolute m-auto lg:left-1/2 z-20 feature-detail bg-white shadow tooltip border w-full lg:w-72"
              style="bottom: 105%"
            >
              <div class="flex justify-between pt-4 pr-4 w-full">
                <div
                  class="text-base font-medium capitalize text-gray-700 px-6 flex-shrink"
                >
                  {{ tag.display_name }}
                </div>
                <svg-icon-close
                  class="cursor-pointer w-3 h-3 flex-shrink-0"
                  aria-hidden="true"
                  @click.native="seletecFeature = ''"
                />
              </div>
              <div class="text-sm text-gray-700 font-para py-4 px-6 w-full">
                {{ tag.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  directives: { ClickOutside },
  props: {
    tags: { type: Array, default: () => [] },
  },
  data: () => ({
    seletecFeature: "",
  }),
  methods: {
    hideTooltip(e) {
      if (
        !e.target.closest(".tooltip") &&
        !e.target.closest(".feature-info-icon")
      ) {
        this.seletecFeature = "";
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.features-info-icon {
  fill: #bfb6ad;
}
.features-info-icon:hover {
  fill: #64443f;
}
.selectedTile {
  @apply border-brown-500 !important;
}
.selectedTile .features-info-icon {
  fill: #64443f;
}
.feature-tiles-box:empty {
  @apply hidden;
}
</style>
