# Story 1.4: Define Project Structure and Module Boundaries

Status: done

## Story

As a developer,
I want to establish the project directory structure with clear module boundaries,
So that future features follow consistent organization patterns.

## Acceptance Criteria

**Given** the Next.js project and Prisma are configured
**When** the project structure is organized
**Then** the following directories exist with placeholder files or README:
- `src/lib/auth/` (for admin session management)
- `src/lib/db/queries/` (for database query modules)
- `src/lib/validation/` (for shared validation schemas)
- `src/lib/security/` (for rate limiting and sanitization)
- `src/lib/metadata/` (for SEO and social metadata)
- `src/lib/formatters/` (for date and data formatting)
- `src/lib/constants/` (for application constants)
- `src/components/ui/` (for reusable UI primitives)
- `src/components/sections/` (for page sections)
- `src/components/forms/` (for form components)
- `src/components/admin/` (for admin-only components)
- `src/app/actions/` (for Server Actions)
- `public/images/hero/`, `public/images/gallery/`, `public/images/venue/`, `public/images/og/`

**And** each directory contains a brief README or placeholder explaining its purpose
**And** the structure aligns with the Architecture document boundaries

## Tasks / Subtasks

- [x] Create lib module directories with clear boundaries (AC: lib structure established)
  - [x] Create `src/lib/auth/` with README explaining admin session management purpose
  - [x] Create `src/lib/db/queries/` with README explaining database query module pattern
  - [x] Create `src/lib/validation/` with README explaining shared validation schemas
  - [x] Create `src/lib/security/` with README explaining rate limiting and sanitization
  - [x] Create `src/lib/metadata/` with README explaining SEO and social metadata generation
  - [x] Create `src/lib/formatters/` with README explaining date and data formatting utilities
  - [x] Create `src/lib/constants/` with README explaining application constants
- [x] Create component directories with feature boundaries (AC: component structure established)
  - [x] Create `src/components/ui/` with README explaining reusable UI primitives
  - [x] Create `src/components/sections/` with README explaining guest-facing page sections
  - [x] Create `src/components/forms/` with README explaining form-specific interactive components
  - [x] Create `src/components/admin/` with README explaining admin-only components
- [x] Create Server Actions directory (AC: actions structure established)
  - [x] Create `src/app/actions/` with README explaining Next.js Server Actions pattern
- [x] Create public image asset directories (AC: asset structure established)
  - [x] Create `public/images/hero/` with README explaining hero section images
  - [x] Create `public/images/gallery/` with README explaining photo gallery images
  - [x] Create `public/images/venue/` with README explaining venue and map images
  - [x] Create `public/images/og/` with README explaining Open Graph social sharing images
- [x] Validate structure against architecture document (AC: alignment verified)
  - [x] Verify all required directories exist
  - [x] Verify each directory has documentation explaining its purpose
  - [x] Verify structure matches architecture boundaries for auth, db, validation, security, metadata
  - [x] Verify public/admin separation is clear in component organization
  - [x] Verify no architectural anti-patterns introduced

## Dev Notes

### Epic Context

**Epic 1 Goal:** Set up the production-ready application foundation so all guest-facing and admin-facing capabilities can be built on a secure, consistent, and low-maintenance platform.

**This Story's Role:** Establishes the directory structure and module boundaries that all subsequent feature stories will build upon. This is the organizational foundation that prevents architectural drift and ensures consistent patterns across RSVP, admin, and guest-facing features.

### Story Foundation

**Dependencies on previous stories:**
- Story 1.1 established the Next.js 16.2.4 + TypeScript + App Router baseline with `src/` directory support.
- Story 1.3 created the initial data layer foundation with `src/lib/db/client.ts` and Prisma schema.
- This story extends that foundation by defining the complete module structure for all upcoming features.

**Current repository reality:**
- The deployable app lives at the repository root.
- `src/app/` contains the Next.js App Router structure (page.tsx, layout.tsx, globals.css).
- `src/lib/db/client.ts` exists from Story 1.3 as the only lib module so far.
- `src/components/` does not exist yet.
- `public/` contains default Next.js assets but no organized image directories.
- No git repository initialized yet, so no commit history available.

**Downstream stories depending on this structure:**
- Story 2.x (Landing Page): needs `src/components/sections/`, `src/components/ui/`, `public/images/*`
- Story 3.2 (RSVP Validation): needs `src/lib/validation/`
- Story 3.4 (RSVP Submission): needs `src/app/actions/`
- Story 3.6 (Rate Limiting): needs `src/lib/security/`
- Story 4.1 (Admin Auth): needs `src/lib/auth/`, `src/lib/validation/`
- Story 5.1 (RSVP Queries): needs `src/lib/db/queries/`
- Story 2.5 (Metadata): needs `src/lib/metadata/`

### Technical Requirements

