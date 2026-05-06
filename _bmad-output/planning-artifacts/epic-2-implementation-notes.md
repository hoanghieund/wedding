# Epic 2: Implementation Notes & Scope Decisions

**Epic:** Guest Information Experience  
**Status:** Complete (all stories done)  
**Last Updated:** 2026-05-06

---

## Scope Decisions Made During Implementation

### 1. RSVP Section Deferred to Epic 3

**Original UX-DR1 Flow:**
> hero → event details → venue → schedule → **RSVP** → FAQ → contact

**Implemented Flow:**
> Hero → Event Details → Venue → Schedule → Contact → FAQ

**Rationale:**
- RSVP form implementation belongs to **Epic 3** (Guest RSVP Submission)
- Epic 2 focused on **information display only**
- Hero CTA points to `#event-details` instead of RSVP as placeholder
- RSVP section will be inserted between Schedule and Contact when Epic 3 completes

**Impact:** Epic 2 acceptance criteria met for information architecture; RSVP prominence deferred to Epic 3 integration.

---

### 2. Typography-Led Hero (No Couple Image)

**Original UX-DR2:**
> Implement a hero section with a **large couple image** and visible overlay for couple names and event date.

**Implemented Approach:**
- Typography-first hero with gradient background
- No couple photo in MVP
- Prominent couple names at `text-5xl sm:text-6xl lg:text-7xl`
- Decorative gradient divider line
- Badge: "Lễ Thành Hôn" (formal tone)

**Rationale:**
- Privacy: couple prefers not to use personal photos in public site
- Performance: avoids large image load on first paint
- Elegance: typography-led design aligns with "sang trọng cổ điển" tone
- Flexibility: easier to update text than manage photo assets

**Impact:** Hero still meets "couple names and wedding date above the fold" requirement; visual approach differs from original spec.

---

### 3. Color Scheme: Pink Blush (Not Warm Neutral)

**Original UX-DR5:**
> Apply a **restrained warm palette** with a soft accent color and **off-white neutral background**.

**Implemented Palette:**
- **Primary:** Pink blush (`rose-50` to `rose-950`, `pink-50`, `fuchsia-100`)
- **Background gradient:** `#fff8fc` → `#fff1f7` → `#fde7f1`
- **Accent:** Rose-600 for CTAs, rose-500 for links
- **Text:** Rose-950 headings, rose-800/70 body

**Rationale:**
- User preference for pink as primary wedding color
- Pink conveys warmth, romance, and formality better than neutral stone
- Still maintains readability and WCAG AA contrast
- Aligns with "sang trọng cổ điển" (elegant classical) tone

**Impact:** Visual identity differs from original warm-neutral spec; all contrast and hierarchy requirements still met.

---

### 4. De-Scoped Optional Sections (Story 2.6)

**Story 2.6 Original Scope:**
> Add Optional Content Sections for **Gallery, Travel, and Calendar Support**

**Implementation Decision:**
- **Gallery:** Removed (placeholder content, not essential for MVP)
- **Travel:** Removed (generic content, low value-add)
- **Calendar:** Removed (incomplete "coming soon" feature)

**Rationale:**
- Focus on core guest journey: understand event → find venue → check schedule → contact
- Optional sections added visual noise without delivering value
- Reduced page length improves mobile experience
- Can be added post-launch if user feedback demands

**Impact:** Story 2.6 marked "done" but sections not rendered; Epic 2 goal (guest information clarity) still achieved.

---

### 5. Visual Tokens: Larger Radius, Increased Scale

**Original UX-DR10:**
> Use **8px radius for buttons/inputs**, **12px radius for cards/section containers**.

**Implemented Tokens:**
- Section containers: `rounded-[2rem]` (32px)
- Cards: `rounded-3xl` (24px)
- Buttons: `rounded-full` (pill shape)

**Rationale:**
- Larger radius feels more modern and elegant
- Pill buttons align with contemporary wedding site aesthetics
- Still maintains clear visual hierarchy
- No accessibility impact

**Impact:** Visual refinement beyond original spec; all touch target and spacing requirements met.

---

### 6. Contact Section: Minimal Links (Not Support Cards)

**Original Implementation (Story 2.3):**
- 2-column grid of action cards
- Icon + label + hint in card format
- Resembled business/support interface

**Refined Implementation:**
- Centered minimal layout
- Icon + underlined link (no cards)
- More elegant, less "customer support" feel

**Rationale:**
- Card grid felt too transactional for wedding context
- Minimal design aligns with formal tone
- Reduces visual weight in lower page sections

**Impact:** Story 2.3 acceptance criteria (direct-action contact links, easy to identify, touch target size) still met; visual approach refined.

---

## Epic 2 Acceptance Criteria: Final Status

### Story 2.1: Landing Page Shell ✅
- ✅ Hero with couple names and date above fold
- ✅ Mobile-first single-page structure
- ✅ Typography, spacing, color hierarchy applied
- ✅ Readable without zoom on small screens
- ✅ Primary CTA clear (points to event details as RSVP placeholder)

