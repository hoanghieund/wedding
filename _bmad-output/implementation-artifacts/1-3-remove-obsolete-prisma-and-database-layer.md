# Story 1.3: Remove Obsolete Prisma and Database Layer

Status: done

Last updated: 2026-05-29

## Final Outcome

Earlier planning included Prisma and a database-backed RSVP model. That scope was removed from the final product. RSVP collection now uses the server-side API route and Google Sheets integration.

## Removed Files and Dependencies

- `prisma/schema.prisma`
- `src/lib/db/client.ts`
- `src/lib/db/queries/README.md`
- `@prisma/client`
- `prisma`

## Current RSVP Persistence

- API route: `src/app/api/rsvp/route.ts`
- Validation and sheet row formatting: `src/lib/rsvp.ts`
- Google Sheets client: `src/lib/google-sheets.ts`
- Setup guide: `docs/google-sheets-rsvp.md`

## Verification

The current app should pass:

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```
