---
name: eslint-plugins
description: Add or extend custom ESLint plugins/rules in this monorepo, including wiring through @magi-boilerplate/config-eslint and validating rule behavior with package-level tests.
compatibility: opencode
metadata:
  scope: linting
  audience: maintainers
---

## What I do

- Add new in-repo lint rules to `packages/eslint-plugin`.
- Wire custom rules/plugins into the shared flat config at `packages/config-eslint/index.cjs`.
- Keep CommonJS + declaration exports aligned (`index.cjs` + `index.d.cts`).
- Verify changes with the same commands this repo uses in normal workflows.

## When to use me

Use this when you need to:

- add a new custom rule to `@magi-boilerplate/eslint-plugin`
- enable/adjust custom rule defaults in `@magi-boilerplate/config-eslint`
- add another ESLint plugin dependency into the shared config package

## Repo map (lint plugin architecture)

- Plugin package: `packages/eslint-plugin/`
  - Rule implementations: `src/rules/*.cjs`
  - Rule tests: `src/rules/*.test.js` (ESLint `RuleTester` + Vitest runner)
  - Plugin entry: `index.cjs` (`rules` object)
  - Types: `index.d.cts`
- Shared config package: `packages/config-eslint/`
  - Flat config export: `index.cjs`
  - Types: `index.d.cts`
  - Depends on `@magi-boilerplate/eslint-plugin`
- Consumers: root `eslint.config.cjs`, `apps/api/eslint.config.cjs`, `apps/web/eslint.config.cjs` spread `...base` from `@magi-boilerplate/config-eslint`

## Required constraints

- Keep config/plugin packages CommonJS (`type: commonjs`, `.cjs` runtime files).
- Keep declaration files as `.d.cts` and exported in `package.json` `exports` with both `types` and `default`.
- Prefer adding rules to `packages/eslint-plugin` rather than duplicating one-off logic in app-level ESLint configs.
- Keep rule names stable and kebab-case (example: `max-file-lines`).

Why this matters: all apps and root linting consume the shared config package; drift in module format or exports breaks linting across the workspace.

## Standard workflow

1. **Create/modify rule implementation** in `packages/eslint-plugin/src/rules/<rule-name>.cjs`.
2. **Add/extend tests** in `packages/eslint-plugin/src/rules/<rule-name>.test.js` with both `valid` and `invalid` cases.
3. **Register rule** in `packages/eslint-plugin/index.cjs` under `plugin.rules`.
4. **Update plugin types** in `packages/eslint-plugin/index.d.cts` with the new rule key.
5. **Enable rule in shared config** at `packages/config-eslint/index.cjs` under the `@magi-boilerplate` plugin block.
6. **If adding a non-local plugin dependency**, add it to `packages/config-eslint/package.json` and register it in `plugins` before using its rules.
7. **Verify** with commands below.

## Rule authoring pattern (existing convention)

- Export rule module via `module.exports = <ruleObject>`.
- Include:
  - `meta.type`
  - `meta.docs.description`
  - `meta.schema` for options
  - `meta.messages` for report strings
  - `create(context)` visitor + `context.report(...)`
- For filename-based exceptions, follow current allowlist pattern (`allow` regex strings + auto-allow `index.*` where applicable).

## Verification commands

Run these from repo root after changes:

```bash
pnpm --filter @magi-boilerplate/eslint-plugin lint
pnpm --filter @magi-boilerplate/eslint-plugin test
pnpm lint
```

Use `pnpm test` when you need full workspace confidence (root script already includes eslint-plugin tests plus app tests).

## Scaling guidance

- Keep one rule per file under `src/rules/`.
- Keep one test file per rule with focused fixtures.
- Keep plugin entry (`index.cjs`) as a thin registry only.
- Keep shared defaults in `packages/config-eslint/index.cjs`; avoid app-specific custom rule wiring unless behavior truly diverges.

## Completion signal

Consider work complete when:

- new/updated rule is registered in plugin entry
- shared config references intended rule severity/options
- rule tests pass in `packages/eslint-plugin`
- workspace lint passes without module/export regressions
