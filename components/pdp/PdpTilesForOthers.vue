<template>
  <div class="">
    <label class="text-xs text-black font-normal block mb-2">Select base</label>
    <div class="relative">
      <div
        class="flex items-center justify-between border border-gray-500 pr-6"
      >
        <input
          type="text"
          class="focus:outline-none px-4 py-3 text-black text-base flex-auto"
          value="None"
        />
        <svg-icon-down-arrow />
      </div>
      <div
        class="absolute left-0 top-12 w-full shadow border bg-white max-h-64 overflow-y-auto"
      >
        <ul>
          <li>
            <a
              class="text-base text-gray-900 font-para px-4 py-3 block hover:bg-gray-100 cursor-pointer"
              >xxxxxx</a
            >
          </li>
          <li>
            <a
              class="text-base text-gray-900 font-para px-4 py-3 block hover:bg-gray-100 cursor-pointer"
              >xxxxxx</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
