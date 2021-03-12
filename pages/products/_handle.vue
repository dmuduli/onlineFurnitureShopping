<template>
  <div>
    <pdp-sticky-header
      :class="[showSticky ? 'block' : 'hidden']"
      :title="title"
      :image="featuredImage"
      :is-out-of-stock="isOutOfStock"
      :selected-variant="selectedVariant"
    />
    <app-bread-crumb :page-name="titleArray" is-pdp />
    <div class="flex flex-col-reverse lg:flex-row lg:space-x-12">
      <div class="w-full lg:w-2/3 xl:pl-27 lg:pl-5">
        <pdp-image
          :images="allImages"
          :three-d-url="threeDUrl"
          :alt-text="imageAltText"
          class="mb-12 hidden lg:block bg-white"
        />
        <pdp-description
          :description-html="descriptionHtml"
          class="mb-12 lg:px-0 px-5"
        />
        <pdp-feature-tiles class="mb-12 lg:px-0 px-5" :tags="featureTileTags" />
        <pdp-feature-accordian
          class="mb-12 lg:px-0 px-5"
          :selected-variant="selectedVariant"
        />
      </div>
      <div class="w-full lg:w-1/3 xl:pr-27 lg:pr-5">
        <pdp-image
          :images="allImages"
          :three-d-url="threeDUrl"
          :alt-text="imageAltText"
          class="bg-white lg:hidden"
        />
        <pdp-main-info
          ref="main-info"
          :title="title"
          :quickship="showNextdayIcon"
          :sale-tag-text="saleTag.text"
          :sale-tag-bg-color="saleTag.backgroundColor"
          :selected-variant="selectedVariant"
          class="mb-6 px-5 lg:px-0"
          @scroll-to-reviews="scrollToReviews"
        />
        <div
          v-for="{ label, tiles, selectedTile } of variantTiles"
          :key="label"
          class="lg:px-0 px-5"
        >
          <template v-if="label == 'Size'">
            <pdp-tiles-for-size
              :tiles="tiles"
              :label="label"
              :selected-tile="selectedTile"
              :variants="variantsById"
              class="mb-6"
              @select-variant-id="handleVariantSelect"
            />
          </template>
          <template
            v-if="label == 'Comfort Feel' || label == 'Comfort Feel Left'"
          >
            <pdp-tiles-for-feel
              :is-single-size-selected="isSingleSizeSelected"
              :tiles="tiles"
              :label="label"
              :selected-tile="selectedTile"
              :variants="variantsById"
              class="mb-6"
              @select-variant-id="handleVariantSelect"
            />
          </template>
          <template
            v-if="!isSingleSizeSelected && label == 'Comfort Feel Right'"
          >
            <pdp-tiles-for-feel
              :is-single-size-selected="isSingleSizeSelected"
              :tiles="tiles"
              :label="label"
              :selected-tile="selectedTile"
              :variants="variantsById"
              class="mb-6"
              @select-variant-id="handleVariantSelect"
            />
          </template>
          <template v-if="label == 'Colour'">
            <pdp-tiles-for-color
              :tiles="tiles"
              :label="label"
              :selected-tile="selectedTile"
              :meta-colors="getMetaColors(variants)"
              class="mb-6"
              @select-variant-id="handleVariantSelect"
            />
          </template>
        </div>
        <pdp-add-to-cart
          id="addToCart"
          class="mb-6 lg:px-0 px-5"
          :is-out-of-stock="isOutOfStock"
          :selected-variant="selectedVariant"
        />
        <pdp-added-to-bag-modal
          v-if="isAddedToBagOpen"
          :recommended-product="recommendedProduct"
          :product-to-be-added="productToBeAdded"
        />
        <!-- Tab functionality -->
        <div class="flex flex-col bg-gray-300 mb-6">
          <div class="flex items-center mb-4 lg:px-6 px-5 pt-6">
            <a
              class="text-sm lg:text-xs mxl:text-sm mr-10 lg:mr-6 mxl:mr-11 text-black uppercase font-medium cursor-pointer border-b-2 pb-1"
              :class="{ ' border-gray-500': deliveryTab }"
              @click="deliveryTab = true"
            >
              Delivery
            </a>
            <a
              class="text-sm lg:text-xs mxl:text-sm text-black font-medium uppercase cursor-pointer border-b-2 pb-1"
              :class="{ 'border-gray-500': !deliveryTab }"
              @click="deliveryTab = false"
            >
              Find my store
            </a>
          </div>
          <pdp-delivery-options v-if="deliveryTab" :variant="selectedVariant" />
          <pdp-find-store v-else />
        </div>
        <pdp-payment-icons
          :variant="selectedVariant"
          :payment-icons="paymentIcons"
          class="mb-6"
        />
      </div>
    </div>
    <div class="xl:px-27 border-b border-gray-500 lg:border-b-0 mb-8">
      <pdp-feel :variants="selectedVariant" class="mb-12" />
    </div>
    <pdp-review-container ref="review-container" :product-id="id" />
    <slice-zone :slices="slices" class="pdp-listing-section" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import {
  isEmpty,
  compose,
  map,
  mapObjIndexed,
  path,
  filter,
  pathOr,
  propEq,
} from "ramda";
import { mapGetters, mapState } from "vuex";

