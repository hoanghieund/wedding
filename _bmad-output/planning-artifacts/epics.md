---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/prd.md
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/architecture.md
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/ux-design-specification.md
---

# wedding - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for wedding, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Guests can access a public wedding website through a shared link.
FR2: Guests can view the couple names and wedding date on first entry to the website.
FR3: Guests can view event details, including venue, schedule, dress code, and RSVP deadline.
FR4: Guests can access venue location information and a map link.
FR5: Guests can review frequently asked questions related to the wedding event.
FR6: Guests can access contact information for follow-up questions or support.
FR7: Guests can revisit the website later and retrieve the same core event information without re-learning the interface.
FR8: Guests can submit an RSVP response without creating an account.
FR9: Guests can provide the information required for RSVP submission, including attendance intent and other requested details.
FR10: Guests can receive a clear confirmation after successfully submitting an RSVP.
FR11: The system can store RSVP submissions for later review.
FR12: The system can distinguish between submitted and non-submitted RSVP responses.
FR13: The system can retain guest-submitted RSVP details for operational follow-up.
FR14: Guests can identify the most important event information without navigating through unnecessary content.
FR15: Guests can understand the structure of the wedding information through clear sectioning and content hierarchy.
FR16: Guests can access content that is readable on mobile devices without requiring zoom for normal use.
FR17: Guests can complete the primary information and RSVP journey in a way that minimizes confusion and follow-up questions.
FR18: The admin can access RSVP submission records.
FR19: The admin can review individual RSVP responses.
FR20: The admin can view attendance-related totals derived from RSVP submissions.
FR21: The admin can export RSVP data for external planning use.
FR22: The admin can identify guests who have not yet responded.
FR23: The admin can support reminder workflows for non-responders.
FR24: The admin can verify whether a guest RSVP submission has been received.
FR25: The admin can inspect guest RSVP details when resolving questions or uncertainty.
FR26: The admin can use website-managed information and RSVP records to reduce manual coordination across chat threads.
FR27: The admin can update website content when repeated guest confusion reveals missing or unclear logistics.
FR28: Guests can open the website from messaging apps and access the intended content directly.
FR29: Shared website links can present appropriate preview metadata for guests before opening.
FR30: The website can expose descriptive metadata for search and link-sharing contexts.
FR31: Guests can view important notes such as dress code and event guidance.
FR32: The website can present a timeline or schedule view for wedding activities.
FR33: The website can support a gallery teaser or photo-oriented presentation if included in release scope.
FR34: The website can support travel and accommodation guidance if included in release scope.
FR35: The website can support calendar-related event information if included in release scope.
FR36: The product can support a single administrator managing guest responses and content operations.
FR37: The product can separate guest-facing access from admin-facing RSVP management functions.
FR38: The product can support reminder-oriented operational workflows without requiring guests to authenticate.

### NonFunctional Requirements

NFR1: The homepage should display core above-the-fold content within 3 seconds on a typical mobile network.
NFR2: Guests should be able to access key event information within 5 seconds of opening the website.
NFR3: RSVP submission feedback should be shown within 2 seconds after a valid submission attempt under normal operating conditions.
NFR4: The website should maintain a smooth browsing experience on modern mobile devices without requiring high-end hardware.
NFR5: Image-heavy content should not block access to essential event details or RSVP actions.
NFR6: RSVP and guest-submitted data must be protected in transit and at rest.
NFR7: Admin-facing RSVP management functions must be accessible only to the authorized administrator.
NFR8: The system must validate and sanitize RSVP form input before storage or downstream use.
NFR9: The product must avoid exposing guest response data publicly.
NFR10: Secrets and operational credentials must not be stored in client-exposed code or public configuration.
NFR11: The website should remain available throughout the guest access period, especially after invitations are distributed and near the RSVP deadline.
NFR12: RSVP submissions must be stored durably so valid guest responses are not lost during normal operation.
NFR13: The system should provide a clear success or failure state for RSVP submission attempts.
NFR14: Guests should not be left in an ambiguous state after submitting a response.
NFR15: Text content must remain readable on modern mobile devices without requiring zoom during standard use.
NFR16: The site must provide sufficient visual hierarchy and contrast to support comfortable reading.
NFR17: RSVP form fields must be clearly labeled.
NFR18: Important event information must not rely solely on decorative imagery for comprehension.
NFR19: The content structure should remain understandable through semantic sectioning and headings.
NFR20: The system should support peak guest traffic around invitation sharing and RSVP deadlines without degrading the core guest journey.
NFR21: The product should handle the expected scale of a personal wedding website without requiring complex infrastructure.
NFR22: The architecture should allow modest traffic growth or repeated guest revisits without major redesign.

