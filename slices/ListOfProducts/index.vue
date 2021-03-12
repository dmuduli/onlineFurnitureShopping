<template>
  <plp-product-list :collection-rule-set="collectionRuleSet" />
</template>

<script>
import { COLLECTION_BY_HANDLE } from "~/middleware/collection-rule-set";

export default {
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
};
</script>
