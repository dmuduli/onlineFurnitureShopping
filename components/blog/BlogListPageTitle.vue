<template>
  <div class="flex flex-col lg:flex-row with-category-title">
    <nuxt-link v-if="$route.params.tag" to="/blogs/inspiration">
      <cms-rich-text :field="title" />
    </nuxt-link>
    <cms-rich-text v-else :field="title" />
    <template v-if="$route.params.tag">
      <span class="text-4xl font-semibold">
        &nbsp;-&nbsp;{{ $route.params.tag }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: { title: { type: Array, default: () => [] } },
};
</script>