**Directory structure requirements:**
- Use Next.js App Router project structure with `src/` directory support (already established).
- Organize by **feature/domain**, not by generic technical layers.
- Maintain hard boundary between public guest surface and protected admin functionality.
- Keep admin-only logic out of the public bundle.

**Module boundary requirements:**
- `src/lib/auth/`: Admin session management, JWT/session utilities, route protection helpers
- `src/lib/db/queries/`: Feature-specific database reads/writes (only this module talks directly to Prisma for feature queries)
- `src/lib/validation/`: Shared validation schemas reusable across RSVP and admin flows
- `src/lib/security/`: Rate limiting, input sanitization, anti-spam controls
- `src/lib/metadata/`: SEO, Open Graph, social sharing metadata generation
- `src/lib/formatters/`: Date, text, and data presentation formatting utilities
- `src/lib/constants/`: Centralized application constants

**Component boundary requirements:**
- `src/components/ui/`: Reusable low-level UI primitives (buttons, inputs, cards) - domain-agnostic
- `src/components/sections/`: Guest-facing page sections (hero, schedule, venue, FAQ)
- `src/components/forms/`: Form-specific interactive components (RSVP form, admin login form)
- `src/components/admin/`: Admin-only rendered components (dashboard tables, filters, export controls)

**Server Actions organization:**
- `src/app/actions/`: Next.js Server Actions for mutations (RSVP submission, admin login, export triggers)

**Asset organization:**
- `public/images/hero/`: Hero section background and featured images
- `public/images/gallery/`: Photo gallery images
- `public/images/venue/`: Venue photos and map images
- `public/images/og/`: Open Graph social sharing preview images

### Architecture Compliance

**Critical architectural constraints from architecture.md:**

1. **Feature-oriented organization:** Organize by feature/domain, not by technical layer buckets.

2. **Public/Admin separation:** 
   - Admin logic must stay out of public bundle
   - Admin components must be isolated in `src/components/admin/`
   - No admin-only helpers in public component folders

3. **Data layer boundaries:**
   - Only `src/lib/db/queries/*` may directly access Prisma for feature reads/writes
   - `src/lib/db/client.ts` is the singleton Prisma client (already exists from Story 1.3)
   - Database naming uses **snake_case**; app-side code uses **camelCase/PascalCase**

4. **Validation pattern:**
   - Server-side validation is authoritative
   - Shared schemas in `src/lib/validation/` must be reusable
   - Client-side validation mirrors constraints for UX only

5. **Server Actions pattern:**
   - Primary mutation pattern for RSVP submission and admin operations
   - Must return structured `ActionResult<T>` format:
     ```typescript
     type ActionResult<T = void> = {
       ok: boolean
       message?: string
       fieldErrors?: Record<string, string>
       data?: T
     }
     ```

6. **Naming conventions:**
   - React components: **PascalCase** (e.g., `HeroSection.tsx`)
   - Utility files: **kebab-case** (e.g., `date-format.ts`)
   - Functions/variables: **camelCase**
   - Constants: **UPPER_SNAKE_CASE**
   - Types/interfaces: **PascalCase**

7. **Anti-patterns to avoid:**
   - Do not introduce global state management (Redux/Zustand) without clear need
   - Do not add event bus or custom abstractions prematurely
   - Do not mix admin-only helpers into public folders
   - Do not expose raw DB/auth errors to client

8. **Static-first architecture:**
   - Guest-facing content should be static-first
   - Dynamic behavior only for RSVP/admin workflows
   - Minimize client-side JavaScript
   - Prefer server-rendered content

### Security Requirements

- Maintain hard boundary between public guest surface and protected admin functionality.
- Admin-only logic must stay out of the public bundle.
- No public route should expose RSVP records directly.
- All admin reads must go through authenticated server-rendered boundaries.
- Validation and sanitization modules must be clearly separated in `src/lib/security/` and `src/lib/validation/`.

### File Structure Requirements

**Files expected to be created in this story:**
- `src/lib/auth/README.md`
- `src/lib/db/queries/README.md`
- `src/lib/validation/README.md`
- `src/lib/security/README.md`
- `src/lib/metadata/README.md`
- `src/lib/formatters/README.md`
- `src/lib/constants/README.md`
- `src/components/ui/README.md`
- `src/components/sections/README.md`
- `src/components/forms/README.md`
- `src/components/admin/README.md`
- `src/app/actions/README.md`
- `public/images/hero/README.md`
- `public/images/gallery/README.md`
- `public/images/venue/README.md`
- `public/images/og/README.md`

