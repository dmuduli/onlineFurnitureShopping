<template>
  <div class="container mx-auto pb-12 prose prose-blog max-w-none">
    <blog-list-page-title :title="title" />
    <template v-if="pageblogs.length">
      <blog-item
        v-for="(uid, index) of pageblogs"
        :key="index"
        :blog="blogs[uid]"
      />
    </template>
    <template v-else>
      <p>Sorry! No blogs on this page.</p>
    </template>
    <blog-pagination v-if="pageblogs.length" :total-pages="totalPages" />
  </div>
</template>

<script>
import { pathOr } from "ramda";
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["title", "blogs"]),
    ...mapGetters("blog", ["getBlogs", "getTotalPages"]),
    currentPage() {
      return Number(this.$route.query.page) || 1;
    },
    tag() {
      const tag = pathOr("", ["$route", "params", "tag"], this);
      return tag ? `Blog_${tag.replace(/-/g, " ")}` : "";
    },
    pageblogs() {
      return this.getBlogs(this.currentPage, this.tag);
    },
    totalPages() {
      return this.getTotalPages(this.tag);
    },
  },
};
</script>
