# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-15
**Purpose:** Forkable new-app boilerplate baseline

## OVERVIEW

`magi-boilerplate` is a starter PNPM monorepo intended to be **forked** and adapted into new products.

- Frontend: Angular (`apps/web`)
- Backend: Bun + Hono (`apps/api`)
- Shared contracts/helpers: `packages/shared`, `packages/utils`

Treat this repository as a template foundation, not a fixed product domain.

## TEMPLATE INTENT (IMPORTANT)

- Prefer generic, reusable implementations over product-specific naming.
- Keep cross-app contracts centralized in `packages/shared`.
- Keep API responses normalized via shared helpers.
- If domain-specific complexity is introduced, isolate it in feature folders and update this file.

## STRUCTURE

```text
magi-boilerplate/
├── apps/
│   ├── api/               # Bun runtime API, Hono routes, Vitest node tests
│   └── web/               # Angular app, Tailwind, Vitest/jsdom
├── packages/
│   ├── shared/            # Zod schemas and shared types
│   ├── utils/             # HTTP JSON response helpers used by API
│   ├── config-eslint/     # Workspace ESLint flat config
│   └── config-prettier/   # Workspace Prettier config
├── eslint.config.cjs
├── .prettierrc.cjs
├── tsconfig.base.json
└── pnpm-workspace.yaml
```

## WHERE TO LOOK

| Task                           | Location                               | Notes                                               |
| ------------------------------ | -------------------------------------- | --------------------------------------------------- |
| Add API route                  | `apps/api/src/app.ts`                  | Route handlers should use `jsonOk/jsonError`        |
| API runtime wiring             | `apps/api/src/index.ts`                | Bun default export (`port`, `fetch`, `idleTimeout`) |
| Add frontend view              | `apps/web/src/app/`                    | Root component is `app.ts` + `app.html`             |
| Shared request/response schema | `packages/shared/src/schemas/index.ts` | Zod source of truth                                 |
| Shared API response helpers    | `packages/utils/src/http/`             | `jsonOk` / `jsonError`                              |
| Lint rules                     | `packages/config-eslint/index.cjs`     | Imported by root + app-level eslint configs         |
| Format rules                   | `packages/config-prettier/index.cjs`   | Root `.prettierrc.cjs` re-exports this              |

## CODE MAP

| Symbol                 | Type                         | Location                               | Role                   |
| ---------------------- | ---------------------------- | -------------------------------------- | ---------------------- |
| `app`                  | Hono instance                | `apps/api/src/app.ts`                  | API composition root   |
| `HealthResponseSchema` | Zod schema                   | `packages/shared/src/schemas/index.ts` | Shared health contract |
| `jsonOk` / `jsonError` | helper functions             | `packages/utils/src/http/*`            | Standard API envelope  |
| `AppComponent`         | Angular standalone component | `apps/web/src/app/app.ts`              | Frontend shell         |

## CONVENTIONS

- Package manager is PNPM (`pnpm-workspace.yaml`, root `packageManager` pin).
- Backend runtime is Bun; API scripts use `bun run` / `bun build`.
- API envelope is `{ ok: true, data }` or `{ ok: false, error }`.
- API and shared packages use ESM with `.js` extensions in relative TS imports.
- ESLint configs in `apps/*` are `.cjs` because those package.json files are `"type": "module"`.
- Config packages exporting CommonJS (`.cjs`) also publish `.d.cts` declarations.
- For typed config packages, `exports` must include both `types` and runtime `default`.
- Prefer flat config arrays over deprecated `tseslint.config(...)` helper.
- Test split is intentional: `apps/api` uses `src/**/*.test.ts`; `apps/web` uses `src/**/*.spec.ts`.

## ANTI-PATTERNS

- Do not return raw `c.json(...)` payloads when `jsonOk/jsonError` should be used.
- Do not define duplicated contracts separately in frontend/backend.
- Do not move API CORS origin without updating frontend local origin expectations.
- Do not bypass workspace scripts with ad-hoc package manager commands.
- Do not publish or reference `.cjs` config entrypoints without matching `.d.cts` declarations.
- Do not use string-only `exports` for typed config packages.
- Do not introduce new `tseslint.config(...)` usage.

## TEMPLATE GUARDRAILS (ALWAYS / NEVER)

### ALWAYS

- Keep starter defaults stable and generic unless explicitly asked to specialize.
- Update docs and contracts together when changing API shapes.
- Validate tooling/config package changes with runtime + type checks (`pnpm lint` and targeted checks).

### NEVER

- Never leave AGENTS paths stale after config or package renames.
- Never rely on `index.d.ts` for `.cjs` entrypoints; use `index.d.cts`.
- Never hardcode project-specific business assumptions in shared boilerplate code.

## UNIQUE STYLES

- Angular root files follow CLI v21 naming (`app.ts`, `app.html`).
- Root `pnpm test` builds shared packages before app tests.
- `.npmrc` sets `strict-peer-dependencies=false` and `auto-install-peers=true` for smoother bootstrap installs.

## COMMANDS

```bash
pnpm install
pnpm dev:api
pnpm dev:web
pnpm lint
pnpm test
pnpm build
pnpm --filter api test
pnpm --filter web test
```

## NOTES

- API dev URL: `http://localhost:3000`
- Frontend dev URL: `http://localhost:4200`
- Add child `AGENTS.md` files only where behavior diverges from this root baseline.
