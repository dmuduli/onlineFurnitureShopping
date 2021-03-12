module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    eqeqeq: ["off"],
    "prefer-const": ["off"],
    semi: ["error", "always"],
    "no-console": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["error", { semi: true, endOfLine: "auto" }],
    "comma-dangle": ["error", "only-multiline"],
    "arrow-parens": ["error", "as-needed"],
    "no-implicit-globals": "error",
  },
};
