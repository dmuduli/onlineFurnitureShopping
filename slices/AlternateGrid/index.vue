<template>
  <div
    class="m-auto flex flex-col md:flex-row items-center lg:pb-4 mb-4 mt-8"
    :class="{
      velocity: alignText == 'prose-velocity',
    }"
  >
    <div
      class="lg:flex-1 w-full md:w-1/2 mb-6 lg:mb-0"
      :class="{
        'order-1 md:ml-8 mr-0': isRight,
        'md:mr-8': !isRight,
        'lg:w-1/3': twoThirdContentArea,
        velocityimg: alignText == 'prose-velocity',
      }"
    >
      <cms-image :field="primary.image" :class="(imageClass, imageWidth)" />
      <cms-embed
        v-if="primary.video"
        class="w-full h-full iframe-video my-6 lg:my-0"
        :field="primary.video"
      />
    </div>
    <div
      class="w-full md:w-1/2"
      :class="{
        'lg:w-2/3': twoThirdContentArea,
        velocitytitle: alignText == 'prose-velocity',
      }"
    >
      <cms-image :field="primary.optional_icon" />
      <cms-rich-text
        class="w-full prose-pages max-w-none title"
        :class="alignText"
        :field="primary.subtitle"
      />
      <div class="w-full prose-pages max-w-none" :class="alignText">
        <cms-rich-text
          :html-serializer="tableSerializer"
          :field="primary.paragraph"
        />
      </div>
      <!-- shop now button -->
      <div class="mt-4" :class="{ 'text-center': label === 'center' }">
        <cms-link
          v-if="primary.button_label && primary.button_link"
          class="px-10 inline-flex transition-colors duration-500 ease-in-out leading-5 text-white text-xs block md:inline-block text-center p-3 uppercase bg-gray-500 font-normal hover:bg-gray-700"
          :class="primary.optional_button_color"
          :field="primary.button_link"
          font-weight="font-normal"
        >
          {{ primary.button_label }}
        </cms-link>
      </div>
      <accordian :primary="primary" :fields="fields" :label="label" />
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";
import prismicDOM from "prismic-dom";

import Accordian from "~/slices/Accordian";

export default {
  components: { accordian: Accordian },

  props: {
    primary: { type: Object, required: true },
    label: { type: String, default: "" },
    fields: { type: Array, default: () => [] },
  },

  computed: {
    isRight() {
      return this.primary.media_alignment.toLowerCase() === "right";
    },
    imageClass() {
      return this.primary.image_align == "right" ? "lg:ml-auto" : "";
    },
    alignText() {
      const theme = pathOr("", ["label"], this);
      if (theme == "") {
        return "prose";
      }
      return `prose-${theme}`;
    },
    imageWidth() {
      return this.label == "snooze_now_pay_later" ? "w-auto ml-auto" : "w-full";
    },
    twoThirdContentArea() {
      return this.label == "two_thirds_content_area";
    },
  },

  methods: {
    tableSerializer(type, element, content) {
      // Generate links to Prismic Documents as <router-link> components
      // Present by default, it is recommended to keep this
      const Elements = prismicDOM.RichText.Elements;

      if (type === Elements.preformatted) {
        return `${element.text}`;
      }

      // Return null to stick with the default behavior for everything else
      return null;
    },
  },
};
</script>

<style lang="postcss">
.iframe-video iframe {
  @apply w-full;
}
.velocity .velocitytitle .title h1,
.velocity .velocitytitle .title h2 {
  @apply text-5xl leading-tight text-red-800;
}
@screen md {
  .velocity .velocityimg {
    @apply w-1/3 flex-none;
  }
  .velocity .velocityimg img {
    @apply w-auto m-auto;
  }
  .velocity .velocitytitle {
    @apply w-2/3;
  }
  .velocity .btn-red {
    @apply bg-red-800;
  }
}
</style>
