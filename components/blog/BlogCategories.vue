<template>
  <div v-if="tags.length">
    <h3 v-if="!$route.params.tag">Categories</h3>
    <span v-else>Tags: </span>
    <ul :class="{ 'inline-flex': $route.params.tag }">
      <li v-for="(tag, index) of tags" :key="index">
        <nuxt-link
          :to="createTaggedURL(tag)"
          :title="`Show articles tagged ${formatTagLabel(tag)}`"
        >
          {{ formatTagLabel(tag, index === tags.length - 1) }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { tags: { type: Array, default: () => [] } },

  methods: {
    createTaggedURL(tag) {
      return `/blogs/inspiration/tagged/${this.getTagname(tag)}`;
    },
    getTagname(tag) {
      return tag.substring(tag.indexOf("_") + 1).replace(/\s/g, "-");
    },
    formatTagLabel(tag, skipSeperator) {
      return (
        tag.substring(tag.indexOf("_") + 1) +
        (this.$route.params.tag && !skipSeperator ? ", " : "")
      );
    },
  },
};
</script>
