<template>
  <div @click="onClick">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="reviewHtml" v-html="reviewHtml" />
    <div v-else>
      <div class="yotpo-display-wrapper" aria-hidden="false" style="">
        <div class="standalone-bottomline" data-source="offload">
          <div class="yotpo-bottomline pull-left star-clickable" tabindex="0">
            <span class="yotpo-stars">
              <span
                class="yotpo-icon yotpo-icon-empty-star rating-star pull-left"
              ></span
              ><span
                class="yotpo-icon yotpo-icon-empty-star rating-star pull-left"
              ></span
              ><span
                class="yotpo-icon yotpo-icon-empty-star rating-star pull-left"
              ></span
              ><span
                class="yotpo-icon yotpo-icon-empty-star rating-star pull-left"
              ></span
              ><span
                class="yotpo-icon yotpo-icon-empty-star rating-star pull-left"
              ></span
              ><span class="sr-only">0.0 star rating</span>
            </span>
            <div class="yotpo-clr"></div>
          </div>
          <div class="yotpo-clr"></div>
        </div>
        <div class="yotpo-clr"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviewHtml: { type: String, default: "" },
    handle: { type: String, default: "" },
    selectedVariantId: { type: [String, Number], default: "" },
  },

  methods: {
    onClick() {
      this.$router.push(
        `/products/${this.handle}?variant=${this.selectedVariantId}`
      );
    },
  },
};
</script>

<style>
.yotpo-display-wrapper {
  visibility: visible !important;
}
</style>
