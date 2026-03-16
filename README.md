# magi-boilerplate

Forkable TypeScript monorepo starter: Angular web app + Bun/Hono API + shared workspace packages.

## What you get

- **Web app:** Angular 21 standalone + Tailwind v4 (`apps/web`)
- **API app:** Bun runtime + Hono (`apps/api`)
- **Shared contracts:** Zod schemas/types (`packages/shared`)
- **Shared HTTP helpers:** standardized API envelopes (`packages/utils`)
- **Shared tooling:** ESLint flat config + Prettier config + custom ESLint plugin (`packages/config-*`, `packages/eslint-plugin`)

> `ai` is installed in `apps/api` dependencies but is not wired into routes yet.

## Workspace layout

```text
.
├── apps/
│   ├── api/                     # Bun + Hono service
│   │   └── src/
│   │       ├── app.ts           # Routes/middleware (/health, CORS, notFound)
│   │       └── index.ts         # Bun runtime wiring + PORT parsing
│   └── web/                     # Angular standalone app
│       └── src/app/
│           ├── app.ts           # Root component
│           └── app.html         # Starter UI shell
├── packages/
│   ├── shared/                  # Shared Zod contracts/types
│   ├── utils/                   # jsonOk/jsonError envelope helpers
│   ├── eslint-plugin/           # Workspace ESLint rule package
│   ├── config-eslint/           # Shared ESLint v9 flat config
│   └── config-prettier/         # Shared Prettier config
├── scripts/
│   └── rename-project.mjs       # Fork rename utility
├── lefthook.yml                 # Pre-commit hook entry
└── pnpm-workspace.yaml
```

## Prerequisites

- Node.js `>=20` (root `engines.node`)
- pnpm `>=10` (root `engines.pnpm`, package manager `pnpm@10.30.0`)
- Bun (required for `apps/api` dev/build/start scripts)

## Quick start

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs API + web together via `concurrently`:

- API: `http://localhost:3000`
- Web: `http://localhost:4200`

Run separately if preferred:

```bash
pnpm dev:api
pnpm dev:web
```

### Health check

```bash
curl http://localhost:3000/health
```

Response envelope:

```json
{
  "ok": true,
  "data": {
    "status": "ok",
    "uptime": 12.34
  }
}
```

## Root scripts

| Script                                               | Purpose                                                                |
| ---------------------------------------------------- | ---------------------------------------------------------------------- |
| `pnpm dev`                                           | Run API + web concurrently                                             |
| `pnpm dev:api`                                       | Run API only                                                           |
| `pnpm dev:web`                                       | Run web only                                                           |
| `pnpm lint`                                          | Lint workspace                                                         |
| `pnpm test`                                          | Build `shared` + `utils`, test ESLint plugin, then run API + web tests |
| `pnpm build`                                         | Build all workspace packages/apps                                      |
| `pnpm knip`                                          | Check for unused files/deps/exports                                    |
| `pnpm format`                                        | Format repo with Prettier                                              |
| `pnpm format:check`                                  | Check formatting                                                       |
| `pnpm precommit:verify`                              | Run lint + format check + tests                                        |
| `pnpm rename:project --name <name> [--scope @scope]` | Rewrite boilerplate name/scope across repo                             |

## Environment variables

Current runtime env handled in repo:

| Variable | Used by                 | Default | Behavior                                                                     |
| -------- | ----------------------- | ------- | ---------------------------------------------------------------------------- |
| `PORT`   | `apps/api/src/index.ts` | `3000`  | Must be an integer in `0..65535`; missing/blank/invalid falls back to `3000` |

No `.env` files are included by default.

## Development conventions

- Keep cross-app API contracts in `@magi-boilerplate/shared`.
- Use `jsonOk` / `jsonError` from `@magi-boilerplate/utils` for API responses.
- API default CORS origin is `http://localhost:4200` (`apps/api/src/app.ts`).
- API relative TS imports use runtime `.js` suffixes (example: `import { app } from './app.js'`).
- Base TypeScript config is strict (`strict`, `noImplicitAny`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc. in `tsconfig.base.json`).

### Test naming split (intentional)

- API tests: `apps/api/src/**/*.test.ts`
- Web tests: `apps/web/src/**/*.spec.ts`

Do not merge these patterns; each app’s Vitest config depends on this split.

## Tooling details

- ESLint is centralized via `@magi-boilerplate/config-eslint`.
- Workspace plugin rules are in `@magi-boilerplate/eslint-plugin`.
- Prettier config is centralized via `@magi-boilerplate/config-prettier`.
- Git hooks are managed by Lefthook (`prepare` installs hooks, `lefthook.yml` runs `pnpm precommit:verify`).
- `.npmrc` defaults are fork-friendly: `strict-peer-dependencies=false`, `auto-install-peers=true`.

## Fork checklist

- [ ] Rename git remote/repo as needed.
- [ ] Rewrite project identity:
  - `pnpm rename:project --name <your-project-name> --scope @<your-scope>`
  - Preview only: `pnpm rename:project --name <name> --scope @<scope> --dry-run`
- [ ] Update starter branding/content:
  - `apps/web/src/app/app.html`
  - `README.md`
  - `AGENTS.md`
- [ ] Update API CORS origin(s) in `apps/api/src/app.ts`.
- [ ] Add first shared contracts in `packages/shared/src/schemas/index.ts` before implementing feature routes/UI.
- [ ] Validate baseline:
  - `pnpm lint`
  - `pnpm format:check`
  - `pnpm test`
  - `pnpm build`

## Design goal

This repo stays intentionally generic for fast forking. Keep shared contracts and conventions centralized so frontend/backend drift is caught early.
