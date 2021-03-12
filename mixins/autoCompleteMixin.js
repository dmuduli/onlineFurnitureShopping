export default {
  methods: {
    autocompleApi(value) {
      return this.$axios
        .get(
          `${this.$config.appEndPoint}/maps/api/place/autocomplete/json?input=${value}&types=(regions)&language=en&components=country:au&key=${this.$config.gooogleMapsApi}`
        )
        .then(response => response.data.predictions)
        .then(predictions => (predictions.length > 0 ? predictions : []));
    },

    deliveryOptionsApi(payload) {
      return this.$axios.post(
        `${this.$config.snoozeEcom}/ecom/shipping-simple`,
        payload
      );
    },

    getPostcode(placeId) {
      return this.$axios
        .get(
          `${this.$config.appEndPoint}/maps/api/place/details/json?place_id=${placeId}&fields=address_components&key=${this.$config.gooogleMapsApi}`
        )
        .then(response => response.data.result.address_components)
        .then(components =>
          components.find(component => component.types.includes("postal_code"))
        )
        .then(postalCodeComponent =>
          postalCodeComponent ? String(postalCodeComponent.long_name) : ""
        );
    },
  },
};
