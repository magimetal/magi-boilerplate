# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- `apps/api/README.md` with API-specific run commands, structure map, `PORT` behavior, and response-envelope guidance.
- Fork checklist in `README.md` covering repository setup, identity updates, env/cors configuration, and baseline validation commands.
- `packages/AGENTS.md` knowledge base describing shared package responsibilities, conventions, and anti-patterns.
- `@magi-boilerplate/eslint-plugin` workspace package with custom `one-export-per-file` and `max-file-lines` rules, plus RuleTester/Vitest coverage for both rules.
- Repo-level OpenCode skill at `.agents/skills/eslint-plugins/SKILL.md` documenting the standard workflow for adding and wiring custom ESLint rules.

### Changed

- Rewrote root `README.md` as a concise workspace operations guide with current layout, scripts, environment defaults, and monorepo conventions.
- Replaced Angular CLI boilerplate in `apps/web/README.md` with workspace-specific web app commands, structure, and test-pattern guidance.
- Repositioned repository documentation (`README.md`, `AGENTS.md`) to describe `magi-boilerplate` as a forkable new-app boilerplate.
- Renamed project/package references from `threadspace`/`@threadspace/*` to `magi-boilerplate`/`@magi-boilerplate/*` across workspace metadata and docs.
- Refreshed root and app-level `AGENTS.md` files (`AGENTS.md`, `apps/api/AGENTS.md`, `apps/web/AGENTS.md`) with current architecture maps, conventions, and command guidance.
- Root `test` orchestration now runs `@magi-boilerplate/eslint-plugin` tests, and `@magi-boilerplate/config-eslint` now registers shared custom rules with defaults (`one-export-per-file` error, `max-file-lines` warn at 500 lines).
