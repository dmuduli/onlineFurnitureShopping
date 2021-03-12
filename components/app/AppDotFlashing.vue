<template>
  <span class="dot-flashing" />
</template>

<style lang="postcss" scoped>
.dot-flashing {
  @apply relative inline-block bg-gray-600 w-2 h-2 rounded-full left-1/4;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  @apply inline-block absolute top-0;
}

.dot-flashing::before {
  @apply bg-gray-600 w-2 h-2 rounded-full;
  left: -15px;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  @apply bg-gray-600 w-2 h-2 rounded-full;
  left: 15px;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    @apply bg-gray-600;
  }
  50%,
  100% {
    @apply bg-gray-300;
  }
}
</style>
