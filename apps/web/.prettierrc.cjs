const base = require('@magi-boilerplate/config-prettier');

module.exports = {
  ...base,
  overrides: [
    ...(base.overrides ?? []),
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
