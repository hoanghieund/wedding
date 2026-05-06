# Auth Module

**Purpose:** Admin session management, authentication, and route protection.

## Responsibilities

- Admin login/logout session handling
- JWT or session cookie management
- Route protection middleware and utilities
- Session verification helpers
- Authentication state management

## Architecture Boundaries

- **Only admin authentication** - guest users do not require auth
- Must maintain hard boundary between public and admin surfaces
- Admin-only logic must stay out of public bundle
- All admin routes must be protected through this module

## Usage Pattern

This module will be used by:
- Admin login flow (Story 4.1, 4.2, 4.3)
- Admin route protection middleware (Story 4.4)
- Admin logout flow (Story 4.5)
- Any admin-facing features requiring authentication

## Security Requirements

- Never expose raw auth errors to client
- Use secure HTTP-only cookies for session tokens
- Implement proper session expiration
- Validate all session tokens server-side
- No client-side auth state that could be manipulated

## Related Modules

- `src/lib/validation/` - for login input validation schemas
- `src/app/actions/` - for login/logout Server Actions
- `src/components/admin/` - for admin-only UI components