**Files that should not be changed:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/lib/db/client.ts` (already exists from Story 1.3)
- `prisma/schema.prisma`
- `next.config.ts`
- `package.json`

### Previous Story Intelligence

**Learnings from Story 1.1:**
- Next.js 16.2.4 with App Router and `src/` directory support is established.
- TypeScript strict mode is enabled.
- Tailwind CSS v4 is configured.
- ESLint with Next.js config is working.
- Validation baseline: lint, TypeScript, build, and dev server checks all pass.

**Learnings from Story 1.2:**
- Vercel project is linked as `shivershadys-projects/wedding`.
- Environment variables are managed in Vercel dashboard.
- `.env.example` documents required variables.
- `.gitignore` already covers `.env*` files.

**Learnings from Story 1.3:**
- Prisma 6.10.1 is installed and configured.
- `src/lib/db/client.ts` exports a Prisma singleton for Next.js server runtime.
- `prisma/schema.prisma` defines the initial `rsvp_submissions` table with snake_case naming.
- Database connectivity to Neon/Vercel Postgres is verified.
- `npx prisma` commands fail due to RTK hook issues; use `node node_modules/.bin/prisma` instead.
- TypeScript, lint, and build validation all pass with no regressions.

**Key patterns established:**
- Use `src/lib/` for business logic and supporting utilities.
- Database layer uses snake_case naming; app layer uses camelCase/PascalCase.
- Singleton pattern for shared services (Prisma client).
- Validation commands: `npx tsc --noEmit`, `npm run lint`, `npm run build`.

### Testing Requirements

**Validation for this story should include:**
1. Verify all required directories exist.
2. Verify each directory contains a README or placeholder file.
3. Verify README content accurately describes the directory's purpose.
4. Verify structure matches architecture document boundaries.
5. Verify no architectural anti-patterns introduced (e.g., admin code in public folders).
6. Run TypeScript validation to ensure no regressions.
7. Run lint to ensure no regressions.
8. Run build to ensure no regressions.

**No functional tests required for this story** - this is purely structural setup with documentation.

### Library / Framework Requirements

- Next.js 16.2.4
- React 19.2.4
- TypeScript 5.x
- Prisma ORM 6.10.1
- Tailwind CSS v4

### References

- [Story 1.4 Requirements: epics.md#Story 1.4: Define Project Structure and Module Boundaries]
- [Epic 1 Definition: epics.md#Epic 1: Project Foundation & Infrastructure]
- [Code Structure Patterns: architecture.md#Structure Patterns]
- [Module Boundaries: architecture.md#Module Boundaries]
- [Naming Conventions: architecture.md#Naming Patterns]
- [Component Organization: architecture.md#Component Boundaries]
- [Data Layer Structure: architecture.md#Data Layer]
- [Server Actions Pattern: architecture.md#API Patterns]
- [Public/Admin Separation: architecture.md#Security Boundaries]
- [Complete Project Directory Structure: architecture.md#Project Structure & Boundaries]
- [Previous Story Learnings: 1-1-initialize-next-js-application-with-production-configuration.md#Completion Notes List]
- [Previous Story Learnings: 1-2-configure-vercel-deployment-and-environment-variables.md#Completion Notes List]
- [Previous Story Learnings: 1-3-set-up-prisma-orm-with-vercel-postgres.md#Completion Notes List]

## Dev Agent Record

### Agent Model Used

Claude Sonnet

### Debug Log References

- Created required module boundary directories under `src/lib`, `src/components`, `src/app/actions`, and `public/images`
- Added README placeholders documenting purpose, responsibilities, boundaries, and usage patterns for each required directory
- Preserved existing `src/lib/db/client.ts` and avoided changes to unrelated app, Prisma, and config files
- Verified required directory structure and placeholder files via filesystem inspection
- Validation commands passed: `npx tsc --noEmit`, `npm run lint`, `npm run build`

### Completion Notes List

- Created lib module directories for auth, db queries, validation, security, metadata, formatters, and constants with purpose-specific README files
- Created component directories for reusable UI primitives, guest-facing sections, form components, and admin-only components with boundary documentation
- Created `src/app/actions/` with README documenting the Next.js Server Actions mutation pattern and expected `ActionResult` shape
- Created organized public image asset directories for hero, gallery, venue, and Open Graph assets with placeholder documentation
- Verified the structure aligns with architecture boundaries, including public/admin separation and dedicated data/query organization
- Confirmed no regressions via TypeScript, ESLint, and production build validation

### File List

- src/lib/auth/README.md
- src/lib/db/queries/README.md
- src/lib/validation/README.md
- src/lib/security/README.md
- src/lib/metadata/README.md
- src/lib/formatters/README.md
- src/lib/constants/README.md
- src/components/ui/README.md
- src/components/sections/README.md
- src/components/forms/README.md
- src/components/admin/README.md
- src/app/actions/README.md
- public/images/hero/README.md
- public/images/gallery/README.md
- public/images/venue/README.md
- public/images/og/README.md
- _bmad-output/implementation-artifacts/1-4-define-project-structure-and-module-boundaries.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
