<template>
  <div class="w-full pb-10 lg:pb-20">
    <app-container v-if="hasTitle" class="xl:px-27 px-5 pt-10 md:text-center">
      <cms-rich-text
        :field="primary.title1"
        class="text-1sm leading-7 text-gray-900 lg:text-4xl lg:leading-11 font-normal lg:text-gray-333 md:text-center mb-4 lg:mb-8 section-title-size"
      />
    </app-container>
    <clp-facets
      :collection-title="title"
      :collection-rule-set="collectionRuleSet"
    />
  </div>
</template>

<script>
import { hasPath } from "ramda";
import { COLLECTION_BY_HANDLE } from "~/middleware/collection-rule-set";

export default {
  props: {
    title: { type: Array, required: true },
    primary: { type: Object, default: () => {} },
  },

  data: () => ({ collectionRuleSet: null }),

  fetch() {
    const { handle } = this.$route.params;
    const client = this.$nuxt.context.app.apolloProvider.clients.shopifyAdmin;

    const { collectionByHandle } = client.readQuery({
      query: COLLECTION_BY_HANDLE,
      variables: { handle },
    });
    this.collectionRuleSet = collectionByHandle;
  },

  computed: {
    hasTitle() {
      return hasPath(["title1", [0], "text"], this.primary);
    },
  },
};
</script>
