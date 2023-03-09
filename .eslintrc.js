module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },

  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],

  ignorePatterns: [".nuxt/", ".output/", "dist/", "public/", "**/*.min.js"],

  plugins: ["@typescript-eslint", "prettier"],

  rules: {
    "vue/multi-word-component-names": 0,
    "vue/script-setup-no-uses-vars": "off",
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};