### Additional Requirements

- Initialize the implementation with Next.js 16 create-next-app using TypeScript, Tailwind CSS, App Router, ESLint, and src directory support.
- Treat project initialization with the selected Next.js starter as the first implementation story.
- Use a static-first architecture for guest-facing content, with dynamic behavior limited to RSVP submission and admin workflows.
- Use Vercel as the hosting platform and deployment target.
- Use Vercel Postgres for durable RSVP data storage.
- Use Prisma ORM with versioned migrations committed to the codebase.
- Use Next.js Server Actions as the primary pattern for RSVP submission and admin mutations.
- Implement simple password-based admin authentication with JWT-backed secure HTTP-only session cookies.
- Enforce a hard boundary between the public guest surface and protected admin functionality.
- Apply server-side validation as the source of truth, with shared schemas reused across RSVP and admin flows.
- Validate and sanitize all RSVP inputs before persistence or export use.
- Protect public RSVP submission with lightweight abuse/rate-limiting controls.
- Keep admin reads fresh and uncached; do not cache RSVP write operations.
- Serve guest-facing informational content through static caching.
- Optimize hero and gallery media delivery with built-in image optimization and lazy loading.
- Keep client-side JavaScript minimal and avoid unnecessary global state.
- Keep admin-only logic out of the public bundle.
- Use Vercel-managed environment variables for database connection strings, admin secrets, and optional anti-spam or analytics keys.
- Keep monitoring/logging simple for MVP, focused on deployment logs and server-side RSVP/admin errors.
- Preserve the defined project boundaries for auth, db, validation, metadata, and security modules.

### UX Design Requirements

UX-DR1: Implement a mobile-first single-page narrative flow that progresses through hero, event details, venue, schedule, RSVP, FAQ, and contact sections.
UX-DR2: Implement a hero section with a large couple image and visible overlay for couple names and event date.
UX-DR3: Keep the RSVP primary call-to-action visually prominent and easy to rediscover during scrolling, potentially with sticky placement.
UX-DR4: Use clear card-like section separation with generous spacing so each major content block feels distinct and easy to scan.
UX-DR5: Apply a restrained warm palette with a soft accent color and off-white neutral background to create an elegant but readable tone.
UX-DR6: Implement a three-tier text color hierarchy for primary, secondary, and tertiary content.
UX-DR7: Use a typography-led hierarchy with system font stacks and the specified mobile-first type scale for H1, H2, H3, body, small text, and labels.
UX-DR8: Apply an 8px-based spacing system with generous vertical rhythm, including at least 64px section separation on mobile and 96px on desktop.
UX-DR9: Ensure all interactive controls meet a minimum 44x44px touch target size.
UX-DR10: Use 8px radius for buttons and inputs, 12px radius for cards/section containers, and subtle elevation rules for standard, hover, and modal states.
UX-DR11: Make date, venue, RSVP CTA, and schedule context visible with minimal effort immediately after page load.
UX-DR12: Provide a one-tap map action for venue access.
UX-DR13: Use progressive disclosure via FAQ accordion patterns for secondary supporting content.
UX-DR14: Build the RSVP form with minimal required fields, mobile-friendly controls, and clear labels.
UX-DR15: Provide inline form validation while users complete RSVP fields, with errors localized and understandable.
UX-DR16: Disable decorative or heavy motion patterns that compete with clarity, and respect prefers-reduced-motion.
UX-DR17: Provide an explicit RSVP confirmation state that summarizes what was submitted and removes ambiguity about whether the response was recorded.
UX-DR18: Maintain clear success, error, and warning semantic states with accessible contrast.
UX-DR19: Preserve semantic HTML structure, proper heading hierarchy, labels, and ARIA support where appropriate.
UX-DR20: Ensure all color and typography choices satisfy WCAG AA contrast requirements.
UX-DR21: Avoid hidden critical navigation, autoplay media, carousel-based critical content, modal overload, and heavy decorative animations.
UX-DR22: Support repeat-visit clarity so returning guests can recover venue, RSVP deadline, and logistics quickly.
UX-DR23: Include direct-action contact/support links that remain easy to find for reassurance.
UX-DR24: Keep the design calm, warm, and confidence-building, favoring clarity over novelty-driven interactions.

