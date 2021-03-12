<template>
  <div class="w-full sm:flex-1 lg:ml-24 lg:mt-6 lg:mt-0 prose">
    <h4><strong>Snooze Customer Service</strong></h4>
    <span class="mb-6"
      ><a
        href="mailto:enquiries@snooze.com.au"
        style="color: #000000; text-decoration: underline"
        >enquiries@snooze.com.au</a
      ></span
    >

    <p>
      <span
        ><span class="title-char">P</span>
        <span class="contactValue"
          ><a href="tel:%201800%20940%20780">1800 940 780</a
          >&nbsp;(9:00am-5:00pm EST)</span
        ></span
      >
    </p>

    <p>
      For product information and details on stock availability, please feel
      free to contact your local Snooze store. Simply use your postcode with
      the&nbsp;<a
        :href="`${this.$config.appEndPoint}/store/store-locator`"
        target="_blank"
        rel="noopener noreferrer"
        >Find a store</a
      >&nbsp;feature, for details of how to contact a store or speak to a store
      representative and a lot more.
    </p>

    <div class="flex w-full lg:w-1/2">
      <app-button
        :to="`${this.$config.appEndPoint}/store/store-locator`"
        type="button"
        class="flex-1 store-finder-button"
        block
      >
        Store Finder
      </app-button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.store-finder-button {
  color: white !important;
  text-decoration: none !important;
}
</style>
