<template>
  <div class="">
    <div v-swiper="swiperOption" class="swiper overflow-x-hidden relative">
      <div class="swiper-wrapper">
        <div
          v-for="(field, index) of fields.slice(0, carouselLimit)"
          :key="index"
          class="swiper-slide"
        >
          <!-- tile which have embedded media (youtube/vimeo) url -->
          <div
            v-if="field.media_url && field.media_url.embed_url"
            class="bg-no-repeat lg:bg-cover h-140"
          >
            <div
              class="h-full relative z-0"
              @mouseenter.self="onVideoMouseOver"
            >
              <app-lite-video :field="field.media_url" />
            </div>
          </div>
          <!-- tile which have background image -->
          <div
            v-if="!field.media_url && field.cta_banner && field.cta_banner.url"
            class="bg-no-repeat lg:bg-cover banner-image-height h-140 relative"
            :style="getBgStyle(field)"
            @click="handleClick(field)"
          >
            <div
              class="absolute bg-black w-full h-full inset-0 z-10 opacity-25"
            ></div>
            <div class="h-full px-4 xl:px-27 relative z-20 flex items-center">
              <div
                class="flex items-center justify-center flex-col-reverse lg:flex-row w-full lg:w-auto mx-auto relative"
              >
                <!-- Main section area of sale -->
                <center-offer-section
                  v-if="field.campaign_sale_link"
                  :field="field.campaign_sale_link"
                />
                <!-- Top right Information section within the banner -->
                <plus-section
                  v-if="
                    field.campaign_sale_link &&
                    field.campaign_sale_link.information_title &&
                    field.campaign_sale_link.information_title[0].text
                  "
                  :field="field.campaign_sale_link"
                />
              </div>
            </div>
          </div>
          <!-- tile which don't have background image/ember media URL -->
          <div
            v-if="!field.media_url && !field.cta_banner"
            class="bg-hero-banner-no-image bg-no-repeat lg:bg-cover mb-4 h-140"
            :style="getBgStyle(field.campaign_sale_link)"
          >
            <div class="h-full px-4 lg:px-27 relative">
              <div
                class="flex items-center justify-center flex-col lg:flex-row h-full"
              >
                <!-- center offer section with red bg -->
                <center-offer-section :field="field.campaign_sale_link" no-bg />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- hide arrows on mobile -->
      <swiper-nav
        v-if="showArrows"
        slot="button-prev"
        class="product-swiper-prev left-8 xl:left-28 -mt-10 z-20"
        type="prev"
        size="big"
        @click.native="onNavigationClicked"
      />
      <swiper-nav
        v-if="showArrows"
        slot="button-next"
        class="product-swiper-next right-8 xl:right-28 -mt-10 z-20"
        size="big"
        type="next"
        @click.native="onNavigationClicked"
      />
      <div
        style=""
        class="hero-swiper-pagination absolute z-20 bottom-8.5 lg:bottom-9 w-full flex justify-center px-4"
      />
    </div>
  </div>
</template>

<script>
import PlusSection from "./plus-section";
import CenterOfferSection from "./center-offer-section";

export default {
  components: { PlusSection, CenterOfferSection },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    primary: { type: Object, required: true },
  },
  data: () => ({ toStop: false, removeBG: false }),
  computed: {
    carouselLimit() {
      return this.$store.state.siteConfig.home.carouselLimit;
    },
    swiperOption() {
      if (this.fields.length <= 1) {
        return {};
      }
      return {
        slidesPerGroup: 1,
        slidesPerView: "auto",
        loop: true,
        loopFillGroupWithBlank: false,
        autoplay: {
          delay: this.primary.time_interval,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".hero-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">&nbsp;&nbsp;</span>`,
        },
        navigation: {
          nextEl: ".product-swiper-next",
          prevEl: ".product-swiper-prev",
        },
        on: {
          init: swiper => {
            swiper.slideTo(0);
          },
        },
      };
    },
    showArrows() {
      return this.$device.isDesktop && this.fields.length > 1;
    },
  },
  methods: {
    getBgStyle(field) {
      let style = {};

      if (field.cta_banner) {
        style.backgroundImage = "url(" + field.cta_banner.url + ")";
      } else if (
        field.save_banner_color_start &&
        !field.save_banner_color_end
      ) {
        style.backgroundColor = field.save_banner_color_start;
      }

      if (!style.backgroundColor) {
        style.backgroundColor = "rgb(204, 35, 72)";
      }

      if (!field.is_gradient) {
        style.backgroundColor = field.sale_banner_color || "rgb(204, 35, 72)";
      }

      // add style cursor poiner if there is banner image and cta_link
      if (!field.campaign_sale_link && field.cta_link) {
        style.cursor = "pointer";
      }
      return style;
    },
    handleClick(field) {
      if (!field.campaign_sale_link && field.cta_link) {
        this.$router.push(this.$prismic.asLink(field.cta_link));
      }
    },
    onNavigationClicked() {
      if (this.$swiper.destroyed) {
        return;
      }
      this.toStop = !this.toStop;
      if (this.toStop && this.$swiper.autoplay.running) {
        this.$swiper.autoplay.stop();
      } else {
        this.$swiper.autoplay.start();
      }
    },
    onVideoMouseOver(e) {
      if (this.$swiper.destroyed) {
        return;
      }
      this.$swiper.autoplay.stop();
    },
  },
};
</script>

<style lang="postcss">
.swiper-container-horizontal .swiper-pagination-bullets {
  @apply bottom-8.5;
}
.swiper-pagination-bullet {
  @apply bg-gray-500 cursor-pointer inline-block rounded-2xl w-14 opacity-100;
  height: 3px;
  margin: 8px 2px 0 2px;
}

.swiper-pagination-bullet-active {
  @apply bg-white;
}
@screen md {
  .swiper-pagination-bullet {
    margin-top: 0;
  }
  .swiper-container-horizontal .swiper-pagination-bullets {
    @apply bottom-9;
  }
}
.embed-video-wrapper iframe {
  @apply w-full h-full;
}
</style>
