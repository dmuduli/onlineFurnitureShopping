<template>
  <div class="bg-white p-8 pb-10 h-full">
    <rating-stars
      :rating="item.score"
      :width="24"
      :height="22"
      :customer-rating-view-box="'0 0 48.4 34.4'"
    />
    <div class="mt-6 mb-4">
      <h3 class="font-para text-sm font-bold text-gray-900 leading-normal mb-2">
        {{ item.user.display_name }}
      </h3>
      <h6 class="font-para text-xs leading-4 text-gray-767">
        Verified Buyer –{{ formatDate(item.created_at, "short") }}
      </h6>
    </div>
    <h2 class="text-1sm text-gray-900 leading-8 tracking-wide mb-4">
      {{ item.title }}
    </h2>
    <p
      class="font-para text-sm font-normal text-gray-700 leading-5 tracking-wide mb-6"
    >
      {{ description }}
    </p>
    <div
      v-if="showReadMore"
      v-click-outside="hide"
      class="w-full relative read-more-wrap"
    >
      <div
        class="inline-block border-b-2 border-gray-500 cursor-pointer relative"
        @click="show = !show"
      >
        <span class="text-sm leading-normal font-medium text-gray-900 uppercase"
          >Read More</span
        >

        <div
          class="tooltip font-para p-3 absolute bg-white shadow border border-gray-200 rounded-md tooltip-left-arrow"
          :class="[show ? 'block' : 'hidden']"
        >
          <div class="tooltip-heading mb-3">
            <h3>{{ item.title }}</h3>
          </div>
          <div class="w-full tooltip-para">
            <p class="font-para">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { formatDate } from "~/utils/date";

export default {
  directives: {
    ClickOutside,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    description() {
      if (this.item.content.length > 150) {
        return this.item.content.slice(0, 150) + "...";
      }
      return this.item.content;
    },
    showReadMore() {
      if (this.item.content.length > 150) {
        return true;
      }
      return false;
    },
  },
  methods: {
    hide() {
      this.show = false;
    },
    formatDate,
  },
};
</script>

<style lang="postcss" scoped>
.tooltip {
  width: 200px;
  z-index: 9;
  bottom: 32px;
  left: 0;
  @screen lg {
    width: 300px;
    top: -8px;
    bottom: auto;
    left: 6.8rem;
  }
}
.tooltip-left-arrow:after,
.tooltip-left-arrow:before {
  right: 100%;
  top: 20px;
  border: solid transparent;
  content: " ";
  @apply pointer-events-none absolute w-0 h-0 hidden;
  @screen lg {
    @apply inline-block;
  }
}

.tooltip-left-arrow:after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: white;
  @apply -mt-2 border-8;
}
.tooltip-left-arrow:before {
  border-color: rgba(239, 233, 229, 0);
  border-right-color: #efe9e5;
  border-width: 11px;
  margin-top: -11px;
}
</style>