### FR Coverage Map

- FR1: Epic 2 - Public wedding website access
- FR2: Epic 2 - Couple names and wedding date on entry
- FR3: Epic 2 - Event details display
- FR4: Epic 2 - Venue and map link access
- FR5: Epic 2 - FAQ access
- FR6: Epic 2 - Contact information access
- FR7: Epic 2 - Repeat-visit clarity
- FR8: Epic 3 - RSVP without account
- FR9: Epic 3 - RSVP data entry
- FR10: Epic 3 - Clear submission confirmation
- FR11: Epic 3 - RSVP storage
- FR12: Epic 3 - Submitted vs non-submitted distinction
- FR13: Epic 3 - RSVP data retention for follow-up
- FR14: Epic 2 - Information discoverability
- FR15: Epic 2 - Content hierarchy clarity
- FR16: Epic 2 - Mobile readability
- FR17: Epic 2 - Low-confusion guest journey
- FR18: Epic 5 - Admin access to RSVP records
- FR19: Epic 5 - Individual RSVP review
- FR20: Epic 5 - Attendance totals
- FR21: Epic 5 - RSVP export
- FR22: Epic 5 - Non-responder identification
- FR23: Epic 5 - Reminder support
- FR24: Epic 5 - Submission verification
- FR25: Epic 5 - Guest RSVP detail inspection
- FR26: Epic 5 - Reduced manual coordination
- FR27: Epic 5 - Content update support from guest confusion
- FR28: Epic 2 - Messaging-app entry
- FR29: Epic 2 - Link preview metadata
- FR30: Epic 2 - Search/share metadata
- FR31: Epic 2 - Important notes and dress code
- FR32: Epic 2 - Timeline/schedule view
- FR33: Epic 2 - Gallery teaser support
- FR34: Epic 2 - Travel/accommodation support
- FR35: Epic 2 - Calendar-related support
- FR36: Epic 4 - Single-admin operation
- FR37: Epic 4 - Guest/admin separation
- FR38: Epic 4 - Admin workflows without guest auth

## Epic List

### Epic 1: Project Foundation & Infrastructure
Set up the production-ready application foundation so all guest-facing and admin-facing capabilities can be built on a secure, consistent, and low-maintenance platform.

**FRs covered:** Supporting architecture requirements for initialization, deployment, database, validation, and security boundaries.

### Epic 2: Guest Information Experience
Allow guests to open the wedding website and quickly understand the key event information, venue, schedule, dress code, and contact details on a mobile-first interface.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR14, FR15, FR16, FR17, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35

### Epic 3: Guest RSVP Submission
Allow guests to complete RSVP quickly without authentication, with clear validation and an unambiguous confirmation that their response was recorded.

**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR13

### Epic 4: Admin Authentication & Protected Access
Allow the single administrator to securely access protected wedding operations without exposing admin capabilities to guests.

**FRs covered:** FR36, FR37, FR38

### Epic 5: Admin RSVP Management & Operations
Allow the administrator to review RSVP responses, verify guest status, track attendance, export data, and support follow-up workflows confidently.

**FRs covered:** FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Project Foundation & Infrastructure

Set up the production-ready application foundation so all guest-facing and admin-facing capabilities can be built on a secure, consistent, and low-maintenance platform.

