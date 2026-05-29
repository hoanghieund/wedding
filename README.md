# Wedding Website

A completed Next.js 16 wedding website for Hoang Hieu and Kim Lien. The site is a public, mobile-first invitation experience with cinematic sections, gallery content, venue details, schedule, gift information, FAQ, contact actions, music controls, and RSVP collection through Google Sheets.

## Getting Started

Install dependencies and start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/` - App Router pages, API routes, metadata, sitemap, and robots config.
- `src/components/sections/` - guest-facing wedding sections rendered by `src/app/page.tsx`.
- `src/components/ui/` - shared UI primitives used by sections.
- `src/lib/` - constants, RSVP validation/formatting, gallery discovery, Google Sheets integration, and date/calendar helpers.
- `public/images/` - hero, gallery, venue, and Open Graph images.
- `public/audio/` - wedding background music.
- `docs/` - setup notes and current implementation documentation.

## Commands

```bash
npm run dev        # Start local development server
npm test           # Run Vitest tests
npm run lint       # Run ESLint
npx tsc --noEmit   # Type-check without output
npm run build      # Build production app
```

## RSVP Configuration

RSVP submissions are appended to Google Sheets through `src/app/api/rsvp/route.ts`. Configure these variables in `.env.local` and Vercel:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_SHEET_NAME=RSVP
```

See `docs/google-sheets-rsvp.md` for the sheet schema and smoke test.

## Current Scope

The production scope is complete as a public wedding site with Google Sheets-backed RSVP. The project intentionally does not include a database layer, Prisma schema, admin dashboard, or protected admin authentication.
