/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    es2021: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "next"
  ],
  rules: {
    "no-undef": "off" // Disable no-undef for module
  },
  globals: {
    module: "readonly", // Explicitly define `module` as a global variable
  }
};
