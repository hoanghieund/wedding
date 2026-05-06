# Epic 2 Retrospective

**Epic:** Guest Information Experience  
**Status:** Complete  
**Completion Date:** 2026-05-06  
**Team:** Solo developer with AI assistance

---

## Executive Summary

Epic 2 successfully delivered a mobile-first wedding landing page that allows guests to quickly understand event information, venue details, schedule, and contact options. All core acceptance criteria were met, though several implementation decisions diverged from the original UX specification in ways that improved the final product.

**Key Achievements:**
- ✅ Complete information architecture for guest orientation
- ✅ Mobile-first responsive design with strong accessibility
- ✅ Elegant pink blush visual system
- ✅ Typography-led hero that prioritizes privacy and performance
- ✅ Streamlined page flow by de-scoping low-value optional sections

**Key Learnings:**
- Typography-first design can be more elegant than photo-heavy approaches
- De-scoping optional content improved clarity and mobile experience
- Pink color scheme better conveys wedding warmth than neutral palette
- Minimal contact design feels more appropriate than business-style cards

---

## What Went Well

### 1. Typography-Led Hero Design

**Decision:** Use prominent typography with gradient background instead of large couple photo.

**Outcome:** The typography-first hero (`text-5xl sm:text-6xl lg:text-7xl`) creates strong visual impact while respecting privacy and improving performance. The decorative gradient divider and formal badge ("Lễ Thành Hôn") establish elegance without requiring photo assets.

**Why It Worked:**
- Zero image load time on first paint
- Easier to update text than manage photo assets
- Aligns with "sang trọng cổ điển" (elegant classical) tone
- Maintains strong above-the-fold presence

**Preserve for Future:** This approach should be maintained unless couple explicitly requests photo integration.

---

### 2. Pink Blush Color Scheme

**Decision:** Use pink as primary color instead of warm neutral palette.

**Outcome:** The pink blush gradient (`#fff8fc` → `#fde7f1`) with rose-tinted text creates a warm, romantic, and formal atmosphere that better suits wedding context than the original neutral stone palette.

**Why It Worked:**
- Pink conveys romance and warmth more effectively
- Still maintains WCAG AA contrast requirements
- Feels more "wedding" than generic neutral
- Differentiates from typical business/portfolio sites

**Preserve for Future:** Pink palette should carry through Epic 3 (RSVP form) and all future features.

---

### 3. De-Scoping Optional Sections (Story 2.6)

**Decision:** Remove Gallery, Travel, and Calendar sections from MVP.

**Outcome:** Page flow became cleaner and more focused. Mobile experience improved with shorter scroll length. Core guest journey (understand event → find venue → check schedule → contact) remained clear.

**Why It Worked:**
- Gallery was placeholder content with no real value
- Travel section was generic advice, not actionable
- Calendar "coming soon" alert felt incomplete
- Removing them reduced visual noise

**Preserve for Future:** Only add these sections back if user feedback explicitly requests them. Prioritize RSVP (Epic 3) over optional content.

---

### 4. Minimal Contact Section Design

**Decision:** Replace 2-column card grid with centered icon + link layout.

**Outcome:** Contact section feels more elegant and less like a business support interface. Maintains all functionality (phone/email links, touch targets) while reducing visual weight.

**Why It Worked:**
- Card grid felt too transactional for wedding context
- Minimal design aligns with formal tone
- Reduces visual competition with more important sections above

**Preserve for Future:** This minimal approach should be maintained.

---

### 5. Centralized Data Management

**Decision:** Consolidate all content in `src/lib/constants/event-data.ts`.

**Outcome:** Single source of truth prevents data drift across sections. Easy to update venue, dates, contact info, FAQ content in one place.

**Why It Worked:**
- Prevents inconsistencies (e.g., venue name mismatches)
- Makes content updates straightforward
- TypeScript types ensure data shape consistency

**Preserve for Future:** All new content should follow this pattern.

---

## What Could Be Improved

### 1. RSVP Section Deferred to Epic 3

**Challenge:** Original UX spec called for RSVP section in Epic 2 flow (hero → event details → venue → schedule → **RSVP** → FAQ → contact).

**What Happened:** RSVP implementation belongs to Epic 3, so Epic 2 delivered information display only. Hero CTA points to `#event-details` as placeholder.

**Impact:** Page flow is complete for information architecture, but RSVP prominence is deferred. Hero CTA will need to be updated when Epic 3 integrates.

**Lesson Learned:** Epic boundaries should align with UX flow boundaries. Consider splitting "information display" and "RSVP integration" more explicitly in future planning.

**Action for Epic 3:** Insert RSVP section between Schedule and Contact; update Hero CTA to point to `#rsvp`.

---

### 2. Visual Token Drift from Original Spec

**Challenge:** Original UX spec specified 8px button radius, 12px card radius.

**What Happened:** Implementation used larger values (`rounded-[2rem]` = 32px, `rounded-3xl` = 24px, `rounded-full` for buttons).

**Impact:** Visual refinement beyond spec, but no negative impact on usability or accessibility.

**Lesson Learned:** Visual tokens should be treated as guidelines, not rigid constraints. Larger radius values created a more modern, elegant feel.

**Action for Future:** Update UX spec to reflect implemented tokens as new baseline (already done in this retrospective cycle).

---

### 3. No Couple Photo in Hero

**Challenge:** Original UX spec called for "large couple image with overlay."

**What Happened:** Couple preferred privacy; typography-first approach was chosen instead.

**Impact:** Hero still meets "couple names and date above the fold" requirement, but visual approach differs from inspiration sources (Airbnb, Apple).

**Lesson Learned:** Privacy preferences should be clarified early in planning. Typography-first design proved to be a strong alternative.

