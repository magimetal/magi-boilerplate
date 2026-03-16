// @ts-check
'use strict';

const oneExportPerFileRule = require('./src/rules/one-export-per-file.cjs');
const maxFileLinesRule = require('./src/rules/max-file-lines.cjs');

const plugin = {
  rules: {
    'one-export-per-file': oneExportPerFileRule,
    'max-file-lines': maxFileLinesRule,
  },
};

module.exports = plugin;
