---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/prd.md
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/ux-design-specification.md
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/research/technical-wedding-website-best-practices-research-2026-05-06.md
workflowType: 'architecture'
project_name: 'wedding'
user_name: 'Hoanghieu'
date: '2026-05-06'
lastStep: 8
status: 'complete'
completedAt: '2026-05-06'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The product scope centers on a public wedding website that gives guests fast access to essential event information and allows RSVP submission without requiring account creation. Architecturally, the requirements cluster into two major capability areas:

1. **Guest-facing information experience**
   - Public access to wedding details, venue, map, schedule, dress code, FAQ, and contact information
   - Repeatable, low-friction access for guests returning to the website later
   - Link-sharing and metadata support for messaging apps and social previews

2. **RSVP collection and administration**
   - Guest RSVP submission with confirmation and durable storage
   - Admin access to submission records, attendance totals, exports, and non-responder identification
   - Operational support for reminders and guest support resolution

These requirements imply a clear separation between:
- a public content surface optimized for browsing and conversion to RSVP
- a protected admin management surface for RSVP operations

The functional scope is focused and bounded: one administrator, one event website, one primary guest journey, and no account-based guest system. This reduces platform complexity while increasing the importance of reliable form handling, structured content delivery, and simple operational workflows.

**Non-Functional Requirements:**

The strongest architectural drivers are:

- **Performance**
  - Above-the-fold homepage content within 3 seconds on typical mobile networks
  - Key event information reachable within 5 seconds
  - RSVP feedback within 2 seconds after valid submission
  - Image-heavy content must not block access to essential information

- **Security**
  - RSVP data protected in transit and at rest
  - Admin functionality restricted to the authorized administrator
  - Input validation and sanitization before storage or downstream use
  - No secrets exposed in client-visible code or public configuration

- **Reliability**
  - RSVP submissions stored durably
  - Clear success/failure states for submission attempts
  - Availability maintained during invitation sharing periods and near RSVP deadlines

- **Accessibility**
  - Mobile readability without zoom
  - Clear semantic heading structure
  - Sufficient visual contrast and hierarchy
  - Clearly labeled RSVP inputs

- **Scalability**
  - Support small but spiky traffic during invitation distribution and RSVP deadlines
  - Remain operational without complex infrastructure

These NFRs strongly suggest an architecture that favors static-first delivery, minimal client-side complexity, efficient asset handling, secure server-side RSVP processing, and a simple but robust admin boundary.

**Scale & Complexity:**

This project is small in product scope but quality-sensitive in execution. It does not require real-time systems, collaboration, multi-tenancy, or heavy domain workflows. However, it does require careful handling of content structure, form submission, guest data protection, and mobile performance.

- Primary domain: Full-stack web application
- Complexity level: Low to medium
- Estimated architectural components: 6-8 major components/services

Likely component areas include:
- Public site rendering
- Content section composition
- RSVP submission handling
- RSVP data persistence
- Admin authentication/authorization
- Admin reporting/export
- Metadata/SEO/share preview handling
- Media optimization pipeline

### Technical Constraints & Dependencies

Known constraints and dependencies from the current project documentation:

- The product is a **single-page web application (SPA)** optimized for modern browsers
- The experience must be **mobile-first**
- The delivery model should be **static-first where possible**, with RSVP submission and admin data handling supported separately
- Browser support explicitly includes:
  - Safari on iPhone
  - Chrome on Android
  - Chrome / Safari / Edge on desktop
- The UX direction favors:
  - elegant but low-friction presentation
  - vertical single-page flow
  - restrained interaction design
  - strong typography and spacing hierarchy
- The project has a **single administrator** and does not require multi-role internal operations
- The architecture should remain lightweight and low-maintenance relative to the scale of a personal wedding website

These constraints reduce the need for complex infrastructure while increasing the importance of selecting patterns that preserve fast delivery, low operational overhead, and a secure admin boundary.

### Cross-Cutting Concerns Identified

Several concerns will affect multiple architectural components:

- **Performance optimization**
  - Asset loading, image delivery, rendering strategy, and bundle size must align with mobile performance targets

- **Security and privacy**
  - Guest RSVP data must be protected across form submission, storage, admin viewing, and export paths

- **Validation and submission integrity**
  - RSVP data must be validated consistently and produce clear user-facing outcomes

- **Responsive user experience**
  - Layout, media, forms, and CTA placement must work reliably across narrow mobile screens and desktop browsers

- **Accessibility**
  - Semantic structure, labels, contrast, and readable layout must be built into all guest-facing and admin-facing surfaces

- **Operational maintainability**
  - The administrator must be able to review, export, and act on RSVP data without requiring heavyweight tooling

- **Public sharing and metadata**
  - Link preview metadata and content discoverability need support without exposing unnecessary personal data

