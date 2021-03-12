<template>
  <div>
    <div class="flex justify-between items-center flex-wrap px-3 mxl:px-4 py-2">
      <div
        v-for="(icon, index) in paymentIcons"
        :key="index"
        class="w-1/4 text-center py-2"
      >
        <cms-link v-if="icon.icon_link" :field="icon.icon_link">
          <cms-image :field="getImage(icon)" />
        </cms-link>
        <span v-else>
          <cms-image :field="getImage(icon)" />
        </span>
      </div>
    </div>
    <div class="flex items-center px-4 py-2">
      <svg-velocity-logo class="w-18 h-8"></svg-velocity-logo>
      <h4 class="text-xs text-gray-600 uppercase ml-4">
        Earn {{ velocityPoint }} points
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    paymentIcons: { type: Array, default: () => [] },
    variant: { type: Object, default: () => {} },
  },
  computed: {
    ...mapGetters("velocity", ["getVelocityPoints"]),
    velocityPoint() {
      return this.getVelocityPoints(this.variant);
    },
  },
  methods: {
    getImage(icon) {
      return {
        url: require(`~/assets/images/${icon.icon_name}-logo.png`),
        alt: icon.icon_name,
      };
    },
  },
};
</script>
