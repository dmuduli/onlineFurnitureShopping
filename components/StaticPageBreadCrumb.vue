<template>
  <div
    class="breadcrumb-wrapper flex justify-between items-center py-4 md:py-6"
  >
    <div
      class="flex items-center font-sans text-base font-normal text-gray-600"
    >
      <nuxt-link
        to="/"
        class="font-sans text-xs md:text-sm font-normal text-gray-600 mr-3"
      >
        Home
      </nuxt-link>
      /
      <nuxt-link
        v-if="leafLink"
        to="/blogs/inspiration"
        class="font-sans text-xs md:text-sm font-normal text-gray-600 mx-3"
      >
        Inspiration
      </nuxt-link>
      <span
        v-else
        class="font-sans text-xs md:text-sm font-normal text-gray-600 mx-3"
      >
        Inspiration
      </span>
      <template v-if="leafLink">
        /
        <span
          class="inline-block font-sans text-xs md:text-sm font-normal text-black ml-3 capitalize"
        >
          {{ leafLink }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageName: { type: Array, default: () => [] },
  },
  computed: {
    leafLink() {
      if (this.$route.params.tag) {
        return this.$route.params.tag;
      } else if (this.pageName && this.pageName[0]) {
        return this.pageName && this.pageName[0].text;
      }
      return "";
    },
  },
};
</script>
