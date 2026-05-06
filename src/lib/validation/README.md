# Validation Module

**Purpose:** Shared validation schemas and rules reusable across RSVP and admin flows.

## Responsibilities

- Input validation schemas for forms and actions
- Shared validation rules between client and server
- Field-level validation constraints
- Validation error shape standardization
- Type inference from schemas

## Architecture Boundaries

- **Server-side validation is authoritative**
- Client-side validation only mirrors key constraints for UX
- Schemas must be reusable across RSVP and admin features
- Keep validation logic separate from security sanitization logic

## Usage Pattern

Expected validation modules:
- `rsvp.ts` - RSVP submission validation schema (Story 3.2)
- `admin-login.ts` - Admin login validation schema (Story 4.1)

Validation flow:
1. Client validates for immediate UX feedback
2. Server Action re-validates authoritatively
3. Structured field errors returned to client
4. Only valid data proceeds to security sanitization and persistence

## Error Format

Server Actions should return structured validation errors:

```ts
{
  ok: false,
  fieldErrors: {
    email: 'Please enter a valid email',
    guestCount: 'Guest count must be at least 1'
  }
}
```

## Related Modules

- `src/app/actions/` - Server Actions that consume these schemas
- `src/components/forms/` - form components using client-side validation
- `src/lib/security/` - sanitization after validation
- `src/lib/auth/` - admin login validation
