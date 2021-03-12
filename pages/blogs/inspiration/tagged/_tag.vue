<template>
  <div class="xl:px-27 px-4">
    <static-page-bread-crumb />
    <blog-items-container />
  </div>
</template>

<script>
export default {
  async asyncData({ store, params: { tag }, query: { page = 1 } }) {
    await store.dispatch("blog/fetchTaggedBlogs", {
      page,
      tag: `Blog_${tag.replace(/-/g, " ")}`,
    });
  },

  watchQuery: ["page"],
};
</script>
