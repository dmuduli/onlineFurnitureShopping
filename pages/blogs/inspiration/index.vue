<template>
  <div class="xl:px-27 px-4">
    <static-page-bread-crumb />
    <blog-items-container />
  </div>
</template>

<script>
import { mapState } from "vuex";

import trackRoutes from "~/mixins/trackRoutes";

export default {
  mixins: [trackRoutes],

  async asyncData({ store, query }) {
    const { page = 1 } = query;
    await store.dispatch("blog/fetchBlogs", { page });
  },

  computed: {
    // title is being used in track route mixin
    ...mapState("blog", ["title"]),
  },

  watchQuery: ["page"],
};
</script>
