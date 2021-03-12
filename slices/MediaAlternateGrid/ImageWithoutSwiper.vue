<template>
  <div class="flex flex-col sm:flex-row items-center justify-between">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mb-4 w-full sm:w-auto"
      :style="flexBasis"
    >
      <cms-link v-if="item.link" :field="item.link">
        <div>
          <cms-image class="m-auto w-full" :field="item.image" />
        </div>
        <cms-rich-text
          v-if="item.optional_subtitle"
          class="mt-2 prose-pages text-center text-gray-900"
          :field="item.optional_subtitle"
        />
      </cms-link>
      <div v-else>
        <cms-image class="m-auto w-full" :field="item.image" />
        <cms-rich-text
          v-if="item.optional_subtitle"
          class="mt-2 prose-pages text-center text-gray-900"
          :field="item.optional_subtitle"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
    flexBasis: { type: Object, required: true },
  },
};
</script>
