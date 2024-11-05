import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import jesteslint from "eslint-plugin-jest";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { rules: { 'vue/multi-word-component-names': 'off' } },
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    files: ['test/**'],
    ...jesteslint.configs['flat/recommended'],
    rules: {
      ...jesteslint.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  { ignores: ["**/babel.config.cjs", "**/vite.config.*.ts", "**/jest.config.ts", "dist/**", "node_modules/**", "test/unit/coverage/**"] },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];