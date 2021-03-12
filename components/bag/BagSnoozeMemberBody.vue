<template>
  <div
    class="accordion-content md:flex md:text-sm mt-8 text-gray-700 font-para"
  >
    <template v-if="!membershipLineItem">
      <div class="newsletter w-full lg:w-3/4">
        <bag-snooze-member-form />
        <p class="text-sm pont-para mt-4 text-gray-450">
          Not a member yet?
          <app-button
            class="ml-3 text-xs text-gray-1500 font-medium font-sans join-now"
            color="link"
            size="link"
            @click.native="openModal"
          >
            Join now
          </app-button>
        </p>
      </div>
      <div
        class="icon hidden lg:block text-center -mt-12 pl-20 newsletter-bag-icon"
      >
        <svg-shopping-bag class="inline-block"></svg-shopping-bag>
      </div>
      <membership-modal :show-modal="showModal" @close-modal="closeModal" />
    </template>
    <template v-else>
      <p class="text-sm pont-para text-gray-450">
        Thank you for confirming your Snooze Membership.<br />
        <button
          class="font-sans uppercase font-medium mt-8 border-b-2 border-gray-500 hover:border-gray-900 pb-1 text-gray-1500"
          color="link"
          size="link"
          @click="removeMembership"
        >
          {{ signoutLoading ? "signing out..." : "sign out" }}
        </button>
      </p>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({ showModal: false, signoutLoading: false }),
  computed: {
    ...mapGetters("checkout", ["membershipLineItem"]),
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async removeMembership() {
      this.signoutLoading = true;
      const payload = [this.membershipLineItem.id];
      await this.$store.dispatch("checkout/REMOVE_LINE_ITEM", payload);
      this.signoutLoading = false;
    },
  },
};
</script>
<style lang="postcss" scoped>
@media screen and (min-width: 802px) and (max-width: 900px) {
  .newsletter-bag-icon {
    display: none;
  }
  .newsletter {
    width: 100%;
  }
}
</style>
