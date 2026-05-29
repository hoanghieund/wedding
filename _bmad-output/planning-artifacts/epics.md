---
workflowType: 'epics'
project_name: 'wedding'
status: 'complete'
last_updated: '2026-05-29'
---

# wedding - Final Epic Breakdown

## Epic 1: Application Foundation

Status: done

- Initialize the Next.js 16 application with TypeScript, Tailwind CSS, ESLint, and App Router.
- Configure deployment-ready scripts and project structure.
- Keep environment examples limited to real runtime needs.
- Remove obsolete Prisma/database setup from the final codebase.

## Epic 2: Public Wedding Experience

Status: done

- Build the single-page wedding invitation shell.
- Add hero, event details, schedule, venue, contact, FAQ, calendar, travel, wedding party, love story, gift, and floating control sections.
- Add cinematic dark/neon styling, music controls, countdown, particle effects, and responsive mobile behavior.
- Add metadata, Open Graph image, sitemap, and robots support.

## Epic 3: Gallery and RSVP

Status: done

- Discover gallery images from `public/images/gallery/<category>/`.
- Render the gallery teaser without hardcoded image lists.
- Validate RSVP payloads on the server.
- Append valid RSVP submissions to Google Sheets.
- Show clear RSVP confirmation and error states.
- Document Google Sheets setup in `docs/google-sheets-rsvp.md`.

## Removed Scope

The completed project does not include:

- Prisma or database persistence.
- Database migrations or `src/lib/db`.
- Protected admin routes.
- Admin dashboard, login, logout, or RSVP table management.

These items should not be treated as unfinished backlog for the current project.
