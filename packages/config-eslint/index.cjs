// @ts-check
const tseslint = require('typescript-eslint');
const boilerplatePlugin = require('@magi-boilerplate/eslint-plugin');

/** @type {import('typescript-eslint').ConfigArray} */
const config = [
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    plugins: {
      '@magi-boilerplate': boilerplatePlugin,
    },
    rules: {
      '@magi-boilerplate/one-export-per-file': 'error',
      '@magi-boilerplate/max-file-lines': ['warn', { max: 500 }],
    },
  },
];

module.exports = config;
