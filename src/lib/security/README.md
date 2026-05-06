# Security Module

**Purpose:** Rate limiting, sanitization, abuse protection, and security helpers.

## Responsibilities

- Input sanitization for free-text fields
- Rate limiting and abuse prevention
- Request protection helpers
- Security-related utility functions
- Safe error message formatting

## Architecture Boundaries

- Keep security logic separate from validation schemas
- Sanitization happens after validation, before persistence
- Guest-facing abuse protection lives here
- No raw security or auth errors should reach the client

## Usage Pattern

Expected security modules:
- `rate-limit.ts` - lightweight RSVP abuse protection (Story 3.6)
- `sanitize.ts` - text sanitization helpers for guest message/dietary restrictions
- `safe-error.ts` - client-safe error formatting utilities

Security flow:
1. Validate input shape via `src/lib/validation/`
2. Sanitize free-text fields here
3. Apply rate limiting for public write paths
4. Pass safe data to database query layer

## Security Requirements

- Public RSVP submission needs lightweight abuse protection
- Sanitize all RSVP free-text before persistence or export
- Never expose raw database or auth errors to client
- Keep admin protection separate from public abuse controls

## Related Modules

- `src/lib/validation/` - input shape validation
- `src/app/actions/` - public/admin actions using these protections
- `src/lib/db/queries/` - receives sanitized inputs
- `src/lib/auth/` - admin session security is related but separate