- **Content clarity**
  - Information architecture and section ordering are architecturally important because user success depends on quick access to logistics, not deep navigation

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack web application** with static-first frontend and lightweight server-side handling, based on project requirements analysis.

The project requires:
- Public static content delivery optimized for mobile performance
- Server-side RSVP form handling with validation and persistence
- Protected admin interface for RSVP management
- Image optimization and metadata handling for social sharing
- Mobile-first responsive rendering

### Starter Options Considered

**Option 1: Next.js (create-next-app) - Recommended Defaults**
- Latest version: 16.2.4 (as of 2026-05-05)
- Provides: TypeScript, Tailwind CSS, App Router, ESLint, Turbopack
- Alignment: Matches research document recommendation exactly (Next.js + Tailwind + Vercel)
- Strengths: Built-in static generation, server actions, image optimization, metadata API, production-ready defaults
- Trade-offs: Requires additional setup for authentication and database

**Option 2: Create T3 App**
- Provides: Next.js + TypeScript + Tailwind + tRPC + optional Prisma + NextAuth
- Alignment: Full-stack typesafe with auth and database patterns included
- Strengths: End-to-end type safety, authentication ready, database ORM included
- Trade-offs: More complex than needed for this scope; tRPC adds overhead for simple RSVP endpoints

**Option 3: Vite + React**
- Provides: React + TypeScript, fast dev server
- Alignment: Lightweight SPA foundation
- Strengths: Minimal, flexible, fast development experience
- Trade-offs: Missing SSG/SSR for performance, no built-in image optimization, requires manual setup for routing, metadata, and build optimization

### Selected Starter: Next.js (create-next-app)

**Rationale for Selection:**

Next.js with recommended defaults provides the optimal balance for this project:

1. **Matches Research Recommendations**: The technical research document explicitly recommends Next.js + Tailwind CSS + Vercel deployment as the best default choice for wedding websites
2. **Performance Requirements**: Built-in static generation, image optimization, and code splitting directly address the 3-second homepage and 5-second info access requirements
3. **Architecture Alignment**: App Router supports static pages for public content while enabling server actions for RSVP submission handling
4. **Metadata & Sharing**: Metadata API solves SEO and social preview requirements without additional tooling
5. **Design System Foundation**: TypeScript and Tailwind CSS are already specified in the UX design system foundation
6. **Deployment Path**: Vercel integration provides low-maintenance hosting aligned with project scale
7. **Scope Appropriateness**: Sophisticated enough for production quality but not over-engineered for a single-event website

The T3 stack would add unnecessary complexity (tRPC for a few endpoints, full auth system for one admin), while Vite would require significant manual setup for features Next.js provides out of the box.

**Initialization Command:**

