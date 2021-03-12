<template>
  <div class="bg-brown-E4E py-10 md:pt-10 md:pb-12">
    <app-container v-if="!isFilterPanelOpen">
      <div class="mx-auto text-center max-w-none md:max-w-3xl lg:px-10">
        <cms-rich-text
          :field="primary.title"
          class="text-center text-gray-900 text-3xl font-normal md:text-4xl leading-11 mb-3"
        />
        <cms-rich-text
          :field="primary.description"
          class="text-center font-normal text-gray-700 text-sm md:text-base font-para leading-6 heroSec-descriotion"
        />
      </div>
    </app-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
  computed: {
    ...mapState("app", ["isFilterPanelOpen"]),
  },
};
</script>
<style lang="postcss">
.heroSec-descriotion p a {
  @apply text-gray-900 underline;
}
.heroSec-descriotion p a:hover {
  @apply no-underline;
}
</style>
