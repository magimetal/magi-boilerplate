# PACKAGES KNOWLEDGE BASE

## OVERVIEW

`packages/` contains cross-app contracts (`shared`), HTTP envelope helpers (`utils`), and workspace-shared tooling configs (`config-eslint`, `config-prettier`).

## WHERE TO LOOK

| Task                             | Location                         | Notes                                          |
| -------------------------------- | -------------------------------- | ---------------------------------------------- |
| Add/modify shared API contract   | `shared/src/schemas/index.ts`    | Zod schemas exported via `shared/src/index.ts` |
| Add reusable API envelope helper | `utils/src/http/*.ts`            | Re-exported through `utils/src/index.ts`       |
| Change ESLint defaults           | `config-eslint/index.cjs`        | Flat config array used by root + app configs   |
| Change Prettier defaults         | `config-prettier/index.cjs`      | Re-exported by root `.prettierrc.cjs`          |
| Change package export surface    | `*/package.json` in each package | Keep runtime + types entries aligned           |

## CONVENTIONS

- `shared` and `utils` are ESM TypeScript packages with `dist` `import` + `types` exports.
- Config packages are CommonJS and must expose both runtime (`default`) and declaration (`types`) in `exports`.
- Shared contracts live under `shared`; API/web should import contracts, not duplicate them.
- API helper semantics stay stable (`jsonOk` => `{ ok: true, data }`, `jsonError` => `{ ok: false, error }`).

## ANTI-PATTERNS

- Exporting config packages with string-only exports (drops explicit `types` mapping).
- Adding duplicate schema definitions in app code when `shared` already defines them.
- Changing envelope shape in `utils` without updating API route tests that validate response shape.
- Mixing module formats inside a package (`.cjs` runtime with `.d.ts` instead of `.d.cts` in config packages).

## COMMANDS

```bash
pnpm --filter @magi-boilerplate/shared build
pnpm --filter @magi-boilerplate/utils build
pnpm lint
pnpm test
```
