<template>
  <footer class="border-t border-gray-500 lg:mp-10">
    <app-container>
      <div
        class="flex flex-wrap flex-col lg:flex-row bg-white-500 pt-0 pb-11 lg:pt-10 lg:pb-20"
      >
        <div
          class="footer flex-grow lg:flex-1 flex-shrink-0 inline-flex flex-col lg:flex-row lg:border-r lg:border-gray-500 lg:mr-6"
        >
          <!-- Footer menu columns -->
          <div
            v-for="(key, index) in mappingCols"
            :key="`${index}_desktop`"
            class="lg:flex-1 hidden lg:block pr-4 footer-static-page-link"
          >
            <cms-rich-text
              :field="footer[key.titleKey]"
              class="flex justify-between items-center uppercase text-sm leading-7 font-normal text-black pb-1 border-b lg:border-0 border-gray-500"
            />
            <SiteFooterLinks
              :links="footer[key.linksKey]"
              :key-prefix="`${index}_desktop`"
            />
          </div>
          <AppExpansionPanels :items="mappingCols">
            <template #item="{ itemIndex, item, open }">
              <AppExpansionPanel
                class="accordion-footer-item lg:flex-1 block lg:hidden border-b lg:border-b-0 border-gray-500 last:border-b-0"
                :item-index="itemIndex"
                :open="open"
              >
                <template #title>
                  <cms-rich-text
                    :field="footer[item.titleKey]"
                    wrapper="span"
                  />
                </template>
                <template #default>
                  <SiteFooterLinks
                    :links="footer[item.linksKey]"
                    :key-prefix="`${itemIndex}_mobile`"
                    class="pb-8"
                  />
                </template>
              </AppExpansionPanel>
            </template>
          </AppExpansionPanels>
        </div>
        <div
          class="flex lg:inline-flex flex-col justify-between lg:pt-0 pt-8 -mx-5 lg:mx-0 lg:pt-0 border-t border-brown-767 lg:border-t-0 text-center lg:text-left lg:w-1/4"
        >
          <div class="lg:block hidden mb-6">
            <!-- get connected -->
            <cms-rich-text
              :field="footer.social_icons_title"
              class="uppercase text-sm font-normal text-black"
            />
            <div class="flex items-center mt-5">
              <!-- Social Icons -->
              <span
                v-for="(icon, index) of footer.social_icons"
                :key="index"
                class="mr-5 last:mr-0"
              >
                <cms-link :field="icon.icon_link">
                  <component
                    :is="`icon-${icon.icon_name}`"
                    class="inline-block"
                  />
                </cms-link>
              </span>
            </div>
          </div>
          <div class="w-full xxl:w-3/4 mb-3 lg:mb-0">
            <a target="_blank" :href="reviewImage.link" class="inline-block">
              <div
                class="mb-4 flex items-center justify-center lg:justify-start"
              >
                <img :src="reviewImage.src" :alt="reviewImage.alt" />
              </div>
            </a>
          </div>
          <div class="w-full overflow-hidden">
            <div
              class="flex justify-center lg:justify-between items-center flex-wrap sm:flex-no-wrap lg:flex-wrap px-4 lg:px-0 sm:-mx-2 lg:mx-0"
            >
              <div
                class="w-1/4 sm:w-auto lg:w-1/5 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/visa-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="Visa logo"
                />
              </div>
              <div
                class="w-1/4 sm:w-auto lg:w-1/6 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/mastercard-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="Master card logo"
                />
              </div>
              <div
                class="w-1/4 sm:w-auto lg:w-1/4 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/paypal-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="Paypal logo"
                />
              </div>
              <div
                class="w-1/4 sm:w-auto lg:w-1/4 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/american-express-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="American express logo"
                />
              </div>
              <div
                class="w-1/4 sm:w-auto lg:w-1/4 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/afterpay-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="Afterpay logo"
                />
              </div>
              <div
                class="w-1/4 sm:w-auto lg:w-1/4 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/humm-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="Humm logo"
                />
              </div>
              <div
                class="w-1/4 sm:w-auto lg:w-1/4 sm:px-2 lg:px-0 text-center py-2"
              >
                <img
                  src="~/assets/images/pay-logo.png"
                  class="mx-auto lg:mx-0"
                  alt="Pay logo"
                />
              </div>
            </div>
            <cms-rich-text
              :field="footer.copyright_text"
              class="mt-4 text-sm text-center text-gray-700 lg:text-left"
            />
          </div>
        </div>
      </div>
    </app-container>
  </footer>
</template>

<script>
import { path, evolve, pipe } from "ramda";

export default {
  props: {
    footer: { type: Object, default: null },
    siteReview: { type: Object, default: () => {} },
  },
  data() {
    return {
      review: null,
      mappingCols: [
        {
          titleKey: "customer_service_title",
          linksKey: "customer_service_links",
        },
        {
          titleKey: "about_title",
          linksKey: "about_links",
        },
        {
          titleKey: "shop_with_us_title",
          linksKey: "shop_with_us_links",
        },
      ],
    };
  },
  computed: {
    reviewImage() {
      return pipe(
        path(["$store", "state", "siteConfig", "footer", "reviewImage"]),
        evolve({ src: x => x + "?resolution=hd&theme=light&width=300" })
      )(this);
    },
  },
};
</script>
<style lang="postcss" scoped>
@screen lg {
  .footer .footer-static-page-link:nth-child(3n + 0) {
    flex: 0 0 29%;
  }
}
@screen xxl {
  .footer .footer-static-page-link:nth-child(3n + 0) {
    @apply flex-1;
  }
}
</style>
