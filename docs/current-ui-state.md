# Wedding Website - Current UI State

**Last Updated:** 2026-05-06  
**Status:** Epic 2 Complete + UI Refinements Applied

---

## Visual Design System

### Color Palette

**Primary Theme:** Hồng phấn (Pink Blush)

- **Background Gradient:** `#fff8fc` → `#fff1f7` → `#fde7f1` (soft pink gradient)
- **Text Colors:**
  - Headings: `rose-950` (deep rose, nearly black)
  - Body: `rose-800/70` to `rose-800/80` (warm rose with opacity)
  - Labels: `rose-600` (medium rose for accents)
- **Interactive Elements:**
  - Primary CTA: `rose-600` background, hover `rose-500`
  - Links: `rose-500` with underline decoration
  - Focus rings: `rose-300`
- **Section Backgrounds:**
  - Cards: `white/80` with `ring-rose-200/40`
  - Hero: gradient `rose-100` → `pink-50` → `fuchsia-100`
  - Schedule timeline: `rose-900` (dark rose for contrast)
  - FAQ accordion: `rose-50/50` with `rose-100/70` hover

### Typography

- **Hero Heading:** `text-5xl sm:text-6xl lg:text-7xl` — prominent, centered
- **Section Headings:** `text-3xl font-semibold tracking-tight text-rose-950`
- **Section Labels:** `text-sm font-medium uppercase tracking-[0.2em] text-rose-600`
- **Body Text:** `text-base leading-7 text-rose-800/70`
- **Font Stack:** System fonts (Apple System, Segoe UI, Roboto)

### Spacing & Layout

- **Container:** `max-w-5xl` centered with responsive padding
- **Section Gap:** `gap-8` between major sections
- **Border Radius:** `rounded-[2rem]` for section containers, `rounded-3xl` for cards
- **Shadow:** `shadow-sm` with subtle `ring-1` borders

---

## Page Structure

### Current Section Order

1. **Hero Section** — Prominent introduction with couple names, date, CTA
2. **Event Details Section** — Key logistics in card grid (date, time, dress code, RSVP deadline)
3. **Venue Section** — Two-column layout with venue info + directions CTA
4. **Schedule Section** — Dark timeline with event flow
5. **Contact Section** — Centered minimal contact links (phone/email)
6. **FAQ Section** — Accordion with common questions

### Removed Sections

The following sections were **removed from scope** during UI refinement:

- **Gallery** — Placeholder content, not essential for MVP
- **Travel** — Generic content, not adding value
- **Calendar** — "Coming soon" alert, incomplete feature

---

## Section Details

### Hero Section

**File:** `src/components/sections/HeroSection.tsx`

**Visual Treatment:**
- Gradient background: `rose-100` → `pink-50` → `fuchsia-100`
- Badge: "Lễ Thành Hôn" in white/75 with rose ring
- Centered layout with `max-w-3xl`
- Decorative horizontal divider (gradient line)
- Large typography scale for couple names

**Content Tone:** Formal, elegant invitation language  
**CTA:** "Xem thông tin chi tiết" → scrolls to `#event-details`

**Key Changes from Original:**
- Increased padding: `py-16 sm:py-24` (was `py-14 sm:py-18`)
- Larger heading scale: `text-5xl sm:text-6xl lg:text-7xl` (was `text-4xl sm:text-5xl`)
- Badge text changed from "Lễ cưới" to "Lễ Thành Hôn" (more formal)
- Added decorative divider line
- CTA changed from `stone-900` to `rose-600`

---

### Event Details Section

**File:** `src/components/sections/EventDetailsSection.tsx`

**Layout:** 2-column grid (`sm:grid-cols-2`) of info cards

**Cards Include:**
- Ngày tổ chức (Event Date)
- Giờ bắt đầu (Start Time)
- Trang phục (Dress Code)
- Xác nhận tham dự (RSVP Deadline)

**Visual Treatment:**
- White/80 cards with rose-200/40 ring
- Rose-900 headings, rose-950 values
- Supporting text in rose-700/70

---

### Venue Section

**File:** `src/components/sections/VenueSection.tsx`

**Layout:** Two-column grid (`lg:grid-cols-[1.15fr_0.85fr]`)

**Left Column:**
- Venue name and address in rose-50/50 card with rose-200/60 ring
- Rose-950 heading, rose-800/80 address text

**Right Column:**
- Directions note in rose-100/60 card with rose-200 ring
- CTA button: "Xem chỉ dẫn đường đi" (rose-600 background)
- Opens Google Maps in new tab

**Key Enhancement:** Increased visual prominence with larger cards and clearer hierarchy

---

### Schedule Section

**File:** `src/components/sections/ScheduleSection.tsx`

**Visual Treatment:**
- Dark rose-900 background for contrast
- Vertical timeline with pink-300 dots
- Rose-700 connector lines between events
- White headings, pink-200 time labels, rose-200 descriptions

**Content:** Event timeline from arrival to departure

---

### Contact Section

**File:** `src/components/sections/ContactSection.tsx`

**Layout:** Centered minimal design (no longer card grid)

