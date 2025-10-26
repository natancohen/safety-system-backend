import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      prettier: eslintPluginPrettier,
      unicorn: eslintPluginUnicorn,
      security: eslintPluginSecurity,
      import: eslintPluginImport
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      'prettier/prettier': ['error', {
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'auto'
      }],
      'unicorn/prefer-query-selector': 'error',
      'security/detect-object-injection': 'warn',
      'import/no-unresolved': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  }
];