<template>
  <div v-click-outside="hide" class="w-full relative read-more-wrap">
    <div
      class="inline-block border-b-2 border-gray-500 cursor-pointer relative"
      @click="show = !show"
    >
      <span class="text-sm leading-normal font-medium text-gray-900 uppercase">
        Read More
      </span>
      <div
        class="tooltip p-3 absolute bg-white shadow border border-gray-200 rounded-md tooltip-left-arrow"
        :class="[show ? 'block' : 'hidden']"
      >
        <cms-rich-text
          :field="field.blog_link.title"
          class="tooltip-heading mb-3"
        />
        <cms-rich-text
          :field="getTextField(field)"
          class="w-full tooltip-para"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  directives: { ClickOutside },
  props: {
    field: { type: Object, default: () => {} },
    getTextField: { type: Function, required: true },
  },
  data: () => ({ show: false }),
  methods: {
    hide() {
      this.show = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.tooltip {
  width: 275px;
  z-index: 9;
  bottom: 32px;
  left: 0;
  @screen lg {
    width: 300px;
    top: -8px;
    bottom: auto;
    left: 6.8rem;
  }
}
.tooltip-left-arrow:after,
.tooltip-left-arrow:before {
  right: 100%;
  top: 20px;
  border: solid transparent;
  content: " ";
  @apply pointer-events-none absolute w-0 h-0;
}

.tooltip-left-arrow:after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: white;
  @apply -mt-2 border-8;
}
.tooltip-left-arrow:before {
  border-color: rgba(239, 233, 229, 0);
  border-right-color: #efe9e5;
  border-width: 11px;
  margin-top: -11px;
}
@media screen and (max-width: 767px) {
  .tooltip-left-arrow:before {
    margin-top: 170px;
    @apply hidden;
  }
  .tooltip-left-arrow:after {
    margin-top: 10.8rem;
    @apply hidden;
  }
}
</style>
