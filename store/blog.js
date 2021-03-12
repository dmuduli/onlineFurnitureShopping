import Prismic from "prismic-javascript";
import { path, pathOr, pick, uniq } from "ramda";

import { byId } from "~/utils/shopify-utils";

const normalizeBlogs = byId("uid");

export const state = () => ({
  title: [],
  blogs: {},
  pageBlogs: [],
  totalPages: 0,
  taggedPages: {},
  taggedTotalPages: 0,
  recentBlogs: [],
  blogsNavigation: [],
});

export const getters = {
  getBlog(state) {
    return uid => state.blogs[uid];
  },
  getBlogs(state) {
    return (page, tag = "") =>
      tag == ""
        ? pathOr([], ["pageBlogs", page], state)
        : pathOr([], ["taggedPages", tag, page], state);
  },
  getTotalPages(state) {
    return tag =>
      tag == ""
        ? pathOr(0, ["totalPages"], state)
        : pathOr(0, ["taggedTotalPages", tag], state);
  },
};

export const actions = {
  async fetchTaggedBlogs({ rootState, commit, getters }, { page, tag } = {}) {
    if (getters.getBlogs(page, tag).length != 0) {
      return;
    }

    const options = getOptions({ rootState, page });

    let blogsPromise = this.$prismicApi.query(
      Prismic.Predicates.any("document.tags", [tag]),
      options
    );
    const blogPage = getTitle(this.$prismicApi);

    const response = await Promise.all([blogsPromise, blogPage]);
    const { title, totalPages, blogs } = parseResponse(response);
    const blogUids = blogs.map(path(["uid"]));

    commit("UPSERT_TAGGED_BLOGS", { blogUids, tag, page });
    commit("SET_TAGGED_TOTAL_PAGES", { tag, totalPages });
    commit("SET_TITLE", { title });
    commit("UPSERT_BLOGS", { blogs: normalizeBlogs(blogs) });
  },

  async fetchBlogs({ commit, getters, rootState }, { page } = {}) {
    if (getters.getBlogs(page).length != 0) {
      return;
    }

    // If blogs page is not in store then go find the blogs page

    const blogsPromise = getPageBlogsPromise({
      api: this.$prismicApi,
      rootState,
      page,
    });
    const blogPagePromise = getTitle(this.$prismicApi);

    const response = await Promise.all([blogsPromise, blogPagePromise]);

    const { title, totalPages, blogs } = parseResponse(response);

    commit("SET_TOTAL_PAGES", { totalPages });
    commit("SET_TITLE", { title });
    commit("UPSERT_BLOGS", { blogs: normalizeBlogs(blogs) });
    commit("UPSERT_PAGE_BLOGS", { page, blogUids: blogs.map(path(["uid"])) });
  },

  async fetchBlog({ state, commit }, { handle }) {
    if (state.blogs[handle]) {
      return;
    }

    const blogData = await this.$prismicApi.query(
      Prismic.Predicates.at("my.blog.uid", handle)
    );

    commit("UPSERT_BLOGS", { blogs: normalizeBlogs(blogData.results) });
  },

  async fetchRecentBlogs({ commit }) {
    const options = {
      pageSize: 6,
      page: 1,
      orderings: "[my.blog.date desc, document.first_publication_date desc]",
    };

    const results = await this.$prismicApi
      .query(Prismic.Predicates.at("document.type", "blog"), options)
      .then(response => response.results);

    const recentBlogs = results.map(blog => {
      const title = pathOr("", ["data", "title", [0], "text"], blog);
      const publishDate = pathOr(
        blog.first_publication_date,
        ["data", "date"],
        blog
      );
      return { ...pick(["uid"], blog), publishDate, title };
    });
    commit("SET_RECENT_BLOGS", recentBlogs);

    commit("UPSERT_BLOGS", { blogs: normalizeBlogs(results) });
  },

  async fetchBlogNavigation({ state, commit }, { handle }) {
    const blogData = state.blogs[handle];
    if (blogData == undefined) {
      console.log("Please first dispatch fetchBlog ");
    }

    const blogId = blogData.id;
    // older/created before/previous blog
    const olderBlog = fetchPagingBlog({
      api: this.$prismicApi,
      blogId,
      order: " desc",
    });
    // newer/created after/next blog
    const newerBlog = fetchPagingBlog({
      api: this.$prismicApi,
      blogId,
      order: "",
    });

    const [olderUid, newerUid] = await Promise.all([olderBlog, newerBlog]).then(
      ([olderBlog, newerBlog]) => {
        const getUid = pathOr(null, ["results", [0], "uid"]);
        return [getUid(olderBlog), getUid(newerBlog)];
      }
    );

    commit("SET_BLOGS_NAVIGATION", {
      uid: handle,
      navigation: { olderUid, newerUid },
    });
  },
};

export const mutations = {
  UPSERT_BLOGS(state, { blogs }) {
    state.blogs = { ...blogs, ...state.blogs };
  },
  SET_TITLE(state, { title }) {
    state.title = title;
  },
  SET_TOTAL_PAGES(state, { totalPages }) {
    state.totalPages = totalPages;
  },
  UPSERT_PAGE_BLOGS(state, { page, blogUids }) {
    const currentBlogUids = state.pageBlogs[page] ? state.pageBlogs[page] : [];
    state.pageBlogs = {
      ...state.pageBlogs,
      [page]: uniq([...blogUids, ...currentBlogUids]),
    };
  },
  UPSERT_TAGGED_BLOGS(state, { blogUids, tag, page }) {
    if (state.taggedPages[tag] == null) {
      state.taggedPages = {
        ...state.taggedPages,
        [tag]: { [page]: [...blogUids] },
      };
    } else if (state.taggedPages[tag][page] == null) {
      state.taggedPages = {
        ...state.taggedPages,
        [tag]: { ...state.taggedPages[tag], [page]: [...blogUids] },
      };
    } else {
      state.taggedPages[tag] = {
        ...state.taggedPages,
        [tag]: {
          ...state.taggedPages[tag],
          [page]: uniq([...state.taggedPages[tag][page], ...blogUids]),
        },
      };
    }
  },
  SET_TAGGED_TOTAL_PAGES(state, { tag, totalPages }) {
    state.taggedTotalPages = { [tag]: totalPages, ...state.taggedTotalPages };
  },
  SET_RECENT_BLOGS(state, recentBlogs) {
    state.recentBlogs = recentBlogs;
  },
  SET_BLOGS_NAVIGATION(state, { uid, navigation: { olderUid, newerUid } }) {
    state.blogsNavigation = {
      [uid]: { olderUid, newerUid },
      ...state.blogsNavigation,
    };
  },
};

function getOptions({ rootState, page }) {
  return {
    pageSize: rootState.siteConfig.blogsPerPage,
    page,
    orderings: "[my.blog.date desc, document.first_publication_date desc]",
  };
}

function parseResponse(response) {
  let title = path([[1], "results", [0], "data", "title"], response);
  let totalPages = path([[0], "total_pages"], response);
  let blogs = path([[0], "results"], response);

  return { title, totalPages, blogs };
}

function getTitle(api) {
  return api.query(Prismic.Predicates.at("document.type", "blogpage"));
}

function fetchPagingBlog({ api, blogId, order }) {
  return api.query(Prismic.Predicates.at("document.type", "blog"), {
    pageSize: 1,
    after: blogId,
    orderings: `[my.blog.date ${order}, document.first_publication_date ${order}]`,
  });
}

function getPageBlogsPromise({ api, rootState, page }) {
  const options = getOptions({ rootState, page });
  return api.query(Prismic.Predicates.at("document.type", "blog"), options);
}
