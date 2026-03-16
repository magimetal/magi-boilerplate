import type { Rule } from 'eslint';

declare const plugin: {
  rules: {
    'one-export-per-file': Rule.RuleModule;
    'max-file-lines': Rule.RuleModule;
  };
};

export = plugin;
