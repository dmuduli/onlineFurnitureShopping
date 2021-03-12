<template>
  <app-container class="lg:max-w-3/4 w-full my-10 store-location-container">
    <h1
      class="text-2xl lg:text-4xl text-black font-medium mb-6 text-center uppercase"
    >
      Find a Store
    </h1>
    <div class="flex items-center lg:max-w-xl m-auto">
      <input
        id="txtPlaces"
        type="text"
        class="border border-gray-500 px-4 py-3 xs:w-1/2 leading-5 sm:w-auto sm:flex-auto"
        placeholder="Type a postcode or suburb"
        autocomplete="off"
      />
      <app-button
        class="lg:px-10 px-4 py-3 ml-4 xs:w-1/2 sm:w-auto transition-colors duration-500 ease-in-out leading-5 text-white text-xs inline-block text-center bg-gray-900 font-normal hover:bg-gray-500"
        @click.native="clickHandler"
      >
        Find a store
      </app-button>
    </div>
    <div v-if="error" class="text-center">
      <span class="text-red-500 text-xs mt-2">
        {{ error }}
      </span>
    </div>
    <div class="flex flex-col lg:flex-row mt-8">
      <div
        id="scroll-container"
        class="w-full lg:w-1/3 lg:pr-4 lg:mr-4 md:overflow-y-auto md:max-h-138"
      >
        <div v-if="!stores.length">
          Sorry, we didn't find any stores nearby.
        </div>
        <div
          v-for="(item, key) of stores"
          v-else
          :id="`store-${key}`"
          :key="key"
          class="p-4 border-b border-gray-500 flex items-center last:border-b-0"
          :class="selected === key ? 'bg-gray-300 selected' : ''"
        >
          <div class="pr-4 flex-1">
            <a :href="`${item.url}`" target="_blank">
              <h4 class="text-base font-bold text-gray-700 mb-4">
                {{ item.name }}
              </h4>
              <p v-if="item.street" class="text-sm text-black">
                {{ item.street }}
              </p>
              <p class="text-sm text-black">
                <span v-if="item.suburb">{{ item.suburb }},</span>
                <span v-if="item.state">{{ item.state }},</span>
                <span v-if="item.postcode">{{ item.postcode }}</span>
              </p>
              <p class="text-sm text-black mb-4">{{ item.country }}</p>
            </a>
            <h5 class="text-sm text-black mb-2">
              Ph
              <a :href="`tel:${item.telephone}`">{{ item.telephone }}</a>
            </h5>
            <h6 class="text-xs text-black">
              <a :href="`mailto:${item.email}`">{{ item.email }}</a>
            </h6>
          </div>
          <svg-icon-right-arrow class="w-4 h-4"></svg-icon-right-arrow>
        </div>
      </div>
      <div
        id="mapSnooze"
        class="lg:flex-1 google-map-section border border-gray-500 hidden lg:flex min-h-138"
      />
    </div>
  </app-container>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { path, pathOr } from "ramda";

