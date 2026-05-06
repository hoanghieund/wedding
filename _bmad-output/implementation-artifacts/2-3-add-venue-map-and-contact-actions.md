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
**And** the contact section provides direct-action contact links
**And** both actions are easy to identify on mobile
**And** interactive controls meet the minimum touch target size requirements

## Tasks / Subtasks

- [ ] Implement one-tap venue map link (AC: one-tap map link)
  - [ ] Add Google Maps or Apple Maps deep link
  - [ ] Use `map.google.com` link with address params
  - [ ] Style as prominent action button
- [ ] Create contact section with direct actions (AC: direct-action contact links)
  - [ ] Create `src/components/sections/contact.tsx`
  - [ ] Add `mailto:` and `tel:` links
  - [ ] Integrate chat/messaging link if provided
- [ ] Optimize for mobile identifying (AC: easy to identify on mobile)
  - [ ] Use standard action icons
  - [ ] Clear labeling for each action
- [ ] Verify touch targets (AC: touch target size)
  - [ ] Ensure buttons are at least 44x44px
  - [ ] Check spacing between adjacent buttons

## Technical Context

- **Module**: `src/components/sections/`
- **Dependencies**: Tailwind CSS v4, Lucide React (for icons)
- **Related Stories**: 2-2 (event details above), 2-4 (FAQ below)
- **File to Create**: `src/components/sections/contact.tsx`
- **File to Edit**: `src/app/page.tsx`, `src/components/sections/event-details.tsx`
