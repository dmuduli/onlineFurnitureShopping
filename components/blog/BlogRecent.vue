<template>
  <div v-if="recentBlogs.length">
    <h3>Recent Articles</h3>
    <ul>
      <li v-for="(blog, index) of recentBlogs" :key="index">
        <nuxt-link :to="`/blogs/inspiration/${blog.uid}`">
          {{ blog.title }}
        </nuxt-link>
        <br />
        <time :datetime="blog.publishDate">
          {{ blog.publishDate | formatDate }}
        </time>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["recentBlogs"]),
  },
};
</script>

<style lang="postcss" scoped>
.wordbreak a {
  word-break: normal;
}
</style>
