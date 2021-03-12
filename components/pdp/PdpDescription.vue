<template>
  <div class="prose prose-pdp max-w-none">
    <!-- eslint-disable vue/no-v-html-->
    <transition name="slide">
      <div
        v-if="isExpanded"
        class="expanded-pdp-description"
        v-html="descriptionHtml"
      />
    </transition>
    <div
      v-if="!isExpanded"
      class="description-animation five-line-clamp-paragraph"
      v-html="descriptionHtml"
    />
    <a
      v-if="showReadMore"
      class="transition-colors duration-500 ease-in-out text-black text-sm text-center font-medium uppercase cursor-pointer"
      @click="isExpanded = !isExpanded"
    >
      Read {{ isExpanded ? "less" : "more" }}
    </a>
  </div>
</template>

<script>
import { path } from "ramda";

export default {
  props: {
    descriptionHtml: { type: String, default: "" },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    charLimit() {
      return path(
        ["$store", "state", "siteConfig", "pdp", "descriptionCharLimit"],
        this
      );
    },
    showReadMore() {
      return this.descriptionHtml.length > this.charLimit;
    },
  },
};
</script>
<style lang="postcss">
.slide-enter-active,
.slide-leave-active {
  @apply duration-150;
}
.slide-enter-active {
  @apply ease-in;
}

.slide-leave-active {
  @apply ease-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 1000px;
  @apply overflow-hidden;
}

.slide-enter,
.slide-leave-to {
  @apply overflow-hidden;
  max-height: 0;
}

.description-animation {
  @apply overflow-hidden;
  -webkit-transition: height 10s ease;
  -moz-transition: height 10s ease;
  -ms-transition: height 10s ease;
  -o-transition: height 10s ease;
  transition: height 10s ease;
}
.five-line-clamp-paragraph p {
  @apply overflow-hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.five-line-clamp-paragraph .right,
.five-line-clamp-paragraph p + p,
.five-line-clamp-paragraph p + * {
  @apply hidden;
}
</style>
