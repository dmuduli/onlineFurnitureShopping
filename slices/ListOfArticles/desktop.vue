<template>
  <div>
    <div class="flex flex-wrap h-full -mx-2">
      <div
        v-for="(field, index) in fields.slice(0, 4)"
        :key="index"
        class="mb-4 px-3 w-1/2 lg:w-1/4 articles-section"
      >
        <related-article
          :field="field"
          :get-image-field="getImageField"
          :get-text-field="getTextField"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RelatedArticle from "./RelatedArticle";

export default {
  components: { "related-article": RelatedArticle },
  props: {
    fields: { type: Array, default: () => [] },
    getImageField: { type: Function, required: true },
    getTextField: { type: Function, required: true },
  },
};
</script>
