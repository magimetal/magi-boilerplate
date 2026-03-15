// @ts-check
const base = require('@magi-boilerplate/config-eslint');

module.exports = [
  {
    ignores: ['dist/**'],
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
