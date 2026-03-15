# magi-boilerplate

`magi-boilerplate` is a forkable full-stack starter monorepo for quickly launching a new app with a modern TypeScript stack.

## What this boilerplate gives you

- **Frontend:** Angular 21 + Tailwind CSS v4 (`apps/web`)
- **Backend:** Bun + Hono + AI SDK (`apps/api`)
- **Shared contracts:** Zod schemas/types (`packages/shared`)
- **Shared API helpers:** normalized JSON response helpers (`packages/utils`)
- **Shared tooling configs:** ESLint v9 and Prettier v3 (`packages/config-*`)

## Recommended first steps after forking

1. Rename app/package metadata for your project (if needed).
2. Update branding in `apps/web/src/app/app.html` and any docs.
3. Adjust CORS and environment defaults for your deployment targets.
4. Add your first feature through shared contracts first (`packages/shared`).

## Fork checklist (copy/paste)

- [ ] Rename GitHub repo and set remote URL:
  - `git remote set-url origin git@github.com:<you>/<your-repo>.git`
- [ ] Run automated rename script for project/package identity:
  - `pnpm rename:project --name <your-project-name> --scope @<your-scope>`
  - Example: `pnpm rename:project --name acme-app --scope @acme`
  - Preview without writing files: `pnpm rename:project --name acme-app --scope @acme --dry-run`
- [ ] Review and tweak branding text that should remain human-friendly:
  - `apps/web/src/app/app.html`
  - `README.md`
  - `AGENTS.md`
- [ ] Configure runtime environment values used by your app (API keys, DB URLs, auth secrets).
- [ ] Update backend CORS origin(s) for your web URL(s) in `apps/api/src/app.ts`.
- [ ] Add your first shared contracts in `packages/shared/src/schemas/index.ts` before wiring API/frontend features.
- [ ] Validate baseline before feature work:
  - `pnpm install`
  - `pnpm lint`
  - `pnpm test`
  - `pnpm build`
- [ ] Set up CI/CD and required repository secrets/variables.

## Stack (current defaults)

- PNPM workspace (`pnpm@10`)
- Bun runtime (`@types/bun@1.3.10`)
- Angular `21.2.x`
- Hono `4.12.x`
- AI SDK `6.0.x`
- Zod `4.3.x`
- Vitest `4.0.x` (backend + frontend)
- ESLint v9 (shared flat config)
- Prettier v3 (shared config)

## Workspace layout

```text
.
├── apps/
│   ├── api/                 # Bun + Hono backend
│   └── web/                 # Angular frontend
├── packages/
│   ├── config-eslint/       # Shared ESLint v9 config
│   ├── config-prettier/     # Shared Prettier config
│   ├── shared/              # Shared Zod schemas/types
│   └── utils/               # Shared backend response helpers
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Prerequisites

- Node.js `>=20` (workspace tooling)
- PNPM `>=10`
- Bun `>=1.3`

## Setup

```bash
pnpm install
```

## Run locally

Run each app in its own terminal:

```bash
# Terminal 1: API (http://localhost:3000)
pnpm dev:api

# Terminal 2: Web (http://localhost:4200)
pnpm dev:web
```

### Health check

```bash
curl http://localhost:3000/health
```

Expected shape:

```json
{
  "ok": true,
  "data": {
    "status": "ok",
    "uptime": 12.34
  }
}
```

## Common commands

From repo root:

- `pnpm lint` — run ESLint across the workspace
- `pnpm test` — build shared packages, then run API + web tests
- `pnpm build` — build all workspace packages/apps
- `pnpm format` — format all files with Prettier
- `pnpm format:check` — check formatting only

Targeted commands:

- `pnpm --filter api dev|test|build|lint`
- `pnpm --filter web dev|test|build|lint`
- `pnpm --filter @magi-boilerplate/shared build`
- `pnpm --filter @magi-boilerplate/utils build`

## Boilerplate conventions

- API handlers should return normalized envelopes via `jsonOk` / `jsonError`.
- Shared request/response contracts belong in `@magi-boilerplate/shared`.
- Backend CORS default allows local web dev origin: `http://localhost:4200`.

## Notes

- This repo is intentionally generic and designed to be forked.
- Keep cross-app contracts centralized to avoid frontend/backend drift.
