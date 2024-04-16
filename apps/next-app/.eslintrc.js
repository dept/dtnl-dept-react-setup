/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@dept/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
