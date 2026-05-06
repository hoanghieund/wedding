# Story 2.1: Create the Wedding Landing Page Shell

Status: review

## Story

As a guest,
I want to open the wedding website and immediately see a clear, elegant landing experience,
So that I can quickly understand whose wedding it is and where to look next.

## Acceptance Criteria

**Given** a guest opens the public website on mobile or desktop
**When** the homepage loads
**Then** the page shows a hero section with couple names and wedding date above the fold
**And** the layout uses a mobile-first single-page structure with clear section order
**And** the styling applies the defined typography, spacing, and color hierarchy
**And** the page remains readable without zoom on small screens
**And** the initial viewport communicates the primary call to action clearly

## Tasks / Subtasks

- [x] Implement hero section component (AC: hero section with couple names, date)
  - [x] Create `src/components/sections/hero.tsx`
  - [x] Define props for couple names and wedding date
  - [x] Style with responsive typography and spacing
  - [x] Ensure content visible above fold on mobile (375px width)
- [x] Set up page layout with section order (AC: section order, mobile-first)
  - [x] Update `src/app/page.tsx` with mobile-first layout
  - [x] Configure responsive section structure for future follow-up stories
  - [x] Keep the page as a simple single-page vertical flow
- [x] Apply typography and color hierarchy (AC: typography, spacing, colors)
  - [x] Update `src/app/globals.css` with warm neutral tokens
  - [x] Use accessible text contrast and spacing hierarchy
  - [x] Keep semantic heading hierarchy centered on a single hero `h1`
- [x] Validate mobile readability (AC: readable without zoom)
  - [x] Verify flexible typography through responsive classes
  - [x] Keep touch target size suitable for the primary CTA
  - [x] Confirm TypeScript passes with `rtk npx tsc --noEmit`
- [x] Configure primary CTA communication (AC: CTA visible)
  - [x] Implement a primary RSVP CTA in the hero
  - [x] Apply visible focus state and hover state
  - [x] Keep CTA positioned in the initial viewport

## Dev Notes

- Build the landing shell as a static-first App Router page in `src/app/page.tsx`.
- Keep the hero isolated in `src/components/sections/hero.tsx` so later stories can append additional sections without refactoring the first screen.
- Follow UX direction: calm, warm, confidence-building, strong typography, restrained decoration, mobile-first flow.
- Preserve semantic HTML and accessibility: single `h1`, readable copy, focus-visible CTA, no hidden critical content.
- Use system fonts in this story to avoid build-time external font fetch dependence inside the current sandbox.
- Keep the CTA as an anchor to `#rsvp`; the target section will be introduced in later RSVP stories.

### Project Structure Notes

- Public page entry remains `src/app/page.tsx`.
- Reusable guest-facing sections belong in `src/components/sections/`.
- Global visual tokens and document-wide behavior remain in `src/app/globals.css`.

### References

- Epic requirements: `_bmad-output/planning-artifacts/epics.md`
- Architecture constraints: `_bmad-output/planning-artifacts/architecture.md`
- UX guidance: `_bmad-output/planning-artifacts/ux-design-specification.md`

## Dev Agent Record

### Agent Model Used

GPT-5

### Debug Log References

- `rtk npm run lint`
- `rtk npx tsc --noEmit`
- `rtk npm run build` (blocked by sandbox/Turbopack process-port restriction and earlier external font fetch restriction)

### Completion Notes List

- Replaced the default Next.js starter homepage with a wedding-specific hero shell.
- Added a reusable `Hero` section component with responsive typography and a clear RSVP CTA.
- Simplified global styling to warm neutral tokens and system fonts for deterministic local validation.
- Validated TypeScript successfully; lint passes for touched files, with one unrelated pre-existing warning in `src/components/sections/Gallery.tsx`.

### File List

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/sections/hero.tsx`

### Change Log

- Created the first guest-facing landing shell for Epic 2 Story 2.1.
