import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  ...pluginQuery.configs['flat/recommended'],
  globalIgnores(['dist']),
  {
    plugins: {
      import: importPlugin,
      perfectionist,
    },
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
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
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

      // Ограничение длины строки
      'max-len': [
        'warn',
        {
          code: 120, // максимум 120 символов в строке
          tabWidth: 2,
          ignoreUrls: true, // длинные URL не считаются ошибкой
          ignoreStrings: true, // можно не переносить длинные строки в кавычках
          ignoreTemplateLiterals: true, // не проверять длину шаблонных строк
          ignoreComments: true, // не проверять длину комментариев
        },
      ],

      'perfectionist/sort-objects': [
        'warn',
        {
          type: 'natural', // естественная сортировка
          order: 'asc', // по возрастанию
        },
      ],
      'perfectionist/sort-object-types': ['warn', { order: 'asc', type: 'alphabetical' }],
      'perfectionist/sort-intersection-types': ['warn', { order: 'asc' }],
      'perfectionist/sort-union-types': ['warn', { order: 'asc' }],
      'perfectionist/sort-interfaces': [
        'warn',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },
]);