```bash
npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint --src-dir
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript enabled by default for type safety across components, API routes, and configuration
- Node.js runtime with React 19 support
- Modern ES modules with automatic code splitting

**Styling Solution:**
- Tailwind CSS v4 configured with PostCSS
- CSS Modules support for component-scoped styles
- System font stack ready (aligns with UX design system foundation)
- Mobile-first responsive utilities built-in

**Build Tooling:**
- Turbopack for development (fast HMR and incremental compilation)
- Production builds optimized with automatic code splitting, tree shaking, and minification
- Image optimization with next/image component (WebP/AVIF support)
- Font optimization with next/font

**Testing Framework:**
- ESLint configured with Next.js-specific rules (@next/eslint-plugin-next)
- Ready for Jest/Vitest integration (not included by default)
- TypeScript provides compile-time validation

**Code Organization:**
- `src/` directory structure for application code
- `app/` directory for App Router pages and layouts
- `public/` directory for static assets
- `components/` convention for reusable UI components
- API routes via `app/api/` for server-side endpoints

**Development Experience:**
- Fast Refresh for instant feedback during development
- TypeScript IntelliSense and type checking
- ESLint integration for code quality
- Import alias `@/*` configured for clean imports
- Environment variables support (.env.local)

**Production Capabilities:**
- Static Site Generation (SSG) for public pages
- Server-side rendering (SSR) available when needed
- Server Actions for form handling (RSVP submission)
- Metadata API for SEO and social sharing
- Automatic image optimization and lazy loading
- Edge-ready deployment (Vercel Edge Runtime compatible)

**Note:** Project initialization using this command should be the first implementation story. Additional architectural decisions for authentication (admin access), database (RSVP storage), and deployment configuration will be addressed in subsequent sections.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database platform: Vercel Postgres
- Data access layer: Prisma ORM
- Authentication method: Simple password-based admin authentication with JWT session cookies
- API pattern: Next.js Server Actions for form submission and admin mutations
- Hosting platform: Vercel
- Environment strategy: Vercel-managed environment variables for secrets and operational config

**Important Decisions (Shape Architecture):**
- Validation strategy: Shared server-first schema validation for RSVP payloads
- State management approach: React Server Components + local component state + URL-driven admin filters
- Caching strategy: Static generation for guest-facing content, dynamic handling only where RSVP/admin data requires it
- Security boundary: Public guest surface separated from protected admin surface
- Rate limiting strategy: Lightweight request protection on public RSVP submission endpoints/actions

**Deferred Decisions (Post-MVP):**
- Real-time RSVP updates in admin interface
- Multi-admin support or role-based access control
- Advanced analytics and observability stack
- Background reminder automation workflows
- CDN/media pipeline beyond default platform optimization

### Data Architecture

**Database Choice:** Vercel Postgres

**Rationale:**
Vercel Postgres aligns with the selected Next.js + Vercel deployment model and keeps infrastructure lightweight for a small, event-focused application. It provides durable relational storage suitable for RSVP submissions, attendance summaries, guest notes, and export workflows without introducing unnecessary operational complexity.

**ORM / Data Access Layer:** Prisma ORM

**Rationale:**
Prisma provides strong type safety, clear schema management, and an accessible migration workflow. For this project, that improves implementation consistency across AI-generated code and reduces the chance of schema drift or inconsistent query logic.

**Data Modeling Approach:**
The MVP data model should remain simple and relational, centered on RSVP operations.

Initial core entities:
- `rsvp_submissions`
- optional `guest_groups` or invite grouping if needed later
- optional admin audit metadata for operational visibility

Expected RSVP data fields:
- guest name
- attendance status
- attendee count if applicable
- dietary restrictions if collected
- optional guest message
- submission timestamp
- update timestamp if edits are later supported

**Validation Strategy:**
Validation should happen server-side as the source of truth, with optional client-side assistance for faster UX feedback. The same field rules should be reused consistently across RSVP submission and admin editing flows.

**Migration Approach:**
Use Prisma migrations committed with the codebase so schema changes remain versioned, reproducible, and implementation-safe.

**Caching Strategy:**
- No caching for RSVP write operations
- Fresh reads for admin-facing RSVP management
- Static caching for guest-facing informational content
- Aggregated admin totals may be recomputed on demand at MVP scale

### Authentication & Security

**Authentication Method:** Simple password-based admin login with JWT-backed session cookies

**Rationale:**
The product has exactly one administrator and does not require social login, multi-user onboarding, or third-party identity federation. A simple admin authentication flow reduces complexity while still meeting the requirement that admin RSVP management functions remain protected.

**Authorization Pattern:**
- Public routes: guest-facing content and RSVP submission
- Protected routes: all admin pages, exports, RSVP review screens, and operational tools
- Middleware or server-side session checks should gate all admin functionality

**Session Strategy:**
Use secure, HTTP-only cookies for admin session state. Avoid storing admin tokens in localStorage or exposing secrets to the client.

**Input Security:**
All RSVP input must be validated and sanitized before persistence or export use. This applies to free-text fields such as guest messages and dietary notes.

**Data Protection:**
- TLS in transit through platform defaults
- Secrets stored only in environment variables
- Guest RSVP data never exposed through public APIs or client bundles
- Export functionality restricted to authenticated admin access

**Rate Limiting / Abuse Protection:**
Apply lightweight submission protection to the RSVP flow to reduce spam or repeated submission abuse. The MVP should favor simple protections appropriate for a low-volume public form.

### API & Communication Patterns

**Primary Pattern:** Next.js Server Actions

**Rationale:**
Server Actions are the most direct fit for this project’s limited number of write operations, especially RSVP submission and admin-side mutations. They reduce boilerplate, preserve close coupling between form UI and server mutation logic, and align naturally with the selected Next.js architecture.

**Usage Scope:**
- RSVP submission
- Admin login action
- Admin-side RSVP updates if needed
- Export triggers or operational actions where appropriate

**Read Patterns:**
- Guest-facing content should be served statically where possible
- Admin data reads should happen server-side with authenticated access checks
- Dynamic reads should be isolated to admin surfaces and RSVP-related operations

**Error Handling Standard:**
- Clear success/failure messages for guests after RSVP submission
- Structured action results for predictable UI handling
- No ambiguous submission state after form completion

**Documentation Approach:**
A formal API specification is not required for MVP if Server Actions remain the dominant pattern. The architecture document and implementation stories should define the behavior contract clearly enough for implementation.

### Frontend Architecture

**Rendering Strategy:**
- Static-first rendering for guest-facing marketing/information sections
- Dynamic behavior only where RSVP interaction and admin workflows require it

**State Management Approach:**
React Server Components for content composition, local component state for interactive form behavior, and URL-driven state for admin filtering/sorting.

**Rationale:**
This project does not need a global client-state store. Most content is static, and interactive requirements are narrow and localized. Avoiding global state reduces complexity and bundle size.

**Component Architecture:**
A section-based page composition model should be used for the public site:
- Hero
- Event details
- Venue / map
- Timeline
- RSVP
- FAQ
- Contact
- optional gallery teaser / notes sections

Components should be organized around:
- reusable UI primitives
- section-level presentation components
- form-specific interactive components
- admin-specific data display components

**Performance Optimization:**
- Use optimized image delivery for hero and gallery assets
- Lazy-load non-critical media
- Keep client-side JavaScript minimal
- Preserve strong content-first rendering for mobile

**Bundle Optimization:**
- Avoid unnecessary client components
- Prefer server-rendered content where possible
- Keep admin-only logic out of the public bundle
- Minimize third-party dependencies

### Infrastructure & Deployment

**Hosting Platform:** Vercel

**Rationale:**
Vercel is the most natural deployment target for the chosen Next.js stack and aligns with the low-maintenance requirement of the project. It supports fast deployment, built-in platform optimizations, and a simple operational model for a personal event website.

**Deployment Strategy:**
- Preview deployments for review during development
- Production deployment for the public guest-facing site
- Environment variables managed through Vercel

**Environment Configuration:**
Expected environment variables will likely include:
- database connection string
- admin authentication secret
- optional anti-spam / protection keys
- optional analytics or email-related secrets if introduced later

**CI/CD Approach:**
Use Vercel’s Git-based auto-deploy flow for MVP. This is sufficient for the scale and reduces manual release overhead.

**Monitoring & Logging:**
For MVP:
- rely on platform deployment logs
- capture server-side errors for RSVP and admin operations
- keep operational visibility simple unless production issues justify expansion

**Scaling Strategy:**
The architecture should optimize for small but spiky traffic around invitation sharing and RSVP deadlines. Static delivery for public content and serverless-backed dynamic handling for RSVP/admin flows should be sufficient without custom scaling mechanisms.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize project with Next.js starter
2. Configure Vercel deployment and environment variable strategy
3. Add Prisma and connect Vercel Postgres
4. Define initial RSVP schema and run first migration
5. Build guest-facing static content sections
6. Implement RSVP submission via Server Actions with validation
7. Implement admin authentication and protected admin routes
8. Add admin RSVP review, totals, and export workflows
9. Add submission protection and harden security boundaries
10. Validate performance, accessibility, and mobile behavior

**Cross-Component Dependencies:**
- Database choice affects RSVP storage, admin reporting, and export functionality
- Authentication choice affects route protection, admin UI architecture, and server-side access patterns
- Server Actions affect form composition, error handling, and mutation organization
- Static-first rendering affects component boundaries and bundle optimization strategy
- Hosting on Vercel reinforces the decision to use platform-native database and deployment workflows
- Validation strategy affects both guest-facing RSVP UX and admin edit consistency
- State management decisions affect bundle size, component boundaries, and admin filtering behavior
- Security boundary decisions affect route organization, middleware usage, and data exposure rules
- Error handling structure affects form actions, admin workflows, and operational maintainability
- Performance constraints affect image strategy, rendering mode, and component design decisions
- Environment configuration affects authentication, database connectivity, and deployment reliability
- Rate limiting and submission protection affect RSVP action design and abuse resilience
- Project structure decisions in later steps must align with these service and responsibility boundaries
- Testing approach in implementation stories must reflect the chosen separation between static content, server actions, and protected admin flows
- Future deferred decisions should not force redesign of the core RSVP submission and admin management architecture.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 major areas where AI agents could make different choices:
- Naming patterns
- Structure patterns
- Format patterns
- Communication patterns
- Process patterns

### Naming Patterns

**Database Naming Conventions:**
- Table names: plural snake_case (`rsvp_submissions`, `guest_groups`)
- Column names: snake_case (`guest_name`, `attendance_status`, `created_at`)
- Primary keys: `id`
- Foreign keys: `{entity}_id` (`guest_group_id`)
- Timestamps: `created_at`, `updated_at`
- Index names: `idx_{table}_{column}`

**API Naming Conventions:**
- Public routes: lowercase path segments (`/`, `/admin`, `/admin/login`)
- Route groups in App Router should reflect feature boundaries, not technical layers
- Server action names: verb-first camelCase (`submitRsvp`, `loginAdmin`, `exportRsvps`)
- Query parameter names: camelCase in URL usage when needed (`statusFilter`, `sortBy`)
- No custom HTTP API wrapper naming unless a real route handler is required

**Code Naming Conventions:**
- React components: PascalCase (`HeroSection`, `RsvpForm`, `AdminDashboard`)
- Component files: PascalCase for components (`HeroSection.tsx`)
- Utility files: kebab-case (`date-format.ts`, `auth-cookie.ts`)
- Functions/variables: camelCase (`formatEventDate`, `adminSessionToken`)
- Constants: UPPER_SNAKE_CASE (`MAX_MESSAGE_LENGTH`)
- TypeScript types/interfaces: PascalCase (`RsvpSubmission`, `AdminSessionPayload`)

### Structure Patterns

**Project Organization:**
- Public site sections organized by feature/domain, not by generic type buckets alone
- Shared UI primitives in a reusable `components/ui` area
- Section-level components in feature-oriented folders
- Server actions colocated with their feature where practical
- Prisma schema and database concerns isolated in dedicated data layer files
- Admin-only code separated clearly from public-facing code

**File Structure Patterns:**
- App Router pages/layouts under `src/app`
- Public homepage sections grouped under a homepage feature area
- Admin routes grouped under `src/app/admin`
- Shared utilities under `src/lib`
- Validation schemas under `src/lib/validation`
- Authentication helpers under `src/lib/auth`
- Database client and queries under `src/lib/db`
- Static assets under `public/`
- Tests co-located where useful for unit-level behavior, with broader integration tests in a dedicated test area if added later

### Format Patterns

**API Response Formats:**
Server Actions should return structured result objects rather than raw primitives.

Preferred action result shape:
- success state
- message for user-facing feedback when relevant
- field error map for validation failures
- optional returned data payload only when needed

Example shape:
```ts
type ActionResult<T = void> = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string>
  data?: T
}
```

**Data Exchange Formats:**
- JSON-style data inside the app uses camelCase in TypeScript
- Database fields remain snake_case at the persistence layer
- Dates exposed to UI logic should be normalized before rendering
- ISO 8601 strings for serialized date values
- Boolean values remain true/false, never 1/0
- Null usage should be explicit; prefer `null` over ambiguous empty placeholders where absence is meaningful

### Communication Patterns

**Event System Patterns:**
The MVP should avoid introducing a custom event bus unless a real need emerges.
If internal event-style naming is needed, use past-tense domain events in camelCase constants or functions:
- `rsvpSubmitted`
- `adminLoggedIn`
- `rsvpExportRequested`

Payloads should stay minimal and domain-specific.

**State Management Patterns:**
- Prefer server-rendered data first
- Use local component state for form interaction
- Use URL state for admin filters/sorting when shareable or reload-safe
- Avoid global client state unless a clear cross-page need appears
- Keep state close to the component that owns it

### Process Patterns

**Error Handling Patterns:**
- Validation errors returned as structured field errors
- Operational errors logged server-side and shown to users as safe, simple messages
- Do not expose stack traces or raw database/auth errors to the client
- Guest-facing errors should be calm and actionable
- Admin-facing errors may be slightly more specific but still sanitized

**Loading State Patterns:**
- Form submissions use local pending states
- Disable submit buttons while pending
- Show inline status near the relevant action, not detached global banners
- Use skeletons or lightweight placeholders only where loading is meaningfully visible
- Avoid full-page blocking loaders for small mutations

**Validation Patterns:**
- Server-side validation is authoritative
- Client-side validation should mirror core constraints only for immediate UX feedback
- Shared schemas should define validation rules once and be reused
- Sanitization happens before persistence, especially for free-text fields

### Enforcement Guidelines

**All AI Agents MUST:**
- keep database naming in snake_case and application code naming in TypeScript-friendly camelCase/PascalCase
- return structured results from Server Actions instead of ad hoc booleans or strings
- preserve the boundary between public guest features and protected admin functionality
- keep validation server-first and reuse shared schemas where possible
- avoid introducing global state, event buses, or extra abstraction unless explicitly required by scope
- colocate feature logic predictably so future agents can extend it without guessing

**Pattern Enforcement:**
- Review new files against naming and placement rules
- Reject inconsistent action result shapes
- Treat new abstractions as suspicious unless multiple features truly need them
- Update this architecture document before introducing a new cross-cutting pattern

### Pattern Examples

**Good Examples:**
- `src/components/sections/HeroSection.tsx`
- `src/lib/validation/rsvp.ts`
- `src/lib/auth/admin-session.ts`
- `submitRsvp()` returning `{ ok, message, fieldErrors }`
- Prisma model mapped to `rsvp_submissions` with UI-facing mapper if needed

**Anti-Patterns:**
- Mixing `snake_case` and `camelCase` randomly in app-layer TypeScript
- Returning raw strings like `"success"` from one action and `{ success: true }` from another
- Putting admin-only helpers in public component folders
- Adding Redux/Zustand before a real shared-state need exists
- Using full-screen loading states for simple RSVP form submissions
- Exposing raw database or auth failure messages directly to guests

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
wedding-site/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── components.json
├── .gitignore
├── .env.example
├── .env.local
├── middleware.ts
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── gallery/
│   │   ├── venue/
│   │   └── og/
│   ├── icons/
│   └── fonts/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── rsvps/
│   │   │   │   └── page.tsx
│   │   │   └── export/
│   │   │       └── page.tsx
│   │   └── actions/
│   │       ├── submit-rsvp.ts
│   │       ├── login-admin.ts
│   │       ├── logout-admin.ts
│   │       └── export-rsvps.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Section.tsx
│   │   │   └── FormMessage.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── EventDetailsSection.tsx
│   │   │   ├── VenueSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── RsvpSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── GalleryTeaserSection.tsx
│   │   ├── forms/
│   │   │   ├── RsvpForm.tsx
│   │   │   └── AdminLoginForm.tsx
│   │   └── admin/
│   │       ├── AdminShell.tsx
│   │       ├── RsvpTable.tsx
│   │       ├── RsvpFilters.tsx
│   │       ├── AttendanceSummary.tsx
│   │       └── ExportButton.tsx
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── admin-session.ts
│   │   │   ├── auth-cookie.ts
│   │   │   └── require-admin.ts
│   │   ├── db/
│   │   │   ├── client.ts
│   │   │   ├── queries/
│   │   │   │   ├── rsvp.ts
│   │   │   │   └── dashboard.ts
│   │   │   └── mappers/
│   │   │       └── rsvp-mapper.ts
│   │   ├── validation/
│   │   │   ├── rsvp.ts
│   │   │   └── admin-login.ts
│   │   ├── constants/
│   │   │   ├── site.ts
│   │   │   └── rsvp.ts
│   │   ├── formatters/
│   │   │   ├── date-format.ts
│   │   │   └── attendance-format.ts
│   │   ├── security/
│   │   │   ├── rate-limit.ts
│   │   │   ├── sanitize-input.ts
│   │   │   └── csrf.ts
│   │   ├── metadata/
│   │   │   └── site-metadata.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       └── env.ts
│   ├── types/
│   │   ├── rsvp.ts
│   │   ├── admin.ts
│   │   └── actions.ts
│   └── content/
│       ├── site-content.ts
│       ├── faq-content.ts
│       └── timeline-content.ts
├── tests/
│   ├── integration/
│   │   ├── rsvp-submission.test.ts
│   │   ├── admin-auth.test.ts
│   │   └── export-rsvps.test.ts
│   ├── e2e/
│   │   ├── guest-rsvp.spec.ts
│   │   └── admin-dashboard.spec.ts
│   └── fixtures/
│       └── rsvp-submissions.ts
└── docs/
    └── architecture-decisions/
```

### Architectural Boundaries

**API Boundaries:**
- Public write boundary:
  - `submit-rsvp.ts`
- Admin mutation boundaries:
  - `login-admin.ts`
  - `logout-admin.ts`
  - `export-rsvps.ts`
- No public route may directly expose RSVP records
- All admin reads must pass through authenticated server-rendered boundaries

**Component Boundaries:**
- `components/sections/*` only render guest-facing content sections
- `components/forms/*` own local form interaction only
- `components/admin/*` only serve protected admin pages
- `components/ui/*` must remain domain-agnostic reusable primitives

**Service Boundaries:**
- `lib/auth/*` owns session verification and route protection
- `lib/db/*` owns persistence concerns only
- `lib/validation/*` owns shared schemas and validation rules
- `lib/security/*` owns anti-spam, sanitization, and request protection
- `lib/metadata/*` owns SEO/share metadata generation

**Data Boundaries:**
- Prisma schema is the single source of truth for persistence structure
- Database naming remains snake_case
- UI/domain types remain TypeScript-friendly and app-facing
- Query modules in `lib/db/queries/*` are the only place that should directly talk to Prisma for feature reads/writes

### Requirements to Structure Mapping

**Feature / FR Mapping:**

- **Guest Information Access**
  - `src/app/page.tsx`
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/EventDetailsSection.tsx`
  - `src/components/sections/VenueSection.tsx`
  - `src/components/sections/TimelineSection.tsx`
  - `src/components/sections/FaqSection.tsx`
  - `src/components/sections/ContactSection.tsx`
  - `src/content/*`

- **RSVP Management**
  - `src/components/sections/RsvpSection.tsx`
  - `src/components/forms/RsvpForm.tsx`
  - `src/app/actions/submit-rsvp.ts`
  - `src/lib/validation/rsvp.ts`
  - `src/lib/db/queries/rsvp.ts`
  - `prisma/schema.prisma`

- **Admin RSVP Operations**
  - `src/app/admin/dashboard/page.tsx`
  - `src/app/admin/rsvps/page.tsx`
  - `src/app/admin/export/page.tsx`
  - `src/components/admin/*`
  - `src/app/actions/export-rsvps.ts`
  - `src/lib/auth/*`
  - `src/lib/db/queries/dashboard.ts`

- **Admin Support & Resolution**
  - `src/components/admin/RsvpTable.tsx`
  - `src/components/admin/RsvpFilters.tsx`
  - `src/components/admin/AttendanceSummary.tsx`
  - `src/lib/db/queries/rsvp.ts`

- **Sharing & Discovery**
  - `src/lib/metadata/site-metadata.ts`
  - `public/images/og/`
  - `src/app/layout.tsx`

- **Scope-linked extended capabilities**
  - Gallery teaser: `src/components/sections/GalleryTeaserSection.tsx`
  - Travel/accommodation if added later: new section file under `components/sections/`
  - Calendar-related features if added later: separate helper under `lib/formatters/` or `lib/utils/`

**Cross-Cutting Concerns:**
- Authentication: `middleware.ts`, `src/lib/auth/*`
- Validation: `src/lib/validation/*`
- Security/sanitization: `src/lib/security/*`
- Metadata/SEO: `src/lib/metadata/*`
- Formatting: `src/lib/formatters/*`
- Shared constants: `src/lib/constants/*`

### Integration Points

**Internal Communication:**
- `page.tsx` composes guest-facing sections
- forms call Server Actions directly
- admin pages read data server-side from `lib/db/queries/*`
- auth helpers gate admin pages before component rendering
- validation modules are reused by actions before persistence

**External Integrations:**
- Vercel hosting/runtime
- Vercel Postgres via Prisma
- optional future anti-spam provider through `lib/security/`
- optional analytics later, without leaking into section components

**Data Flow:**
1. Guest opens static homepage
2. Guest submits RSVP via `RsvpForm`
3. `submitRsvp` validates + sanitizes input
4. Prisma persists RSVP to Postgres
5. Action returns structured result
6. Admin logs in through protected flow
7. Admin pages query RSVP data server-side
8. Export action generates restricted admin-only output

### File Organization Patterns

**Configuration Files:**
- root-level config for framework/tooling only
- env examples documented in `.env.example`
- secrets never committed

**Source Organization:**
- route-driven app shell in `src/app`
- reusable view primitives in `src/components/ui`
- domain sections grouped by purpose
- business logic under `src/lib`
- content constants isolated from rendering logic

**Test Organization:**
- integration tests for auth, RSVP, export flows in `tests/integration`
- e2e tests for guest/admin journeys in `tests/e2e`
- fixtures in `tests/fixtures`
- optional unit tests may be colocated later if needed

**Asset Organization:**
- hero/gallery/venue/OG assets separated by usage
- avoid mixing content images with icons
- large media kept organized by page purpose

### Development Workflow Integration

**Development Server Structure:**
- local development mainly exercises homepage, RSVP flow, and admin dashboard independently
- server actions remain easy to inspect by feature boundary

**Build Process Structure:**
- static public sections optimize well through App Router
- admin pages remain isolated from public rendering concerns
- Prisma and env-dependent logic stay out of static content modules

**Deployment Structure:**
- Vercel deploys the full app
- public content benefits from static-first delivery
- secure env vars support auth/database
- database migration workflow remains tied to Prisma directory structure

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All architectural decisions are fully compatible and work together without conflicts:
- Next.js 16.2.4 with TypeScript and Tailwind CSS form a proven, stable foundation
- Prisma ORM integrates natively with Vercel Postgres through platform-native connection pooling
- Server Actions align naturally with the chosen Next.js App Router architecture
- JWT session cookies work seamlessly with Next.js middleware for admin route protection
- Static-first rendering with selective dynamic behavior is a core Next.js capability
- Vercel deployment unifies hosting, database, and environment management in a single platform

No version conflicts, incompatible patterns, or contradictory decisions were identified.

**Pattern Consistency:**
Implementation patterns fully support and reinforce architectural decisions:
- Naming conventions (snake_case for database, camelCase/PascalCase for TypeScript) align with ecosystem standards
- Structure patterns reflect App Router conventions and feature-based organization
- Format patterns (structured ActionResult) provide consistency across all Server Actions
- Communication patterns avoid unnecessary abstraction while maintaining clarity
- Process patterns (error handling, loading states, validation) are practical and scope-appropriate

**Structure Alignment:**
The project structure directly enables all architectural decisions:
- App Router organization supports static public pages and protected admin routes
- Clear separation between `components/sections`, `components/admin`, and `app/actions`
- `lib/*` organization isolates cross-cutting concerns (auth, db, validation, security)
- Prisma directory structure supports versioned migrations and schema evolution
- Test organization mirrors feature boundaries for maintainability

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 38 functional requirements are architecturally supported:

- **Guest Information Access (FR1-7):** Fully covered by static section components, App Router pages, and content organization
- **RSVP Management (FR8-13):** Fully covered by RsvpForm, submit-rsvp Server Action, Prisma schema, and validation layer
- **Guest Experience & Content Clarity (FR14-17):** Fully covered by mobile-first Tailwind configuration, semantic component structure, and UX-driven section organization
- **Admin RSVP Operations (FR18-23):** Fully covered by protected admin routes, dashboard queries, export action, and attendance summary components
- **Admin Support & Resolution (FR24-27):** Fully covered by admin RSVP table, filters, and query layer for operational workflows
- **Sharing & Discovery (FR28-30):** Fully covered by Next.js Metadata API, OG image assets, and site metadata helpers
- **Scope-Linked Extended Capabilities (FR31-35):** Fully covered by section component architecture and content structure extensibility
- **Product Administration Boundaries (FR36-38):** Fully covered by single-admin auth flow, middleware protection, and admin/public separation

**Non-Functional Requirements Coverage:**
All 20 non-functional requirements are architecturally addressed:

- **Performance (5 NFRs):** Static generation for public content, Next.js image optimization, Server Actions for fast mutations, lazy loading patterns, and Vercel edge delivery meet all performance targets (3s homepage, 5s info access, 2s RSVP feedback)
- **Security (5 NFRs):** JWT session cookies, server-side validation, input sanitization, environment variable secrets, and admin route protection cover all security requirements
- **Reliability (4 NFRs):** Prisma durable persistence, structured action results with clear success/failure states, Vercel platform uptime, and serverless architecture ensure reliability during traffic spikes
- **Accessibility (5 NFRs):** Semantic HTML structure, Tailwind responsive utilities, labeled form inputs, sufficient contrast through design system, and mobile-first approach meet WCAG AA requirements
- **Lightweight Scalability (3 NFRs):** Serverless architecture, static-first delivery, and Vercel auto-scaling handle expected traffic patterns without complex infrastructure

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical architectural decisions are documented with sufficient detail for implementation:
- Technology stack fully specified with verified versions
- Database, ORM, authentication, API pattern, state management, and hosting decisions all documented with rationale
- Implementation sequence clearly defined (10 ordered steps from project init to production validation)
- Cross-component dependencies explicitly mapped
- Deferred decisions identified and justified

**Structure Completeness:**
Project structure is comprehensive and implementation-ready:
- Complete directory tree with all expected files and directories
- All architectural boundaries defined (API, component, service, data)
- Requirements mapped to specific file locations
- Integration points and data flow explicitly documented
- Configuration, source, test, and asset organization patterns specified

**Pattern Completeness:**
Implementation patterns prevent AI agent conflicts:
- Naming conventions cover database, API, and code levels with concrete examples
- Structure patterns define file placement and organization rules
- Format patterns establish consistent Server Action result shapes
- Communication patterns avoid unnecessary complexity while maintaining clarity
- Process patterns (error handling, loading states, validation) fully specified with good/anti-pattern examples
- Enforcement guidelines provide clear rules for all AI agents

### Gap Analysis Results

**Critical Gaps:** None

**Important Gaps:** None

**Nice-to-Have Gaps:**
- Testing framework configuration details (Jest or Vitest setup) - can be addressed during first test implementation story
- Specific rate limiting implementation approach - deferred to implementation phase when traffic patterns are better understood
- Detailed Prisma schema field definitions - will be defined in first database migration story based on RSVP requirements
- Specific password hashing library choice (bcrypt vs argon2) - implementation detail that does not affect architecture

These gaps do not block implementation and can be resolved during the implementation phase without architectural changes.

### Validation Issues Addressed

No critical or important validation issues were identified. The architecture is coherent, complete, and ready to guide AI agent implementation.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

All 16 checklist items are complete, no critical gaps remain, and all requirements are architecturally supported. The architecture provides clear, consistent guidance for AI agent implementation.

**Key Strengths:**
- Clear separation between public guest surface and protected admin functionality
- Static-first approach optimizes for performance requirements while maintaining flexibility
- Comprehensive implementation patterns prevent common AI agent conflicts
- Technology stack is proven, well-integrated, and appropriate for project scale
- Structure and boundaries are explicit enough to guide implementation without over-specification
- All functional and non-functional requirements have clear architectural support
- Deferred decisions are identified and justified, not overlooked

**Areas for Future Enhancement:**
- Real-time RSVP updates in admin interface (currently deferred, can be added post-MVP)
- Advanced analytics and observability beyond platform defaults (can be added when operational needs justify it)
- Multi-admin support or role-based access control (not needed for current scope, but structure supports future extension)
- Background reminder automation workflows (deferred, can be added as operational need emerges)
- CDN/media pipeline beyond Vercel defaults (current approach sufficient for expected scale)

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries defined in this document
- Refer to this architecture document for all architectural questions
- Do not introduce new patterns or abstractions without updating this document first
- Preserve the separation between public guest features and protected admin functionality
- Keep validation server-first and reuse shared schemas
- Return structured ActionResult objects from all Server Actions
- Maintain database naming in snake_case and application code in camelCase/PascalCase
- Colocate feature logic predictably within the defined structure

**First Implementation Priority:**

```bash
npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint --src-dir
```

This command initializes the project with the chosen starter template. After initialization, the next priorities are:
1. Configure Vercel deployment and environment variables
2. Add Prisma and connect Vercel Postgres
3. Define initial RSVP schema and run first migration
4. Build guest-facing static content sections
5. Implement RSVP submission via Server Actions with validation
