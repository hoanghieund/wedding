# Story 2.3: Add Venue Map and Contact Actions

Status: ready-for-dev

## Story

As a guest,
I want quick actions to open the venue map and access contact information,
So that I can get help or directions with minimal effort.

## Acceptance Criteria

**Given** a guest views the venue and contact sections
**When** they choose a venue or support action
**Then** the venue section provides a one-tap map link
**And** the contact section provides direct-action contact links (phone, email)
**And** both actions are easy to identify on mobile
**And** interactive controls meet the minimum touch target size requirements (at least 44x44px)

## Tasks / Subtasks

- [ ] 1. Create component files and define specifications (AC: direct-action contact links, one-tap map link)
  - [ ] Create `src/components/sections/VenueSection.tsx`
  - [ ] Create `src/components/sections/ContactSection.tsx`
  - [ ] Export both components from `src/components/sections/index.ts` if applicable
- [ ] 2. Implement unit/component tests for Venue and Contact (TDD RED)
  - [ ] Add tests ensuring map link is rendered correctly
  - [ ] Add tests ensuring contact links (tel:, mailto:) are present
- [ ] 3. Build VenueSection component (TDD GREEN & REFACTOR)
  - [ ] Add Google Maps or Apple Maps deep link
  - [ ] Style as prominent action button
- [ ] 4. Build ContactSection component (TDD GREEN & REFACTOR)
  - [ ] Add `mailto:` and `tel:` links using Lucide React icons
  - [ ] Verify touch targets are at least 44x44px (AC: touch target size)
- [ ] 5. Integrate into homepage and optimize for mobile (AC: easy to identify on mobile)
  - [ ] Update `src/app/page.tsx` (or a mock layout if hero isn't fully ready) to display the new sections
  - [ ] Use standard action icons and clear labeling

## Technical Context

- **Module**: `src/components/sections/`
- **Dependencies**: Tailwind CSS v4, Lucide React
- **Related Stories**: 2-2 (event details), 2-4 (FAQ)
- **File to Create**: `src/components/sections/VenueSection.tsx`, `src/components/sections/ContactSection.tsx`
- **File to Edit**: `src/app/page.tsx`
