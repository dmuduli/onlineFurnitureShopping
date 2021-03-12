<template>
  <div class="flex flex-col lg:flex-row border-b border-gray-300 pb-4 mb-4">
    <div
      v-if="blog.data.feature_image.url"
      class="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-10"
    >
      <cms-image v-bind="imageOptions" />
    </div>
    <div class="lg:flex-1">
      <div class="max-w-none">
        <h3>
          <nuxt-link :to="`/blogs/inspiration/${blog.uid}`">
            {{ $prismic.asText(blog.data.title) }}
          </nuxt-link>
        </h3>
        <span class="text-xs text-gray-600">
          Posted by on
          {{ publishDate | formatDate }}
        </span>
        <p>{{ description }}</p>
      </div>
      <div class="w-full" :class="{ 'mt-6': !$route.params.tag }">
        <blog-categories v-if="$route.params.tag && tags.length" :tags="tags" />
        <app-button
          v-if="showReadMore"
          :to="`/blogs/inspiration/${blog.uid}`"
          class="read-more-button"
          block
        >
          Read more
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { pathOr } from "ramda";

export default {
  props: { blog: { type: Object, required: true } },

  computed: {
    description() {
      return pathOr("", ["blog", "data", "description", [0], "text"], this);
    },
    publishDate() {
      return pathOr(
        this.blog.first_publication_date,
        ["blog", "data", "date"],
        this
      );
    },
    showReadMore() {
      return this.description.length > 0;
    },
    tags() {
      return this.blog.tags.filter(tag => tag.startsWith("Blog_"));
    },
    imageOptions() {
      return {
        field: this.blog.data.feature_image,
        height: "275",
        width: "604",
        fit: "crop",
        crop: "entropy",
        class: "w-full",
      };
    },
  },
};
</script>