### Story 1.1: Initialize Next.js Application with Production Configuration

As a developer,
I want to initialize the Next.js 16 project with TypeScript, Tailwind CSS, App Router, and ESLint,
So that the application foundation is ready for feature development with modern tooling and best practices.

**Acceptance Criteria:**

**Given** a clean development environment
**When** the project is initialized using `npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint --src-dir`
**Then** the project structure includes `src/app`, `src/components`, `public/`, and configuration files
**And** TypeScript compilation succeeds without errors
**And** Tailwind CSS is configured and functional
**And** ESLint runs without configuration errors
**And** the development server starts successfully on `npm run dev`

### Story 1.2: Configure Vercel Deployment and Environment Variables

As a developer,
I want to configure Vercel deployment with environment variable management,
So that the application can be deployed securely with proper secret handling.

**Acceptance Criteria:**

**Given** the Next.js project is initialized
**When** Vercel deployment is configured
**Then** the project is connected to a Vercel project
**And** environment variables are configured in Vercel dashboard (DATABASE_URL, ADMIN_SECRET placeholders)
**And** `.env.example` file documents all required environment variables
**And** `.env.local` is added to `.gitignore`
**And** a preview deployment succeeds
**And** the production deployment URL is accessible

### Story 1.3: Set Up Prisma ORM with Vercel Postgres

As a developer,
I want to configure Prisma ORM connected to Vercel Postgres,
So that the application has a type-safe database layer ready for RSVP data storage.

**Acceptance Criteria:**

**Given** Vercel deployment is configured
**When** Prisma is installed and configured
**Then** `prisma/schema.prisma` is created with datasource pointing to Vercel Postgres
**And** Prisma Client is generated successfully
**And** database connection is verified via `prisma db push` or initial migration
**And** `src/lib/db/client.ts` exports a singleton Prisma Client instance
**And** TypeScript recognizes Prisma types without errors

### Story 1.4: Define Project Structure and Module Boundaries

As a developer,
I want to establish the project directory structure with clear module boundaries,
So that future features follow consistent organization patterns.

**Acceptance Criteria:**

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

## Epic 2: Guest Information Experience

Allow guests to open the wedding website and quickly understand the key event information, venue, schedule, dress code, and contact details on a mobile-first interface.

### Story 2.1: Create the Wedding Landing Page Shell

As a guest,
I want to open the wedding website and immediately see a clear, elegant landing experience,
So that I can quickly understand whose wedding it is and where to look next.

**Acceptance Criteria:**

**Given** a guest opens the public website on mobile or desktop
**When** the homepage loads
**Then** the page shows a hero section with couple names and wedding date above the fold
**And** the layout uses a mobile-first single-page structure with clear section order
**And** the styling applies the defined typography, spacing, and color hierarchy
**And** the page remains readable without zoom on small screens
**And** the initial viewport communicates the primary call to action clearly

### Story 2.2: Add Event Details and Schedule Sections

As a guest,
I want to view the key wedding details and event schedule in a structured way,
So that I can understand the logistics without asking follow-up questions.

**Acceptance Criteria:**

**Given** a guest scrolls through the wedding website
**When** they reach the event details area
**Then** the page displays venue, date, RSVP deadline, dress code, and event guidance in clearly separated sections
**And** the page includes a timeline or schedule block for wedding activities
**And** important information is presented with semantic headings and clear visual hierarchy
**And** content is scannable on mobile devices without dense or cluttered presentation

### Story 2.3: Add Venue Map and Contact Actions

As a guest,
I want quick actions to open the venue map and access contact information,
So that I can get help or directions with minimal effort.

**Acceptance Criteria:**

**Given** a guest views the venue and contact sections
**When** they choose a venue or support action
**Then** the venue section provides a one-tap map link
**And** the contact section provides direct-action contact links
**And** both actions are easy to identify on mobile
**And** interactive controls meet the minimum touch target size requirements

### Story 2.4: Add FAQ and Repeat-Visit Clarity Support

