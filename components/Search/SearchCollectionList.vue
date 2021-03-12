<template>
  <ul>
    <div v-if="hits.length == 0">No categories found</div>
    <template v-else>
      <li v-for="hit of hits" :key="hit.objectID" class="mb-5">
        <!-- eslint-disable vue/no-v-html-->
        <nuxt-link
          v-if="hit.title"
          :to="buildURL(hit)"
          class="pb-1 border-b-2 text-base leading-6 text-black font-normal border-transparent hover:border-gray-500 transition-colors duration-500 ease-in-out"
          @click.native.prevent="closeSearch"
          v-html="formatTitle(hit)"
        />
      </li>
    </template>
  </ul>
</template>

<script>
const sizes = [
  "Super King",
  "King Single",
  "Long Single",
  "King",
  "Queen",
  "Double",
  "Single",
];

export default {
  props: {
    hits: { type: Array, required: true },
    closeSearch: { type: Function, required: true },
  },
  methods: {
    getSizeCat(title) {
      const findSize = sizes.find(size => title.startsWith(size));
      if (findSize) {
        const titleArr = title.split(findSize);
        if (titleArr.length > 1 && titleArr[1].length) {
          return {
            size: findSize,
            cat: titleArr[1].trim(),
          };
        }
      }
      return { size: title };
    },
    formatTitle({ title }) {
      const { size, cat } = this.getSizeCat(title);
      if (cat && cat.length) {
        return `<span>${size}</span><span class="text-gray-600"> in ${cat}</span>`;
      }
      return title;
    },
    buildURL({ handle, title }) {
      const { size, cat } = this.getSizeCat(title);
      if (cat && cat.length) {
        return `/collections/${cat
          .toLowerCase()
          .replace(/\s/g, "-")}/products?sizes=${encodeURIComponent(
          size
        )}&sortBy=snooze_dev_products_recently_ordered_count_desc`;
      }
      return `/collections/${handle}`;
    },
  },
};
</script>
