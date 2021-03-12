<template>
  <div class="accordion-title relative pr-6 md:pr-0">
    <h3
      class="heading text-lg md:text-3xl text-gray-900 md:text-gray-450 leading-9 mb-2"
    >
      Velocity frequent flyer?
    </h3>
    <p
      v-if="!velocityLineItem"
      class="text-sm font-para text-gray-600 md:text-gray-450"
    >
      Earn <strong>{{ velocityPoints }}</strong> points today!
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("checkout", ["velocityLineItem", "visibleLineItems"]),
    ...mapGetters("velocity", ["velocityPoints"]),
  },
  watch: {
    visibleLineItems: {
      immediate: true,
      handler() {
        this.getVelocityPoints();
      },
    },
  },
  methods: {
    async getVelocityPoints() {
      const payload = this.visibleLineItems.map(item => {
        return {
          sku: item.variant.sku,
          quantity: item.quantity,
          price: item.variant.price * 100,
        };
      });

      await this.$store.dispatch("velocity/fetchVelocityPoints", payload);
    },
  },
};
</script>
