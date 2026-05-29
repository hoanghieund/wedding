# Google Sheets RSVP Setup

The RSVP form writes directly to Google Sheets through the server-side
`/api/rsvp` endpoint. Do not expose Google credentials in client-side code.
Sheet tab, column order, status labels, source labels, and validation limits are
managed in `src/lib/constants/event-data.ts` under `EVENT_DATA.rsvp`.

## Sheet Columns

Create a sheet tab named `RSVP` with these columns in row 1:

```text
submitted_at | guest_name | attendance_status | attendee_count | guest_message | source
```

Submissions are append-only. If a guest submits more than once, keep the newest
row by `submitted_at`. Dates are written as `YYYY/MM/DD HH:mm` in the wedding
timezone.

## Environment Variables

Set these variables in `.env.local` and in the Vercel project:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_SHEET_NAME=RSVP
```

When pasting the private key into an environment variable, keep line breaks as
escaped `\n`. The application converts them back before authenticating.

## Service Account Access

1. Create a Google Cloud service account.
2. Enable the Google Sheets API for the project.
3. Copy the service account `client_email` and `private_key`.
4. Share the target spreadsheet with the service account email as an editor.
5. Copy the spreadsheet ID from the Google Sheet URL.

## Smoke Test

After `.env.local` is configured, start the local server:

```bash
rtk npm run dev
```

Then submit a test RSVP:

```bash
rtk curl -s -X POST http://localhost:3000/api/rsvp \
  -H 'Content-Type: application/json' \
  -d '{
    "guestName": "Smoke Test Guest",
    "attendanceStatus": "attending",
    "attendeeCount": 1,
    "guestMessage": "Local smoke test",
    "website": ""
  }'
```

Expected response:

```json
{"ok":true}
```

Confirm the `RSVP` sheet has a new row with:

```text
attendance_status = Tham dự
source = Website thiệp cưới
```
