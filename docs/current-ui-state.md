# Wedding Website - Current UI State

**Last Updated:** 2026-05-07  
**Status:** Epic 2 Complete + Multi-Agent UI Redesign Applied  
**Theme:** Lovingly Mysterious Futuristic Romance (Cyan #00e5ff, Dark #030305)

---

## Visual Design System

### Color Palette

**Primary Theme:** Dark Cyan/Neon (#00e5ff) with Deep Space background (#030305)

- **Background:** `#030305` (deep space) with gradient overlays (`bg-gradient-to-br from-[#0A0A0D] via-[#1A1A2E] to-[#3A1F5D]`)
- **Accent Color:** `#00e5ff` (cyan neon) for all interactive elements
- **Text Colors:**
  - Headings: `text-white` (pure white)
  - Body: `text-white/90` (slightly transparent)
  - Muted: `text-[#a0a0b0]` (dark gray)
  - Accent labels: `text-[#00e5ff]` with uppercase `font-mono`
- **Interactive Elements:**
  - Primary buttons: `bg-[#00e5ff]` with `hover:bg-[#00e5ff]/80`
  - Glass cards: `bg-[rgba(20,20,30,0.6)]` with `backdrop-blur-xl`
  - Borders: `border-[#00e5ff]/20` or `border-white/10`
  - Focus rings: `ring-[#00e5ff]`

### Typography

- **Hero Heading:** `text-6xl sm:text-7xl md:text-8xl lg:text-9xl` — uses `font-serif` (Dancing Script from Google Fonts)
- **Section Headings:** `text-4xl font-extrabold uppercase tracking-tight text-white`
- **Section Labels:** `text-xs font-medium uppercase tracking-[0.24em] text-[#00e5ff]/60`
- **Body Text:** `text-base leading-7 text-white/90`
- **Font Stack:**
  - Display: `Inter` (Google Fonts)
  - Fancy (Hero): `Dancing Script` (Google Fonts)
  - Mono (Labels): `JetBrains Mono` (Google Fonts)

### Spacing & Layout

- **Container:** `max-w-6xl` centered with responsive padding
- **Section Gap:** `space-y-16 sm:space-y-20 lg:space-y-24`
- **Border Radius:** `rounded-2xl` for sections, `rounded-3xl` for cards, `rounded-full` for buttons
- **Shadow:** `shadow-[0_0_60px_rgba(0,229,255,0.08)]` for glass effect

---

## Page Structure

### Current Section Order

1. **Hero Section** — Cinematic introduction with particle canvas, countdown timer, couple names in Dancing Script
2. **Quick Facts Band** — Glass cards with event details (date, venue, dress code, deadline)
3. **Floating Controls** — Fixed bottom-right: music toggle, RSVP link, gift link
4. **Love Story Section** — Vertical timeline with glow dots, glass cards
5. **Album Slideshow** — Holographic Memory Deck: 3D carousel with Ken Burns effect, auto-play, multiple animations (Pan, Zoom, Pulse, Rotate, Shake, Glow)
6. **Schedule Section** — Dark timeline with cyan accents
7. **Wedding Party Section** — Grid cards with avatars, roles in JetBrains Mono
8. **Gift Section** — QR code cards for bank transfers (Techcombank, VIB)
9. **Venue Section** — Map with glass card overlay, Google Maps iframe
10. **Travel Section** — Tips with glass cards
11. **FAQ Section** — Accordion with glassmorphism
12. **RSVP Form** — Full form with name, guest count, message, calendar link

### Removed/Replaced Sections

- **GalleryTeaserSection** → Replaced by **Album Slideshow** (dynamic folder-based slideshow)
- **InvitationNote** → Removed (content merged into Hero/Love Story)
- **ContactSection** → Replaced by **Gift Section** + **Floating Controls**
- **EventDetailsSection** → Merged into **Quick Facts Band**

---

## Component Details

### Hero Section

**File:** `src/components/sections/HeroSection.tsx`

**Visual Treatment:**
- Background: `HAR01404.jpg` with opacity-65 + gradient overlay
- Particle canvas: 70 cyan particles with glow
- Countdown timer: Large white numbers with cyan labels
- Couple names: `font-serif` (Dancing Script) with text-shadow glow
- CTA buttons: Glass cards with cyan borders

**Content Tone:** Futuristic yet romantic ("Save the date", "Countdown to our special day")

### Album Slideshow (NEW)

**File:** `src/components/sections/GalleryTeaserSection.tsx`  
**Provider:** `src/components/sections/GalleryProvider.tsx` (server component, auto-scans `public/images/gallery/*/`)

**Features:**
- **Dynamic Categories:** Auto-discovers folders in `public/images/gallery/` (e.g., `sapa/`, `nhat-ban/`)
- **3D Carousel:** `perspective:1400px` with CSS transforms
- **Ken Burns Effect:** Slow zoom + pan on active slide
- **8 Animation Modes:** Ken Burns, Pan Left, Pan Up, Zoom In, Pulse, Rotate, Shake, Glow Pulse
- **Auto-Play:** 5-second interval with auto-advance to next category
- **Controls:** Prev/Next, Play/Pause, Animation switcher
- **Progress Bar:** Cinematic wipes with slideProgress
- **Keyboard Nav:** Arrow keys + Space for play/pause

**Active Category:** `sapa/` (20 images, auto-hides category tabs since only 1 category)

### RSVP Form

**File:** `src/components/sections/RsvpBand.tsx`

**Design:**
- Glass card form with `backdrop-blur-md`
- Fields: Name (text), Guest count (select), Message (textarea)
- Submit: Gradient button with cyan glow
- Success state: "RSVP_RECEIVED" message
- Calendar link: "Thêm vào lịch" with Google Calendar integration

**Note:** No admin form submit or Google Excel export — data is handled via Next.js API routes and Prisma.

---

## Technical Implementation

### Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **Styling:** Tailwind CSS v4 (with `bg-[#xxx]` arbitrary values)
- **Fonts:** Google Fonts (Inter, Dancing Script, JetBrains Mono) via `@import` in `globals.css`
- **State:** React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **Animations:** CSS `@keyframes` with Tailwind `animate-[...]`
- **Data Loading:** Server component (`GalleryProvider.tsx`) uses `fs.readdirSync` to scan gallery folders at build time
- **Build:** Turbopack (fast refresh, optimized production builds)

### File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          ← Main page with all sections
│   └── opengraph-image.tsx
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── QuickFactsBand.tsx
│   │   ├── LoveStorySection.tsx
│   │   ├── GalleryTeaserSection.tsx  ← NEW slideshow
│   │   ├── GalleryProvider.tsx       ← NEW server component
│   │   ├── ScheduleSection.tsx
│   │   ├── WeddingPartySection.tsx  ← NEW
│   │   ├── GiftSection.tsx          ← NEW
│   │   ├── VenueSection.tsx
│   │   ├── TravelSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── RsvpBand.tsx
│   │   └── FloatingControls.tsx
│   ├── ui/
│   │   ├── ParticleCanvas.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── TimelineItem.tsx
│   └── forms/  (empty - no admin forms)
├── lib/
│   ├── constants/event-data.ts
│   └── formatters/calendar.ts
└── hooks/useMusic.ts
```

### Data Management

- **Event Data:** `src/lib/constants/event-data.ts` (couple names: "Hoàng Hiếu & Kim Liên", date: 2026-12-25)
- **Gallery Data:** Auto-generated by `GalleryProvider.tsx` (no manual JSON needed)
- **RSVP Data:** Stored via Prisma (not in this repo — handled by API routes)

**No Google Excel or Admin Form Submit** — The system uses Next.js API routes + Prisma for data persistence.

---

## Build Status

- ✅ **Lint:** 0 errors (1 warning for `@next/next/no-img-element` in GiftSection — not blocking)
- ✅ **TypeScript:** No errors found
- ✅ **Build:** Successful (Turbopack, Next.js 16.2.4)

**Warnings:**
- `metadataBase` not set (not critical for local dev)
- Edge runtime warning for `/opengraph-image` (expected)

---

## Next Steps

1. **Epic 3 (Guest RSVP Submission):** Implement full RSVP functionality with API routes
2. **Multi-Agent Expansion:** Add more gallery categories (e.g., `nhat-ban/`, `studio/`)
3. **Performance:** Optimize images (AVIF/WebP conversion)
4. **Testing:** E2E tests for RSVP flow
