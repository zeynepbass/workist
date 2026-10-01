import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import noComments from "./tools/eslint/no-comments.js";

const clientSrc = "client/src";

export default [
  {
    ignores: ["**/node_modules/**", "**/build/**", "**/coverage/**"],
  },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    plugins: { local: { rules: { "no-comments": noComments } } },
    linterOptions: { reportUnusedDisableDirectives: "error" },
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      "no-console": "error",
      "local/no-comments": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
      "import/no-unresolved": [
        "error",
        { caseSensitiveStrict: true, ignore: ["^vitest/config$", "^file-type$"] },
      ],
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
    },
  },
  {
    files: ["server/**/*.js", "tools/**/*.js", "e2e/**/*.{js,mjs}", "*.js", "client/*.mjs"],
    languageOptions: { globals: globals.node },
    settings: { "import/resolver": { node: true } },
  },
  {
    files: ["server/**/*.test.js", "server/tests/**/*.js"],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
  {
    files: ["client/**/*.js"],
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    languageOptions: {
      globals: { ...globals.browser, process: "readonly" },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        alias: { map: [["@", `./${clientSrc}`]], extensions: [".js", ".jsx", ".json"] },
        node: true,
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["client/craco.config.js", "client/tailwind.config.js", "client/src/setupProxy.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
  {
    files: ["client/src/**/*.test.js", "client/src/setupTests.js"],
    languageOptions: { globals: { ...globals.jest } },
  },
  prettier,
];
