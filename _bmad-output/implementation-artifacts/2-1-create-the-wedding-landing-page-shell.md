# Story 2.1: Create the Wedding Landing Page Shell

Status: ready-for-dev

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

- [ ] Implement hero section component (AC: hero section with couple names, date)
  - [ ] Create `src/components/sections/hero.tsx`
  - [ ] Define props for couple names and wedding date
  - [ ] Style with responsive typography and spacing
  - [ ] Ensure content visible above fold on mobile (375px width)
- [ ] Set up page layout with section order (AC: section order, mobile-first)
  - [ ] Update `src/app/page.tsx` with mobile-first layout
  - [ ] Configure Tailwind for responsive breakpoints
  - [ ] Implement scroll-snap or smooth section transitions
- [ ] Apply typography and color hierarchy (AC: typography, spacing, colors)
  - [ ] Check `globals.css` for design tokens
  - [ ] Verify font loading (Google Fonts or local)
  - [ ] Apply semantic heading hierarchy (h1, h2, h3)
- [ ] Validate mobile readability (AC: readable without zoom)
  - [ ] Test on viewport widths: 320px, 375px, 768px
  - [ ] Verify text scaling and touch targets
- [ ] Configure primary CTA communication (AC: CTA visible)
  - [ ] Implement CTA button or scroll indicator
  - [ ] Ensure contrast ratio meets WCAG AA

## Technical Context

- **Module**: `src/components/sections/`
- **Dependencies**: Tailwind CSS v4, shadcn/ui (if needed)
- **Related Stories**: 2-2, 2-3 (sections will follow)
- **File to Edit**: `src/app/page.tsx`
- **File to Create**: `src/components/sections/hero.tsx`
