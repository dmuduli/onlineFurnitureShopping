<template>
  <div class="xl:px-27 px-4">
    <static-page-bread-crumb :page-name="title" />
    <div class="container mx-auto pb-12 prose max-w-none">
      <cms-rich-text :field="title" />
      <img
        v-if="featureImage"
        :src="`${featureImage.url}&ar=4:1&fit=crop`"
        :alt="featureImage.alt"
        class="w-full"
      />
      <div class="flex flex-wrap lg:flex-no-wrap">
        <div class="w-full xl:w-8/12 responsive-video">
          <cms-rich-text :field="description" class="flex-auto" />
          <blog-detail-pagination :blog-detail="blog" />
        </div>
        <aside class="w-full xl:w-4/12 text-right prose-right wordbreak">
          <blog-recent />
          <blog-categories v-if="blog.tags" :tags="blog.tags" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import trackRoutes from "~/mixins/trackRoutes";

export default {
  mixins: [trackRoutes],
  async asyncData({ store, params: { handle } }) {
    await Promise.all([
      store.dispatch("blog/fetchBlog", { handle }),
      store.dispatch("blog/fetchRecentBlogs", { handle }),
    ]);

    await store.dispatch("blog/fetchBlogNavigation", { handle });
  },

  computed: {
    ...mapGetters("blog", ["getBlog"]),
    blog() {
      return this.getBlog(this.$route.params.handle);
    },
    title() {
      return this.blog.data.title;
    },
    featureImage() {
      return this.blog.data.feature_image;
    },

    description() {
      return this.blog.data.description;
    },
  },
};
</script>

<style lang="postcss" scoped>
.responsive-video /deep/ [data-oembed-type="video"] {
  @apply relative overflow-hidden w-full;
  padding-top: 56.25%;
}
.responsive-video /deep/ iframe {
  @apply absolute top-0 left-0 bottom-0 right-0 w-full h-full;
}
</style>
