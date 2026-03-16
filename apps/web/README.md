# web

Angular 21 standalone frontend app in the monorepo.

## Run from workspace root

```bash
pnpm dev:web
```

App URL: `http://localhost:4200`

You can also run both apps together from root with:

```bash
pnpm dev
```

## Package-level scripts

From `apps/web`:

```bash
pnpm dev
pnpm build
pnpm test
pnpm lint
```

Equivalent root-filtered commands:

```bash
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web test
pnpm --filter web lint
```

## App structure

- `src/main.ts` — bootstrap entry
- `src/app/app.ts` — root standalone component
- `src/app/app.html` — root template
- `src/app/app.config.ts` — app-wide providers
- `src/setup-vitest.ts` — Angular test environment setup

## Testing conventions

- Vitest entry point is `vitest.config.ts` (which imports `sharedVitestConfig` from `vitest.shared.ts`).
- Test pattern is `src/**/*.spec.ts` (set in `vitest.shared.ts`).
- Do not rename web tests to `*.test.ts` (that pattern is reserved for `apps/api`).

## Notes

- Tailwind uses v4 CSS-first setup.
- Keep monorepo contract usage through `@magi-boilerplate/shared` for API-bound data.
