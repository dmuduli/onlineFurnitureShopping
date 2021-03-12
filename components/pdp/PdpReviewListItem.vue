<template>
  <div class="flex mb-10">
    <div class="mr-4 hidden lg:inline-flex">
      <span
        class="bg-orange-300 flex items-center justify-center text-sm text-white w-12 h-12 rounded-full uppercase"
      >
        {{ reviewItem.user.display_name.charAt(0).toUpperCase() }}
      </span>
    </div>
    <div class="flex-auto">
      <div class="flex">
        <span
          class="mr-4 lg:hidden bg-orange-300 flex items-center justify-center text-sm text-white w-12 h-12 rounded-full uppercase"
        >
          {{ reviewItem.user.display_name.charAt(0).toUpperCase() }}
        </span>
        <div class="flex-auto lg:flex-none">
          <div class="flex items-center mb-3">
            <span class="text-sm font-bold text-gray-900 font-para mr-4">
              {{ reviewItem.user.display_name }}
            </span>
            <span class="text-xs text-gray-700 font-para">
              <span v-if="reviewItem.verified_buyer">Verified Buyer</span> –
              {{ reviewItem.created_at | formatDate }}
            </span>
          </div>
          <div class="mb-4 flex items-center">
            <rating-stars :rating="reviewItem.score" :width="20" :height="20" />
          </div>
        </div>
      </div>
      <div>
        <p class="text-base text-gray-700 font-para leading-6 font-normal">
          <span v-if="!hideReadMoreFlag">
            {{ reviewItem.content | descriptionText(maxLength) }}
          </span>
          <span v-else>{{ reviewItem.content }}</span>
          <a
            v-if="reviewItem.content.length > maxLength && !hideReadMoreFlag"
            class="transition-colors duration-500 ease-in-out text-sm leading-normal font-medium text-gray-900 border-b-2 border-gray-500 cursor-pointer"
            @click.prevent="hideReadMore()"
          >
            Read More
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    descriptionText(input, maxLength) {
      if (input.length > maxLength) {
        return input.substring(0, maxLength) + "...";
      }
      return input;
    },
  },
  props: {
    reviewItem: { type: Object, default: () => {} },
  },
  data() {
    return {
      hideReadMoreFlag: false,
      maxLength: this.$store.state.siteConfig.reviewDescriptionMaxLen,
    };
  },
  methods: {
    hideReadMore() {
      this.hideReadMoreFlag = true;
    },
  },
};
</script>