import {
  handler,
  getVariantsById,
  getVariantsByPosition,
  getTilesInfo,
  getOptionsByName,
  getSelectedVariantId,
  getRebuyData,
} from "~/datalayer/PDPPage";
import { getPrismicProducts } from "~/utils/getPrismicProducts";
import metaColourMixin from "~/mixins/metaColourMixin";
import saleTagMixin from "~/mixins/saleTagMixin";
import { isSliceRenderByRebuy, updatedSlices } from "~/utils/reBuyUtils";

import seoMixin from "~/mixins/seoMixin";

async function dispatchVariantImages({ products, store, $config, source }) {
  const productsForVarints = products.map(field => ({
    handle: field.product.handle,
    productId: field.product.id,
  }));

  await store.dispatch("products/getVariantImages", {
    productsForVarints,
    uri: $config.shopifyVariantsEndPoint,
    source,
  });
}

const getRecommendedProduct = compose(
  pathOr(null, [[0]]),
  map(path(["fields", [0], "product"])),
  filter(propEq("label", "you_might_also_like"))
);

async function fetchFetureTags(app) {
  let featureTags = [];
  const client = app.apolloProvider.clients.prismic;
  const { data } = await client.query({
    query: featureTagsQuery,
  });

  featureTags = path(
    ["allFeature_tagss", "edges", [0], "node", "tags_group"],
    data
  );
  return featureTags;
}

const getSelectedOptions = varinatId =>
  compose(
    mapObjIndexed(path(["value"])),
    path([varinatId, "selectedOptions"]),
    getVariantsById
  );

const dispatchGetVelocityPoints = async function (store, variants) {
  let payload = variants.map(({ sku, price }) => ({
    sku,
    price: price * 100,
    quantity: 1,
  }));
  await store.dispatch("velocity/fetchVelocityPoints", payload);
};

const featureTagsQuery = gql`
  {
    allFeature_tagss {
      edges {
        node {
          tags_group {
            tag_id
            tag_image
            display_name
            description
          }
        }
      }
    }
  }
`;

