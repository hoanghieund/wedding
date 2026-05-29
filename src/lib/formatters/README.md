# Formatters Module

**Purpose:** Date, time, and calendar formatting utilities.

## Responsibilities

- Date and time formatting for guest-facing displays
- Calendar URL generation
- Predictable formatting for RSVP sheet rows

## Architecture Boundaries

- Presentation formatting only
- No persistence, authentication, or validation logic here
- Keep formatting utilities reusable and domain-light
- Prefer pure functions with predictable output

## Usage Pattern

Current formatter modules:
- `date-format.ts` - date/time display helpers
- `calendar.ts` - Google Calendar URL helper

Formatters may be used by:
- Guest-facing sections for event/date display
- RSVP sheet row formatting

## Related Modules

- `src/components/sections/` - guest-facing displays
- `src/lib/constants/` - shared labels/constants for formatting
