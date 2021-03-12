<script>
import UnknownSlice from "~/slices/UnknownSlice.vue";

export default {
  components: {
    UnknownSlice,
  },
  props: {
    slices: {
      type: Array,
      default: () => [],
    },
    //  slicesData will go in every slice
    //  we can send whatever data we want to send to slices
    slicesData: {
      type: Object,
      default: () => null,
    },
    path: {
      type: String,
      default: () => "slices",
    },
    wrapper: {
      required: false,
      type: String,
      default: "div",
      description: "Wrapper tag (div, section, main...)",
    },
  },
  computed: {
    camelizeSlices() {
      return this.slices.map(e => this.camelize(e.type));
    },
    computedImports() {
      return this.slices.map((slice, i) => () => {
        const allPaths =
          typeof this.path === "string" ? [this.path] : this.path;
        return this.anyPromise(
          allPaths.reduce((prev, p) => {
            return prev.concat([
              import(`~/${p}/${this.camelizeSlices[i]}/index.vue`),
              import(`~/${p}/${this.camelizeSlices[i]}.vue`),
            ]);
          }, [])
        ).catch(() => UnknownSlice);
      });
    },
    computedSlices() {
      return this.slices.map((slice, i) => ({
        import: this.computedImports[i],
        data: {
          props: { ...slice, ...this.slicesData },
        },
        name: this.camelizeSlices[i],
      }));
    },
  },
  methods: {
    anyPromise(ps) {
      const invert = p =>
        new Promise((resolve, reject) => p.then(reject, resolve));
      const firstOf = ps => invert(Promise.all(ps.map(invert)));
      return firstOf(ps);
    },
    camelize(str) {
      const camelizeRE = /-(\w)/g;
      str = str.replace(/_/g, "-").replace(camelizeRE, (_, c) => {
        return c ? c.toUpperCase() : "";
      });
      return str[0].toUpperCase() + str.slice(1);
    },
  },
  render() {
    const Wrapper = this.wrapper;
    return (
      <Wrapper>
        {this.computedSlices.map((e, i) => {
          const ImportedComponent = e.import;
          // console.log({ ...e.data }, "Slice zone");
          return e.name === "PlaceholderSection" ? (
            <ImportedComponent key={i} {...e.data}>
              {this.$slots.default}
            </ImportedComponent>
          ) : (
            <ImportedComponent key={i} {...e.data}></ImportedComponent>
          );
        })}
      </Wrapper>
    );
  },
};
</script>