export default {
  mixins: [metaColourMixin, saleTagMixin, seoMixin],
  beforeRouteUpdate(to, from, next) {
    const payload = {
      title: this.pageTitle[0],
      url: from.fullPath,
    };
    this.$store.dispatch("app/setRedirectFrom", payload);
    next();
  },
  transition: "fade",
  async asyncData({ app, route, $axios, $config, store }) {
    let selectedVariantId = route.query.variant;

    const featureTags = await fetchFetureTags(app);
    let {
      slices,
      metaRobots,
      pageTitle,
      paymentIcons,
      shopifyData,
    } = await handler({
      app,
      route,
    });

    const source = $axios.CancelToken.source();

    // rebuy logic for rendering you might also like
    try {
      if (isSliceRenderByRebuy(slices, "you_might_also_like")) {
        let rebuyResponse = await getRebuyData($axios, $config, shopifyData.id);
        if (rebuyResponse.data) {
          slices = updatedSlices(slices, rebuyResponse.data);
        }
      }
    } catch (e) {
      console.log("error-----", e);
    }
    // Rebuy end
    const prismicProducts = getPrismicProducts(slices);

    const allProducts = prismicProducts.concat({ product: shopifyData });
    if (allProducts.length) {
      await dispatchVariantImages({
        products: allProducts,
        store,
        $config,
        source,
      });
    }

    if (selectedVariantId == null) {
      selectedVariantId = shopifyData.variants[0].id;
    }
    const selectedVarOptions = getSelectedOptions(selectedVariantId)(
      shopifyData.variants
    );
    const initSelectedColor = pathOr("", ["Colour"], selectedVarOptions);

    await dispatchGetVelocityPoints(store, shopifyData.variants);

    const metaFields = {
      _linkType: "Link.document",
      _meta: {
        uid: route.params.handle,
        type: "product_detail_page",
      },
    };

    const { metaTitle, metaDescription } = shopifyData;

    return {
      slices,
      initSelectedColor,
      pageTitle,
      ...shopifyData,
      selectedVariantId,
      selectedVarOptions,
      featureTags,
      paymentIcons,
      metaRobots,
      metaFields,
      metaTitle,
      metaDescription,
    };
  },
  data() {
    return {
      addToCartOffset: 0,
      $addToCart: null,
      showSticky: false,
      selectedPosition: 1,
      deliveryTab: true,
      titleArray: [],
    };
  },
  computed: {
    ...mapGetters({ getVarinatImageIds: "products/varinatImages" }),
    ...mapState("quickship", ["eligible"]),
    ...mapGetters("quickship", ["isSkuAvailable"]),
    ...mapState("app", ["isAddedToBagOpen"]),
    variantImageIds() {
      return this.getVarinatImageIds(this.id, this.selectedVariantId);
    },
    getVariantImagesFunc() {
      return compose(
        map(path(["src"])),
        filter(x => this.variantImageIds.includes(x.id))
      );
    },
    variantsById() {
      return getVariantsById(this.variants);
    },
    variantsByPosition() {
      return getVariantsByPosition(this.variants);
    },
    optionsByName() {
      return getOptionsByName(this.options);
    },
    selectedVariant() {
      return this.variantsById[this.selectedVariantId];
    },
    titlesInfo() {
      return getTilesInfo(this.options, this.variants);
    },
    isSingleSizeSelected() {
      const value = pathOr(
        "",
        ["selectedVariant", "selectedOptions", "Size", "value"],
        this
      );

      return value.toLowerCase().includes("single");
    },
    variantTiles() {
      return this.titlesInfo(this.selectedVarOptions);
    },
    selectedOptions() {
      return this.selectedVariant.selectedOptions;
    },
    allImages() {
      const images = isEmpty(this.variantImageIds)
        ? [this.featuredImage]
        : this.getVariantImagesFunc(this.images);

      return images.length ? images : [this.featuredImage];
    },
    getSelectedVariantId() {
      return getSelectedVariantId(this.variantOptionsMap);
    },
    saleTag() {
      return this.getSaleTag({
        collections: this.collections,
        metafields: this.metafields,
        price: this.selectedVariant.price,
        compareAtPrice: this.selectedVariant.compareAtPrice,
      });
    },
    isOutOfStock() {
      return (
        path(["selectedVariant", "fulfillmentService", "serviceName"], this) ===
          "shopify" &&
        this.selectedVariant.inventoryQuantity < 1 &&
        this.selectedVariant.inventoryPolicy === "deny"
      );
    },
    showNextdayIcon() {
      return this.tags.includes("quickship: Next Day Delivery");
    },
    showQuickshipMsg() {
      return this.isSkuAvailable(this.variant.sku) && this.eligible;
    },
    featureTileTags() {
      return this.featureTags.filter(item => {
        const node = path(["tag_id", "node"], item);
        return this.tags.some(tag => node === tag);
      });
    },
    recommendedProduct() {
      return getRecommendedProduct(this.slices);
    },
    productToBeAdded() {
      return {
        title: this.title,
        description: this.description,
        price: this.selectedVariant.price,
        image: this.allImages[0],
        compareAtPrice: this.selectedVariant.compareAtPrice,
      };
    },
    imageAltText() {
      return `${this.title} - ${this.selectedVariant.title}`;
    },
  },
  watch: {
    selectedVariantId(variantId) {
      this.$router.replace({
        query: { variant: this.selectedVariantId },
      });
    },
  },
  async mounted() {
    window.addEventListener("scroll", this.catchScroll);

    this.$addToCart = document.getElementById("addToCart");
    this.addToCartOffset =
      document.getElementsByTagName("header")[0].offsetHeight / 2 - 5;
    this.$store.dispatch("app/hydrateRedirectFrom");
    this.titleArray = [{ pageTitle: this.title }];

    // review and rating call on page load
    await this.$store.dispatch("pdp/getReviewRating", {
      productId: this.id,
      page: 1,
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.catchScroll);
    if (this.isAddedToBagOpen) {
      this.$store.dispatch("app/closeAddedToBag", this.isTablet);
    }
  },
  methods: {
    catchScroll() {
      this.showSticky =
        window.pageYOffset > this.$addToCart.offsetTop - this.addToCartOffset;
    },
    handleVariantSelect(variantId, label, tileLabel) {
      this.selectedVariantId = variantId;
      this.selectedVarOptions = mapObjIndexed(
        path(["value"]),
        this.selectedVariant.selectedOptions
      );
    },
    scrollToReviews() {
      if (this.$refs["review-container"]) {
        const scrollHeight =
          this.$refs["review-container"].$el.offsetTop -
          this.$refs["main-info"].$el.offsetTop;
        window.scrollTo({
          top: scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style lang="postcss">
@screen lg {
  .pdp-listing-section > div {
    @apply pb-10 !important pt-0 !important;
  }
}
</style>