As a returning guest,
I want to quickly recover important answers and logistics when I revisit the website,
So that I do not need to re-learn the page or message the couple again.

**Acceptance Criteria:**

**Given** a guest revisits the website later
**When** they scan the content for answers
**Then** the FAQ section presents common questions using progressive disclosure
**And** core logistics such as venue, RSVP deadline, and schedule remain easy to rediscover
**And** the information architecture supports fast repeat visits without confusion
**And** critical information is not hidden behind complex navigation or modal flows

### Story 2.5: Add Metadata and Sharing Preview Support

As a guest receiving the wedding link in a messaging app,
I want the shared link to show a useful preview and open correctly,
So that I can trust the link and access the intended content directly.

**Acceptance Criteria:**

**Given** the wedding website is shared via messaging apps or opened in a browser
**When** the link preview metadata is generated
**Then** the page includes descriptive title, metadata, and Open Graph tags
**And** the preview communicates the wedding context appropriately
**And** the website opens directly to the intended homepage content
**And** metadata implementation does not expose private guest data

### Story 2.6: Add Optional Content Sections for Gallery, Travel, and Calendar Support

As a guest,
I want to access optional supporting content such as gallery teaser, travel guidance, and calendar-related event information when included,
So that I can prepare more easily for the wedding.

**Acceptance Criteria:**

**Given** optional content is included in release scope
**When** a guest browses the wedding page
**Then** the site can render a gallery teaser section without blocking essential information
**And** the site can render travel or accommodation guidance in the same visual system
**And** the site can expose calendar-related event information in a clear and actionable way
**And** optional sections do not reduce clarity of the core guest journey

## Epic 3: Guest RSVP Submission

Allow guests to complete RSVP quickly without authentication, with clear validation and an unambiguous confirmation that their response was recorded.

### Story 3.1: Create RSVP Database Schema and Migration

As a developer,
I want to define the RSVP database schema with Prisma,
So that guest RSVP submissions can be stored durably with proper data types.

**Acceptance Criteria:**

**Given** Prisma is configured and connected to Vercel Postgres
**When** the RSVP schema is defined
**Then** the `rsvp_submissions` table includes fields for guest_name, attendance_status, attendee_count, dietary_restrictions, guest_message, created_at, updated_at
**And** the Prisma schema uses snake_case for database fields
**And** a migration is created and applied successfully
**And** Prisma Client regenerates with the new RSVP types
**And** TypeScript recognizes the RSVP model types without errors

### Story 3.2: Create RSVP Validation Schema

As a developer,
I want to define shared validation rules for RSVP submissions,
So that validation logic is consistent across client and server.

**Acceptance Criteria:**

**Given** the RSVP database schema exists
**When** the validation schema is created in `src/lib/validation/rsvp.ts`
**Then** the schema defines validation rules for all RSVP fields (required fields, max lengths, allowed values)
**And** the schema is reusable for both Server Action validation and optional client-side validation
**And** the schema exports TypeScript types for RSVP input and validation errors
**And** validation rules align with database constraints

### Story 3.3: Build RSVP Form Component with Inline Validation

As a guest,
I want to fill out the RSVP form with clear labels and immediate feedback,
So that I can complete my response without confusion or submission errors.

**Acceptance Criteria:**

**Given** a guest views the RSVP section on the wedding page
**When** they interact with the RSVP form
**Then** the form includes minimal required fields with clear labels
**And** form controls are mobile-friendly with appropriate input types
**And** all interactive controls meet the 44x44px minimum touch target size
**And** inline validation provides immediate feedback as fields are completed
**And** error messages are localized, understandable, and non-technical
**And** the form respects prefers-reduced-motion for any transitions
**And** the form uses semantic HTML with proper labels and ARIA support

### Story 3.4: Implement RSVP Submission Server Action

As a guest,
I want my RSVP submission to be processed securely and stored durably,
So that my response is recorded correctly.

**Acceptance Criteria:**

