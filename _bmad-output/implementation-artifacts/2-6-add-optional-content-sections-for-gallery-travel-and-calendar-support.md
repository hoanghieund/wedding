# Story 2.6: Add Optional Content Sections for Gallery, Travel, and Calendar Support

Status: ready-for-dev

## Story

As a guest,
I want to access optional supporting content such as a gallery teaser, travel guidance, and calendar-related event information when included,
So that I can prepare more easily for the wedding.

## Acceptance Criteria

**Given** optional content is included in release scope
**When** a guest browses the wedding page
**Then** the site can render a gallery teaser section without blocking essential information
**And** the site can render travel or accommodation guidance in the same visual system
**And** the site can expose calendar-related event information in a clear and actionable way
**And** optional sections do not reduce clarity of the core guest journey

## Tasks / Subtasks

- [ ] Create optional gallery teaser section (AC: gallery teaser, essential info visible)
  - [ ] Create `src/components/sections/gallery.tsx`
  - [ ] Implement lazy-loading image grid
  - [ ] Ensure section is conditionally rendered
  - [ ] Keep gallery images under `public/images/gallery/`
- [ ] Create optional travel/accommodation section (AC: travel guidance, same visual system)
  - [ ] Create `src/components/sections/travel.tsx`
  - [ ] Display hotel recommendations or accommodation info
  - [ ] Style consistently with other sections
- [ ] Create optional calendar/event info section (AC: calendar info, actionable)
  - [ ] Create `src/components/sections/calendar.tsx`
  - [ ] Add "Add to Calendar" buttons (Google, Apple, Outlook)
  - [ ] Use ICS file or direct calendar links
- [ ] Ensure sections do not block core journey (AC: clarity maintained)
  - [ ] Place optional sections after core content
  - [ ] Avoid making optional sections required for navigation
  - [ ] Test page flow with all sections enabled

## Technical Context

- **Module**: `src/components/sections/`
- **Dependencies**: Tailwind CSS v4, Lucide React (for icons)
- **Related Stories**: 2-1 through 2-5 (all guest information sections)
- **Files to Create**: `src/components/sections/gallery.tsx`, `src/components/sections/travel.tsx`, `src/components/sections/calendar.tsx`
- **File to Edit**: `src/app/page.tsx`