**Action for Future:** If couple changes mind about photo, hero can be enhanced without major refactor. Current approach should be preserved unless explicitly requested.

---

## Metrics & Outcomes

### Acceptance Criteria Met

**Story 2.1:** ✅ 5/5 criteria met  
**Story 2.2:** ✅ 4/4 criteria met  
**Story 2.3:** ✅ 4/4 criteria met  
**Story 2.4:** ✅ 4/4 criteria met  
**Story 2.5:** ✅ 4/4 criteria met  
**Story 2.6:** ⚠️ 0/3 criteria met (de-scoped by design)

**Overall:** 21/24 original criteria met; 3 criteria intentionally de-scoped.

### Build & Quality Metrics

- **TypeScript:** ✅ Zero errors
- **ESLint:** ✅ Pass (1 unrelated warning)
- **Build:** ✅ Success
- **Accessibility:** ✅ WCAG AA contrast, semantic HTML, ARIA attributes, 44px touch targets
- **Performance:** ✅ Static generation, no blocking images on first paint

### Code Quality

- **Component Architecture:** Clean separation of concerns, reusable section components
- **Data Management:** Single source of truth in `event-data.ts`
- **Styling:** Consistent Tailwind usage, no inline styles
- **Accessibility:** Proper heading hierarchy, focus states, keyboard navigation

---

## Key Decisions & Rationale

| Decision | Original Spec | Final Implementation | Rationale |
|----------|---------------|---------------------|-----------|
| Hero Design | Large couple photo with overlay | Typography-first with gradient | Privacy, performance, elegance |
| Color Scheme | Warm neutral (stone/cream) | Pink blush (rose/pink) | Better conveys wedding warmth |
| Section Order | Hero → Details → Venue → Schedule → RSVP → FAQ → Contact | Hero → Details → Venue → Schedule → Contact → FAQ | RSVP deferred to Epic 3 |
| Optional Sections | Gallery, Travel, Calendar | Removed | Reduced noise, improved focus |
| Contact Layout | 2-column card grid | Centered minimal links | More elegant, less transactional |
| Border Radius | 8px buttons, 12px cards | 32px sections, 24px cards, pill buttons | More modern, elegant feel |

---

## Recommendations for Epic 3

### 1. RSVP Section Integration

**Priority:** High  
**Action:** Insert RSVP section between Schedule and Contact in `src/app/page.tsx`

**Considerations:**
- Update Hero CTA to point to `#rsvp` instead of `#event-details`
- Maintain pink blush visual system in RSVP form
- Use `rounded-3xl` for form container to match card styling
- Ensure form inputs meet 44px touch target requirements
- Follow minimal design language (avoid heavy card styling)

### 2. Visual Consistency

**Priority:** High  
**Action:** Ensure RSVP form matches Epic 2 visual system

**Specific Tokens to Preserve:**
- Background: `bg-white/80` with `ring-rose-200/40`
- Text: `text-rose-950` headings, `text-rose-800/70` body
- Buttons: `bg-rose-600` with `hover:bg-rose-500`, `rounded-full`
- Focus states: `focus-visible:ring-2 ring-rose-300`
- Spacing: `gap-8` between sections, `px-6 py-10` for containers

### 3. Mobile-First Form Design

**Priority:** High  
**Action:** Design RSVP form for mobile touch interaction first

**Specific Guidance:**
- Use appropriate input types (`type="email"`, `type="tel"`)
- Minimum 44x44px touch targets for all controls
- Inline validation with rose-tinted error states
- Clear labels with `text-sm font-medium text-rose-600`
- Generous spacing between form fields (`space-y-4` or `space-y-6`)

### 4. Confirmation State Design

**Priority:** High  
**Action:** Design confirmation state to match Epic 2 tone

**Specific Guidance:**
- Use success green with rose tint (e.g., `bg-emerald-50` with `ring-emerald-200`)
- Maintain formal tone: "Cảm ơn quý vị đã xác nhận tham dự"
- Summarize what was submitted (name, attendance status)
- Provide clear next actions (e.g., "Xem lại thông tin sự kiện")

---

## Technical Debt & Future Work

### None Identified

Epic 2 implementation is clean with no significant technical debt. All components follow consistent patterns, data is centralized, and styling is maintainable.

### Optional Enhancements (Post-MVP)

1. **Add couple photo to Hero** (if privacy concerns resolve)
2. **Re-evaluate Gallery/Travel/Calendar** (if user feedback requests)
3. **Add structured data (JSON-LD)** for SEO
4. **Test OG image with Facebook/Twitter debuggers**
5. **Consider adding event date to OG image**

---

## Team Feedback & Collaboration

### What Worked Well

- Clear acceptance criteria made implementation straightforward
- Flexibility to deviate from spec when better solutions emerged
- Strong communication about scope decisions (de-scoping Story 2.6)
- Iterative refinement (Contact section, Hero design)

### What Could Improve

- Earlier alignment on RSVP section placement (Epic 2 vs Epic 3)
- Earlier discussion of couple photo privacy preferences
- More explicit guidance on when to follow spec vs. when to adapt

---

## Conclusion

Epic 2 successfully delivered a complete, elegant, and accessible wedding landing page that meets all core guest information needs. Implementation decisions that diverged from the original spec (pink color scheme, typography-first hero, de-scoped optional sections) improved the final product.

The foundation is strong for Epic 3 (RSVP integration). Key visual tokens, component patterns, and data management approaches should be preserved as the product evolves.

**Epic 2 Status:** ✅ Complete and ready for Epic 3 integration.

---

**Retrospective Completed:** 2026-05-06  
**Next Epic:** Epic 3 - Guest RSVP Submission
