# Story 1.4: Define Project Structure and Module Boundaries

Status: done

Last updated: 2026-05-29

## Final Outcome

The final module boundaries reflect the implemented public wedding site, not the earlier database/admin plan.

## Active Boundaries

- `src/app/` owns App Router entrypoints, metadata routes, and `/api/rsvp`.
- `src/components/sections/` owns guest-facing page sections.
- `src/components/ui/` owns shared UI primitives.
- `src/components/seo/` owns structured data rendering.
- `src/hooks/` owns client hooks.
- `src/lib/constants/` owns event copy and reusable configuration.
- `src/lib/formatters/` owns pure date/calendar formatting.
- `src/lib/rsvp.ts` owns RSVP validation and sheet row formatting.
- `src/lib/google-sheets.ts` owns Google Sheets integration.
- `src/lib/gallery-data.ts` owns gallery discovery helpers.

## Removed Boundaries

The final project does not include placeholder modules for admin screens, auth sessions, database queries, separate forms, validation schemas, or security utilities because no runtime code uses them.
