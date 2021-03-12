<template>
  <div
    class="top-1/2 left-1/2 z-50 transform transition-transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="lds-ring inline-block relative w-20 h-20">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.lds-ring div {
  @apply block absolute border-transparent border-brown-100 rounded-full m-1 w-16 h-16 border-6 animate-lds-ring;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
</style>
