# Story 1.3: Set Up Prisma ORM with Vercel Postgres

Status: done

## Story

As a developer,
I want to configure Prisma ORM connected to Vercel Postgres,
So that the application has a type-safe database layer ready for RSVP data storage.

## Acceptance Criteria

**Given** Vercel deployment is configured
**When** Prisma is installed and configured
**Then** `prisma/schema.prisma` is created with datasource pointing to Vercel Postgres
**And** Prisma Client is generated successfully
**And** database connection is verified via `prisma db push` or initial migration
**And** `src/lib/db/client.ts` exports a singleton Prisma Client instance
**And** TypeScript recognizes Prisma types without errors

## Tasks / Subtasks

- [x] Install and configure Prisma for the existing Next.js app (AC: Prisma configured, client generated)
  - [x] Add `prisma` and `@prisma/client` dependencies using current stable versions compatible with Next.js 16 and Node runtime
  - [x] Initialize Prisma in the project root so the generated structure matches the architecture (`prisma/schema.prisma`)
  - [x] Configure Prisma datasource to use `DATABASE_URL` for Vercel Postgres
  - [x] Configure Prisma Client generator successfully
- [x] Define the initial persistence foundation (AC: schema created, DB connection verified)
  - [x] Create the initial Prisma schema file with a minimal relational foundation for upcoming RSVP stories
  - [x] Preserve architecture naming conventions: plural snake_case tables and snake_case columns
  - [x] Verify database connectivity with `prisma db push` or an initial migration without exposing secrets
- [x] Add the shared database client module (AC: singleton client exported)
  - [x] Create `src/lib/db/client.ts`
  - [x] Export a singleton Prisma Client instance suitable for Next.js development and server runtime usage
  - [x] Keep database access isolated to the data layer and avoid using Prisma directly in app routes/components
- [x] Validate TypeScript and generated client integration (AC: Prisma types recognized)
  - [x] Generate Prisma Client successfully
  - [x] Verify TypeScript recognizes generated Prisma types without errors
  - [x] Verify the app still passes relevant validation after database setup
- [x] Update environment variable documentation if required by Prisma/Vercel Postgres
  - [x] Verify `.env.example` still accurately documents required database variables
  - [x] Add any non-secret placeholder variables only if Prisma setup requires them

## Dev Notes

### Epic Context

**Epic 1 Goal:** Set up the production-ready application foundation so all guest-facing and admin-facing capabilities can be built on a secure, consistent, and low-maintenance platform.

**This Story's Role:** Introduces the type-safe persistence layer that all RSVP capture, admin review, export, and future data operations will depend on.

### Story Foundation

**Dependencies on previous stories:**
- Story 1.1 established the Next.js 16.2.4 + TypeScript + App Router baseline at the repository root.
- Story 1.2 completed Vercel project linking and documented `DATABASE_URL` in `.env.example`.
- Vercel-managed environment variables are already the expected secret source; do not introduce local-only secret handling patterns that diverge from deployment.

**Current repository reality:**
- The deployable app lives at the repository root, not in a nested `wedding-site/` folder.
- `src/` currently contains only `src/app/*`; the database layer directories expected by architecture do not exist yet.
- `.gitignore` already ignores `.env*` and `.vercel`, so secret and platform metadata protections are already in place.

### Technical Requirements

**Database platform:**
- Required database: **Vercel Postgres**
- Required ORM: **Prisma ORM**
- Connection source: `DATABASE_URL`

**Required deliverables from this story:**
- `prisma/schema.prisma`
- Generated Prisma Client
- `src/lib/db/client.ts`
- Successful database connectivity verification
- TypeScript-aware Prisma types

**Schema scope guidance for this story:**
- This story sets up the persistence foundation, not the full RSVP business model.
- However, the architecture explicitly identifies `rsvp_submissions` as the initial core entity, so the first schema should be compatible with that direction.
- Keep the schema minimal and stable enough for upcoming stories; do not introduce speculative entities unless they are required to make Prisma setup viable.

**Migration approach:**
- Architecture preference is Prisma migrations committed to the codebase so schema changes remain versioned and reproducible.
- Acceptance criteria allow either `prisma db push` or an initial migration for connection verification.
- Favor an approach that leaves the project ready for versioned migrations in subsequent stories.

### Architecture Compliance

**Database and naming rules:**
- Database tables must use **plural snake_case** names such as `rsvp_submissions`.
- Database columns must use **snake_case** names such as `guest_name`, `attendance_status`, `created_at`, `updated_at`.
- Primary key should be `id`.
- Timestamps should follow `created_at` and `updated_at` naming.
- Prisma schema is the single source of truth for persistence structure.

**Data layer boundaries:**
- Database client and queries belong under `src/lib/db`.
- Query modules in `src/lib/db/queries/*` should be the only feature-level code that talks directly to Prisma later.
- This story should only add the shared client foundation, not app-layer direct Prisma usage.
- Do not import Prisma Client into `src/app/page.tsx`, `src/app/layout.tsx`, or UI components.

**Next.js runtime pattern:**
- Use a Prisma singleton pattern that is safe for hot reload during development and avoids exhausting connections.
- The exported client from `src/lib/db/client.ts` should be usable from future Server Actions and protected admin reads.

**Scope discipline:**
- Do not implement RSVP form logic, validation schemas, admin auth, or query modules in this story.
- Do not create broad abstractions that are not required to satisfy Prisma setup.
- Do not restructure unrelated application code from stories 1.1 and 1.2.

