'use strict';

const { RuleTester } = require('eslint');
const rule = require('./one-export-per-file.cjs');

const tester = new RuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

tester.run('one-export-per-file', rule, {
  valid: [
    {
      code: 'export default function Foo() {}',
      filename: 'src/foo.ts',
    },
    {
      code: 'export const foo = 1;',
      filename: 'src/foo.ts',
    },
    {
      code: 'export const a = 1; export const b = 2;',
      filename: 'src/index.ts',
    },
    {
      code: 'export const a = 1; export const b = 2;',
      filename: 'src/barrel.ts',
      options: [{ allow: ['barrel\\.ts$'] }],
    },
    {
      code: 'const x = 1; const y = 2;',
      filename: 'src/foo.ts',
    },
  ],
  invalid: [
    {
      code: 'export const a = 1; export const b = 2;',
      filename: 'src/foo.ts',
      errors: [
        {
          messageId: 'tooManyExports',
          data: { total: '2' },
          type: 'ExportNamedDeclaration',
        },
      ],
    },
    {
      code: 'export default function Foo() {}\nexport const bar = 1;',
      filename: 'src/foo.ts',
      errors: [
        {
          messageId: 'tooManyExports',
          data: { total: '2' },
          type: 'ExportNamedDeclaration',
        },
      ],
    },
    {
      code: 'export const a = 1; export const b = 2; export const c = 3;',
      filename: 'src/foo.ts',
      errors: [
        {
          messageId: 'tooManyExports',
          data: { total: '3' },
          type: 'ExportNamedDeclaration',
        },
        {
          messageId: 'tooManyExports',
          data: { total: '3' },
          type: 'ExportNamedDeclaration',
        },
      ],
    },
    {
      code: 'export const a = 1, b = 2;',
      filename: 'src/foo.ts',
      errors: [
        {
          messageId: 'tooManyExports',
          data: { total: '2' },
          type: 'ExportNamedDeclaration',
        },
      ],
    },
  ],
});
