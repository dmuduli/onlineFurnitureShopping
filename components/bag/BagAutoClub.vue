<template>
  <div
    class="auto-club pb-6 pt-8 md:p-10 md:pt-18 relative bg-gray-1000 border-t border-gray-500 md:border-0"
  >
    <app-expansion-panel
      v-if="isMobile"
      :item-index="1"
      accordion-item-classes="normal-case py-0"
    >
      <template #title> <bag-auto-club-title /> </template>
      <template #default> <bag-auto-club-body /> </template>
    </app-expansion-panel>
    <div v-else>
      <bag-auto-club-title />
      <bag-auto-club-body />
    </div>
  </div>
</template>
