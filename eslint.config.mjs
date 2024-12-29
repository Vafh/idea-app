import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
  {
    // Ignores for common folders
    ignores: ["**/node_modules", "**/dist"],
  },
  
  // Extend eslint-config-love and prettier configurations
  ...compat.extends('prettier'),

  {
    // Define custom rules
    files: ['**/*.js', '**/*.ts'],
    rules: {
      // Import order rules
      "import/order": ["error", {
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
          orderImportKind: "asc",
        },
      }],
      
      // TypeScript specific rules
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      
      // JSX accessibility rule
      "jsx-a11y/anchor-is-valid": "off",
      
      // JavaScript rules
      curly: ["error", "all"],
      "no-irregular-whitespace": ["error", {
        skipTemplates: true,
        skipStrings: true,
      }],
      "no-console": ["error", {
        allow: ["info", "error", "warn"],
      }],
    },
  }
];
