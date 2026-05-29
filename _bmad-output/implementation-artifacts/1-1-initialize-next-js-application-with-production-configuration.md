# Story 1.1: Initialize Next.js Application with Production Configuration

Status: done

Last updated: 2026-05-29

## Final Outcome

The project is a Next.js 16 App Router application using TypeScript, React 19, Tailwind CSS v4, ESLint, and Vitest.

## Current Structure

- `src/app/` - public page, API route, metadata image, sitemap, and robots config.
- `src/components/sections/` - guest-facing wedding page sections.
- `src/components/ui/` - shared UI components.
- `src/lib/` - constants, RSVP logic, Google Sheets integration, gallery discovery, and formatters.
- `public/` - images and audio assets.
- `docs/` - setup and current-state documentation.

## Verification

Use:

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```
