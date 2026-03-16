'use strict';

const { RuleTester } = require('eslint');
const maxFileLinesRule = require('./max-file-lines.cjs');

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

function generateLines(count) {
  return Array.from({ length: count }, (_, i) => `const x${i} = ${i};`).join('\n');
}

ruleTester.run('max-file-lines', maxFileLinesRule, {
  valid: [
    {
      code: generateLines(10),
      options: [{ max: 500 }],
      filename: 'src/foo.ts',
    },
    {
      code: generateLines(500),
      options: [{ max: 500 }],
      filename: 'src/foo.ts',
    },
    {
      code: generateLines(100),
      options: [{ max: 200 }],
      filename: 'src/foo.ts',
    },
    {
      code: generateLines(600),
      options: [{ max: 500, allow: ['big-file\\.ts$'] }],
      filename: 'src/big-file.ts',
    },
    {
      code: generateLines(600),
      options: [{ max: 500 }],
      filename: 'src/index.ts',
    },
    {
      code: generateLines(499),
      filename: 'src/foo.ts',
    },
  ],

  invalid: [
    {
      code: generateLines(501),
      options: [{ max: 500 }],
      filename: 'src/foo.ts',
      errors: [
        {
          messageId: 'tooManyLines',
          data: { actual: '501', max: '500' },
        },
      ],
    },
    {
      code: generateLines(51),
      options: [{ max: 50 }],
      filename: 'src/small-file.ts',
      errors: [
        {
          messageId: 'tooManyLines',
          data: { actual: '51', max: '50' },
        },
      ],
    },
    {
      code: generateLines(1000),
      options: [{ max: 500 }],
      filename: 'src/huge.ts',
      errors: [
        {
          messageId: 'tooManyLines',
          data: { actual: '1000', max: '500' },
        },
      ],
    },
  ],
});
