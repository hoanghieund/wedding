# Admin Components Module

**Purpose:** Admin-only rendered components for dashboard, filters, and management.

## Responsibilities

- Admin dashboard tables and data displays
- RSVP filters and search controls
- Export controls and action buttons
- Admin-specific UI that should not be in public bundle

## Architecture Boundaries

- **Admin-only logic must stay out of public bundle**
- Components here are only rendered on protected admin routes
- No guest-facing components should import from this module
- Keep admin components isolated from public surface

## Usage Pattern

Expected admin components:
- `RsvpTable.tsx` - admin dashboard RSVP table (Story 5.2)
- `RsvpFilters.tsx` - filter controls (Story 5.3)
- `AttendanceSummary.tsx` - summary stats (Story 5.4)
- `ExportButton.tsx` - export trigger (Story 5.5)

Admin components will:
- Fetch data via Server Components or Server Actions
- Display admin-specific data views
- Provide admin-only controls and actions

## Naming Conventions

- Component files: **PascalCase**
- React components: **PascalCase**
- Prefix with `Admin` if ambiguous (e.g., `AdminDashboard.tsx`)

## Related Modules

- `src/lib/auth/` - admin session verification
- `src/lib/db/queries/` - admin data queries
- `src/app/actions/` - admin-specific Server Actions
- `src/components/ui/` - reusable UI primitives
