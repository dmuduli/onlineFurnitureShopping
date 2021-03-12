<template>
  <div
    v-if="fields.length >= 1"
    class="flex flex-col md:flex-row md:items-start md:justify-between m-auto py-4"
    :class="(primary.bg_color, label)"
  >
    <div
      v-for="(item, index) in fields"
      :key="index"
      class="flex justify-center flex-col mb-8 lg:mb-0 vel-box"
      :class="textAlignment"
      :style="flexBasis"
    >
      <div
        v-if="item.optional_icon"
        class="m-auto vel-icon"
        :class="{ 'mb-5 min-h-28 flex items-center': label !== 'velocity' }"
      >
        <cms-image :field="item.optional_icon" />
      </div>
      <cms-rich-text
        class="prose-pages leading-tight mt-0 mb-2 title"
        :field="item.subtitle"
      />
      <cms-rich-text
        class="prose max-w-none"
        :class="label"
        :field="item.paragraph"
      />
      <div :class="label">
        <cms-link
          v-if="item.optional_button_link != null"
          class="transition-colors duration-500 ease-in-out leading-5 text-white text-xs block md:inline-block text-center p-3 uppercase bg-gray-500 font-normal hover:bg-gray-700 px-6 mt-4 self-start"
          :field="item.optional_button_link"
        >
          {{ item.optional_button_label }}
        </cms-link>
      </div>
    </div>
  </div>
</template>

<script>
import calculateFlexBasis from "~/mixins/calculateFlexBasisMixin";

export default {
  mixins: [calculateFlexBasis],
  props: {
    label: { type: String, default: () => "" },
    fields: { type: Array, default: () => [] },
    primary: { type: Object, default: () => {} },
  },
  computed: {
    textAlignment() {
      if (this.label == "center" || this.label === "velocity") {
        return "text-center";
      } else {
        return "text-left";
      }
    },
  },
};
</script>

<style scoped lang="postcss">
.velocity .vel-box {
  @apply p-4 pt-1 bg-gray-200 border border-gray-1100;
}
.velocity .vel-box .title {
  @apply text-1sm font-medium text-gray-1800;
}
.velocity .vel-box /deep/ p {
  @apply font-sans text-gray-1700 leading-normal;
}
.velocity .vel-icon {
  @apply w-18 p-4 bg-white -mt-10 mb-4;
}
</style>
