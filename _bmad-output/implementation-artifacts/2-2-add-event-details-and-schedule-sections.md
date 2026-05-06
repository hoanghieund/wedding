# Story 2.2: Add Event Details and Schedule Sections

**Status:** ready-for-dev  
**Epic:** Epic 2 - Guest-Facing Landing Page  
**Story Key:** 2-2-add-event-details-and-schedule-sections  
**Created:** 2026-05-06  
**Dependencies:** Story 2-1 (hero section must exist)

---

## User Story

**As a** wedding guest  
**I want to** view the key wedding details and event schedule in a structured way  
**So that** I can understand the logistics without asking follow-up questions

---

## Acceptance Criteria

### AC1: Event Details Display
**Given** a guest scrolls through the wedding website  
**When** they reach the event details area  
**Then** the page displays venue, date, RSVP deadline, dress code, and event guidance in clearly separated sections

### AC2: Schedule/Timeline Block
**And** the page includes a timeline or schedule block for wedding activities

### AC3: Semantic Headings and Visual Hierarchy
**And** important information is presented with semantic headings and clear visual hierarchy

### AC4: Mobile Scannability
**And** content is scannable on mobile devices without dense or cluttered presentation

---

## Context from Planning Artifacts

### From Epics (epics.md)

**Functional Requirements:**
- **FR3:** Guests can view event details, including venue, schedule, dress code, and RSVP deadline
- **FR32:** The website can present a timeline or schedule view for wedding activities

**UX Design Requirements:**
- **UX-DR1:** Implement a mobile-first single-page narrative flow that progresses through hero, event details, venue, schedule, RSVP, FAQ, and contact sections
- **UX-DR11:** Make date, venue, RSVP CTA, and schedule context visible with minimal effort immediately after page load

**Epic 2 Goal:**
> Allow guests to open the wedding website and quickly understand the key event information, venue, schedule, dress code, and contact details on a mobile-first interface.

### From UX Design Specification (ux-design-specification.md)

**Navigation Pattern:**
> Single-page vertical scroll is the strongest pattern to adopt. This approach works naturally for wedding content where information has an inherent sequence: introduction, event details, venue, schedule, RSVP, FAQ, contact. Guests can move through the content like reading a story rather than navigating a tool.

**Visual Pattern:**
> Card-based section separation creates clear visual boundaries between content blocks. Each major section (venue, schedule, FAQ) should feel distinct and easy to identify.

**Content Requirements:**
- Timeline or schedule block with clear visual separation
- Guests identify the most important event details within the first screen or near the first scroll
- Implementation should progress through the vertical flow in the order guests will encounter content: hero, event details, venue, schedule, RSVP, FAQ, contact

**Mobile-First Requirements:**
- Adequate line height (1.5+)
- Test readability on 375px viewport
- Card-based layout for key details

### From Architecture (architecture.md)

**Module Boundaries:**
- `src/components/sections/`: Guest-facing page sections (hero, schedule, venue, FAQ)
- `src/lib/constants/`: Centralized application constants
- `src/lib/formatters/`: Date, text, and data presentation formatting utilities

**Naming Conventions:**
- React components: **PascalCase** (e.g., `EventDetailsSection.tsx`)
- Utility files: **kebab-case** (e.g., `date-format.ts`)
- Functions/variables: **camelCase**
- Constants: **UPPER_SNAKE_CASE**

**Static-First Architecture:**
- Guest-facing content should be static-first
- Minimize client-side JavaScript
- Prefer server-rendered content

---

## Technical Implementation Plan

### Files to Create

1. **`src/components/sections/EventDetailsSection.tsx`**
   - Display venue name and address
   - Display wedding date and time
   - Display RSVP deadline
   - Display dress code requirements
   - Display event guidance (e.g., parking, accessibility)
   - Use card-based layout for mobile scannability
   - Apply semantic headings (h2 for section, h3 for subsections)

2. **`src/components/sections/ScheduleSection.tsx`**
   - Define timeline data structure (time, activity, description)
   - Layout activities chronologically
   - Style as vertical timeline for mobile
   - Use clear visual separation between timeline items
   - Apply semantic headings

3. **`src/lib/constants/event-data.ts`**
   - Define event details constants (venue, date, RSVP deadline, dress code)
   - Define schedule/timeline data structure
   - Use UPPER_SNAKE_CASE for constants
   - Export typed data for type safety

4. **`src/lib/formatters/date-format.ts`** (if needed)
   - Date formatting utilities for display
   - Time formatting utilities
   - Use camelCase for function names

### Files to Edit

1. **`src/app/page.tsx`**
   - Import `EventDetailsSection` and `ScheduleSection`
   - Add sections below hero section (from Story 2-1)
   - Maintain single-page vertical scroll layout
   - Ensure proper spacing between sections

### Component Structure

#### EventDetailsSection.tsx
```typescript
// Server Component (static-first)
export default function EventDetailsSection() {
  return (
    <section className="..." id="event-details">
      <h2>Event Details</h2>
      
      {/* Venue Card */}
      <div className="card">
        <h3>Venue</h3>
        <p>{VENUE_NAME}</p>
        <p>{VENUE_ADDRESS}</p>
      </div>
      
      {/* Date & Time Card */}
      <div className="card">
        <h3>Date & Time</h3>
        <p>{formatDate(WEDDING_DATE)}</p>
      </div>
      
      {/* RSVP Deadline Card */}
      <div className="card">
        <h3>RSVP Deadline</h3>
        <p>{formatDate(RSVP_DEADLINE)}</p>
      </div>
      
      {/* Dress Code Card */}
      <div className="card">
        <h3>Dress Code</h3>
        <p>{DRESS_CODE}</p>
      </div>
      
      {/* Event Guidance Card */}
      <div className="card">
        <h3>Important Information</h3>
        <p>{EVENT_GUIDANCE}</p>
      </div>
    </section>
  );
}
```

