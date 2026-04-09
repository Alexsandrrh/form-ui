# Repository Guidelines

## Project Structure & Module Organization
This repository is a Bun + TypeScript package focused on Form UI schemas.

- Source code lives in `src/`.
- Public API entrypoint is `src/index.ts` (re-exporting from `src/schemas/index.ts`).
- Schema modules live in `src/schemas/`.
- Tests live in `src/schemas/__tests__/` (for example `src/schemas/__tests__/form-ui-input-field.test.ts`).
- Usage examples live in `use-cases/` (for example `use-cases/reports.ts`).
- Root tooling files: `package.json`, `tsconfig.json`, `bun.lock`.

### Current Schema Layout
- Files in `src/schemas/` use the `form-ui-` prefix (for example `form-ui-input-field.ts`).
- Each schema file should export:
  - `...Schema` with `meta({ id, description })`
  - matching type `...` via `z.infer<typeof ...Schema>`
- Field-level validation schemas are defined in dedicated modules:
  - file pattern: `form-ui-*-field-validation.ts`
  - export pattern: `...FieldValidationSchema` and matching `...FieldValidation` type
- Common reusable validation rules live in `src/schemas/form-ui-validation-rules.ts`.
- `src/schemas/index.ts` is the schema barrel; keep it in sync when adding/removing schema modules.

### Field Model Rules
- `FormUIBaseFieldSchema` contains only common field properties: `name`, `label` (no `validation` on base schema).
- `placeholder` is **not** global:
  - required for `input`
  - required for `select`
  - not used for `checkbox` / `switch`
- `select` supports `multiple: boolean` (default `false`) for both sync and async variants.
- `checkbox` and `switch` include `checked: boolean` (default `false`).
- Validation rules are field-specific and must reject unsupported keys:
  - `input`: `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`
  - `select`: `required`, `minLength`, `maxLength`
  - `checkbox`: `required`
  - `switch`: `required`
  - `radio-group`: `required`
  - `checkbox-group`: `required`, `minLength`, `maxLength`

## Build, Test, and Development Commands
Use Bun for all local workflows.

- `bun install`: install dependencies from `package.json`.
- `bun run src/index.ts`: run the current entrypoint locally.
- `bun test`: run the test suite. Add tests before relying on this in CI.
- `bunx tsc --noEmit`: run a strict TypeScript type check using the project config.

If a `scripts` section is added later, prefer `bun run <script>` over `npm run`.

## Coding Style & Naming Conventions
Write TypeScript with strict typing and ES module syntax.

- Keep formatting consistent with the codebase: double quotes, semicolons.
- For schema files, use naming pattern `form-ui-*.ts`.
- Exported schema/type names use `PascalCase` with `FormUI` prefix.
- Functions and variables use `camelCase`.
- For schema metadata, prefer Russian `description` text to match existing files.

## Testing Guidelines
Use Bun’s built-in test runner via `bun:test`. Prefer fast unit tests and keep them close to the code they verify, for example `src/form-parser.test.ts`. Cover new behavior and edge cases before opening a PR. Until coverage tooling is added, treat meaningful coverage of changed code as the baseline expectation.

When changing schema contracts:
- update/add tests in `src/schemas/__tests__/` (one test module per schema file)
- include strict-behavior checks for `validation` (unsupported keys must fail)
- update examples in `use-cases/` if affected
- run both `bun test` and `bunx tsc --noEmit`

## Commit & Pull Request Guidelines
Use [Conventional Commits](https://www.conventionalcommits.org/) for all commits.

- Commit format: `type(scope): описание`
- Conventional types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- The commit description (after `:`) must be in Russian and action-oriented.
- Example: `feat(schemas): добавить поле multiple для select`
- Avoid mixed-purpose commits.

Pull requests should include a clear summary, testing notes (`bun test`, `bunx tsc --noEmit`), and screenshots or terminal output when behavior changes are visible.

## Environment & Tooling Notes
This repo is Bun-first. Prefer Bun APIs and commands over Node.js-specific alternatives. TypeScript is configured with `strict`, `noUncheckedIndexedAccess`, and `noImplicitOverride`; keep new code compatible with those checks.
