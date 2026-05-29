---
workflowType: 'architecture'
project_name: 'wedding'
status: 'complete'
last_updated: '2026-05-29'
---

# Architecture Decision Document

## Current Architecture

The application is a Next.js 16 App Router site deployed as a mostly static public wedding experience with one dynamic RSVP API route.

## Runtime Stack

- Next.js 16.2.4 with React 19 and TypeScript.
- Tailwind CSS v4 for styling.
- Vitest for unit/API tests.
- Google Sheets API for RSVP export.
- Vercel-compatible environment configuration.

## Source Layout

- `src/app/` contains the page, metadata routes, sitemap, robots config, and `/api/rsvp`.
- `src/components/sections/` contains the page sections rendered by `src/app/page.tsx`.
- `src/components/ui/` contains shared visual primitives.
- `src/lib/constants/event-data.ts` is the main source for event copy, labels, RSVP rules, and sheet metadata.
- `src/lib/rsvp.ts` validates RSVP payloads and formats sheet rows.
- `src/lib/google-sheets.ts` authenticates with Google Sheets and appends RSVP rows.
- `src/lib/gallery-data.ts` and `GalleryProvider.tsx` discover gallery images from `public/images/gallery/`.

## RSVP Flow

1. Guest submits the RSVP UI.
2. `src/app/api/rsvp/route.ts` parses JSON and validates it with `validateRsvpPayload`.
3. Valid submissions are appended to Google Sheets through `appendRsvpSubmissionToSheet`.
4. The API returns `{ ok: true }` or a structured error response.

## Removed Scope

The final architecture does not include Prisma, database migrations, a DB client, protected admin routes, admin authentication, or an admin dashboard. Those were earlier planning assumptions and are no longer part of the implemented project.

## Security Notes

Google Sheets credentials must be stored in `.env.local` and Vercel environment variables. They must never be exposed to client components or committed to source control.
