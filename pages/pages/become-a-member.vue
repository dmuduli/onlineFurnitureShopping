<template>
  <div>
    <membership-modal :show-modal="showModal" @close-modal="closeModal" />
    <slice-zone :slices="slices" />
    <div class="w-full text-center px-4 py-6">
      <app-button color="secondary" size="lg" @click.native="openModal">
        Join Now
      </app-button>
    </div>
    <cms-rich-text
      :field="termsAndCondition"
      class="terms-condition text-sm font-para text-gray-900 text-center px-4 pb-8"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gql from "graphql-tag";
import path from "ramda/src/path";

const QUERY_BECOME_A_MEMBER = gql`
  {
    allBecome_a_members {
      edges {
        node {
          button_label
          terms_and_condition
          body {
            __typename
            ... on Become_a_memberBodyCampaign_banner {
              type
              primary {
                text
                background_color
                text_color
              }
            }
            ... on Become_a_memberBodyMember_banner {
              type
              primary {
                title
                description
                button_label
                image
              }
            }
            ... on Become_a_memberBodyMember_benefits {
              type
              primary {
                title
                background_color
                text_color
              }
              fields {
                image
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;

export default {
  beforeRouteLeave(to, from, next) {
    const payload = {
      title: { text: "Become a Member" },
      url: from.fullPath,
    };
    this.$store.dispatch("app/setRedirectFrom", payload);
    next();
  },
  async asyncData({ app, route: { params } }) {
    const client = app.apolloProvider.clients.prismic;
    const { data } = await client.query({
      query: QUERY_BECOME_A_MEMBER,
    });
    let node = path(["allBecome_a_members", "edges", [0], "node"], data);
    let slices = node.body;
    let termsAndCondition = node.terms_and_condition;
    return {
      slices,
      termsAndCondition,
    };
  },
  data() {
    return {
      url: `${this.$config.joinMembershipUrl}?hideCloseButton=1`,
    };
  },
  computed: {
    ...mapGetters({ showModal: "pages/getModalState" }),
  },
  methods: {
    openModal() {
      this.$store.dispatch("pages/openModalAction");
    },
    closeModal() {
      this.$store.dispatch("pages/closeModalAction");
    },
  },
};
</script>

<style lang="postcss">
.terms-condition {
  & a {
    @apply text-gray-500;
    &:hover {
      @apply text-gray-900;
    }
  }
}

.join-now-modal-container {
  width: 646px;
  min-height: 550px;
}
@media screen and (max-width: 768px) {
  .become-a-member-wrapper {
    height: auto;
    background-size: cover;
  }
  .join-now-modal-container {
    width: 96%;
    min-height: auto;
  }
}
</style>
