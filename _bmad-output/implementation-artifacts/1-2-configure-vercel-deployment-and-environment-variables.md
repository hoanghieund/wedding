# Story 1.2: Configure Deployment and Environment Variables

Status: done

Last updated: 2026-05-29

## Final Outcome

The project is ready for Vercel-style deployment with environment variables limited to the implemented Google Sheets RSVP integration.

## Required Variables

```env
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_SHEET_NAME=RSVP
```

## Notes

- Real secrets belong in `.env.local` and the hosting provider dashboard.
- `.env.example` contains placeholders only.
- The final project does not require database, admin, or session secrets.
- See `docs/google-sheets-rsvp.md` for setup and smoke testing.
