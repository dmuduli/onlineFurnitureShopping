<template>
  <div
    class="w-full"
    :style="{
      backgroundColor: primary.background_color,
    }"
  >
    <app-container>
      <cms-rich-text
        :field="primary.title"
        class="text-2xl font-medium text-black py-8 text-center"
        :style="{ color: primary.text_color }"
      />
      <div class="flex justify-between flex-col lg:flex-row py-6">
        <div
          v-for="(item, index) in fields"
          :key="index"
          class="lg:w-1/3 inline-flex flex-col items-center mb-6 px-4"
        >
          <cms-image :field="item.image" />
          <cms-rich-text
            :field="item.title"
            class="text-2xl font-medium text-black mt-4 mb-2 text-center"
            :style="{ color: primary.text_color }"
          />
          <cms-rich-text
            :field="item.description"
            class="text-sm font-normal text-black text-center"
            :style="{ color: primary.text_color }"
          />
        </div>
      </div>
    </app-container>
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
    fields: { type: Array, default: () => [] },
  },
};
</script>
