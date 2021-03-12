<template>
  <div>
    <div class="flex flex-col lg:flex-row my-4 lg:my-8">
      <div class="w-full lg:w-1/3 lg:p-6 lg:border border-gray-500">
        <div>
          <p class="text-sm text-black mb-4">
            {{ primary.formatted_address }}
          </p>
          <h5 class="text-sm text-black mb-2">
            Ph
            <a :href="`tel:${primary.telephone}`">{{ primary.telephone }}</a>
          </h5>
          <h6 class="text-sm mb-4">
            <a :href="`mailto:${primary.email}`">{{ primary.email }}</a>
          </h6>
          <a
            class="lg:px-10 px-4 transition-colors duration-500 ease-in-out leading-5 text-white text-sm inline-block text-center p-3 bg-gray-500 font-normal hover:bg-gray-700"
            target="_blank"
            :href="`https://maps.google.com?daddr=${primary.formatted_address}`"
            tag="a"
            >Get Directions</a
          >
        </div>
      </div>
      <div
        id="mapSnooze"
        class="lg:flex-1 google-map-section border border-gray-500 hidden lg:flex min-h-78"
      />
    </div>
  </div>
</template>

<script>
import googleMapMixin from "~/mixins/googleMapMixin";

export default {
  mixins: [googleMapMixin],
  props: {
    primary: { type: Object, default: () => {}, required: true },
  },
  mounted() {
    if (window.google) {
      this.storeMap();
    } else {
      this.loadGoogleMapScript();
    }
    window.addEventListener("load", () => {
      this.storeMap();
    });
  },
  methods: {
    storeMap() {
      const { lat, lng, formatted_address: formattedAddress } = this.primary;
      // google map render
      const map = new window.google.maps.Map(
        document.getElementById("mapSnooze"),
        {
          zoom: 10,
          center: {
            lat,
            lng,
          },
        }
      );
      // eslint-disable-next-line no-unused-vars
      const marker = new window.google.maps.Marker({
        position: {
          lat,
          lng,
        },
        map,
        icon: "https://cdn.shopify.com/s/files/1/2657/7564/files/map-pin.png",
        title: formattedAddress,
      });
    },
  },
};
</script>
