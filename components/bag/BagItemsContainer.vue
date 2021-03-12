<template>
  <div class="w-full px-6 lg:px-0">
    <client-only><bag-shipping-banner /></client-only>
    <div class="flex items-center justify-between py-4">
      <div class="flex items-center">
        <icon-cart class="mr-2 w-5" />
        <span class="text-gray-1200 text-sm uppercase font-bold">
          {{ itemCount }} {{ itemCount === 1 ? "Item" : "Items" }}
        </span>
      </div>
      <div class="flex items-center">
        <button class="flex items-center" @click="showSharingModal = true">
          <svg-icon-mail class="mr-4" />
          <span class="text-brown-100 text-base underline">Share</span>
        </button>
      </div>
    </div>
    <div v-for="(group, index) in itemGroups" :key="index">
      <bag-group-header
        v-if="group.title"
        :title="group.title"
        :subtitle="group.subtitle"
      />
      <bag-item-row
        v-for="lineItem of group.items"
        :key="lineItem.id"
        :line-item="lineItem"
      />
    </div>
    <template v-if="showSharingModal">
      <app-modal-overlay @close-modal="showSharingModal = false" />
      <bag-sharing-modal
        @email-sent="showSharingModal = false"
        @close-sharing-modal="showSharingModal = false"
      />
    </template>

    <!-- <div class="pt-6 border-b border-gray-500">
      <div class="flex justify-between mb-3">
        <div class="bg-white flex-shrink-0 w-26 h-26 lg:w-40 lg:h-40 mr-4">
          <img src="~/assets/images/bed.jpg" class="w-full h-full" />
        </div>
        <div class="flex flex-col flex-shrink lg:flex-1">
          <div class="flex justify-between">
            <div class="flex flex-col">
              <h1 class="text-sm lg:text-xl text-gray-900 font-normal mb-4">
                Slumberland Posturepedic Elevate Heritage Mattress
              </h1>
              <div class="flex items-center flex-wrap lg:mb-6 -mx-2">
                <div class="flex items-center text-xs text-gray-700 px-2">
                  Size: <strong class="ml-2">Queen</strong>
                </div>
                <div class="flex items-center text-xs text-gray-700 px-2">
                  Fabic: <strong class="ml-2">Leather</strong>
                </div>
                <div class="flex items-center text-xs text-gray-700 px-2">
                  Colour: <strong class="ml-2">Wheat</strong>
                </div>
              </div>
            </div>
            <div class="flex items-center self-start">
              <a href="" class="flex items-center">
                <svg-icon-remove-bin class="lg:mr-2 w-5 lg:w-4" />
                <span class="text-brown-100 text-xs underline hidden lg:block">
                  Remove
                </span>
              </a>
            </div>
          </div>
          <div class="lg:flex items-center justify-between hidden">
            <div class="flex items-center">
              <button
                type="button"
                class="border border-gray-500 flex items-center justify-center w-10 h-10"
              >
                <svg-icon-minus />
              </button>
              <input
                type="text"
                placeholder="10"
                class="border-t border-b border-gray-500 p-4 w-14 h-10 focus:outline-none text-sm"
              />
              <button
                type="button"
                class="border border-gray-500 flex items-center justify-center w-10 h-10"
              >
                <svg-icon-plus />
              </button>
            </div>
            <div class="flex items-center justify-end">
              <strike class="text-sm text-gray-700 mr-4">$1,564</strike>
              <span class="text-xl text-red-700">$1,099</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:hidden flex items-center justify-between mb-6">
        <div class="flex items-center">
          <button
            type="button"
            class="border border-gray-500 flex items-center justify-center w-10 h-10"
          >
            <svg-icon-minus />
          </button>
          <input
            type="text"
            placeholder="10"
            class="border-t border-b border-gray-500 p-4 w-14 h-10 focus:outline-none text-sm"
          />
          <button
            type="button"
            class="border border-gray-500 flex items-center justify-center w-10 h-10"
          >
            <svg-icon-plus />
          </button>
        </div>
        <div class="flex items-center justify-end">
          <strike class="text-sm text-gray-700 mr-4">$1,564</strike>
          <span class="text-xl text-red-700">$1,099</span>
        </div>
      </div>
      <div class="flex justify-between border border-gray-500 p-3 lg:p-6 mb-4">
        <div
          class="flex items-center bg-gray-100 py-2 px-6 mr-4 w-5/12 lg:w-40"
        >
          <svg-icon-assembly-service class="m-auto" />
        </div>
        <div
          class="flex items-baseline lg:items-center lg:justify-between flex-auto flex-col lg:flex-row w-7/12 lg:w-auto"
        >
          <div class="mb-2 lg:mb-0">
            <h3 class="text-sm lg:text-base text-gray-900 mb-2">
              Assembly Service
            </h3>
            <div class="text-xl text-red-700">$1,099</div>
          </div>
          <button
            type="button"
            class="border-2 border-gray-500 text-center text-xs text-gray-900 uppercase p-2 font-medium focus:outline-none min-w-28"
          >
            <span class="inline-flex items-center m-auto">
              Add <svg-icon-plus-circle class="ml-2" />
            </span>
          </button>
        </div>
      </div>
      <div class="flex justify-between border border-gray-500 p-3 lg:p-6 mb-4">
        <div
          class="flex items-center bg-gray-100 py-2 px-6 mr-4 w-5/12 lg:w-40"
        >
          <svg-icon-gift class="m-auto" />
        </div>
        <div
          class="flex items-baseline lg:items-center lg:justify-between flex-auto flex-col lg:flex-row w-7/12 lg:w-auto"
        >
          <div class="mb-2 lg:mb-0">
            <h3 class="text-xs lg:text-sm text-gray-900 mb-2">
              Receive a bonus
              <strong class="border-b-2 border-gray-500"
                >Sutton Pillowtop mattress</strong
              >
              with your selected Slumberland bed frame.
            </h3>
            <div class="text-xl text-red-700">Free</div>
          </div>
          <button
            type="button"
            class="border-2 border-gray-500 text-center text-xs text-gray-900 uppercase p-2 font-medium focus:outline-none min-w-28"
          >
            <span class="inline-flex items-center m-auto">
              Remove
              <svg-icon-minus-circle class="ml-2" />
            </span>
          </button>
        </div>
      </div>
      <div class="flex items-center bg-blue-200 mt-2 px-2 py-4 lg:px-4">
        <svg-icon-delivery-van class="w-10" />
        <p class="text-sm text-gray-900 ml-2">
          <strong>Next day delivery</strong> is available in Northcote
        </p>
      </div>
    </div> -->
    <!-- <div class="flex items-center mb-6 mt-10">
      <svg-icon-gift class="mr-3" />
      <span class="text-gray-900 text-sm uppercase font-bold">Bonus Items</span>
    </div>
    <div class="border-b border-gray-500 lg:pb-6">
      <div class="flex justify-between">
        <div class="bg-white flex-shrink-0 w-26 h-26 lg:w-40 lg:h-auto mr-4">
          <img src="~/assets/images/kids.jpg" class="w-full h-full" />
        </div>
        <div class="flex flex-col flex-auto">
          <div class="flex flex-col">
            <div
              class="flex justify-between flex-col lg:flex-row flex-shrink lg:flex-1"
            >
              <div class="flex flex-col">
                <h1 class="text-sm lg:text-xl text-gray-900 font-normal mb-4">
                  Sutton Pillowtop Mattress
                </h1>
                <div class="flex items-center flex-wrap lg:mb-6 -mx-2">
                  <div class="flex items-center text-xs text-gray-700 px-2">
                    Size: <strong class="ml-2">Queen</strong>
                  </div>
                </div>
              </div>
              <div class="flex items-center self-start mt-2 lg:mt-0">
                <button
                  type="button"
                  class="border-2 border-gray-500 text-center text-xs text-gray-900 uppercase p-2 font-medium focus:outline-none min-w-28"
                >
                  <span class="inline-flex items-center m-auto">
                    Remove
                    <svg-icon-minus-circle class="ml-2" />
                  </span>
                </button>
              </div>
            </div>
            <div class="lg:flex hidden items-center justify-end flex-shrink-0">
              <strike class="text-sm text-gray-700 mr-4">$1,564</strike>
              <span class="text-xl text-red-700">$0</span>
            </div>
          </div>
          <div
            class="lg:flex hidden items-center bg-green-200 mt-2 px-2 py-4 lg:px-4"
          >
            <svg-icon-tick-circle />
            <p class="text-sm text-gray-900 ml-2">
              Free with selected Slumberland bases
            </p>
          </div>
        </div>
      </div>
      <div class="flex lg:hidden items-center justify-end flex-shrink-0">
        <strike class="text-sm text-gray-700 mr-4">$1,564</strike>
        <span class="text-xl text-red-700">$0</span>
      </div>
      <div
        class="flex lg:hidden items-center bg-green-200 mt-2 px-2 py-4 lg:px-4"
      >
        <svg-icon-tick-circle />
        <p class="text-sm text-gray-900 ml-2">
          Free with selected Slumberland bases
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({ showSharingModal: false }),
  computed: {
    ...mapGetters("checkout", ["visibleLineItems", "itemCount"]),
    ...mapGetters("bag", ["itemGroups"]),
  },
};
</script>
