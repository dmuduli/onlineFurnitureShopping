<template>
  <div>
    <app-bread-crumb :page-name="title" />
    <app-container class="pr-0 pl-0 lg:px-5">
      <bag-non-empty-state v-if="itemCount" />
      <bag-empty-state v-else :description="description" />
    </app-container>
    <slice-zone :slices="slices" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import { pathOr } from "ramda";
import { mapGetters } from "vuex";

import { getPrismicProducts } from "~/utils/getPrismicProducts";
import { getShopifyProducts } from "~/slices/ShopifyProducts/fragment";
import { getCallToAction } from "~/slices/CallToAction/fragment";
import { getTopCategory } from "~/slices/TopCategory/fragment";

import trackRoutes from "~/mixins/trackRoutes";

const CART_PAGE_QUERY = gql`
  {
    allCarts {
      edges {
        node {
          title
          description
          body {
            ...Cart_call_to_action
            ...Cart_Shopify_products
            ...Cart_top_category
          }
        }
      }
    }
  }
  ${getShopifyProducts("Cart")}
  ${getCallToAction("Cart")}
  ${getTopCategory("Cart")}
`;

async function getPrismicData(app) {
  const client = app.apolloProvider.clients.prismic;
  const result = await client.query({
    query: CART_PAGE_QUERY,
  });

  return pathOr(
    { body: null, title: null },
    ["data", "allCarts", "edges", [0], "node"],
    result
  );
}

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

const CART_SHOP_QUERY = gql`
  query {
    shopMetaFields: shop {
      membershipDiscount: metafield(
        key: "membership_discount"
        namespace: "snooze"
      ) {
        value
      }
      autoClubVariantId: metafield(
        key: "auto_club_variant_id"
        namespace: "snooze"
      ) {
        value
      }
      velocityVariantId: metafield(
        key: "velocity_member_variant_id"
        namespace: "snooze"
      ) {
        value
      }
      membershipVariantId: metafield(
        key: "membership_variant_id"
        namespace: "snooze"
      ) {
        value
      }
      cart_default: metafield(
        key: "cart_default_message"
        namespace: "quickship"
      ) {
        value
      }
      cart_wa: metafield(key: "cart_wa_message", namespace: "quickship") {
        value
      }
      cart_sa: metafield(key: "cart_sa_message", namespace: "quickship") {
        value
      }
      cart_vic: metafield(key: "cart_vic_message", namespace: "quickship") {
        value
      }
      cart_nsw: metafield(key: "cart_nsw_message", namespace: "quickship") {
        value
      }
      cart_qld: metafield(key: "cart_qld_message", namespace: "quickship") {
        value
      }

      cart_postcode_default: metafield(
        key: "cart_postcode_default_message"
        namespace: "quickship"
      ) {
        value
      }
      cart_postcode_wa: metafield(
        key: "cart_postcode_wa_message"
        namespace: "quickship"
      ) {
        value
      }
      cart_postcode_sa: metafield(
        key: "cart_postcode_sa_message"
        namespace: "quickship"
      ) {
        value
      }
      cart_postcode_vic: metafield(
        key: "cart_postcode_vic_message"
        namespace: "quickship"
      ) {
        value
      }
      cart_postcode_nsw: metafield(
        key: "cart_postcode_nsw_message"
        namespace: "quickship"
      ) {
        value
      }
      cart_postcode_qld: metafield(
        key: "cart_postcode_qld_message"
        namespace: "quickship"
      ) {
        value
      }
    }
    productByHandle(handle: "snooze-assembly-service") {
      variants(first: 50) {
        edges {
          node {
            taxable
            sku
            id
            storefrontId
            title
            price
          }
        }
      }
    }
  }
`;

async function getShopifyAdminData(app) {
  const client = app.apolloProvider.clients.shopifyAdmin;
  const { data } = await client.query({ query: CART_SHOP_QUERY });

  return data;
}

export default {
  mixins: [trackRoutes],
  async asyncData({ app, $axios, $config, store }) {
    const [
      { body: slices, title, description },
      { shopMetaFields, productByHandle },
    ] = await Promise.all([getPrismicData(app), getShopifyAdminData(app)]);

    const assemblyVariants = pathOr([], ["variants", "edges"], productByHandle);

    await Promise.all([
      store.dispatch("bag/setShopMetaFields", shopMetaFields),
      store.dispatch("bag/setAssemblyVariants", { assemblyVariants }),
    ]);

    const source = $axios.CancelToken.source();
    const prismicProducts = getPrismicProducts(slices);
    if (prismicProducts.length) {
      await dispatchVariantImages({
        products: prismicProducts,
        store,
        $config,
        source,
      });
    }

    return { slices, title, description };
  },
  computed: {
    ...mapGetters("checkout", ["itemCount"]),
  },
  async created() {
    await this.$store.dispatch("quickship/hydrate");
  },
};
</script>
