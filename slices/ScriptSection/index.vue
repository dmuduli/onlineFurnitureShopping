<template>
  <div id="script-section"></div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {} },
  },
  mounted() {
    let tag = document.createElement("script");
    tag.setAttribute("id", this.primary.id);
    tag.setAttribute("src", this.primary.src);
    let section = document.getElementById("script-section");
    section.append(tag);
  },
};
</script>
