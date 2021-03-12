<template>
  <div class="clearfix mt-8 mb-8 lg:mb-0">
    <span v-if="navigation.olderUid" class="float-left">
      &larr;
      <nuxt-link :to="`/blogs/inspiration/${navigation.olderUid}`">
        Older Post
      </nuxt-link>
    </span>
    <span v-if="navigation.newerUid" class="float-right">
      <nuxt-link :to="`/blogs/inspiration/${navigation.newerUid}`">
        Newer Post
      </nuxt-link>
      &rarr;
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["blogsNavigation"]),
    navigation() {
      return this.blogsNavigation[this.$route.params.handle];
    },
  },
};
</script>