#### ScheduleSection.tsx
```typescript
// Server Component (static-first)
export default function ScheduleSection() {
  return (
    <section className="..." id="schedule">
      <h2>Schedule</h2>
      
      {/* Vertical Timeline */}
      <div className="timeline">
        {SCHEDULE_ITEMS.map((item) => (
          <div key={item.time} className="timeline-item">
            <div className="timeline-time">{item.time}</div>
            <div className="timeline-content">
              <h3>{item.activity}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## Design Tokens and Styling

### Typography
- Section headings (h2): Large, bold, clear hierarchy
- Subsection headings (h3): Medium weight, distinct from body
- Body text: Line height 1.5+ for readability
- Font: Use existing Tailwind font stack

### Spacing
- Section padding: Generous vertical spacing between sections
- Card spacing: Clear separation between cards
- Timeline spacing: Adequate spacing between timeline items

### Colors
- Use existing Tailwind color palette
- Maintain contrast ratio for WCAG AA compliance
- Card backgrounds: Subtle contrast from page background

### Mobile Breakpoints
- Test on 375px viewport (primary mobile target)
- Test on 768px viewport (tablet)
- Ensure touch targets meet minimum size (44x44px)

---

## Validation Checklist

### Functional Validation
- [ ] Event details section displays all required information (venue, date, RSVP deadline, dress code, guidance)
- [ ] Schedule section displays timeline with activities
- [ ] Sections are added to `page.tsx` in correct order (after hero)
- [ ] Constants are defined in `src/lib/constants/event-data.ts`
- [ ] Date formatting utilities work correctly

### Visual Validation
- [ ] Semantic headings applied (h2 for sections, h3 for subsections)
- [ ] Card-based layout for event details
- [ ] Vertical timeline layout for schedule
- [ ] Clear visual hierarchy and separation
- [ ] Line height 1.5+ for body text

### Mobile Validation
- [ ] Content readable on 375px viewport without zoom
- [ ] No horizontal scroll on mobile
- [ ] Touch targets meet minimum size
- [ ] Cards stack vertically on mobile
- [ ] Timeline readable on mobile

### Accessibility Validation
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

---

## Anti-Patterns to Avoid

### From Architecture
- ❌ Do not add client-side state management (Redux/Zustand) - static content only
- ❌ Do not mix admin-only helpers into public folders
- ❌ Do not introduce custom abstractions prematurely
- ❌ Do not add unnecessary client-side JavaScript

### From UX
- ❌ Do not create dense or cluttered presentation
- ❌ Do not hide critical information behind modals or complex navigation
- ❌ Do not use small fonts or insufficient line height
- ❌ Do not break single-page vertical scroll pattern

### From Previous Stories
- ❌ Do not modify files outside the defined scope
- ❌ Do not change existing configuration files unnecessarily
- ❌ Do not introduce new dependencies without clear need

---

## Dependencies and Related Stories

### Depends On
- **Story 2-1:** Hero section must exist in `page.tsx` for proper section order

### Blocks
- **Story 2-3:** Venue map and contact actions (will reference venue data from this story)
- **Story 2-4:** FAQ section (follows schedule in vertical flow)

### Related Modules
- `src/components/sections/` - section components live here
- `src/lib/constants/` - event data constants
- `src/lib/formatters/` - date formatting utilities

---

## Testing Strategy

### Manual Testing
1. Open `http://localhost:3000` in browser
2. Verify event details section displays all required information
3. Verify schedule section displays timeline
4. Test on mobile viewport (375px)
5. Test on tablet viewport (768px)
6. Verify semantic HTML structure in DevTools
7. Test keyboard navigation
8. Verify no console errors

### Visual Regression
- Compare against UX design specification
- Verify card-based layout matches expected pattern
- Verify timeline layout matches expected pattern

---

## Definition of Done

- [ ] `EventDetailsSection.tsx` created with all required information
- [ ] `ScheduleSection.tsx` created with timeline layout
- [ ] `src/lib/constants/event-data.ts` created with event data
- [ ] `src/app/page.tsx` updated to include new sections
- [ ] All acceptance criteria met
- [ ] Manual testing completed on mobile and desktop
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Code follows architecture boundaries
- [ ] Semantic HTML and accessibility requirements met
- [ ] Ready for code review

---

## Notes for Developer

### Implementation Order
1. Create `src/lib/constants/event-data.ts` first (data foundation)
2. Create `EventDetailsSection.tsx` (simpler component)
3. Create `ScheduleSection.tsx` (timeline requires more styling)
4. Update `page.tsx` to integrate sections
5. Test on multiple viewports
6. Verify accessibility

### Key Decisions
- **Static-first:** These are Server Components with no client-side interactivity
- **Card-based layout:** Provides clear visual separation and mobile scannability
- **Vertical timeline:** Works best for mobile-first design
- **Constants file:** Centralizes event data for easy updates

### Common Pitfalls
- Forgetting to use semantic headings (h2, h3)
- Insufficient line height for mobile readability
- Breaking single-page scroll pattern
- Adding unnecessary client-side JavaScript
- Not testing on 375px viewport

---

**Story created by:** bmad-create-story workflow  
**Last updated:** 2026-05-06
