<template>
  <div v-if="showBanner" class="w-full mt-12 mb-6 md:w-2/4 lg:w-1/4 lg:pl-6">
    <div class="banner-component relative">
      <figure class="banner-img w-full flex-shrink-0 text-right">
        <nuxt-link :to="$prismic.asLink(link)" @click.native="closeMegaMenu">
          <cms-image :field="image" class="inline-block w-full lg:w-auto" />
        </nuxt-link>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: Object, default: () => {} },
    link: { type: Object, default: () => {} },
  },
  computed: {
    showBanner() {
      return this.image.url && this.link._meta;
    },
  },
  methods: {
    closeMegaMenu() {
      this.$store.dispatch("app/closeMegaMenu");
    },
  },
};
</script>
