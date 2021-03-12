<template>
  <div class="__nuxt-error-page">
    <div>
      <div class="max-h-71 overflow-hidden mb-8">
        <img
          src="~/assets/images/error.jpg"
          class="w-full hidden lg:block"
          alt="Error occured"
        />
        <img
          src="~/assets/images/error_mobile.jpg"
          class="w-full lg:hidden"
          alt="Error occured"
        />
      </div>
      <app-container>
        <h1
          class="font-semibold text-2xl lg:text-3xl text-black mb-6 uppercase"
        >
          {{ statusCode }} {{ message }}
        </h1>
        <p class="text-sm text-black mb-2">
          Sorry, it looks like this page is having a Snooze.
        </p>
        <p class="text-sm text-black mb-6">
          Don’t worry, you can be on your way to shopping by
          <nuxt-link to="/" class="underline hover:no-underline font-medium">
            clicking here
          </nuxt-link>
        </p>
        <!-- <div class="w-full mb-10 relative">
          <input
          type="text"
          class="border border-gray-400 pl-12 py-3 pr-4 min-w-1/3 md:w-auto w-full"
        />
        <icon-search class="absolute left-2 top-2" />
          <transition name="fade">
            <search-bar></search-bar>
          </transition>
        </div> -->
        <h4 class="text-lg text-black font-medium mb-4">Helpful Links</h4>
        <div class="flex flex-wrap -mx-1 lg:-mx-2 mb-8">
          <div
            v-for="(item, index) in links"
            :key="index"
            class="w-1/2 md:w-auto inline-block px-1 lg:px-2 py-1"
          >
            <cms-link
              :field="item.link"
              class="block bg-gray-500 hover:bg-gray-700 transition-colors duration-1000 ease-in-out px-2 lg:px-8 py-2 text-center font-medium text-white text-10px md:text-xs"
            >
              {{ item.link_label }}
            </cms-link>
          </div>
        </div>
      </app-container>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { path } from "ramda";
import links from "~/static/static-links";

const ERROR_PAGE_QUERY = gql`
  query {
    allError_pages {
      edges {
        node {
          title
          helpful_links {
            link_label
            link {
              __typename
              _linkType
              ... on _Document {
                _meta {
                  id
                  uid
                  type
                }
              }
              ... on _ExternalLink {
                url
                target
              }
            }
          }
        }
      }
    }
  }
`;
export default {
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      links: [],
    };
  },
  async fetch() {
    try {
      const client = this.$nuxt.$apolloProvider.clients.prismic;
      const { data } = await client.query({
        query: ERROR_PAGE_QUERY,
      });
      const results = path(
        ["allError_pages", "edges", [0], "node", "helpful_links"],
        data
      );
      this.links = [...results];
    } catch (e) {
      console.log(e);
      this.links = links;
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        },
      ],
    };
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || `<%= messages.client_error %>`;
    },
  },
};
</script>
