<template>
  <div
    class="velocity-flyer pb-6 pt-8 md:p-10 md:pt-18 relative bg-gray-1000 border-t border-gray-500 md:border-0"
  >
    <div
      class="velocity-logo text-center mb-3 absolute w-full left-0 top-0 pt-4 hidden md:block"
    >
      <svg-velocity-logo class="inline-block max-w-26"></svg-velocity-logo>
    </div>
    <app-expansion-panel
      v-if="isMobile"
      :item-index="1"
      accordion-item-classes="normal-case py-0"
    >
      <template #title> <bag-velocity-title /> </template>
      <template #default> <bag-velocity-body /></template>
    </app-expansion-panel>
    <div v-else>
      <bag-velocity-title />
      <bag-velocity-body />
    </div>
  </div>
</template>
