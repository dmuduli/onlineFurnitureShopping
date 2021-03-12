<template>
  <app-container>
    <div
      class="flex flex-col items-center justify-center min-h-70 lg:min-h-75 text-center"
    >
      <svg-icon-empty-bag class="mb-8"></svg-icon-empty-bag>
      <h3 class="text-3xl text-black font-normal">{{ description }}</h3>
    </div>
  </app-container>
</template>
<script>
export default {
  props: {
    description: { type: String, default: "" },
  },
};
</script>
