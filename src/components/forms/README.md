# Forms Module

**Purpose:** Form-specific interactive components for RSVP and admin flows.

## Responsibilities

- RSVP submission form with inline validation
- Admin login form
- Form field components with validation feedback
- Form state management and submission handling

## Architecture Boundaries

- Forms manage local interaction state only
- Server Actions handle actual submission and persistence
- Client-side validation mirrors server-side constraints for UX
- Keep form logic separate from business/persistence logic

## Usage Pattern

Expected form components:
- `RsvpForm.tsx` - guest RSVP submission form (Story 3.3)
- `AdminLoginForm.tsx` - admin login form (Story 4.3)

Form pattern:
1. Local state for form fields
2. Client-side validation using schemas from `src/lib/validation/`
3. Call Server Action from `src/app/actions/` on submit
4. Display structured field errors or success state

## Naming Conventions

- Component files: **PascalCase**
- React components: **PascalCase**
- Form components should end with `Form` suffix

## Related Modules

- `src/lib/validation/` - validation schemas
- `src/app/actions/` - Server Actions for form submission
- `src/components/ui/` - reusable input/button primitives
- `src/lib/security/` - rate limiting applied server-side
