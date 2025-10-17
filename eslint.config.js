import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default defineConfig([
  ...pluginQuery.configs['flat/recommended'],
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      quotes: ['warn', 'single', { avoidEscape: true }], // Одинарные кавычки
      // Сортировка самих импортов между файлами (по алфавиту)
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Сортировка имен внутри фигурных скобок { ... }
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true, // не конфликтуем с import/order
          ignoreMemberSort: false, // сортируем члены внутри {}
        },
      ],
    },
  },
]);
