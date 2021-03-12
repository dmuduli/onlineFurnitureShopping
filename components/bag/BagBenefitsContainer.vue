<template>
  <div
    class="members-section bg-gray-1000 md:bg-transparent px-6 md:px-0 mt-6 flex flex-col flex-wrap lg:flex-row w-full"
  >
    <bag-snooze-member class="w-full" />
    <div class="md:flex flex-1 md:space-x-2 md:mt-2 valocity-autoclub-section">
      <bag-velocity class="w-full md:w-1/2" />
      <bag-auto-club class="w-full md:w-1/2" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@media screen and (min-width: 802px) and (max-width: 900px) {
  .valocity-autoclub-section {
    flex-direction: column;
  }
  .valocity-autoclub-section > div {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>
