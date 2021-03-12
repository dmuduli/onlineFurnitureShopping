<template>
  <div class="become-member pb-6 pt-8 md:p-10 relative bg-gray-1100">
    <app-expansion-panel
      v-if="isMobile"
      :item-index="1"
      accordion-item-classes="normal-case py-0"
      :open="true"
    >
      <template #title> <bag-snooze-member-title /> </template>
      <template #default> <bag-snooze-member-body /></template>
    </app-expansion-panel>
    <div v-else>
      <bag-snooze-member-title />
      <bag-snooze-member-body />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.accordion-content .join-now {
  @apply font-medium;
}
</style>
