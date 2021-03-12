<template>
  <app-container
    v-if="items.length"
    class="pr-0 lg:pr-5 py-10 lg:pt-10 lg:pb-12 overflow-x-hidden"
  >
    <div>
      <cms-rich-text
        :field="primary.title"
        class="font-normal text-gray-333 text-lg lg:text-3xl leading-6 lg:leading-9 mb-4"
      />

      <mobile-view
        class="block lg:hidden overflow-x-hidden"
        :fields="items"
        :get-image-field="getImageField"
        :get-text-field="getTextField"
      />
      <desktop-view
        class="hidden lg:block"
        :fields="items"
        :get-image-field="getImageField"
        :get-text-field="getTextField"
      />
    </div>
  </app-container>
</template>

<script>
import {
  pathOr,
  filter,
  both,
  evolve,
  compose,
  path,
  propEq,
  find,
} from "ramda";
import MobileView from "./mobile";
import DesktopView from "./desktop";

const filterItems = filter(
  both(
    pathOr(false, ["blog_link", "title", [0], "text"]),
    pathOr(false, ["blog_link", "description", [0]]),
    pathOr(false, ["blog_link", "feature_image"])
  )
);

export default {
  components: { MobileView, DesktopView },
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
  },
  computed: {
    items() {
      return filterItems(this.fields);
    },
    getImageField() {
      return compose(
        evolve({ url: x => `${x}&w=288&h=288&fit=crop&crop=entropy` }),
        path(["blog_link", "feature_image"])
      );
    },
    getTextField() {
      return compose(
        x => [x],
        find(propEq("type", "paragraph")),
        path(["blog_link", "description"])
      );
    },
  },
};
</script>

<style lang="postcss">
.articles-section:last-child .tooltip {
  left: auto;
  right: 6.8rem;
}
.articles-section:last-child .tooltip-left-arrow:after,
.articles-section:last-child .tooltip-left-arrow::before {
  left: 100%;
  top: 20px;
  border: solid transparent;
  content: " ";
}
.articles-section:last-child .tooltip-left-arrow::after {
  border-color: rgba(255, 255, 255, 0);
  border-left-color: white;
  border-width: 8px;
}
.articles-section:last-child .tooltip-left-arrow:before {
  border-color: rgba(239, 233, 229, 0);
  border-left-color: #efe9e5;
  border-width: 11px;
  margin-top: -11px;
}
</style>
