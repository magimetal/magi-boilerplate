# WEB KNOWLEDGE BASE

## OVERVIEW

`apps/web` is an Angular 21 standalone app using Tailwind CSS v4 and Vitest via Angular test tooling.

## WHERE TO LOOK

| Task                        | Location                                  | Notes                                                     |
| --------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| Bootstrap app startup       | `src/main.ts`                             | Uses `bootstrapApplication(AppComponent, appConfig)`      |
| Root component markup/logic | `src/app/app.html`, `src/app/app.ts`      | Shell UI and component definition                         |
| App-wide providers          | `src/app/app.config.ts`                   | Global providers for bootstrap                            |
| Tailwind setup              | `src/styles.css`                          | CSS-first config via `@import 'tailwindcss';`             |
| Unit test setup             | `src/setup-vitest.ts`, `vitest.config.ts` | jsdom + Angular testing module init                       |
| Angular build/test wiring   | `angular.json`                            | `@angular/build:application` + `@angular/build:unit-test` |

## CONVENTIONS

- Keep Angular standalone pattern (`standalone: true`, no NgModule scaffolding).
- Root component files use CLI v21 naming (`app.ts`, `app.html`, `app.css`).
- Keep tests as `*.spec.ts` in this app; Vitest include pattern depends on that.
- Use Tailwind v4 CSS-first approach; avoid reintroducing Tailwind v3 config file patterns.
- Keep lint config as `eslint.config.cjs` because package is ESM (`"type": "module"`).

## ANTI-PATTERNS

- Do not convert app tests to `*.test.ts`; web runner currently targets `src/**/*.spec.ts`.
- Do not add legacy Angular template syntax where modern control flow is expected in new work.
- Do not hardcode API URLs directly in components; centralize once API client layer is introduced.
- Do not remove `src/setup-vitest.ts`; Angular testing environment init depends on it.

## COMMANDS

```bash
pnpm --filter web dev
pnpm --filter web lint
pnpm --filter web test
pnpm --filter web build
```
