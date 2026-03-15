# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-15
**Commit:** d3176d9
**Branch:** main

## OVERVIEW

Forkable PNPM monorepo for a TypeScript full-stack starter. Angular web app (`apps/web`) + Bun/Hono API (`apps/api`) with shared contracts/helpers in `packages/*`.

## STRUCTURE

```text
threadspace/
├── apps/
│   ├── api/                  # Bun runtime + Hono service
│   └── web/                  # Angular 21 standalone app
├── packages/
│   ├── shared/               # Zod contracts/types for cross-app use
│   ├── utils/                # API response envelope helpers
│   ├── config-eslint/        # Flat ESLint config package (CJS)
│   └── config-prettier/      # Prettier config package (CJS)
├── scripts/rename-project.mjs
└── pnpm-workspace.yaml
```

## WHERE TO LOOK

| Task                                  | Location                                 | Notes                                                           |
| ------------------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| Add API route/middleware              | `apps/api/src/app.ts`                    | Hono composition root (`/health`, CORS, notFound)               |
| Change Bun runtime behavior           | `apps/api/src/index.ts`                  | Default export consumed by Bun (`port`, `fetch`, `idleTimeout`) |
| Add web UI behavior                   | `apps/web/src/app/`                      | Root shell in `app.ts` + `app.html`                             |
| Update shared contract                | `packages/shared/src/schemas/index.ts`   | Zod source of truth for cross-app payloads                      |
| Update API envelope format            | `packages/utils/src/http/`               | `jsonOk` and `jsonError` helpers                                |
| Change workspace lint/format defaults | `packages/config-*/` + root config files | Shared config packages exported to apps                         |

## CODE MAP

| Symbol                 | Type                         | Location                               | Refs   | Role                       |
| ---------------------- | ---------------------------- | -------------------------------------- | ------ | -------------------------- |
| `app`                  | Hono instance                | `apps/api/src/app.ts`                  | 2      | API composition root       |
| `HealthResponseSchema` | Zod schema                   | `packages/shared/src/schemas/index.ts` | 2      | Health response contract   |
| `jsonOk` / `jsonError` | helper functions             | `packages/utils/src/http/*.ts`         | 1 each | Standard response envelope |
| `AppComponent`         | Angular standalone component | `apps/web/src/app/app.ts`              | 2      | Web bootstrap shell        |

## CONVENTIONS

- Workspace package manager is PNPM (`pnpm@10`, `pnpm-workspace.yaml`).
- API runtime is Bun; API scripts use `bun run` / `bun build`.
- API envelope shape is normalized: `{ ok: true, data }` or `{ ok: false, error }`.
- Relative TS imports in API/shared/utils use runtime `.js` suffixes.
- Test naming is intentionally split by app:
  - API: `src/**/*.test.ts`
  - Web: `src/**/*.spec.ts`
- Shared config packages are CommonJS with typed exports (`index.cjs` + `index.d.cts`).
- ESLint uses flat config arrays; root/apps extend `@magi-boilerplate/config-eslint`.

## ANTI-PATTERNS (THIS PROJECT)

- Returning raw `c.json(...)` from API handlers when envelope helpers should be used.
- Duplicating contracts independently in web/api instead of `packages/shared`.
- Changing API CORS origin without validating local web origin expectations.
- Publishing/declaring CJS config packages without matching `types` + runtime `exports` entries.
- Converging on a single test glob across apps (breaks current toolchain split).

## UNIQUE STYLES

- Boilerplate-first: naming and structure stay generic for forkability.
- Root `pnpm test` builds `@magi-boilerplate/utils` and `@magi-boilerplate/shared` before app tests.
- `.npmrc` favors easier bootstrap (`strict-peer-dependencies=false`, `auto-install-peers=true`).

## COMMANDS

```bash
pnpm install
pnpm dev:api
pnpm dev:web
pnpm lint
pnpm test
pnpm build
pnpm format:check
```

## NOTES

- Local defaults: API `http://localhost:3000`, Web `http://localhost:4200`.
- No `.github/workflows` currently present; CI behavior is not repository-defined yet.
- Add child `AGENTS.md` only where conventions diverge materially.
