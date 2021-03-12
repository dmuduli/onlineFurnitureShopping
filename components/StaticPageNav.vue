<template>
  <div class="left-panel md:w-1/3 md:min-w-48 w-full mb-6 md:mb-0 mr-0 md:mr-8">
    <cms-rich-text :field="navLable" class="prose mb-2" />
    <div
      v-for="(navItem, index) in navigationItems"
      :key="index"
      class="flex flex-col"
    >
      <cms-link
        :field="navItem.navigation_link"
        class="flex items-center relative justify-between border-b border-gray-616 border-opacity-25 text-sm text-gray-616 no-underline py-3 pr-5"
      >
        {{ navItem.navigation_label }}
        <svg-icon-right-arrow class="w-4 absolute right-0" />
      </cms-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navLable: { type: Array, required: true },
    navigationItems: { type: Array, required: true },
  },
};
</script>
