# Server Actions Module

**Purpose:** Next.js Server Actions for mutations and server-side operations.

## Responsibilities

- RSVP submission handling
- Admin login/logout operations
- Admin-side mutations (export triggers, updates)
- Server-side form processing with validation

## Architecture Boundaries

- **Primary mutation pattern** for this application
- Server Actions run on the server, never exposed to client bundle
- All actions must validate inputs server-side
- Actions return structured `ActionResult<T>` format

## Usage Pattern

Expected Server Actions:
- `submit-rsvp.ts` - RSVP submission (Story 3.4)
- `login-admin.ts` - admin login (Story 4.2)
- `logout-admin.ts` - admin logout (Story 4.5)
- `export-rsvps.ts` - RSVP export trigger (Story 5.5)

## Action Result Format

All Server Actions must return structured results:

```typescript
type ActionResult<T = void> = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string>
  data?: T
}
```

## Action Flow

1. Validate inputs using schemas from `src/lib/validation/`
2. Apply security checks (rate limiting, sanitization, auth)
3. Call database queries from `src/lib/db/queries/`
4. Return structured result to client

## Security Requirements

- Never expose raw database or auth errors
- Validate all inputs server-side
- Apply rate limiting for public actions
- Verify admin session for protected actions
- Sanitize free-text inputs before persistence

## Related Modules

- `src/lib/validation/` - input validation schemas
- `src/lib/security/` - rate limiting and sanitization
- `src/lib/auth/` - admin session verification
- `src/lib/db/queries/` - database operations
- `src/components/forms/` - forms calling these actions
