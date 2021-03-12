import Vue from "vue";
import { common, nuxt } from "@prismicio/vue/components/common";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";

import SliceZone from "~/slices/SliceZone";

// vue prismic components registration
Vue.prototype.$prismic = {
  linkResolver,
  asLink(link) {
    if (link) {
      return PrismicDOM.Link.url(link, linkResolver);
    }
  },
  asText(text) {
    if (text) {
      return PrismicDOM.RichText.asText(text);
    }
  },
};

Object.entries({ ...common, ...nuxt }).forEach(([_, component]) => {
  Vue.component(component.name, component);
});

Vue.component("SliceZone", SliceZone);

function linkResolver(doc) {
  const { _meta: meta } = doc;

  let uid, type;

  if (meta && meta.uid) {
    ({ uid, type } = meta);
  }

  if (doc.uid) {
    ({ uid, type } = doc);
  }

  if (type === "page" || type === "become_a_member") {
    return `/pages/${uid}`;
  }

  if (type === "store-locator") {
    return `/store/${uid}`;
  }

  if (type === "static_page") {
    return `/static-pages/${uid}`;
  }

  if (type === "blog") {
    return `/blogs/inspiration/${uid}`;
  }

  if (type === "blogpage") {
    return `/blogs/${uid}`;
  }

  if (type === "collection_page") {
    return `/collections/${uid}`;
  }

  if (type === "product_list_page") {
    return `/collections/${uid}/products`;
  }

  if (type === "product_detail_page") {
    return `/products/${uid}`;
  }

  if (type === "l2_product_list_page") {
    const { facetParameterKey: facet, facetParameterValue: facetValue } = doc;

    return `/collections/${uid}/${facet}/${facetValue}`;
  }

  if (type === "cart") {
    return `/cart`;
  }

  return "/";
}

export default async function ({ $config }, inject) {
  const prismicApi = await Prismic.getApi($config.prismicAPIEndPoint);

  inject("prismicApi", prismicApi);
}
