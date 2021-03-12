<template>
  <div class="w-full h-full relative">
    <div class="overflow-hidden relative h-full w-full">
      <div
        class="shop-bye-style-image absolute bg-black w-full h-full inset-0 hidden z-10 opacity-50"
      />
      <cms-image
        :field="item.link.body[0].primary.banner_bg_image"
        class="w-full h-full transition duration-700 transform ease-in-out object-cover"
      />
      <div
        class="font-BeyondInfinity text-4xl xl:text-6xl leading-normal lg:leading-15 font-normal text-white absolute inset-0 m-auto z-10 text-center flex items-center justify-center shop-by-style-title"
        style="background-color: rgba(0, 0, 0, 0.25)"
      >
        <!-- inline background color used due to IE -->
        <cms-rich-text
          :field="item.link.body[0].primary.title"
          class="capitalize tracking-tighter"
        />
      </div>
    </div>
    <div
      class="caption invisible bg-white border border-gray-200 w-full p-4 left-0 -bottom-100 absolute z-10 hidden lg:flex flex-col justify-between transition-all duration-500"
    >
      <div class="">
        <cms-rich-text
          :field="item.link.body[0].primary.title"
          class="text-xl text-gray-900 leading-normal mb-2"
        />
        <cms-rich-text
          :field="item.link.body[0].primary.paragraph.slice(0, 1)"
          class="text-sm text-gray-900 leading-5 two-line-clamp"
        />
      </div>
      <div class="w-full mt-4 relative">
        <div
          class="text-sm leading-5 font-medium text-gray-900 uppercase inline-flex items-center border-b-2 border-gray-500"
        >
          <cms-rich-text :field="item.linkLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="postcss" scoped>
.shop-bye-style:hover .caption {
  @apply visible bottom-0;
}
.shop-bye-style:hover img {
  @apply -translate-y-1 scale-110;
}
.shop-bye-style:hover .shop-by-style-title {
  @apply hidden;
}
.shop-bye-style:hover .shop-bye-style-image {
  @apply block;
}
</style>
