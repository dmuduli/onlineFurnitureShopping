<template>
  <app-back-to-top
    text="Back to top"
    visibleoffset="500"
    bottom="50px"
    right="50px"
  >
    <button
      class="w-16 h-16 flex items-center justify-center bg-gray-500 focus:outline-none hover:bg-gray-900 shadow inset-x-auto rounded-full px-6 fixed bottom-30 right-30"
      alt="Back To Top"
      title="Back To Top"
    >
      <svg-icon-down-arrow
        class="inline-flex back-to-top-arrow"
        :style="{ transform: 'rotate(180deg)' }"
      />
    </button>
  </app-back-to-top>
</template>
<style lang="postcss">
.bottom-30 {
  bottom: 2rem;
}
.right-30 {
  right: 2rem;
}
.back-to-top-arrow path {
  stroke: #ffffff !important;
}
</style>
