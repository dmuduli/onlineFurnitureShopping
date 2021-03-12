<template>
  <div
    slot="button-next"
    class="cursor-pointer abc bg-white border border-gray-500 rounded-full absolute top-1/2 z-10 flex justify-center items-center focus:outline-none"
    :class="{
      ' w-10 h-10 lg:w-12 lg:h-12': size == 'big',
      'w-8 h-8 lg:w-10 lg:h-10': size == 'small',
    }"
  >
    <svg-icon-down-arrow class="text-brown-100" :style="style" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      validator: value => ["prev", "next"].includes(value),
      default: true,
    },
    size: {
      validator: value => ["big", "small"].includes(value),
      default: true,
    },
  },
  computed: {
    style() {
      return this.type == "next"
        ? { transform: "rotate(-90deg)" }
        : { transform: "rotate(90deg)" };
    },
  },
};
</script>

<style lang="postcss" scoped>
[class*="swiper-prev"] > svg {
  margin-left: -2px;
}
[class*="swiper-next"] > svg {
  margin-right: -2px;
}
</style>
