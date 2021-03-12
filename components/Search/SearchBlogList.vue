<template>
  <div class="blogs">
    <h3 class="text-sm leading-8 text-gray-600">Other results</h3>
    <div v-if="hits.length == 0">No blog posts found</div>
    <ul>
      <li v-for="hit of hits" :key="hit.objectID" class="mb-2">
        <nuxt-link
          class="flex border border-transparent hover:border-gray-500 hover:shadow transition-colors duration-500 ease-in-out"
          :to="`/blogs/inspiration/${hit.handle}`"
          @click.native.prevent="closeSearch"
        >
          <figure class="w-18 flex-shrink-0 mr-3">
            <img :src="modifiedSrc(hit.image)" :alt="hit.title" />
          </figure>
          <div v-if="hit.title" class="pt-4 lg:pr-4 min-w-0">
            <h4
              class="text-xs leading-4 text-gray-800 font-para two-line-clamp"
            >
              {{ hit.title }}
            </h4>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import qs from "qs";

export default {
  props: {
    hits: { type: Array, required: true },
    closeSearch: { type: Function, required: true },
  },
  methods: {
    getAllBlogPotsUrl(query) {
      const indexName = this.$store.state.siteConfig.indexName;
      return `/inspiration/blogs/search?${indexName}=${qs.stringify({
        query,
      })}`;
    },
    modifiedSrc(src) {
      if (src == null) {
        return "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABBCAQAAACNislaAAAATUlEQVR42u3PAQ0AAAwCoNs/tO/hoAFpb0JEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREpiMP85KBwEiuOPgAAAAASUVORK5CYII=";
      }

      return `${src}&fit=crop&crop=entropy&w=73&h=73`;
    },
  },
};
</script>
