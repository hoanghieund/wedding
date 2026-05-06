# Database Query Module

**Purpose:** Feature-specific database reads and writes with clean abstraction over Prisma.

## Responsibilities

- Feature-specific database queries (RSVP, admin dashboard, exports)
- Data access layer for all persistence operations
- Query composition and optimization
- Transaction management when needed
- Data mapping between database and application layers

## Architecture Boundaries

- **Only this module may directly access Prisma Client for feature queries**
- `src/lib/db/client.ts` provides the Prisma singleton (already exists from Story 1.3)
- All feature code must go through query modules, not direct Prisma access
- Database naming uses **snake_case**; app-side code uses **camelCase/PascalCase**

## Usage Pattern

Expected query modules:
- `rsvp.ts` - RSVP submission and retrieval queries (Story 3.x, 5.x)
- `dashboard.ts` - Admin dashboard data queries (Story 5.x)
- `export.ts` - RSVP export queries (Story 5.5)

Each query module should:
- Export focused query functions (e.g., `createRsvpSubmission`, `getRsvpById`)
- Handle Prisma-specific error mapping
- Return application-friendly data shapes
- Use mappers from `src/lib/db/mappers/` if needed

## Security Requirements

- Never expose raw database errors to client
- Validate all query inputs
- Use parameterized queries (Prisma handles this)
- Admin queries must verify authentication before execution
- No public route should directly expose RSVP records

## Related Modules

- `src/lib/db/client.ts` - Prisma singleton (already exists)
- `src/lib/db/mappers/` - data shape transformations (future)
- `src/app/actions/` - Server Actions that call these queries
- `src/lib/validation/` - input validation before queries
