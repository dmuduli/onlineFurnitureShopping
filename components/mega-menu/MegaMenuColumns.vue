<template>
  <div>
    <div
      v-for="(block, blockKey) in col"
      :key="blockKey"
      :class="createClassNames(block.primary, blockKey)"
    >
      <h2
        v-if="block.primary.link_title"
        :title="block.primary.link_title"
        class="title text-sm font-medium leading-5 text-gray-900 uppercase truncate"
        :class="[block.primary.sub_title ? 'mb-6' : 'mb-4']"
      >
        {{ block.primary.link_title }}
      </h2>
      <h3
        v-if="block.primary.sub_title"
        :title="block.primary.sub_title"
        class="section-heading font-medium uppercase text-brown-100 text-xs leading-4 mb-4 md:mb-3 truncate"
      >
        {{ block.primary.sub_title }}
      </h3>
      <ul>
        <li
          v-for="(leaf, leafIndex) of block.fields"
          :key="leafIndex"
          class="mb-5 md:mb-3 truncate"
        >
          <nuxt-link
            v-if="leaf.second_level_link"
            :to="$prismic.asLink(leaf.second_level_link)"
            class="pb-1 text-sm font-thin border-b-2 inline-block border-transparent hover:border-gray-500 transition duration-500 ease-in-out"
            :class="
              getLastLeafColor(
                leaf.second_level_link_text,
                leafIndex,
                block.fields.length
              )
            "
            :title="leaf.second_level_link_text"
            @click.native="closeMegaMenu"
          >
            {{ leaf.second_level_link_text }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    col: { type: Object, default: () => {} },
  },
  methods: {
    createClassName(title) {
      if (title) {
        return title.toLowerCase().replace(/\s:?/g, "-");
      }
      return "";
    },
    createClassNames({ link_title: linkTitle, sub_title: subTitle }, index) {
      let classStr = `${this.createClassName(linkTitle)} ${this.createClassName(
        subTitle
      )}`;
      if (index > 1) {
        classStr += " mt-10 md:mt-8";
      }
      return classStr;
    },
    getLastLeafColor(linkTxt, index, leavesCount) {
      if (
        linkTxt &&
        linkTxt.toLowerCase().includes("all") &&
        index == leavesCount - 1
      ) {
        return "text-black font-medium";
      }
      return "text-gray-6C6";
    },
    closeMegaMenu() {
      this.$store.dispatch("app/setActiveMenuIndex", -1);
    },
  },
};
</script>

<style scoped>
.col-container {
  max-height: 536px;
}
</style>
