<template>
  <div v-if="totalPages > 1" class="pagination text-center">
    <span v-if="currentPage > 1 && totalPages > blogsPerPage" class="prev">
      <nuxt-link :to="buildURL(currentPage - 1)" class="p-2">
        « Previous
      </nuxt-link>
    </span>
    <template v-if="showPrevDeco">
      <span class="page">
        <nuxt-link :to="buildURL(1)" class="p-2"> 1 </nuxt-link>
      </span>
      <span class="deco">…</span>
    </template>
    <span v-for="(page, index) of pages" :key="index" class="page">
      <nuxt-link
        :to="buildURL(page)"
        :title="page"
        class="p-2 nuxt-link-active"
        :class="{
          'nuxt-link-exact-active': !$route.query.page && index === 0,
        }"
      >
        {{ page }}
      </nuxt-link>
    </span>
    <template v-if="showNextDeco">
      <span class="deco">…</span>
      <span class="page">
        <nuxt-link :to="buildURL(totalPages)" class="p-2">
          {{ totalPages }}
        </nuxt-link>
      </span>
    </template>
    <span
      v-if="currentPage < totalPages && totalPages > blogsPerPage"
      class="next"
    >
      <nuxt-link :to="buildURL(currentPage + 1)" class="p-2">
        Next »
      </nuxt-link>
    </span>
  </div>
</template>

<script>
export default {
  props: { totalPages: { type: Number, default: 1 } },

  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1;
    },
    blogsPerPage() {
      return this.$store.state.siteConfig.blogsPerPage;
    },
    isLastRange() {
      return this.totalPages - this.currentPage < this.blogsPerPage;
    },
    pages() {
      let count = [];
      if (this.totalPages > this.blogsPerPage) {
        if (this.isStartRange) {
          for (let i = 1; i <= this.currentPage + 2; i++) {
            count.push(i);
          }
        } else if (this.isLastRange) {
          for (let i = this.currentPage - 2; i <= this.totalPages; i++) {
            count.push(i);
          }
        } else {
          for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
            count.push(i);
          }
        }
        if (this.totalPages - count[count.length - 1] === 1) {
          count.push(this.totalPages);
        }
      } else {
        for (let i = 1; i <= this.totalPages; i++) {
          count.push(i);
        }
      }
      return count;
    },
    isStartRange() {
      return this.currentPage < this.blogsPerPage;
    },
    showPrevDeco() {
      return this.totalPages > this.blogsPerPage && this.pages[0] - 1 >= 2;
    },
    showNextDeco() {
      return (
        this.totalPages > this.blogsPerPage &&
        this.totalPages - this.pages[this.pages.length - 1] >= 2
      );
    },
  },

  methods: {
    buildURL(page) {
      let url = "/blogs/inspiration";
      if (this.$route.params.tag) {
        url += `/tagged/${this.$route.params.tag}`;
      }
      url += `?page=${page}`;
      return url;
    },
  },
};
</script>
