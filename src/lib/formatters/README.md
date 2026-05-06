# Formatters Module

**Purpose:** Date, text, and data presentation formatting utilities.

## Responsibilities

- Date and time formatting for guest/admin displays
- String and text presentation helpers
- Data presentation formatting (counts, labels, summaries)
- Output formatting for exports or reports when needed

## Architecture Boundaries

- Presentation formatting only
- No persistence, authentication, or validation logic here
- Keep formatting utilities reusable and domain-light
- Prefer pure functions with predictable output

## Usage Pattern

Expected formatter modules:
- `date-format.ts` - date/time display helpers
- `attendance-label.ts` - attendance state presentation helpers
- `guest-summary.ts` - small summary formatting helpers

Formatters may be used by:
- Guest-facing sections for event/date display
- Admin dashboard tables and summaries
- Export-related presentation helpers

## Related Modules

- `src/components/sections/` - guest-facing displays
- `src/components/admin/` - admin-facing displays
- `src/lib/constants/` - shared labels/constants for formatting
