<template>
  <div class="flex justify-between items-center">
    <app-button
      class="md:w-full lg:pr-10 lg:pl-10"
      :class="{
        'opacity-50 cursor-not-allowed': isOutOfStock || addToCartLoading,
        'focus:outline-none': addToCartLoading,
      }"
      color="black"
      font-weight="bold"
      :disabled="isOutOfStock || addToCartLoading"
      block
      responsive
      @click.native="addItemToCart"
    >
      <svg-icon-circle v-if="addToCartLoading" class="w-full" />
      <span v-else>
        {{ isOutOfStock ? "out of stock" : "add to bag" }}
      </span>
    </app-button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    isOutOfStock: { type: Boolean, required: true },
    selectedVariant: { type: Object, required: true },
  },
  data: () => ({
    addToCartLoading: false,
  }),
  computed: {
    ...mapState("checkout", ["cart", "checkout"]),
  },
  methods: {
    async addItemToCart() {
      try {
        this.addToCartLoading = true;
        const { storefrontId: variantId, taxable } = this.selectedVariant;
        const customAttributes = [{ taxable: taxable.toString() }];
        if (this.checkout.id) {
          const payload = [{ variantId, customAttributes }];
          await this.$store.dispatch("checkout/ADD_LINE_ITEM", payload);
        } else {
          const payload = { variantId, quantity: 1, customAttributes };
          await this.$store.dispatch("checkout/CREATE_CHECKOUT", payload);
        }

        await this.$store.dispatch("app/openAddedToBag", this.isTablet);
        this.addToCartLoading = false;
      } catch (e) {
        console.log("error", e);
        this.addToCartLoading = false;
      }
    },
  },
};
</script>