**Given** a guest completes and submits the RSVP form
**When** the submission is processed by the Server Action
**Then** the Server Action validates input using the shared validation schema
**And** the Server Action sanitizes all free-text fields before storage
**And** valid submissions are stored in the `rsvp_submissions` table via Prisma
**And** the Server Action returns a structured result with success/failure state and field errors
**And** RSVP data is protected in transit and at rest
**And** the action completes within 2 seconds under normal conditions
**And** submission failures return clear, safe error messages without exposing internal details

### Story 3.5: Add RSVP Confirmation State

As a guest,
I want to see an explicit confirmation after submitting my RSVP,
So that I know my response was successfully recorded.

**Acceptance Criteria:**

**Given** a guest successfully submits an RSVP
**When** the Server Action returns success
**Then** the form is replaced with a clear confirmation state
**And** the confirmation summarizes what was submitted (name, attendance status)
**And** the confirmation removes ambiguity about whether the response was recorded
**And** the confirmation state uses accessible success styling with sufficient contrast
**And** guests are not left in an uncertain state after submission

### Story 3.6: Add Rate Limiting and Abuse Protection

As a developer,
I want to protect the RSVP submission endpoint from spam and abuse,
So that the system remains reliable during high-traffic periods.

**Acceptance Criteria:**

**Given** the RSVP submission Server Action is implemented
**When** rate limiting is applied
**Then** the system applies lightweight request protection to the RSVP action
**And** legitimate guest submissions are not blocked
**And** repeated rapid submissions from the same source are throttled
**And** rate-limited requests receive a clear, calm error message
**And** the protection mechanism is appropriate for a low-volume public form

## Epic 4: Admin Authentication & Protected Access

Allow the single administrator to securely access protected wedding operations without exposing admin capabilities to guests.

### Story 4.1: Create Admin Login Validation and Session Utilities

As a developer,
I want to define admin login validation and session management utilities,
So that authentication logic is reusable and secure across protected routes.

**Acceptance Criteria:**

**Given** the project structure is established
**When** admin auth utilities are created
**Then** `src/lib/validation/admin-login.ts` defines validation rules for admin credentials
**And** `src/lib/auth/admin-session.ts` defines JWT session creation and verification helpers
**And** `src/lib/auth/auth-cookie.ts` defines secure HTTP-only cookie configuration
**And** secrets are sourced only from environment variables
**And** no admin token or secret is exposed to client-side code

### Story 4.2: Implement Admin Login Server Action

As an administrator,
I want to log in with a password through a secure form,
So that I can access protected wedding operations.

**Acceptance Criteria:**

**Given** the admin login form is submitted with credentials
**When** the login Server Action processes the request
**Then** the credentials are validated using the shared admin login schema
**And** successful authentication creates a signed session cookie using secure HTTP-only settings
**And** failed authentication returns a safe and clear error message
**And** the action returns a structured result object for UI handling
**And** authentication logic does not expose internal secret values or implementation details

### Story 4.3: Build Admin Login Page and Form

As an administrator,
I want a dedicated admin login page,
So that I can access the protected admin area through a clear and reliable entry point.

**Acceptance Criteria:**

**Given** an administrator navigates to `/admin/login`
**When** the login page loads
**Then** the page displays a login form with clear labels and accessible controls
**And** the form submits through the admin login Server Action
**And** form-level and field-level errors are displayed clearly
**And** successful login redirects the administrator to the protected admin dashboard
**And** the page does not reveal protected admin content before authentication succeeds

### Story 4.4: Protect Admin Routes with Middleware and Session Checks

As an administrator,
I want admin-only routes to be protected automatically,
So that guest users cannot access private RSVP operations.

**Acceptance Criteria:**

**Given** a visitor attempts to access a protected admin route
**When** the middleware or server-side auth check runs
**Then** unauthenticated users are redirected to `/admin/login`
**And** authenticated users can access protected routes successfully
**And** all admin pages enforce session verification before rendering protected content
**And** guest-facing public routes remain accessible without authentication
**And** the security boundary between public and admin surfaces is consistently enforced

### Story 4.5: Implement Admin Logout Flow

As an administrator,
I want to log out securely,
So that I can end my session and prevent unauthorized reuse of admin access.

