# API KNOWLEDGE BASE

## OVERVIEW

`apps/api` is a Bun-targeted Hono service; `src/app.ts` owns HTTP behavior, `src/index.ts` owns Bun runtime wiring.

## WHERE TO LOOK

| Task                             | Location            | Notes                                                      |
| -------------------------------- | ------------------- | ---------------------------------------------------------- |
| Add routes/middleware            | `src/app.ts`        | Logger + CORS + `/health` + notFound are defined here      |
| Adjust runtime startup           | `src/index.ts`      | Exports Bun handler object and validated `PORT` parsing    |
| Update route contract assertions | `src/app.test.ts`   | Validates health envelope and standardized 404 envelope    |
| Update runtime env tests         | `src/index.test.ts` | Covers fallback/default behavior for invalid `PORT` values |
| Change test include globs        | `vitest.config.ts`  | Node env + `src/**/*.test.ts`                              |

## CONVENTIONS

- Keep API response envelopes via `jsonOk` / `jsonError` from `@magi-boilerplate/utils`.
- Validate API payload shape against shared schema (`@magi-boilerplate/shared`) when route output is contract-bound.
- Keep `.js` suffix in relative TS imports (`./app.js`) for runtime-compatible ESM output.
- Keep CORS origin aligned with local web default (`http://localhost:4200`) unless changed intentionally across apps.
- Keep tests in `*.test.ts` (do not mix with web `*.spec.ts` pattern).

## ANTI-PATTERNS

- Returning direct `c.json(...)` objects for normal success/error flows.
- Moving route composition into `src/index.ts`.
- Introducing browser-only assumptions in API Vitest suite (`environment: 'node'`).
- Accepting arbitrary `PORT` values without retaining integer/range guardrails.

## COMMANDS

```bash
pnpm --filter api dev
pnpm --filter api lint
pnpm --filter api test
pnpm --filter api build
```
