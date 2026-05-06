# Story 2.2: Add Event Details and Schedule Sections

Status: ready-for-dev

## Story

As a guest,
I want to view the key wedding details and event schedule in a structured way,
So that I can understand the logistics without asking follow-up questions.

## Acceptance Criteria

**Given** a guest scrolls through the wedding website
**When** they reach the event details area
**Then** the page displays venue, date, RSVP deadline, dress code, and event guidance in clearly separated sections
**And** the page includes a timeline or schedule block for wedding activities
**And** important information is presented with semantic headings and clear visual hierarchy
**And** content is scannable on mobile devices without dense or cluttered presentation

## Tasks / Subtasks

- [ ] Create event details section component (AC: venue, date, RSVP deadline, dress code, guidance)
  - [ ] Create `src/components/sections/event-details.tsx`
  - [ ] Display venue name and address
  - [ ] Display date and time
  - [ ] Display RSVP deadline
  - [ ] Display dress code requirements
- [ ] Implement schedule/timeline section (AC: timeline block)
  - [ ] Create `src/components/sections/schedule.tsx`
  - [ ] Define timeline data structure
  - [ ] Layout activities chronologically
  - [ ] Style as vertical timeline for mobile
- [ ] Apply semantic headings and visual hierarchy (AC: semantic headings, hierarchy)
  - [ ] Use h2 for section titles
  - [ ] Use h3 for subsections
  - [ ] Apply appropriate spacing and typography
- [ ] Ensure mobile scannability (AC: scannable on mobile)
  - [ ] Use card-based layout for key details
  - [ ] Ensure adequate line height (1.5+)
  - [ ] Test readability on 375px viewport

## Technical Context

- **Module**: `src/components/sections/`
- **Dependencies**: Tailwind CSS v4
- **Related Stories**: 2-1 (hero section above), 2-3 (venue map below)
- **File to Create**: `src/components/sections/event-details.tsx`, `src/components/sections/schedule.tsx`
- **File to Edit**: `src/app/page.tsx`
