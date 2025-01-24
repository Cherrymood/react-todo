import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore the "dist" folder
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"], // Apply these settings to all JS and JSX files
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true, impliedStrict: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" }, // Automatically detect the React version
    },
    plugins: {
      react, // React-specific linting rules
      "react-hooks": reactHooks, // React hooks rules
      "react-refresh": reactRefresh, // React refresh rules for fast refresh
    },
    rules: {
      // Disable React PropTypes validation
      "react/prop-types": "off", // Alternative to 0 for clarity
      "react/jsx-no-target-blank": "off", // Turn off warnings for target="_blank"
      "react-hooks/rules-of-hooks": "error", // Enforce rules of hooks
      "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in hooks
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Allow exporting constants
      ],
      ...js.configs.recommended.rules, // Extend base JavaScript recommended rules
      ...react.configs.recommended.rules, // Extend React recommended rules
      ...react.configs["jsx-runtime"].rules, // Extend JSX runtime rules
      ...reactHooks.configs.recommended.rules, // Extend React Hooks recommended rules
    },
  },
];
