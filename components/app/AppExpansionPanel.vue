<template>
  <div>
    <div
      class="accordion-item flex justify-between items-center text-sm font-normal text-black cursor-pointer"
      :class="accordionItemClasses"
      @click="handleClick"
    >
      <slot name="title">Please enter title here</slot>
      <svg-icon-down-arrow
        class="transform duration-500 transition-transform"
        :class="{ 'rotate-180': active, 'rotate-0': !active }"
      />
    </div>
    <transition name="slide" mode="out-in">
      <div v-if="active">
        <slot>Please enter description here</slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    itemIndex: { type: Number, required: true },
    accordionItemClasses: { type: String, default: "uppercase py-8" },
  },
  data() {
    return { active: this.open };
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (to.name !== from.name) {
        this.active = false;
      }
    },
    open(val) {
      this.active = val;
    },
  },
  methods: {
    handleClick() {
      this.active = !this.active;
      this.$parent.$emit("item-clicked", this.itemIndex); // please dont comment this use multiple==true if you dont want this to collapse
    },
  },
};
</script>
<style lang="postcss" scoped>
.slide-enter-active,
.slide-leave-active {
  @apply duration-150;
}
.slide-enter-active {
  @apply ease-in;
}

.slide-leave-active {
  @apply ease-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 415px;
  @apply overflow-hidden;
}

.slide-enter,
.slide-leave-to {
  @apply overflow-hidden;
  max-height: 0;
}
</style>
