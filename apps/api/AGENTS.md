# API KNOWLEDGE BASE

## OVERVIEW

`apps/api` is a Bun-targeted Hono service with Vitest node tests.

## WHERE TO LOOK

| Task                      | Location           | Notes                                                               |
| ------------------------- | ------------------ | ------------------------------------------------------------------- |
| Add middleware/route      | `src/app.ts`       | Composition root currently owns logger, CORS, `/health`, `notFound` |
| Change runtime options    | `src/index.ts`     | Bun default export (`port`, `fetch`, `idleTimeout`)                 |
| Update API test behavior  | `src/app.test.ts`  | Uses `app.request(...)` and Vitest in node env                      |
| Change test runner config | `vitest.config.ts` | Includes `src/**/*.test.ts` only                                    |

## CONVENTIONS

- Keep handlers returning envelope helpers from `@magi-boilerplate/utils` (`jsonOk`, `jsonError`).
- Validate response shape with shared schema from `@magi-boilerplate/shared` where relevant.
- Keep route imports relative with `.js` extension in TS source (`./app.js`).
- Use Bun runtime commands in package scripts (`bun run --hot`, `bun build`).
- Keep CORS origin aligned to frontend dev URL (`http://localhost:4200`).

## ANTI-PATTERNS

- Do not switch to direct `c.json(...)` responses for normal success/error paths.
- Do not move routes into `src/index.ts`; keep app composition in `src/app.ts`.
- Do not add browser-specific assumptions to API tests (this suite is node-only).
- Do not rename tests to `*.spec.ts` in this app; API convention is `*.test.ts`.

## COMMANDS

```bash
pnpm --filter api dev
pnpm --filter api lint
pnpm --filter api test
pnpm --filter api build
```
