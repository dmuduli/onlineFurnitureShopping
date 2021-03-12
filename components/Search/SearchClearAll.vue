<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectClearRefinements } from "instantsearch.js/es/connectors";
import { mapGetters } from "vuex";

export default {
  mixins: [createWidgetMixin({ connector: connectClearRefinements })],

  computed: {
    ...mapGetters(["shownFacets"]),
    widgetParams() {
      return { includedAttributes: this.includedAttributes };
    },
    includedAttributes() {
      return this.shownFacets.map(f => f.name);
    },
    searchQuery() {
      return this.$route.query.query;
    },
  },

  watch: {
    searchQuery(newQuery, oldQuery) {
      const hasQueryChange = newQuery != oldQuery;
      if (hasQueryChange && newQuery != null) {
        console.log({ newQuery, oldQuery });
        console.log("SEARCH CLEAR ALL");
        this.state.refine();
      }
    },
  },

  render() {
    return null;
  },
};
</script>
