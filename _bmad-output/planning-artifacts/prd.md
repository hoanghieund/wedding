---
workflowType: 'prd'
project_name: 'wedding'
status: 'complete'
last_updated: '2026-05-29'
---

# Product Requirements Document - wedding

## Current Product Scope

The completed product is a public, mobile-first wedding website for Hoang Hieu and Kim Lien. It presents the wedding invitation, key logistics, event timeline, venue information, gallery, gift details, FAQ, contact actions, and RSVP collection in a single guest-facing experience.

The final implementation intentionally excludes Prisma, a database layer, protected admin pages, and an admin dashboard. RSVP submissions are appended to Google Sheets through a server-side API route.

## Primary Users

- Wedding guests opening the site from a shared link on mobile.
- The couple, who need a simple RSVP collection workflow without running a separate admin system.

## Functional Requirements

- Guests can view the couple names, date, invitation message, schedule, venue, map action, travel notes, gift information, FAQ, and contact details.
- Guests can browse a photo gallery generated from folders under `public/images/gallery/`.
- Guests can submit RSVP responses without creating an account.
- Guests receive a clear success or error state after submitting RSVP.
- RSVP records are appended to Google Sheets with timestamp, guest name, attendance status, attendee count, message, and source.
- The site exposes metadata, Open Graph image support, sitemap, and robots configuration for sharing and deployment.

## Non-Functional Requirements

- The site must remain fast and readable on mobile.
- RSVP credentials must stay server-side and be stored only in environment variables.
- Guest input must be validated on the server before export to Google Sheets.
- Static content should remain easy to update through `src/lib/constants/event-data.ts` and assets under `public/`.

## Completion Status

The MVP product is complete. Remaining work, if any, should be treated as post-MVP enhancement rather than required project scope.