**Acceptance Criteria:**

**Given** an authenticated administrator is using the admin area
**When** they trigger logout
**Then** the session cookie is cleared securely
**And** the administrator is redirected to the login page or public homepage
**And** subsequent access to protected routes requires re-authentication
**And** logout does not expose internal auth state to client-side code

## Epic 5: Admin RSVP Management & Operations

Allow the administrator to review RSVP responses, verify guest status, track attendance, export data, and support follow-up workflows confidently.

### Story 5.1: Create RSVP Query Module and Data Mappers

As a developer,
I want to define reusable database queries for RSVP operations,
So that admin pages can access RSVP data consistently and efficiently.

**Acceptance Criteria:**

**Given** the RSVP database schema exists and admin authentication is implemented
**When** the RSVP query module is created in `src/lib/db/queries/rsvp.ts`
**Then** the module exports functions for fetching all RSVPs, fetching by ID, and filtering by status
**And** the module includes a mapper in `src/lib/db/mappers/rsvp-mapper.ts` to convert snake_case database fields to camelCase for UI consumption
**And** all queries use the Prisma Client singleton
**And** TypeScript types are properly inferred for query results

### Story 5.2: Build Admin Dashboard with RSVP Table

As an administrator,
I want to view all RSVP submissions in a structured table,
So that I can review guest responses at a glance.

**Acceptance Criteria:**

**Given** an authenticated administrator accesses `/admin/dashboard` or `/admin/rsvps`
**When** the admin dashboard page loads
**Then** the page displays a table of all RSVP submissions with key fields (guest name, attendance status, submission date)
**And** the data is fetched server-side using the RSVP query module
**And** the table is readable and scannable on both desktop and mobile
**And** the page does not expose RSVP data to unauthenticated users
**And** the page remains within the protected admin boundary

### Story 5.3: Add RSVP Filters and Individual Response Inspection

As an administrator,
I want to filter RSVPs by status and inspect individual responses in detail,
So that I can verify submissions and resolve guest questions efficiently.

**Acceptance Criteria:**

**Given** an administrator views the RSVP table
**When** they apply filters or select an individual RSVP
**Then** the table supports filtering by attendance status (attending, not attending, all)
**And** selecting an RSVP shows full details including dietary restrictions and guest messages
**And** filter state is preserved via URL parameters for shareable or reload-safe views
**And** individual RSVP inspection does not require page navigation away from the main table

### Story 5.4: Add Attendance Summary and Non-Responder Identification

As an administrator,
I want to see attendance totals and identify guests who have not responded,
So that I can track RSVP progress and plan follow-up reminders.

**Acceptance Criteria:**

**Given** an administrator views the admin dashboard
**When** attendance summary data is displayed
**Then** the dashboard shows total RSVPs, total attending, total not attending
**And** the dashboard identifies or highlights non-responders if guest list tracking is implemented
**And** attendance totals are computed server-side from fresh RSVP data
**And** the summary updates as new RSVPs are submitted

### Story 5.5: Implement RSVP Export Functionality

As an administrator,
I want to export RSVP data to a file,
So that I can use guest information for external planning and coordination.

**Acceptance Criteria:**

**Given** an authenticated administrator triggers the export action
**When** the export Server Action runs
**Then** the action fetches all RSVP submissions from the database
**And** the data is formatted as CSV or JSON for download
**And** the export includes all relevant fields (guest name, attendance, dietary restrictions, message, submission date)
**And** the export action is only accessible to authenticated administrators
**And** the export completes reliably without exposing guest data publicly

### Story 5.6: Add Content Update Support for Admin

As an administrator,
I want to update website content when guest confusion reveals missing or unclear logistics,
So that I can reduce repeated questions and improve the guest experience.

**Acceptance Criteria:**

**Given** an administrator identifies unclear content through guest feedback
**When** they update the content source files or configuration
**Then** the updated content is reflected on the public guest-facing website after deployment
**And** the admin has a clear path to modify static content sections
**And** content updates do not require database changes or complex workflows
**And** the update process aligns with the static-first architecture

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
