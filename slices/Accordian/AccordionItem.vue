<template>
  <div>
    <div
      class="flex justify-between items-center py-5 px-4 cursor-pointer border bg-gray-200 border-gray-300"
    >
      <cms-rich-text
        :field="item.item_title"
        name="title"
        class="inline-block font-sans text-base font-bold text-black"
      />
      <svg-icon-down-arrow
        class="transform duration-500 transition-transform"
        :class="{ 'rotate-180': open, 'rotate-0': !open }"
      />
    </div>
    <transition name="slide" mode="out-in">
      <div
        v-show="open"
        class="p-4 font-sans text-base bg-white flex flex-wrap md:flex-no-wrap justify-center md:justify-start md:flex-row"
      >
        <cms-image
          :field="item.optional_icon"
          class="md:mr-6"
          width="100"
          height="100"
        />
        <cms-rich-text :field="description" class="prose max-w-none" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
    label: { type: String, default: () => "" },
  },

  computed: {
    description() {
      return this.item.accordDesc || this.item.item_description;
    },
  },
};
</script>

<style lang="postcss" scoped>
.slide-enter-active,
.slide-leave-active {
  @apply duration-150;
}
.slide-enter-active {
  @apply ease-in;
}

.slide-leave-active {
  @apply ease-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 415px;
  @apply overflow-hidden;
}

.slide-enter,
.slide-leave-to {
  @apply overflow-hidden;
  max-height: 0;
}
</style>