### Security Requirements

- Never hardcode database credentials.
- Never commit `.env.local` or any real connection string.
- Keep connection strings and secrets only in environment variables.
- Do not expose raw database errors to client-facing code.
- Keep database code server-only.
- Preserve the existing separation between public guest features and protected admin functionality.

### File Structure Requirements

**Files expected to be created or updated in this story:**
- `package.json`
- `package-lock.json`
- `prisma/schema.prisma`
- `prisma/migrations/*` or equivalent Prisma initialization artifacts if generated
- `src/lib/db/client.ts`
- `.env.example` only if additional non-secret placeholders are truly required

**Files that should not be changed unless strictly required for Prisma correctness:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `next.config.ts`
- `eslint.config.mjs`

### Previous Story Intelligence

**Learnings from Story 1.1:**
- Tooling that assumes an empty root can fail because BMAD artifacts already exist in the root workspace.
- Validation baseline after initialization is clean: lint, TypeScript, build, and dev server checks succeeded.
- Package metadata has already been corrected post-review and should be preserved.

**Learnings from Story 1.2:**
- Vercel project is already linked as `shivershadys-projects/wedding`.
- `DATABASE_URL` is already documented in `.env.example` and configured in Vercel-managed environment variables.
- Secret handling should remain centralized in Vercel project settings.
- `.gitignore` already covers `.env*`; no new ignore rules should be necessary unless Prisma introduces a specific generated artifact that belongs there.

### Testing Requirements

**Validation for this story should include:**
1. Install dependencies successfully.
2. Generate Prisma Client successfully.
3. Verify the Prisma schema is valid.
4. Verify database connectivity with `prisma db push` or an initial migration.
5. Verify `src/lib/db/client.ts` exports a working singleton client pattern.
6. Run TypeScript validation and ensure generated Prisma types are recognized.
7. Run lint and any relevant build validation to ensure no regressions.

**Execution note:**
- If a real database connection is needed locally and the environment is missing, the dev agent may need to ask the user to provide or sync `DATABASE_URL` into local execution context.
- If authenticated platform commands are needed, the user may need to run them interactively.

### Library / Framework Requirements

- Next.js 16.2.4
- React 19.2.4
- TypeScript 5.x
- Prisma ORM (current stable version compatible with this stack)
- Vercel Postgres

### References

- [Story 1.3 Requirements: epics.md#Story 1.3: Set Up Prisma ORM with Vercel Postgres]
- [Epic 1 Definition: epics.md#Epic 1: Project Foundation & Infrastructure]
- [Database Choice: architecture.md#Database Choice]
- [ORM / Data Access Layer: architecture.md#ORM / Data Access Layer]
- [Migration Approach: architecture.md#Migration Approach]
- [Database Naming Conventions: architecture.md#Naming Patterns]
- [Project Organization and Data Layer: architecture.md#Structure Patterns]
- [Complete Project Directory Structure: architecture.md#Project Structure & Boundaries]
- [Requirements to Structure Mapping: architecture.md#Requirements to Structure Mapping]
- [Implementation Handoff Priority: architecture.md#Implementation Handoff]
- [Previous Story Learnings: 1-1-initialize-next-js-application-with-production-configuration.md#Completion Notes List]
- [Previous Story Learnings: 1-2-configure-vercel-deployment-and-environment-variables.md#Completion Notes List]

## Dev Agent Record

### Agent Model Used

Claude Sonnet

### Debug Log References

- Installed Prisma dependencies and corrected package placement so `@prisma/client` is a runtime dependency
- `npx prisma init` failed due to CLI proxying, so local Prisma binary was invoked directly
- Prisma 7 initialization introduced `prisma.config.ts` and datasource behavior incompatible with the story's traditional `db push` workflow
- Downgraded to Prisma 6.10.1-compatible tooling flow to preserve classic datasource configuration and migration readiness
- Generated Prisma Client successfully with local Prisma binary
- Prisma CLI initially picked up a generated `.env` localhost placeholder; removed it to avoid overriding the real database connection strategy
- Local verification was blocked until a real `DATABASE_URL` was added to `.env.local`
- Verified database connectivity by loading `DATABASE_URL` from `.env.local` and running `prisma db push --skip-generate`
- Validation commands passed: `npx tsc --noEmit`, `npm run lint`, `npm run build`

### Completion Notes List

- Added Prisma ORM to the Next.js application with `prisma` and `@prisma/client`
- Created `prisma/schema.prisma` with PostgreSQL datasource using `DATABASE_URL`
- Defined the initial `rsvp_submissions` Prisma model using plural snake_case table naming and snake_case columns
- Added `src/lib/db/client.ts` exporting a Prisma singleton for Next.js server runtime usage
- Generated Prisma Client successfully and verified TypeScript recognizes Prisma types
- Verified database connectivity against the configured Neon/Vercel Postgres database with `prisma db push --skip-generate`
- Confirmed no regressions via TypeScript, lint, and production build validation

### File List

- package.json
- package-lock.json
- prisma/schema.prisma
- src/lib/db/client.ts
- .env.local
- .gitignore
- _bmad-output/implementation-artifacts/sprint-status.yaml
- _bmad-output/implementation-artifacts/1-3-set-up-prisma-orm-with-vercel-postgres.md