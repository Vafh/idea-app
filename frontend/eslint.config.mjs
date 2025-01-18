import globalConfig from "../eslint.config.mjs";
import js from "@eslint/js";
import path from "node:path";
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const eslintConfig = [
    ...globalConfig,
    ...fixupConfigRules(compat.extends("react-app")),
    {
        languageOptions: {
            ecmaVersion: 2015,
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig.app.json",
            },
        },
    },
    {
        files: ["**/vite.config.ts"],

        languageOptions: {
            ecmaVersion: 2015,
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig.node.json",
            },
        },
    },
];

export default eslintConfig;