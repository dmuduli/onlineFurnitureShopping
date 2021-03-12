<template>
  <div :class="bgClass" :style="bgStyle">
    <div class="h-full mx-auto lg:px-4 xl:px-27">
      <div
        :style="{ minHeight: '480px' }"
        class="h-full flex flex-col lg:flex-row justify-between"
      >
        <div
          class="self-center mx-4 lg:mx-0 lg:w-2/4 bg-white mb-6 lg:mb-0 px-8 py-4 pt-6 pb-10 mt-40 lg:mt-0"
        >
          <cms-rich-text
            :field="primary.title"
            class="text-4xl leading-11 text-gray-900 mb-2 capitalize"
          />
          <div class="mb-4">
            <cms-rich-text
              :field="paragraph"
              class="font-para leading-6 text-base text-gray-700 mb-4"
            />
            <span
              v-if="showReadMore"
              class="border-b-2 border-gray-500 cursor-pointer text-sm leading-normal font-medium text-gray-900 uppercase"
              @click="isReadMore = !isReadMore"
              >{{ isReadMore ? "Read More" : "Read Less" }}</span
            >
          </div>
          <app-button
            v-if="primary.button_label"
            responsive
            block
            :to="$prismic.asLink(primary.button_link)"
            size="3xl"
          >
            {{ primary.button_label }}
          </app-button>
        </div>
        <div
          class="self-end lg:self-start w-full lg:min-w-74 lg:w-auto lg:ml-4 text-center px-6 pt-8 pb-11 lg:pb-10 lg:pt-6 text-white"
          :style="{ backgroundColor: primary.sale_banner_color }"
        >
          <cms-rich-text
            :field="primary.sale_type"
            class="font-BeyondInfinity text-7xl text-shadow leading-15 font-normal text-white"
          />
          <div>
            <cms-rich-text
              :field="primary.sale_percentage_text"
              class="leading-6 text-19px font-normal text-white uppercase break-inner-text"
            />
            <cms-rich-text
              :field="primary.sale_percentage"
              class="text-6xl font-medium text-white break-inner-text leading-13 pt-1 pb-2"
            />
          </div>
          <cms-rich-text
            :field="primary.sale_items"
            class="text-10px font-normal leading-3 text-white uppercase break-inner-text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import path from "ramda/src/path";

export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
  data() {
    return {
      isReadMore: true,
    };
  },
  computed: {
    actualText() {
      return this.$prismic.asText(this.primary.paragraph);
    },
    paragraph() {
      const type = path(["primary", "paragraph", [0], "type"], this);
      const truncatedText =
        this.actualText.length > 300 && this.isReadMore == true
          ? this.actualText.slice(0, 300) + "..."
          : this.actualText;
      return [{ text: truncatedText, type }];
    },
    showReadMore() {
      return this.actualText.length > 300;
    },
    bgClass() {
      let className = "bg-no-repeat lg:bg-cover";
      if (
        !this.primary ||
        !this.primary.banner_bg_image ||
        !this.primary.banner_bg_image.url
      ) {
        return className + " bg-hero-banner";
      }
      return className;
    },
    bgStyle() {
      if (
        this.primary &&
        this.primary.banner_bg_image &&
        this.primary.banner_bg_image.url
      ) {
        return {
          "background-image": "url(" + this.primary.banner_bg_image.url + ")",
        };
      }
      return {};
    },
  },
};
</script>

<style scoped>
.bg-hero-banner .container {
  @media screen and (min-width: 560px) and (max-width: 991px) {
    max-width: 100%;
  }
}
</style>
