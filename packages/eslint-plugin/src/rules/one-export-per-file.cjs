// @ts-check
'use strict';

function countNamedDeclarationExports(node) {
  if (node.declaration === null) {
    return node.specifiers.length;
  }

  if (node.declaration.type === 'VariableDeclaration') {
    return node.declaration.declarations.length;
  }

  return 1;
}

function countExports(node) {
  if (node.type === 'ExportDefaultDeclaration') {
    return 1;
  }

  if (node.type === 'ExportAllDeclaration') {
    return 1;
  }

  if (node.type === 'ExportNamedDeclaration') {
    return countNamedDeclarationExports(node);
  }

  return 0;
}

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

const oneExportPerFileRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce one exported symbol per file by default',
    },
    schema: [
      {
        type: 'object',
        properties: {
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
      tooManyExports:
        'File exports {{total}} symbols. Keep one export per file or move extra symbols to focused modules.',
    },
  },
  create(context) {
    const options = context.options[0] ?? {};
    const allowPatterns = options.allow ?? [];
    const filename = context.filename ?? context.getFilename();

    if (isAllowedFile(filename, allowPatterns)) {
      return {};
    }

    const exportNodes = [];

    return {
      ExportNamedDeclaration(node) {
        const count = countExports(node);
        if (count > 0) {
          exportNodes.push({ node, count });
        }
      },
      ExportDefaultDeclaration(node) {
        exportNodes.push({ node, count: 1 });
      },
      ExportAllDeclaration(node) {
        exportNodes.push({ node, count: 1 });
      },
      'Program:exit'() {
        const total = exportNodes.reduce((sum, entry) => sum + entry.count, 0);

        if (total <= 1) {
          return;
        }

        let seenExports = 0;
        for (const entry of exportNodes) {
          const nextSeen = seenExports + entry.count;
          if (nextSeen > 1) {
            context.report({
              node: entry.node,
              messageId: 'tooManyExports',
              data: { total: String(total) },
            });
          }
          seenExports = nextSeen;
        }
      },
    };
  },
};

module.exports = oneExportPerFileRule;
