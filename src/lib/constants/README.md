# Constants Module

**Purpose:** Centralized application constants shared across features.

## Responsibilities

- Shared static configuration values
- Site-level labels and identifiers
- Reusable enum-like constants
- Metadata-related constant values
- UI copy or options that should not be duplicated across modules

## Architecture Boundaries

- Constants only; no runtime side effects
- Avoid mixing business logic with constant definitions
- Keep constants grouped by concern if the module grows
- Use constants to reduce duplication across guest/admin features

## Usage Pattern

Expected constant modules:
- `site.ts` - site name, URLs, default metadata values
- `rsvp.ts` - attendance status values, limits, defaults
- `admin.ts` - admin route constants or labels if needed

## Naming Conventions

- Constant identifiers: **UPPER_SNAKE_CASE**
- File names: **kebab-case**
- Export grouped constants clearly

## Related Modules

- `src/lib/metadata/` - site metadata defaults
- `src/lib/validation/` - shared limits and rules
- `src/components/*` - presentation values and labels