**Visual Treatment:**
- Gradient background: `rose-100/50` → `white/90` → `pink-100/50`
- Icon + underlined link format (not support cards)
- Rose-500 icons, rose-800 text
- Underline decoration: rose-300, hover rose-500

**Key Change from Original:**
- Removed 2-column card grid layout
- Changed to simple centered icon + link pairs
- More elegant, less "business support" feel

---

### FAQ Section

**File:** `src/components/sections/FaqSection.tsx`

**Visual Treatment:**
- Accordion with rose-50/50 background
- Rose-200/70 borders
- Hover state: rose-100/70
- Rose-950 question text, rose-800/80 answer text
- Chevron icon rotates on expand

**Content:** 6 common questions (dress code, RSVP, plus-one, parking, dietary, arrival time)

---

## Content Tone

**Overall Voice:** Sang trọng cổ điển (Elegant Classical)

**Characteristics:**
- Formal Vietnamese: "quý vị", "trân trọng kính mời", "ngày trọng đại"
- Avoids casual "bạn" or "chúng tôi"
- Uses "lễ thành hôn" instead of "đám cưới"
- Restrained, dignified language
- No UI/meta descriptions (e.g., "easy to read on small screens")

**Example Phrases:**
- "Trân trọng kính mời quý vị đến chung vui trong ngày trọng đại của gia đình chúng tôi."
- "Xin gửi đến quý vị những thông tin cần thiết cho ngày lễ trọng đại."
- "Chương trình hôn lễ được chuẩn bị trang trọng như sau."

---

## Data Source

**Centralized Constants:** `src/lib/constants/event-data.ts`

**Exports:**
- `COUPLE_NAMES` — Couple display names
- `WEDDING_DATE_ISO` — ISO date string
- `VENUE` — Venue name, address lines, map URL, note
- `CONTACT_ACTIONS` — Phone/email contact info
- `EVENT_DETAILS` — Date, time, dress code, RSVP deadline cards
- `SCHEDULE_ITEMS` — Timeline events
- `FAQ_DATA` — Question/answer pairs

**Consistency:** All sections pull from this single source to avoid data drift

---

## Accessibility

**ARIA Attributes:**
- Section landmarks with `aria-labelledby`
- Accordion buttons with `aria-expanded` and `aria-controls`
- Icon SVGs with `aria-hidden="true"` and `focusable="false"`
- Semantic HTML: `<section>`, `<article>`, `<time>`, `<h1>`-`<h3>`

**Focus States:**
- All interactive elements have `focus-visible:outline-none` with custom `focus-visible:ring-2 ring-rose-300`
- Minimum touch target: `min-h-[44px]` for buttons/links

**Keyboard Navigation:**
- FAQ accordion fully keyboard accessible
- All CTAs and links keyboard navigable

---

## Responsive Behavior

**Breakpoints:**
- Mobile-first: base styles for narrow screens
- `sm:` — 640px+ (tablets)
- `lg:` — 1024px+ (desktops)

**Key Responsive Changes:**
- Hero heading scales: `text-5xl` → `text-6xl` → `text-7xl`
- Event Details grid: 1 column → 2 columns at `sm:`
- Venue layout: stacked → 2-column at `lg:`
- Padding increases at larger breakpoints

---

## Build Status

**Last Build:** 2026-05-06  
**Status:** ✅ Success  
**TypeScript:** ✅ Pass  
**Warnings:** metadataBase not set (non-blocking)

**Dev Server:** Running on `http://localhost:3000` (port 3000)

---

## Known Gaps vs. Original Design

### Completed Refinements
- ✅ Hero section enhanced (larger, more formal)
- ✅ Contact section simplified (no longer card grid)
- ✅ Color scheme changed to pink blush
- ✅ Removed Gallery/Travel/Calendar sections
- ✅ Content tone updated to formal classical

### Remaining Work (Epic 3+)
- ⏳ RSVP form implementation (Epic 3)
- ⏳ Admin dashboard (Epic 4-5)
- ⏳ Database integration (Epic 3-5)

---

## Files Changed in Recent UI Refinements

### Color Scheme Update (2026-05-06)
```
Modified:
  src/app/globals.css                           (body background/color)
  src/app/page.tsx                              (gradient background)
  src/components/sections/HeroSection.tsx       (gradient, badge, CTA, text colors)
  src/components/sections/EventDetailsSection.tsx (card backgrounds, text colors)
  src/components/sections/VenueSection.tsx      (card backgrounds, CTA, text colors)
  src/components/sections/ScheduleSection.tsx   (timeline background, accent colors)
  src/components/sections/ContactSection.tsx    (gradient, link colors)
  src/components/sections/FaqSection.tsx        (accordion backgrounds, borders, text)
```

### Contact Layout Simplification (2026-05-06)
```
Modified:
  src/components/sections/ContactSection.tsx    (removed card grid, added centered links)
```

### Hero Enhancement (2026-05-06)
```
Modified:
  src/components/sections/HeroSection.tsx       (increased scale, added divider, formal badge)
```

---

## Next Steps

1. **Epic 3:** Implement RSVP form with database integration
2. **Epic 4:** Admin authentication
3. **Epic 5:** Admin dashboard and RSVP management

**Current Phase:** Ready to begin Epic 3 story creation
