# Story 2.4: Add FAQ and Repeat-Visit Clarity Support

Status: ready-for-dev

## Story

As a returning guest,
I want to quickly recover important answers and logistics when I revisit the website,
So that I do not need to re-learn the page or message the couple again.

## Acceptance Criteria

**Given** a guest revisits the website later
**When** they scan the content for answers
**Then** the FAQ section presents common questions using progressive disclosure
**And** core logistics such as venue, RSVP deadline, and schedule remain easy to rediscover
**And** the information architecture supports fast repeat visits without confusion
**And** critical information is not hidden behind complex navigation or modal flows

## Tasks / Subtasks

- [ ] Create FAQ section with progressive disclosure (AC: FAQ progressive disclosure)
  - [ ] Create `src/components/sections/faq.tsx`
  - [ ] Use `Accordion` component (shadcn/ui or native details/summary)
  - [ ] Define FAQ data structure (question, answer)
- [ ] Ensure rediscovery of core logistics (AC: logistics easy to rediscover)
  - [ ] Verify core details are not collapsed or buried
  - [ ] Maintain consistent section ordering
- [ ] Optimize information architecture for speed (AC: fast repeat visits)
  - [ ] Test navigation on mobile (sticky header or anchor links)
  - [ ] Use clear headings for quick scanning
- [ ] Prevent hidden critical information (AC: no complex navigation/modals)
  - [ ] Avoid critical details inside modals
  - [ ] Ensure all key sections are reachable via direct scroll

## Technical Context

- **Module**: `src/components/sections/`
- **Dependencies**: Tailwind CSS v4, Radix UI Accordion (via shadcn/ui)
- **Related Stories**: 2-2 (details), 2-3 (contact)
- **File to Create**: `src/components/sections/faq.tsx`
- **File to Edit**: `src/app/page.tsx`
