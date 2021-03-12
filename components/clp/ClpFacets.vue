<template>
  <ais-instant-search-ssr>
    <product-tag-configure :collection-rule-set="collectionRuleSet" />
    <ais-configure
      :hits-per-page.camel="hitsPerPage"
      :faceting-after-distinct.camel="true"
      :distinct="true"
    />
    <clp-facet-widget
      v-for="facet of facetWidgets"
      :key="facet.name"
      :attribute="facet.attribute"
      :label="facet.title"
      class="mb-6 lg:mb-14"
    >
      <template #default="{ label, items, createURL, attribute }">
        <div
          class="text-lg leading-6 lg:text-3xl lg:leading-9 font-normal text-black lg:text-center mb-4"
        >
          {{ label }}
        </div>
        <div
          class="flex items-center flex-wrap justify-start md:justify-center -mx-2 md:-mx-3"
        >
          <nuxt-link
            v-for="(item, index) of items"
            :key="index"
            :to="createURL(item.value, attribute)"
            class="px-1 md:px-2.5"
            :class="[
              label.toLowerCase() === 'brand' ? ' px-1 mb-3 ' : ' px-1 mb-2',
            ]"
          >
            <button
              class="selectors inline-flex items-center justify-center flex-col focus:outline-none border border-gray-400 hover:border-brown-100 bg-white lg:w-39 lg:h-33 p-2"
              :class="[
                label.toLowerCase() === 'brand'
                  ? ' w-26 h-26 xs:w-27 xs:h-27 '
                  : ' w-40 h-30 xs:w-42 ',
              ]"
            >
              <component
                :is="item.icon"
                v-if="iconComponents.includes(item.icon)"
                class="icon w-20"
              />
              <h3
                v-if="
                  !iconComponents.includes(item.icon) ||
                  attribute === widgetConfig.size.shopifyName
                "
                class="title text-sm font-medium text-black text-center uppercase w-full truncate"
              >
                {{ item.label }}
              </h3>
            </button>
          </nuxt-link>
        </div>
      </template>
    </clp-facet-widget>

    <div class="flex justify-center px-4">
      <app-button :to="viewAllRoute" responsive block>
        VIEW ALL {{ $prismic.asText(collectionTitle) }}
      </app-button>
    </div>
  </ais-instant-search-ssr>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import createSearchSSRMixin from "~/mixins/createSearchSSRMixin";
import facetsMixin from "~/mixins/facetsMixin";

export default {
  mixins: [facetsMixin],

  props: {
    collectionTitle: { type: Array, required: true },
    collectionRuleSet: { type: Object, required: true },
  },

  data() {
    const {
      algoliaAppId,
      algoliaKey,
      indexName,
    } = this.$store.state.siteConfig;

    // Create it in `data` to access the Vue Router
    const mixin = createSearchSSRMixin({
      algoliaAppId,
      algoliaKey,
      indexName,
      facets: ["refinementList"],
    });

    return { ...mixin.data() };
  },

  computed: {
    ...mapGetters(["shownFacets"]),
    ...mapState(["siteConfig"]),
    iconComponents() {
      return [
        "icon-double",
        "icon-king",
        "icon-king-single",
        "icon-long-single",
        "icon-madison",
        "icon-queen",
        "icon-single",
        "icon-sealy",
        "icon-bedgear",
        "icon-super-king",
        "icon-sleeptailor",
        "icon-slumberland",
        "icon-tempur",
      ];
    },
    widgetConfig() {
      return this.siteConfig.collection.facetWidgets;
    },
    hitsPerPage() {
      return 0;
    },
    facetsToShow() {
      return [
        this.widgetConfig.size.shopifyName,
        this.widgetConfig.feel.shopifyName,
        this.widgetConfig.brand.shopifyName,
      ];
    },
    facetWidgets() {
      const collectionFacets = this.shownFacets.filter(facet =>
        this.facetsToShow.includes(facet.name)
      );
      return collectionFacets.map(facet => ({
        attribute: facet.name,
        operator: facet.operator,
        title: facet.title,
        type: facet.type,
        componentName: "algolia-facet",
      }));
    },
    viewAllRoute() {
      return `${this.$route.path}/products`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.selectors .icon + .title {
  @apply mt-4;
}
</style>
