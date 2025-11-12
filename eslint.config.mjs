// eslint.config.mjs
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
  // איגנורים גלובליים (מחליף .eslintignore)
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '.nyc_output/**',
      'logs/**',
      '*.log',
      '*.sqlite',
      '*.sqlite3',
      '*.db',
      'tmp/**',
      '.temp/**',
      '.eslintcache',
      'tsconfig.tsbuildinfo',
      'jest-e2e.config.js'
    ],
  },

  // קונפיג מומלץ עם type-checking
  ...tseslint.configs.recommendedTypeChecked,

  // קוד אפליקציה (ללא בדיקות) – typed lint מול tsconfig.eslint.json
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts', '**/*.e2e-spec.ts', 'test/**'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      unicorn: eslintPluginUnicorn,
      security: eslintPluginSecurity,
      import: eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.eslint.json',
        },
      },
    },
    rules: {
      // פורמט
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all', endOfLine: 'auto' }],

      // איכות/בטיחות
      'unicorn/prefer-query-selector': 'error',
      'security/detect-object-injection': 'warn',

      // יבואי TS
      'import/no-unresolved': 'error',

      // כללי TS
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'error',

      // כללי JS כלליים
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      quotes: 'off',
      semi: ['error', 'always'],
    },
  },

  // בדיקות (spec / e2e) – typed lint מול tsconfig.e2e.json
  {
    files: ['test/**/*.ts', '**/*.spec.ts', '**/*.e2e-spec.ts', 'app.e2e-spec.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.e2e.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      globals: { ...globals.jest, ...globals.node },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.e2e.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': 'off',
    },
  },
];
