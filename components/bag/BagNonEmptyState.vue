<template>
  <div>
    <bag-sharing-cart-message />
    <div class="p-10">
      <h1 class="text-4xl text-black text-center mb-3">Bag</h1>
      <p class="text-sm text-black text-center">
        Got a discount or free shipping voucher? Enter your code at Checkout to
        redeem.
      </p>
    </div>
    <div class="lg:flex flex-col-reverse lg:flex-row lg:space-x-12">
      <div class="bag-and-members-section w-full lg:w-2/3">
        <bag-items-container />
        <bag-benefits-container />
      </div>
      <bag-checkout-container class="w-full lg:w-1/3" />
    </div>
  </div>
</template>
