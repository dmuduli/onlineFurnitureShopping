<template>
  <div
    v-if="!hideTopCategory"
    :class="primary.background_color"
    class="info-box relative overflow-hidden"
  >
    <cms-link :field="primary.anchor_link" class="block">
      <app-container>
        <div class="flex flex-row lg:items-center justify-between">
          <div class="self-start lg:self-center lg:pr-6 py-20 sm:w-3/4 w-full">
            <cms-rich-text
              class="font-sans text-3xl leading-9 lg:text-4xl font-normal lg:leading-11 text-gray-900 mb-4"
              :field="primary.title"
            />
            <cms-rich-text
              class="font-sans text-sm lg:text-base font-normal leading-5 text-gray-900 mb-4"
              :field="primary.paragraph"
            />
            <div class="w-full">
              <span
                class="cta text-sm font-medium leading-5 text-gray-900 uppercase inline-block pb-1 border-b-2 border-gray-500"
              >
                {{ primary.anchor_label }}
              </span>
            </div>
          </div>
          <div
            class="absolute bottom-0 -right-1/4 sm:right-0 sm:static w-auto sm:w-1/4 justify-center flex self-center lg:h-full"
          >
            <cms-image
              v-if="primary.icon"
              :field="image"
              class="max-w-72 lg:max-w-xl max-h-42 lg:max-h-xs w-auto relative"
            />
            <svg-icon-callto-action
              v-else
              class="w-24 h-24 lg:w-auto lg:h-auto self-end lg:self-center"
            />
          </div>
        </div>
      </app-container>
    </cms-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    primary: {
      type: Object,
      default: () => ({
        title: [{ text: "Default Title", type: "heading2" }],
        paragraph: [{ text: "default paragraph", type: "paragraph" }],
        anchor_label: "Default Label",
        background_color: "bg-gray-300",
      }),
    },
  },
  computed: {
    ...mapGetters("checkout", ["itemCount"]),
    isCartPage() {
      return this.$route.path.includes("/cart");
    },
    hideTopCategory() {
      return this.isCartPage && this.itemCount > 0;
    },
    image() {
      return { url: this.primary.icon.url, alt: this.primary.icon.alt };
    },
  },
};
</script>

<style lang="postcss" scoped>
.info-box.bg-gray-400 .cta {
  @apply border-white;
}
</style>
