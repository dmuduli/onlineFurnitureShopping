<template>
  <app-expansion-panels
    v-if="selectedStore.length > 0"
    :items="selectedStore"
    class="px-6 pb-6"
  >
    <template #item="{ itemIndex, open, ...store }">
      <app-expansion-panel
        :item-index="itemIndex"
        :open="open"
        class="border-b border-gray-500 last:border-b-0"
      >
        <template #title>
          <div class="flex justify-between items-center cursor-pointer pb-2">
            <div class="flex items-center">
              <span class="capitalize text-lg font-normal text-black"
                >Snooze {{ store.item.name }}</span
              >
              <span class="lowercase text-xs text-gray-600 ml-4"
                >{{ store.item.distance_km }} kms</span
              >
            </div>
            <div class="flex items-center"></div>
          </div>
        </template>
        <template #default>
          <div class="pb-6">
            <a
              :href="createSlug(store.item.name)"
              target="_blank"
              class="cursor-pointer flex items-center mb-4"
            >
              <svg-icon-locate
                class="mr-2 flex-shrink-0 w-8 -ml-2"
              ></svg-icon-locate>
              <span class="text-sm text-gray-900 flex-shrink">{{
                store.item.formatted_address
              }}</span>
            </a>
            <div class="cursor-pointer flex items-center mb-4">
              <svg-phone-icon class="mr-4 flex-shrink-0"></svg-phone-icon>
              <span
                class="text-sm text-brown-100 underline flex-shrink"
                @click="mobileFunctionality('tel', store.item.telephone)"
                >{{ store.item.telephone }}</span
              >
            </div>
            <div class="cursor-pointer flex items-center mb-4">
              <svg-icon-mail class="mr-4 flex-shrink-0" />
              <span
                class="text-sm text-brown-100 underline flex-shrink"
                @click="mobileFunctionality('mailto', store.item.email)"
              >
                {{ store.item.email }}
              </span>
            </div>
            <a
              :href="createSlug(store.item.name)"
              target="_blank"
              class="cursor-pointer text-sm text-black uppercase font-medium border-b-2 border-gray-500 mr-6"
              >go to store page</a
            >
          </div>
        </template>
      </app-expansion-panel>
    </template>
  </app-expansion-panels>
</template>

<script>
export default {
  props: {
    selectedStore: { type: Array, default: () => [] },
  },
  methods: {
    mobileFunctionality(field, telephone) {
      window.open(`${field}:${telephone}`, "_self");
    },
    createSlug(name) {
      return "/store/" + name.toString().toLowerCase().replace(/\s+/g, "-");
    },
  },
};
</script>
