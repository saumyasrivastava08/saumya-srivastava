module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",

  plugins: [
    "@typescript-eslint",
    "unused-imports",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    /* Core */
    "no-console": "warn",
    "no-debugger": "error",

    /* Unused */
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],

    /* Style */
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],

    /* TS */
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};