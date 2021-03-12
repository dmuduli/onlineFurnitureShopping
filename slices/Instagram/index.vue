<template>
  <div class="w-full bg-white py-10 lg:pt-10 lg:pb-20">
    <app-container>
      <cms-rich-text
        :field="primary.subtitle"
        class="font-normal text-center text-sm leading-5 text-gray-333"
      />
      <cms-rich-text
        :field="primary.username"
        class="font-normal text-center text-brown-100 lg:leading-9 lg:text-3xl text-1sm leading-7 mb-6"
      />
    </app-container>
    <instagram-feed :primary="primary" />
  </div>
</template>

<script>
import InstagramFeed from "./InstagramFeed";

export default {
  components: { "instagram-feed": InstagramFeed },

  props: { primary: { type: Object, default: () => {} } },
};
</script>
