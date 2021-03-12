<script>
import { COLORS, SIZES, FONT_WEIGHTS } from "./app-button.constants";

export default {
  props: {
    to: { type: String, default: "" },
    color: {
      type: String,
      default: "primary",
      validator: color => COLORS.includes(color),
    },
    size: {
      type: String,
      default: "md",
      validator: size => SIZES.includes(size),
    },
    responsive: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    fontWeight: {
      type: String,
      default: "bold",
      validator: fontWeight => FONT_WEIGHTS.includes(fontWeight),
    },
    wFull: { type: Boolean, default: false },
    external: { type: Boolean, default: false },
  },
  computed: {
    componentData() {
      let data = { Tag: "button" };
      if (this.to) {
        data = { ...data, Tag: "nuxt-link", to: this.to };
      } else if (this.external) {
        data = { Tag: "a" };
      }
      return data;
    },
  },

  render(h) {
    const { Tag, ...propsData } = this.componentData;

    if (this.icon) {
      return <Tag>{this.$slots.default}</Tag>;
    }

    if (this.rounded) {
      return (
        <button
          class={`rounded-full p-px mr-2 mb-4 cursor-pointer focus:outline-none shadow ${
            this.size == "md" ? "w-8 h-8" : "w-6 h-6"
          }`}
        >
          {this.$slots.default}
        </button>
      );
    }

    const isLarge = this.size == "3xl";
    return (
      <Tag
        props={propsData}
        class={`transition-colors duration-500 ease-in-out leading-5 text-xs text-center py-3 uppercase ${
          this.color == "secondary"
            ? "border text-white bg-teal-800 hover:bg-gray-100 hover:text-teal-800 hover:border-teal-800"
            : this.color == "secondary-inverted"
            ? "border text-teal-800 bg-white hover:bg-teal-800 hover:text-white hover:border hover:border-teal-800"
            : this.color == "black"
            ? "text-white bg-black hover:bg-gray-700"
            : this.color == "link"
            ? "text-black text-sm font-medium border-b-2 border-gray-500 hover:border-gray-900 pb-1 px-0 mr-8"
            : "text-white bg-gray-500 hover:bg-gray-700"
        } ${
          this.size == "lg"
            ? "px-5"
            : this.size == "xl"
            ? "px-10"
            : this.size == "3xl"
            ? "px-3 lg:px-18"
            : this.size == "link"
            ? "px-0"
            : "px-3"
        } ${isLarge ? "" : this.responsive ? "lg:px-20" : ""} ${
          this.fontWeight == "normal" ? "font-normal" : "font-bold"
        } ${this.block ? "w-full md:w-auto" : ""} ${
          this.wFull ? "block" : "inline-block"
        }`}
      >
        {this.$slots.default}
      </Tag>
    );
  },
};
</script>
