import path from "path";
import fs from "fs";

import { colors } from "./colors.config";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: "true",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Snooze Blog | Tips, Advice & Inspiration | Snooze",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "https://cdn.shopify.com/s/files/1/2513/8850/t/205/assets/favicon.png?v=14158548110561228292",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css",
    "swiper/swiper-bundle.css",
    "~/assets/css/lite-yt-embed.css",
    "~/assets/css/lite-vimeo-embed.css",
  ],

  /**
   * define configuration here
   * private config will not get expose to frontend
   */
  publicRuntimeConfig: {
    appEndPoint: process.env.APP_END_POINT,
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaKey: process.env.ALGOLIA_KEY,
    shopifyGraphqlURL: `${process.env.SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_GRAPHQL_URI}`,
    shopifyStorefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
    shopifyAdminURL: `${process.env.SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_ADMIN_URI}`,
    prismicAPIEndPoint: `${process.env.PRISMIC_HOST}/api/v2`,
    prismicGraphqlURL: `${process.env.PRISMIC_HOST}/graphql`,
    shopifyAdminGraphqlURL: `${process.env.SHOPIFY_SHOP_END_POINT}/${process.env.SHOPIFY_ADMIN_GRAPHQL_URI}`,
    shopifyAccessToken: `${process.env.SHOPIFY_ADMIN_PASSWORD}`,
    shopifyVariantsEndPoint: `${process.env.SHOPIFY_VARIANTS_URI}`,
    shopifyThemeHost: process.env.SHOPIFY_THEME_HOST,
    yotpoUrl: `${process.env.YOTPO_URL}`,
    yotpoReviewUrl: process.env.YOTPO_REVIEW_URL.replace(
      "$yopoKey",
      process.env.YOTPO_API_KEY
    ),
    yotpoApiKey: process.env.YOTPO_API_KEY,
    instagramUrl: `${process.env.INSTAGRAM_URL}`,
    newsSubscriptionUrl: `${process.env.NEWS_SUBSCRIPTION_URL}`,
    joinMembershipUrl: `${process.env.JOIN_MEMBERSHIP_URL}`,
    googleRecaptchaApiKey: `${process.env.GOOGLE_RECAPTCHA_API_KEY}`,
    storeLocatorScriptUrl: `${process.env.STORE_LOCATOR_SCRIPT_URL}`,
    storeLocatorId: `${process.env.STORE_LOCATOR_ID}`,
    gooogleMapsApi: `${process.env.GOOGLE_MAPS_API_KEY}`,
    snoozeEcom: `${process.env.SNOOZE_ECOM}`,
    augModalUrl: `${process.env.AUG_MODAL_URL}`,
    storeReviewUrl: `${process.env.STORE_REVIEW_URL}`,
    snoozeSystemApiKey: `${process.env.SNOOZE_SYSTEM_API_KEY}`,
    apiRebuyAppUrl: `${process.env.REBUY_APP_URL}`,
    vercelAppUrl: `${process.env.VERCEL_APP_URL}`,
  },
  privateRuntimeConfig: {
    shopifyThemeId: process.env.SHOPIFY_THEME_ID,
    shopifyAdminAuthKey: Buffer.from(
      `${process.env.SHOPIFY_ADMIN_API_KEY}:${process.env.SHOPIFY_ADMIN_PASSWORD}`
    ).toString("base64"),
    yotpoApiKey: process.env.YOTPO_API_KEY,
    yotpoUrl: `${process.env.YOTPO_URL}`,
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/prismic-vue" /* register prismic components */,
    "~/plugins/global-filters",
    "~/plugins/algolia-search",
    "~/plugins/apollo-error-handler",
    "~/plugins/vue-swiper.client",
    "~/plugins/global-mixin",
    "~/plugins/axios-config",
    "~/plugins/checkout",
    "~/plugins/scroll-animation.client",
    "~/plugins/vue-scrollbar",
    "~/plugins/vue-observe-visibility",
    { src: "~/plugins/lite-yt-embed.js", ssr: false },
    { src: "~/plugins/lite-vimeo-embed.js", ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    { path: "~/components", extensions: ["vue"], pathPrefix: false },
    { path: "~/components/svg", prefix: "svg" },
    { path: "~/components/dynamic", global: true },
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: colors.brown[100],
    height: "0.3125rem",
    duration: 3000,
    continuous: true,
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // "@/modules/static",
    // "@/modules/crawler",
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
  ],
  proxy: [
    [
      "https://snooze-dev.myshopify.com/admin/api/2020-10/graphql.json",
      {
        headers: {
          "X-Shopify-Access-Token": `${process.env.SHOPIFY_ADMIN_PASSWORD}`,
        },
      },
    ],
    [
      "https://snooze-dev.myshopify.com/apps/vig/liquid_factory/variantsmetatags",
      {
        headers: {
          Cookie: `storefront_digest=e907eb46cee039f9045adc0e6be0c3dbb27a79688ba3e66069d1c521926a700a`,
        },
      },
    ],
    "https://maps.googleapis.com/maps/api/",
    process.env.SNOOZE_ECOM,
  ],

  axios: {
    baseURL: "https://localhost:3000",
    https: true,
    progress: false,
  },
  router: {
    middleware: ["checkout", "redirects", "resource-gone"],
    parseQuery(queryString) {
      return require("qs").parse(queryString);
    },
    stringifyQuery(object) {
      const queryString = require("qs").stringify(object, {
        arrayFormat: "repeat",
      });
      return queryString ? "?" + queryString : "";
    },
  },

  /*
   ** Apollo options. Used for Graph QL queries
   ** See: https://www.apollographql.com/docs/link/links/http.html#options
   */
  apollo: {
    clientConfigs: {
      default: "~/plugins/apollo-config.js",
      prismic: "~/plugins/prismic-config.js",
      shopifyAdmin: "~/plugins/shopify-admin-config.js",
    },
  },
  serverMiddleware: ["~/api"],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // analyze: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias.vue = "vue/dist/vue.common";
    },
    generate: {
      fallback: "404.html", // Netlify reads a 404.html, Nuxt will load as an SPA
    },
    transpile: ["swiper", "vue-instantsearch", "instantsearch.js/es"],
    postcss: {
      preset: {
        // Change the postcss-preset-env settings
        "postcss-custom-properties": {},
        autoprefixer: {
          // grid: true,
          // flexbox: true,
        },
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "server-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "server-crt.pem")),
    },
  },
};
