<template>
  <ul>
    <li v-for="(link, sIndex) of links" :key="`keyPrefix_${sIndex}`">
      <cms-link
        :field="link.link"
        class="text-sm font-normal text-gray-700 font-para inline-block leading-extra-relaxed tracking-normal"
      >
        <cms-rich-text :field="link.link_label" />
      </cms-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    links: { type: Array, default: () => [] },
    keyPrefix: { type: String, required: true },
  },
};
</script>
