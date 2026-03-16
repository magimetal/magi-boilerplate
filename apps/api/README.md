# api

Bun + Hono API app in the monorepo.

## Run from workspace root

```bash
pnpm dev:api
```

API URL: `http://localhost:3000`

You can also run both apps together from root with:

```bash
pnpm dev
```

## Package-level scripts

From `apps/api`:

```bash
pnpm dev
pnpm build
pnpm start
pnpm test
pnpm lint
```

Equivalent root-filtered commands:

```bash
pnpm --filter api dev
pnpm --filter api build
pnpm --filter api start
pnpm --filter api test
pnpm --filter api lint
```

## App structure

- `src/app.ts` — Hono routes and middleware (`/health`, logger, CORS, `notFound`)
- `src/index.ts` — Bun runtime export (`port`, `fetch`, `idleTimeout`) and `PORT` parsing
- `src/app.test.ts` — route/envelope tests
- `src/index.test.ts` — runtime `PORT` behavior tests
- `vitest.config.ts` — API test runner config (`node` env, `src/**/*.test.ts`)

## Environment variable

- `PORT` (optional): parsed in `src/index.ts`
  - Default: `3000`
  - Valid range: integer `0..65535`
  - Missing/blank/invalid values fall back to `3000`

## Response envelope convention

Use `jsonOk` / `jsonError` from `@magi-boilerplate/utils` for API responses:

```json
{ "ok": true, "data": { "...": "..." } }
```

```json
{ "ok": false, "error": { "code": "...", "message": "..." } }
```

`GET /health` validates payload shape with `HealthResponseSchema` from `@magi-boilerplate/shared`.

## Notes

- Keep API tests as `*.test.ts` (web uses `*.spec.ts`).
- Keep relative TS imports with runtime `.js` suffixes (example: `import { app } from './app.js'`).
- Default local CORS origin is `http://localhost:4200`.
