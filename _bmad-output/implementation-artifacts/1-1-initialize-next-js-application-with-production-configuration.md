# Story 1.1: Initialize Next.js Application with Production Configuration

Status: done

## Story

As a developer,
I want to initialize the Next.js 16 project with TypeScript, Tailwind CSS, App Router, and ESLint,
So that the application foundation is ready for feature development with modern tooling and best practices.

## Acceptance Criteria

**Given** a clean development environment
**When** the project is initialized using `npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint --src-dir`
**Then** the project structure includes `src/app`, `src/components`, `public/`, and configuration files
**And** TypeScript compilation succeeds without errors
**And** Tailwind CSS is configured and functional
**And** ESLint runs without configuration errors
**And** the development server starts successfully on `npm run dev`

## Tasks / Subtasks

- [x] Initialize Next.js 16 project with create-next-app (AC: all)
  - [x] Run initialization command with correct flags
  - [x] Verify project structure created correctly
- [x] Verify TypeScript configuration (AC: TypeScript compilation)
  - [x] Run `tsc --noEmit` to verify no compilation errors
  - [x] Check tsconfig.json includes path alias `@/*` → `./src/*`
- [x] Verify Tailwind CSS setup (AC: Tailwind functional)
  - [x] Check tailwind.config.ts exists and configured
  - [x] Verify PostCSS configuration for Tailwind v4
  - [x] Test Tailwind classes render correctly
- [x] Verify ESLint configuration (AC: ESLint runs cleanly)
  - [x] Run `npm run lint` successfully
  - [x] Verify @next/eslint-plugin-next is active
- [x] Verify development server (AC: dev server starts)
  - [x] Start dev server with `npm run dev`
  - [x] Verify server boots without errors
  - [x] Access localhost and confirm default page loads

## Dev Notes

### Epic Context

**Epic 1 Goal:** Set up the production-ready application foundation so all guest-facing and admin-facing capabilities can be built on a secure, consistent, and low-maintenance platform.

**This Story's Role:** First implementation story - establishes the baseline project structure and tooling that all subsequent stories depend on.

### Technical Requirements

**Required Stack & Versions:**
- **Next.js:** 16.2.4 (latest as of 2026-05-05)
- **React:** 19 (bundled with Next.js 16)
- **TypeScript:** Latest compatible version
- **Tailwind CSS:** v4 with PostCSS
- **ESLint:** Next.js ESLint plugin (@next/eslint-plugin-next)
- **Node.js:** Runtime with React 19 support

**Initialization Command:**
```bash
npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint --src-dir
```

**Required Flags Explained:**
- `--typescript`: Enable TypeScript support
- `--tailwind`: Include Tailwind CSS v4 configuration
- `--app`: Use App Router (not Pages Router)
- `--eslint`: Configure ESLint with Next.js rules
- `--src-dir`: Use `src/` directory structure

### Architecture Compliance

**Project Structure Requirements:**

Immediate structure from create-next-app:
```
wedding-site/
├── src/
│   ├── app/              # App Router pages and layouts
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies
└── .eslintrc.json        # ESLint rules
```

**Future Structure Compatibility:**

Preserve space for these directories (will be created in later stories):
- `src/lib/auth/` - Admin session management
- `src/lib/db/` - Database client and queries
- `src/lib/validation/` - Shared validation schemas
- `src/lib/security/` - Rate limiting and sanitization
- `src/lib/metadata/` - SEO and social metadata
- `src/lib/formatters/` - Date and data formatting
- `src/lib/constants/` - Application constants
- `src/components/ui/` - UI primitives
- `src/components/sections/` - Page sections
- `src/components/forms/` - Form components
- `src/components/admin/` - Admin-only components
- `src/app/actions/` - Server Actions
- `public/images/hero/`, `public/images/gallery/`, `public/images/venue/`, `public/images/og/`

**Import Alias:**
- Verify `tsconfig.json` includes path mapping: `"@/*": ["./src/*"]`
- All future imports should use `@/` prefix for src/ files

### Performance Requirements

**Static-First Architecture:**
- Default to static generation for public content
- Minimize client-side JavaScript
- Use built-in Next.js optimizations:
  - Image optimization (next/image)
  - Font optimization (next/font)
  - Automatic code splitting

**Performance Targets (from architecture):**
- Homepage above-the-fold content: ~3 seconds on mobile network
- Key event information accessible: within 5 seconds
- Smooth scrolling and minimal layout shift

