<template>
  <div v-if="product">
    <slot name="images" :product-images-props="productImagesProps">
      Put Images here
    </slot>
    <!-- client observation to remove brand -->
    <!-- <slot name="brand">Put Brand here</slot> -->
    <slot name="title" :selected-variantId="selectedVariantId">
      Put title here
    </slot>
    <slot name="ratings" :selected-variantId="selectedVariantId">
      Put rating here
    </slot>

    <div class="flex items-center flex-wrap">
      <slot name="colors" :product-color-props="productColorProps">
        Put colors here
      </slot>
      <slot name="sizes">Put size here</slot>
    </div>
    <slot
      name="prices"
      :compare-at-price="Number(minPriceVariant.compare_at_price)"
      :price="Number(minPriceVariant.price)"
    >
      Put prices here
    </slot>
    <div v-if="!product.options.length">
      <div class="pt-3 flex mb-2 w-full space-x-4">
        <div class="h-6 w-6 rounded-full"></div>
        <div class="h-6 w-6 rounded-full"></div>
        <div class="h-6 w-6 rounded-full"></div>
        <div class="h-6 w-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  map,
  zipObj,
  keys,
  values,
  pathOr,
  path,
  mapObjIndexed,
  reduce,
  minBy,
} from "ramda";
import saleTagMixin from "~/mixins/saleTagMixin";
import { getSelectedVariantId, getVariantsById } from "~/datalayer/PDPPage";
import metaColourMixin from "~/mixins/metaColourMixin";
import { createVariantOptionsMap } from "~/utils/shopify-utils";

export default {
  mixins: [saleTagMixin, metaColourMixin],
  props: {
    product: { type: Object, required: true },
    initialVariantId: { type: [Number, String], required: true },
  },
  data() {
    return {
      initSelectedOptions: {},
      initSelectedColor: "",
      selectedVariantId: this.initialVariantId,
    };
  },
  computed: {
    ...mapGetters({ getVarinatImageIds: "products/varinatImages" }),
    variantOptionsMap() {
      return createVariantOptionsMap(
        this.product.options,
        this.product.variants
      );
    },
    selectedVariantIdFunc() {
      return getSelectedVariantId(this.variantOptionsMap);
    },
    selectedVariant() {
      return this.variantsById[this.selectedVariantId];
    },
    variantsById() {
      return getVariantsById(this.product.variants);
    },
    compareAtPrice() {
      return this.selectedVariant
        ? Number(this.selectedVariant.compare_at_price)
        : this.product.compare_at_price;
    },
    minPriceVariant() {
      return reduce(
        minBy(v => Number(v.price)),
        { price: Infinity },
        this.product.variants
      );
    },
    price() {
      return this.selectedVariant
        ? Number(this.selectedVariant.price)
        : this.product.price;
    },
    metaColors() {
      const metaColorArgs = this.product.variants;
      return this.getMetaColors(metaColorArgs);
    },
    saleTag() {
      const { metafields, tags } = this.product;
      return this.getSaleTag({
        tags,
        metafields,
        price: this.price,
        compareAtPrice: this.compareAtPrice,
      });
    },
    allImages() {
      let images = [path(["product", "images", [[0]], "src"], this)];
      // Varaint is not selected
      // because variant is not loaded yet
      if (this.selectedVariant == null) {
        return images;
      }

      const imageIds = this.getVarinatImageIds(
        this.product.id,
        this.selectedVariant.id
      );
      if (imageIds.length === 0) {
        return images;
      }

      const variantImages = this.product.images
        .filter(i => imageIds.includes(String(i.id)))
        .map(i => i.src)
        .filter(Boolean);

      if (variantImages.length === 0) {
        return images;
      }

      return variantImages;
    },
    productImagesProps() {
      return {
        allImages: this.allImages,
        saleTagText: this.saleTag.text,
        saleTagBgColor: this.saleTag.backgroundColor,
        handle: this.product.handle,
        tags: this.product.tags,
        metafields: this.product.metafields,
        selectedVariantId: this.selectedVariantId,
      };
    },
    productColorProps() {
      return {
        handleVariantSelect: this.handleVariantSelect,
        initSelectedColor: this.initSelectedColor,
        metaColors: this.metaColors,
        handle: this.product.handle,
        selectedVariantId: this.selectedVariantId,
      };
    },
  },
  created() {
    if (this.product.selectedOptions) {
      // in case of algolia products
      const initSelectedOptionsKeys = keys(this.product.selectedOptions);
      const initSelectedOptionsValues = values(this.product.selectedOptions);
      this.initSelectedOptions = zipObj(
        map(
          x => (x ? x.charAt(0).toUpperCase() + x.slice(1) : ""),
          initSelectedOptionsKeys
        ),
        initSelectedOptionsValues
      );
      this.initSelectedColor = pathOr("", ["Colour"], this.initSelectedOptions);
      return;
    }

    // in case of prismic products this field will work
    const selectedOptions = path(["selectedOptions"], this.selectedVariant);
    this.initSelectedOptions = mapObjIndexed(path(["value"]), selectedOptions);
    this.initSelectedColor = pathOr("", ["Colour", "value"], selectedOptions);
  },
  methods: {
    handleVariantSelect(color) {
      this.selectedVariantId = this.selectedVariantIdFunc({
        ...this.initSelectedOptions,
        Colour: color,
      });
    },
  },
};
</script>
