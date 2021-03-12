<template>
  <div class="bag-content-without-items pt-10 pb-12 px-12 text-center">
    <figure class="bag-state empty mb-8 inline-block m-auto">
      <svg-icon-empty-bag></svg-icon-empty-bag>
    </figure>
    <h3
      class="bag-title text-sm text-black font-medium uppercase leading-4 mb-8"
    >
      Your Bag is empty
    </h3>
    <p class="bag-content text-sm text-gray-800 leading-5 mb-8">
      Need help? Our bedroom experts are here to assist you.
    </p>
    <div class="cta-action">
      <nuxt-link
        to="/store/store-locator"
        class="text-sm leading-5 font-medium inline-block pb-1 border-b-2 border-gray-500 text-gray-900 uppercase"
        title="Find a store"
      >
        Find a store
      </nuxt-link>
    </div>
  </div>
</template>