export default {
  beforeRouteLeave(to, from, next) {
    const payload = {
      title: { text: "Store Locator" },
      url: from.fullPath,
    };
    this.$store.dispatch("app/setRedirectFrom", payload);
    next();
  },
  data() {
    return {
      stores: [],
      lat: "",
      lng: "",
      selected: "",
      is_script_loading: false,
      error: "",
    };
  },
  computed: {
    ...mapGetters({ mapState: "stores/getMapState" }),
    ...mapState({ storeLocator: s => s.siteConfig.storeLocator }),
  },
  mounted() {
    const isGoogleScript = pathOr(false, ["google", "maps"], window);
    if (!isGoogleScript) {
      this.loadGoogleMapScript();
    } else {
      this.loadAutocomplete();
    }

    let options = {
      enableHighAccuracy: true,
      timeout: this.storeLocator.timeout,
      maximumAge: this.storeLocator.maxAge,
    };

    navigator.geolocation.getCurrentPosition(
      this.geoCodingRequest,
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      options
    );
  },
  methods: {
    loadGoogleMapScript() {
      const { gooogleMapsApi } = this.$config;
      let myScript = document.createElement("script");
      myScript.setAttribute(
        "src",
        `https://maps.googleapis.com/maps/api/js?key=${gooogleMapsApi}&libraries=places,geometry`
      );
      myScript.setAttribute("async", "true");
      myScript.setAttribute("defer", "true");
      document.head.appendChild(myScript);
      // google map load than again run the script
      myScript.onload = () => {
        const isGoogleScript = pathOr(false, ["google", "maps"], window);
        if (!isGoogleScript) {
          return console.error("no google maps script included");
        }
        this.loadAutocomplete();
      };
    },
    loadAutocomplete() {
      this.mapStateAction();
      const { locationRadius, country, zoom, mapCenter } = this.mapState;
      const options = {
        types: ["(regions)"],
        componentRestrictions: { country: [country] },
        strictBounds: true,
        radius: locationRadius,
      };

      let places = new window.google.maps.places.Autocomplete(
        document.getElementById("txtPlaces"),
        options
      );

      // google map render
      const map = new window.google.maps.Map(
        document.getElementById("mapSnooze"),
        {
          zoom,
          center: mapCenter,
        }
      );

      // place change auto complete
      window.google.maps.event.addListener(
        places,
        "place_changed",
        async () => {
          let place = places.getPlace();
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.distance = [];

          // store result
          await this.fetchStore(place.formatted_address);
          // The marker, positioned at
          this.mapMarkerOnMap(map);
        }
      );
    },
    mapStateAction() {
      this.$store.dispatch("stores/mapStateAction");
    },

    async clickHandler() {
      // const { zoom, mapCenter } = this.$store.state.siteConfig.storeLocator;
      const fieldValue = document.getElementById("txtPlaces").value;
      if (!fieldValue) {
        return;
      }
      // const map = new window.google.maps.Map(
      //   document.getElementById("mapSnooze"),
      //   {
      //     zoom: zoom + 5,
      //     center: mapCenter,
      //   }
      // );
      // store result
      await this.fetchStore(fieldValue);

      // The marker, positioned at
      // -------have moved this.mapMarkerOnMap function to fetch store-------------
      // this.mapMarkerOnMap(map);
    },

    mapMarkerOnMap(preMap) {
      if (!this.stores.length) {
        return false;
      }
      let { zoom } = this.mapState;
      const map = new window.google.maps.Map(
        document.getElementById("mapSnooze"),
        {
          zoom: zoom + 5,
          center: {
            lat: this.stores[0].lat,
            lng: this.stores[0].lng,
          },
        }
      );
      let activeInfoWindow = "";
      for (let i = 0; i < this.stores.length; i++) {
        // eslint-disable-next-line no-unused-vars
        const marker = new window.google.maps.Marker({
          position: {
            lat: this.stores[i].lat,
            lng: this.stores[i].lng,
          },
          map,
          icon: "https://cdn.shopify.com/s/files/1/2657/7564/files/map-pin.png",
          title: "Title 1",
        });
        let infowindow = new window.google.maps.InfoWindow({
          content: `<div class="infowindow w-57">
    <a href="${this.stores[i].url}" target="_blank">
      <h4 class="text-xl mb-4">${this.stores[i].name}</h4>
      <p class="text-sm">${this.stores[i].street}</p>
      <p class="text-sm">${this.stores[i].suburb}, ${this.stores[i].state}, ${this.stores[i].postcode}</p>
      <p class="text-sm mb-4">${this.stores[i].country}</p>
    </a>
    <div class="">
      <h5 class="text-lg mb-2">
        <a href="tel:${this.stores[i].telephone}"
          >${this.stores[i].telephone}</a
        >
      </h5>
      <h6 class="text-sm mb-2">
        <a href="mailto:${this.stores[i].email}"> ${this.stores[i].email} </a>
      </h6>
      <div>
        <a
          href="https://www.google.com/maps/dir/?api=1&amp;destination=${this.stores[i].formatted_address}"
          target="_blank"
          class=""
          >Directions</a
        >
      </div>
    </div>
  </div>`,
        });

        // Attach it to the marker we've just added
        window.google.maps.event.addListener(marker, "click", () => {
          this.selected = i;
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infowindow.open(map, marker);
          activeInfoWindow = infowindow;

          // scroll div to
          const myElement = document.getElementById(`store-${i}`);
          const topPos = myElement.offsetTop;
          const container = document.getElementById("scroll-container");
          const contPOS = container.offsetTop;
          container.scrollTop = topPos - contPOS;
        });
      }
    },

    async fetchStore(address) {
      this.stores = [];
      const param = isNaN(address) ? "address" : "postcode";
      if (param == "postcode" && address.length > 4) {
        // this.error = "Please enter valid postcode";
        return false;
      }
      this.error = "";
      await this.$axios
        .get(`${this.$config.snoozeEcom}/ecom/stores?${param}=${address}`)
        .then(response => {
          this.stores = this.formatedStore(response.data.data);
        })
        .catch(err => {
          console.log("got Error", err);
        });
      const { zoom, mapCenter } = this.$store.state.siteConfig.storeLocator;
      const map = new window.google.maps.Map(
        document.getElementById("mapSnooze"),
        {
          zoom: zoom + 5,
          center: mapCenter,
        }
      );
      this.mapMarkerOnMap(map);
    },

    formatedStore(stores) {
      stores.forEach((store, index) => {
        stores[index].url =
          "/store/" + store.name.replace(/\s/g, "-").toLowerCase();
        const {
          suburb,
          state,
          country,
          postcode,
          formatted_address: formattedAddress = "",
          name,
        } = store;

        stores[index].street = formattedAddress
          ? formattedAddress
              .replace(new RegExp(`${country}\\s?`), "")
              .replace(new RegExp(`${postcode}\\s?,`), "")
              .replace(new RegExp(`${state}\\s?,`), "")
              .replace(new RegExp(`${suburb}\\s?,`), "")
              .trim()
          : name;
      });
      console.log(stores, "stores");
      return stores;
    },
    async geoCodingRequest(pos) {
      let crd = pos.coords;
      const response = await this.$axios.get(
        `${this.$config.appEndPoint}/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=${this.$config.gooogleMapsApi}`
      );
      let addresses = path(
        ["data", "results", [0], "address_components"],
        response
      );
      let postcode = addresses.find(item => {
        return item.types.find(el => el == "postal_code");
      });
      console.log(postcode);
      await this.fetchStore(parseInt(postcode.long_name));
    },
  },
};
</script>
<style lang="postcss" scoped>
.store-location-container {
  @apply ml-auto !important mr-auto !important;
}
</style>
