// @ts-check
'use strict';

function isAllowedFile(filename, allowPatterns) {
  if (/[/\\]index\.[cm]?[jt]sx?$/.test(filename)) {
    return true;
  }

  for (const pattern of allowPatterns) {
    if (new RegExp(pattern).test(filename)) {
      return true;
    }
  }

  return false;
}

const maxFileLinesRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce a maximum number of lines per file',
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 1,
            default: 500,
          },
          allow: {
            type: 'array',
            items: { type: 'string' },
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooManyLines:
        'File has {{actual}} lines, which exceeds the maximum of {{max}}. Break this file into smaller, focused modules.',
    },
  },
  create(context) {
    const options = context.options[0] ?? {};
    const max = options.max ?? 500;
    const allowPatterns = options.allow ?? [];
    const filename = context.filename ?? context.getFilename();

    if (isAllowedFile(filename, allowPatterns)) {
      return {};
    }

    return {
      'Program:exit'(node) {
        const lines = context.sourceCode.lines.length;

        if (lines > max) {
          context.report({
            node,
            messageId: 'tooManyLines',
            data: {
              actual: String(lines),
              max: String(max),
            },
          });
        }
      },
    };
  },
};

module.exports = maxFileLinesRule;
