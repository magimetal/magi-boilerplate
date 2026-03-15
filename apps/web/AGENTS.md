# WEB KNOWLEDGE BASE

## OVERVIEW

`apps/web` is an Angular 21 standalone app with Tailwind v4; bootstrap, providers, and test wiring are split across `src/main.ts`, `src/app/app.config.ts`, and `src/setup-vitest.ts`.

## WHERE TO LOOK

| Task                          | Location                              | Notes                                                            |
| ----------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| Change app startup            | `src/main.ts`                         | `bootstrapApplication(AppComponent, appConfig)` entry            |
| Edit root UI behavior         | `src/app/app.ts` + `src/app/app.html` | Standalone root component logic and template                     |
| Update global providers       | `src/app/app.config.ts`               | App-level dependency providers                                   |
| Adjust unit test environment  | `src/setup-vitest.ts`                 | Angular test bed initialization for jsdom runs                   |
| Change Vitest include pattern | `vitest.shared.ts`                    | Canonical include is `src/**/*.spec.ts`                          |
| Change build/test builders    | `angular.json`                        | Uses `@angular/build:application` and `@angular/build:unit-test` |

## CONVENTIONS

- Keep standalone component architecture (`standalone: true`, no NgModule scaffolding drift).
- Keep Angular CLI v21 root naming (`app.ts`, `app.html`, `app.css`).
- Keep tests as `*.spec.ts` for this app (shared vitest config depends on it).
- Use Tailwind v4 CSS-first setup (`@import 'tailwindcss';`), avoid legacy Tailwind v3 config assumptions.
- Keep lint config in CJS (`eslint.config.cjs`) because this package is ESM.

## ANTI-PATTERNS

- Renaming web tests to `*.test.ts`.
- Removing `src/setup-vitest.ts` or bypassing Angular test-environment init.
- Hardcoding API base URLs directly in components.
- Reverting to obsolete Angular template patterns when adding new templates.

## COMMANDS

```bash
pnpm --filter web dev
pnpm --filter web lint
pnpm --filter web test
pnpm --filter web build
```
