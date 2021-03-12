<template>
  <div
    class="become-a-member-wrapper px-6 lg:px-0 bg-no-repeat lg:bg-cover w-full flex items-center justify-center"
    :style="{ backgroundImage: 'url(' + primary.image.url + ')' }"
  >
    <app-container>
      <div class="text-center pt-4 lg:pt-0">
        <cms-rich-text
          :field="primary.title"
          class="text-2xl lg:text-4xl font-medium text-white mb-4 text-center"
        />
        <cms-rich-text
          :field="primary.description"
          class="text-base lg:text-xl font-normal text-white text-center mb-6 lg:px-40"
        />
        <div class="w-full">
          <app-button
            class="mb-4 lg:mb-0"
            color="secondary-inverted"
            size="lg"
            @click.native="openMemberModal"
          >
            Join Now
          </app-button>
        </div>
      </div>
    </app-container>
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
  methods: {
    openMemberModal() {
      this.$store.dispatch("pages/openModalAction");
    },
  },
};
</script>

<style lang="postcss" scoped>
.become-a-member-wrapper {
  height: 30rem;
}
.join-now-modal-container {
  width: 560px;
  min-height: 550px;
}
@media screen and (max-width: 768px) {
  .become-a-member-wrapper {
    height: auto;
  }
  .join-now-modal-container {
    width: 96%;
    min-height: auto;
  }
}
</style>
