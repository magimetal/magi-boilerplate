// @ts-check
const base = require('@magi-boilerplate/config-eslint');

module.exports = [
  {
    ignores: ['dist/**', '.angular/**', 'node_modules/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...base,
];