**Note:** Hero uses typography-led design instead of couple image (see decision #2).

### Story 2.2: Event Details and Schedule ✅
- ✅ Venue, date, RSVP deadline, dress code displayed
- ✅ Timeline/schedule block present
- ✅ Semantic headings and visual hierarchy
- ✅ Scannable on mobile

### Story 2.3: Venue Map and Contact Actions ✅
- ✅ One-tap map link in venue section
- ✅ Direct-action contact links (phone/email)
- ✅ Easy to identify on mobile
- ✅ Touch target size requirements met

**Note:** Contact layout refined to minimal centered design (see decision #6).

### Story 2.4: FAQ and Repeat-Visit Clarity ✅
- ✅ FAQ accordion with progressive disclosure
- ✅ Core logistics easy to rediscover
- ✅ Fast repeat visits supported
- ✅ No hidden critical information

### Story 2.5: Metadata and Sharing Preview ✅
- ✅ Descriptive title, metadata, Open Graph tags
- ✅ Preview communicates wedding context
- ✅ Opens directly to homepage
- ✅ No private guest data exposed

### Story 2.6: Optional Content Sections ⚠️ De-Scoped
- ⚠️ Gallery teaser: **removed** (see decision #4)
- ⚠️ Travel guidance: **removed** (see decision #4)
- ⚠️ Calendar support: **removed** (see decision #4)

**Status:** Story marked "done" but sections not rendered. Epic 2 goal (guest information clarity) achieved without optional sections.

---

## UX Requirements: Alignment Summary

### Fully Met
- UX-DR4: Card-like section separation ✅
- UX-DR7: Typography-led hierarchy ✅
- UX-DR8: 8px-based spacing system ✅
- UX-DR9: 44x44px touch targets ✅
- UX-DR11: Date, venue, CTA visible with minimal effort ✅
- UX-DR12: One-tap map action ✅
- UX-DR13: FAQ accordion progressive disclosure ✅
- UX-DR19: Semantic HTML, heading hierarchy, ARIA ✅
- UX-DR20: WCAG AA contrast ✅
- UX-DR22: Repeat-visit clarity ✅
- UX-DR23: Direct-action contact links ✅
- UX-DR24: Calm, warm, confidence-building tone ✅

### Modified During Implementation
- UX-DR1: Section flow (RSVP deferred to Epic 3) ⚠️
- UX-DR2: Hero design (typography-led, no couple image) ⚠️
- UX-DR3: RSVP CTA prominence (deferred to Epic 3) ⚠️
- UX-DR5: Color palette (pink blush instead of warm neutral) ⚠️
- UX-DR10: Border radius (larger than spec) ⚠️

### Deferred to Later Epics
- UX-DR14: RSVP form (Epic 3)
- UX-DR15: Inline form validation (Epic 3)
- UX-DR17: RSVP confirmation state (Epic 3)

---

## Recommendations for Documentation Updates

1. **Update UX Design Specification:**
   - Section 4.2 "Visual Design System" → document pink blush palette
   - Section 5.1 "Hero Section" → remove couple image requirement, document typography-led approach
   - Section 5.6 "Section Flow" → clarify RSVP section deferred to Epic 3
   - Section 6.3 "Visual Tokens" → update radius values to match implementation

2. **Update Epic 2 Story 2.6:**
   - Add note: "Optional sections de-scoped during implementation; core guest journey prioritized"
   - Clarify acceptance criteria as "can render if included" (conditional, not mandatory)

3. **Create Epic 2 Retrospective (Optional):**
   - Document scope decisions and rationale
   - Capture lessons learned (e.g., typography-led hero works well, optional sections added noise)
   - Note what to preserve for future epics (pink palette, minimal contact design)

---

## Files Reflecting Current Epic 2 State

### Core Implementation
- `src/app/page.tsx` — section order and composition
- `src/components/sections/HeroSection.tsx` — typography-led hero
- `src/components/sections/EventDetailsSection.tsx` — event info cards
- `src/components/sections/VenueSection.tsx` — venue + map CTA
- `src/components/sections/ScheduleSection.tsx` — timeline
- `src/components/sections/ContactSection.tsx` — minimal contact links
- `src/components/sections/FaqSection.tsx` — accordion
- `src/lib/constants/event-data.ts` — centralized data source

### Visual System
- `src/app/globals.css` — pink blush body background
- `src/app/page.tsx` — pink gradient background
- All section files — rose/pink color tokens

### Metadata
- `src/app/layout.tsx` — Open Graph and Twitter Card metadata
- `src/app/opengraph-image.tsx` — dynamic OG image generation

---

## Next Steps

**Epic 3 Integration:**
- Add RSVP section between Schedule and Contact
- Update Hero CTA to point to `#rsvp`
- Ensure RSVP form matches pink blush visual system
- Maintain Epic 2 section clarity while adding RSVP prominence

**Post-Epic 3 Considerations:**
- Evaluate if Gallery/Travel/Calendar should be re-scoped based on user feedback
- Consider adding couple photo to Hero if privacy concerns resolve
- Monitor guest feedback on pink color scheme vs. original warm neutral

---

**Document Status:** Living document; update as Epic 3 progresses and design decisions evolve.