**Optimization Patterns to Enable:**
- Lazy loading for images
- Static caching for guest-facing content
- Minimal global state
- Tree-shaking and bundle optimization

### Security Requirements

**Foundation Security Patterns:**
- Environment variable support for secrets (future stories will use)
- Clean separation between public and admin surfaces (structure must support)
- Server-side validation as source of truth (App Router enables this)
- No secrets in client-exposed code (Next.js handles this correctly by default)

**Security Boundaries to Preserve:**
- `src/app/` for public routes
- `src/app/admin/` for protected routes (future)
- `src/app/api/` for server endpoints (future)
- Server Actions in `src/app/actions/` (future)

### UX Constraints

**Mobile-First Foundation:**
- Initial app shell must support mobile-first single-page experience
- Touch-first spacing and layout
- Fast loading and smooth scrolling
- Strong readability without zoom

**Avoid in Initial Shell:**
- Dense multi-column layouts
- Hover-dependent interactions
- Heavy modal flows
- Heavy scripts/animations
- Autoplay media or carousel-based critical content

**Enable for Future Stories:**
- Hero-first orientation
- Obvious RSVP call-to-action placement
- Clean social preview metadata (Open Graph)
- Progressive disclosure patterns (FAQ accordions)
- Semantic HTML and WCAG AA contrast

### Testing Requirements

**Verification Checklist:**
1. **TypeScript:** Run `tsc --noEmit` - must pass with zero errors
2. **ESLint:** Run `npm run lint` - must pass with zero errors
3. **Dev Server:** Run `npm run dev` - must start without errors
4. **Build:** Run `npm run build` - must complete successfully
5. **Browser Test:** Access localhost - default page must render

**Quality Baseline:**
- All tooling must run cleanly from the start
- No configuration warnings or errors
- Dev server must boot reliably
- TypeScript strict mode should be enabled

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Use `src/` directory for all application code
- Use `public/` for static assets only
- Use App Router conventions (`app/` directory)
- Follow Next.js 16 file conventions (page.tsx, layout.tsx, etc.)

**Naming Conventions:**
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- Files: kebab-case for non-component files (e.g., `auth-utils.ts`)

### References

**Source Documents:**
- [Epic 1 Definition: epics.md#Epic 1: Project Foundation & Infrastructure]
- [Story 1.1 Requirements: epics.md#Story 1.1: Initialize Next.js Application with Production Configuration]
- [Architecture Stack: architecture.md#Selected Starter: Next.js (create-next-app)]
- [Architecture Initialization: architecture.md#Initialization Command]
- [Architecture Decisions: architecture.md#Architectural Decisions Provided by Starter]
- [Performance Targets: architecture.md#Non-Functional Requirements Coverage]
- [UX Platform Strategy: ux-design-specification.md#Platform Strategy]
- [UX Experience Principles: ux-design-specification.md#Experience Principles]
- [UX Design System: ux-design-specification.md#Design System Foundation]
- [UX Responsive Design: ux-design-specification.md#Responsive Design]
- [PRD Success Criteria: prd.md#Success Criteria]

## Dev Agent Record

### Agent Model Used

Claude Sonnet

### Debug Log References

- `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir` failed because the project root already contained BMAD directories.
- `npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint --src-dir` succeeded.
- Moved generated app files from `wedding-site/` into the project root to keep app code and BMAD artifacts in one workspace.
- Validation commands passed: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Verified dev server startup with `npm run dev` and HTTP 200 from `http://localhost:3000`.

### Completion Notes List

- Initialized Next.js 16.2.4 application with TypeScript, Tailwind CSS v4, App Router, and ESLint.
- Moved generated application into the project root and preserved existing BMAD planning/implementation artifacts.
- Verified required structure exists: `src/app`, `src/components`, `public`, `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`.
- Verified TypeScript path alias `@/*` maps to `./src/*`.
- Confirmed lint, type-check, build, and dev server startup all succeed.
- **Post-review fixes:** Updated package name to "wedding" and customized metadata for wedding context.

### File List

- package.json
- package-lock.json
- tsconfig.json
- next.config.ts
- next-env.d.ts
- eslint.config.mjs
- postcss.config.mjs
- .gitignore
- README.md
- src/app/layout.tsx
- src/app/page.tsx
- src/app/globals.css
- src/app/favicon.ico
- src/components
- public/file.svg
- public/globe.svg
- public/next.svg
- public/vercel.svg
- public/window.svg
- node_modules/ (generated dependency directory)
