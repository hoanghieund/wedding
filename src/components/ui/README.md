# UI Components Module

**Purpose:** Reusable UI primitives that are domain-agnostic and composable.

## Responsibilities

- Shared low-level UI building blocks
- Buttons, inputs, cards, badges, dialog shells, table shells
- Consistent visual primitives used by multiple features

## Architecture Boundaries

- **Domain-agnostic only**
- No RSVP-specific or admin-specific business logic here
- No direct data fetching or authentication logic
- Keep components small, reusable, and presentation-focused

## Usage Pattern

Expected UI primitives:
- `Button.tsx`
- `Input.tsx`
- `Card.tsx`
- `Table.tsx`

These primitives will be consumed by:
- `src/components/sections/`
- `src/components/forms/`
- `src/components/admin/`

## Naming Conventions

- Component files: **PascalCase**
- React components: **PascalCase**
- Keep props well-named and minimal
