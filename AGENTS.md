# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 wedding site using the App Router. Main routes and metadata live in `src/app/`. Reusable UI is split between `src/components/sections/` for page sections, `src/components/ui/` for shared primitives, and `src/components/seo/` for structured data. Business logic and utilities live in `src/lib/`, including RSVP validation in `src/lib/rsvp.ts`, Google Sheets integration in `src/lib/google-sheets.ts`, constants in `src/lib/constants/`, and formatters in `src/lib/formatters/`. Tests are colocated beside source as `*.test.ts`. Static assets live in `public/`, especially `public/images/` and `public/audio/`. Project notes and UI docs live in `docs/`.

## Build, Test, and Development Commands

- `npm run dev` starts the local Next.js dev server.
- `npm test` runs the Vitest test suite.
- `npm run lint` runs ESLint with the Next.js config.
- `npx tsc --noEmit` checks TypeScript without writing output.
- `npm run build` creates a production build and must pass before release.

When operating through Codex in this workspace, prefix shell commands with `rtk`, for example `rtk npm test`.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and Tailwind CSS v4 utility classes. Keep code simple and module-local unless a shared helper is already established. Use `PascalCase` for component files and component names, `camelCase` for variables/functions, and kebab-case only for route or document slugs. Prefer named exports for utilities and default exports only where the framework expects them.

## Testing Guidelines

Vitest is the test framework. Name tests `*.test.ts` and colocate them near the unit under test, such as `src/lib/rsvp.test.ts` or `src/app/api/rsvp/route.test.ts`. Add focused tests for validation, API behavior, and data formatting changes. Run `npm test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` before handing off.

## Security & Configuration Tips

Do not commit real secrets. Local configuration belongs in `.env.local`; examples belong in `.env.example`. RSVP persistence currently uses Google Sheets, so required variables are `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID`, and optional `GOOGLE_SHEETS_SHEET_NAME`.

## Commit & Pull Request Guidelines

Use concise English commit messages with a conventional prefix, for example `fix: increase gallery mobile controls` or `chore: update docs`. Pull requests should include a short summary, verification commands run, linked issue or context, and screenshots for visible UI changes.
