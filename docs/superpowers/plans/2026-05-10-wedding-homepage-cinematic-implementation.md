# Wedding Homepage Cinematic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the entire wedding homepage into a cinematic, romantic-dark experience while preserving all current business behavior and interactive flows.

**Architecture:** Keep the existing Next.js App Router structure and section component boundaries, then replace the current cyan/neon visual language with a shared champagne/midnight design system. Implement the redesign in thin vertical slices: global tokens first, then hero, then supporting sections, then motion polish and regression verification so each checkpoint remains testable and reversible.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, existing client components/hooks, browser verification, pnpm, ESLint.

---

## File Structure Map

### Existing files to modify
- `src/app/layout.tsx` — load final font set for the new typography system.
- `src/app/globals.css` — replace global theme tokens, animation primitives, and reusable visual utilities.
- `src/app/page.tsx` — update page shell background, section spacing, and chapter rhythm.
- `src/components/sections/HeroSection.tsx` — redesign hero composition, palette, typography, overlay, and motion sequence.
- `src/components/sections/QuickFactsBand.tsx` — restyle cards and labels to match the new design system.
- `src/components/sections/LoveStorySection.tsx` — convert current timeline visuals to cinematic vertical story styling.
- `src/components/sections/GalleryTeaserSection.tsx` — reskin slideshow controls and accents from cyan to champagne/rose gold.
- `src/components/sections/ScheduleSection.tsx` — update timeline styling for refined serif + mono structure.
- `src/components/sections/WeddingPartySection.tsx` — restyle portrait grid and labels.
- `src/components/sections/GiftSection.tsx` — refine QR card presentation while keeping scan readability.
- `src/components/sections/VenueSection.tsx` — update map wrapper and overlay card styling.
- `src/components/sections/TravelSection.tsx` — restyle informational cards.
- `src/components/sections/FaqSection.tsx` — restyle accordion states and transitions.
- `src/components/sections/RsvpBand.tsx` — redesign final CTA/form scene without changing submit flow.
- `src/components/sections/FloatingControls.tsx` — re-skin floating actions so they feel editorial instead of app-like.
- `src/components/sections/EnterInvitationOverlay.tsx` — align opening overlay with the new tone if still rendered.
- `src/components/ui/ParticleCanvas.tsx` — adjust particle color/intensity if required by the hero redesign.
- `src/components/ui/CountdownTimer.tsx` — restyle typography and spacing if the current component owns its own UI.

### Existing files to inspect while implementing
- `src/lib/constants/event-data.ts` — preserve content and event metadata.
- `src/hooks/useInView.ts` — reuse reveal behavior instead of creating a second reveal system.

### Expected testing surface
- Existing repo checks: `pnpm lint`
- Browser verification: homepage golden path on desktop + mobile width

---

### Task 1: Replace global typography and theme tokens

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Test: `pnpm lint`

- [ ] **Step 1: Update the font imports in `src/app/layout.tsx`**

Replace the current Google Fonts link with the approved font stack.

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</head>
<body className="min-h-full flex flex-col bg-[var(--bg)] font-sans text-[var(--text-primary)]">
  {children}
</body>
```

- [ ] **Step 2: Run lint to verify the layout change is syntactically valid**

Run: `pnpm lint`
Expected: PASS or existing unrelated warnings only.

- [ ] **Step 3: Replace the root design tokens in `src/app/globals.css`**

Update the token block near the top of the file.

```css
:root {
  --bg: #0a0e27;
  --bg-elevated: #1a2332;
  --bg-deep: #101728;
  --surface: rgba(26, 35, 50, 0.72);
  --surface-strong: rgba(12, 18, 35, 0.84);
  --accent: #f4e4c1;
  --accent-soft: #d4a574;
  --text-primary: #fff8ee;
  --text-secondary: rgba(255, 248, 238, 0.78);
  --border-soft: rgba(244, 228, 193, 0.14);
  --glow-soft: 0 18px 60px rgba(212, 165, 116, 0.18);
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-script: 'Great Vibes', 'Dancing Script', cursive;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

@theme {
  --font-sans: var(--font-body);
  --font-serif: var(--font-display);
}
```

- [ ] **Step 4: Update the global body styles and reusable utilities in `src/app/globals.css`**

Replace the current body block and add shared utilities used by multiple sections.

```css
body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(212, 165, 116, 0.08), transparent 32%),
    linear-gradient(180deg, #0a0e27 0%, #11182b 45%, #0d1323 100%);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
}

.section-shell {
  border: 1px solid var(--border-soft);
  background: linear-gradient(180deg, rgba(26, 35, 50, 0.72), rgba(12, 18, 35, 0.78));
  box-shadow: var(--glow-soft);
  backdrop-filter: blur(18px);
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent-soft);
}

.chapter-title {
  font-family: var(--font-display);
  color: var(--accent);
}

.copy-muted {
  color: var(--text-secondary);
}
```

- [ ] **Step 5: Add the new animation primitives in `src/app/globals.css`**

Keep the existing reveal classes, but replace cyan-based glow animation with champagne-based motion.

```css
@keyframes champagne-pulse {
  0%, 100% {
    box-shadow: 0 14px 42px rgba(212, 165, 116, 0.18);
  }
  50% {
    box-shadow: 0 20px 62px rgba(244, 228, 193, 0.26);
  }
}

@keyframes shimmer-line {
  0% {
    opacity: 0.3;
    transform: scaleY(0.2);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

.animate-champagne-pulse {
  animation: champagne-pulse 2.8s ease-in-out infinite;
}
```

- [ ] **Step 6: Run lint after the global CSS update**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 7: Commit the global design system slice**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "refactor: add cinematic wedding theme tokens"
```

### Task 2: Rework the page shell and chapter spacing

**Files:**
- Modify: `src/app/page.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Write a focused shell regression checklist in the plan execution notes**

Use this checklist during implementation:

```text
- Hero remains first on the page
- QuickFacts stays above main content grid
- FloatingControls and EnterInvitationOverlay still render
- RSVP remains last
```

- [ ] **Step 2: Update the page wrapper in `src/app/page.tsx`**

Replace the current top-level page background wrapper with a version that matches the spec.

```tsx
<div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,228,193,0.08),transparent_28%),linear-gradient(180deg,rgba(10,14,39,0.82),rgba(10,14,39,0.94))]" />
  <HeroSection />
  <QuickFactsBand />
  <FloatingControls />
  <EnterInvitationOverlay />

  <main className="relative mx-auto w-full max-w-6xl space-y-24 px-4 py-20 sm:space-y-28 sm:px-6 sm:py-24 lg:space-y-32 lg:px-8 lg:py-28">
    <LoveStorySection />
    <GalleryProvider />
    <ScheduleSection />
    <WeddingPartySection />
    <GiftSection />
    <VenueSection groomVenue={VENUE_GROOM} brideVenue={VENUE_BRIDE} />

    <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
      <TravelSection />
      <FaqSection />
    </div>
  </main>

  <RsvpBand />
</div>
```

- [ ] **Step 3: Run lint for the page shell change**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 4: Commit the page shell update**

```bash
git add src/app/page.tsx
git commit -m "refactor: adjust homepage chapter layout"
```

### Task 3: Redesign the hero section

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/ui/ParticleCanvas.tsx`
- Modify: `src/components/ui/CountdownTimer.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Replace cyan hero constants with champagne equivalents in `src/components/sections/HeroSection.tsx`**

Update the constants near the top of the file.

```tsx
const HERO_COPY = {
  invitation: "Save the date",
  eventTitle: "Lễ Thành Hôn",
  countdownLabel: "Đếm ngược đến khoảnh khắc chúng ta thuộc về nhau",
  rsvpLabel: "Xác nhận tham dự",
};

const DEFAULT_TEXT_SHADOW = "0 0 30px rgba(244, 228, 193, 0.22), 0 0 72px rgba(212, 165, 116, 0.16)";
const ACTIVE_TEXT_SHADOW = "0 0 36px rgba(244, 228, 193, 0.42), 0 0 96px rgba(212, 165, 116, 0.22)";
```

- [ ] **Step 2: Replace the hero markup with the approved composition**

Use this structure inside `return` in `src/components/sections/HeroSection.tsx`.

```tsx
<section
  ref={ref}
  id="hero"
  aria-labelledby="hero-heading"
  className="relative min-h-[92vh] w-full overflow-hidden bg-[var(--bg)] sm:min-h-screen"
>
  <Image
    src={HERO_IMAGE.src}
    alt={HERO_IMAGE.alt}
    fill
    priority
    sizes="100vw"
    className="object-cover opacity-20 saturate-[0.82]"
  />
  <ParticleCanvas />
  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,39,0.26),rgba(10,14,39,0.76)_40%,rgba(10,14,39,0.94))]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,228,193,0.12),transparent_28%)]" />

  <div className="relative flex min-h-[92vh] items-center justify-center px-6 py-20 sm:min-h-screen sm:px-10 lg:px-14">
    <div className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <p className={`section-label mb-6 ${isInView ? "animate-fade-down" : hiddenClass}`}>
        {HERO_COPY.invitation}
      </p>
      <p className={`mb-3 font-serif text-base tracking-[0.25em] text-[var(--text-secondary)] uppercase ${isInView ? "animate-fade-up-soft" : hiddenClass}`}>
        {HERO_COPY.eventTitle}
      </p>
      <h1 id="hero-heading" className="font-[var(--font-script)] text-[3.8rem] leading-none text-[var(--accent)] sm:text-[5.4rem] lg:text-[7rem]">
        {COUPLE.combinedName}
      </h1>
      <p className={`mt-8 font-serif text-lg tracking-[0.28em] text-[var(--text-primary)] uppercase ${isInView ? "animate-fade-up" : hiddenClass}`}>
        {formatEventDate(EVENT_CONFIG.date)}
      </p>
      <p className={`mt-5 max-w-2xl text-lg copy-muted ${isInView ? "animate-fade-up-soft" : hiddenClass}`}>
        {HERO_COPY.countdownLabel}
      </p>
      <div className={`mt-10 w-full max-w-3xl ${isInView ? "animate-fade-up-soft" : hiddenClass}`}>
        <CountdownTimer targetDate={EVENT_CONFIG.date} />
      </div>
      <div className={`mt-14 flex flex-col items-center gap-3 ${isInView ? "animate-fade-up" : hiddenClass}`}>
        <span className="h-14 w-px bg-gradient-to-b from-transparent via-[var(--accent-soft)] to-transparent" />
        <span className="section-label">Scroll</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update `src/components/ui/ParticleCanvas.tsx` to use warm particles**

Replace the current particle fill/glow values with champagne colors.

```tsx
ctx.fillStyle = "rgba(244, 228, 193, 0.55)";
ctx.shadowColor = "rgba(212, 165, 116, 0.45)";
ctx.shadowBlur = 16;
```

- [ ] **Step 4: Restyle the timer in `src/components/ui/CountdownTimer.tsx`**

Apply these class changes to the timer cards and labels.

```tsx
<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
  {items.map((item) => (
    <div key={item.label} className="section-shell rounded-[1.75rem] px-5 py-6 text-center">
      <div className="font-serif text-4xl text-[var(--accent)] sm:text-5xl">{item.value}</div>
      <div className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--accent-soft)]">
        {item.label}
      </div>
    </div>
  ))}
</div>
```

- [ ] **Step 5: Run lint for the hero slice**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 6: Start the dev server for UI verification**

Run: `pnpm dev`
Expected: Next.js dev server starts successfully and prints a localhost URL.

- [ ] **Step 7: Verify the hero in a browser**

Check:

```text
- Background image is visible but subdued
- Couple names dominate the composition
- Countdown is readable on desktop and mobile width
- Scroll indicator appears below the timer
- No cyan accents remain in hero/timer/particles
```

- [ ] **Step 8: Commit the hero redesign**

```bash
git add src/components/sections/HeroSection.tsx src/components/ui/ParticleCanvas.tsx src/components/ui/CountdownTimer.tsx
git commit -m "refactor: redesign wedding hero chapter"
```

### Task 4: Redesign the Quick Facts and Love Story sections

**Files:**
- Modify: `src/components/sections/QuickFactsBand.tsx`
- Modify: `src/components/sections/LoveStorySection.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Update the Quick Facts outer shell**

Wrap the band in the shared visual system.

```tsx
<section className="relative -mt-10 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-4">
    {facts.map((fact, index) => (
      <article
        key={fact.label}
        className={`section-shell rounded-[1.75rem] px-6 py-6 text-center ${isInView ? `animate-fade-up-soft stagger-${index + 1}` : "reveal-hidden"}`}
      >
        <p className="section-label">{fact.label}</p>
        <h3 className="mt-4 font-serif text-2xl text-[var(--accent)]">{fact.value}</h3>
        <p className="mt-2 copy-muted">{fact.detail}</p>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Restyle the Love Story section container and titles**

Apply the new shell/title/copy classes.

```tsx
<section id="love-story" className="section-shell rounded-[2rem] px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
  <p className="section-label">Our story</p>
  <h2 className="chapter-title mt-4 text-4xl sm:text-5xl">Những chương đầu tiên</h2>
  <p className="mt-4 max-w-2xl text-lg copy-muted">
    Từng cột mốc được kể lại như một khung hình chậm, mềm và đầy khoảng thở.
  </p>
</section>
```

- [ ] **Step 3: Update the Love Story timeline items**

Use this structure for each milestone card.

```tsx
<article className="relative pl-10 sm:pl-14">
  <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full bg-[var(--accent-soft)] shadow-[0_0_18px_rgba(212,165,116,0.45)]" />
  <p className="section-label">{item.label}</p>
  <h3 className="mt-3 font-serif text-2xl text-[var(--accent)]">{item.title}</h3>
  <p className="mt-3 text-lg copy-muted">{item.description}</p>
</article>
```

- [ ] **Step 4: Run lint for the first narrative sections**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 5: Verify in browser**

Check:

```text
- Quick Facts cards read clearly at a glance
- Love Story feels warmer and less technical than before
- Timeline markers glow in champagne, not cyan
```

- [ ] **Step 6: Commit the section slice**

```bash
git add src/components/sections/QuickFactsBand.tsx src/components/sections/LoveStorySection.tsx
git commit -m "refactor: restyle wedding story chapters"
```

### Task 5: Reskin Gallery and Schedule

**Files:**
- Modify: `src/components/sections/GalleryTeaserSection.tsx`
- Modify: `src/components/sections/ScheduleSection.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Replace gallery accent colors and control shells**

Search for `#00e5ff` and replace the gallery-only accents with the new palette.

```tsx
const accentColor = "#f4e4c1";
const accentSoftColor = "#d4a574";
```

Apply classes like:

```tsx
className="rounded-full border border-[rgba(244,228,193,0.18)] bg-[rgba(10,14,39,0.72)] text-[var(--accent)] hover:border-[var(--accent-soft)]"
```

- [ ] **Step 2: Update gallery section heading block**

```tsx
<div className="mb-10 text-center">
  <p className="section-label">Our memories</p>
  <h2 className="chapter-title mt-4 text-4xl sm:text-5xl">Album</h2>
  <p className="mx-auto mt-4 max-w-2xl text-lg copy-muted">
    Những lát cắt dịu dàng được giữ lại như những khung hình điện ảnh.
  </p>
</div>
```

- [ ] **Step 3: Restyle the schedule timeline shell**

```tsx
<section className="section-shell rounded-[2rem] px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
  <p className="section-label">Timeline</p>
  <h2 className="chapter-title mt-4 text-4xl sm:text-5xl">Lịch trình trong ngày</h2>
</section>
```

- [ ] **Step 4: Restyle schedule entries**

```tsx
<article className="min-w-[12rem] text-center">
  <span className="mx-auto mb-4 block h-3.5 w-3.5 rounded-full bg-[var(--accent-soft)] shadow-[0_0_18px_rgba(212,165,116,0.45)]" />
  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--accent-soft)]">{item.time}</p>
  <h3 className="mt-3 font-serif text-2xl text-[var(--accent)]">{item.title}</h3>
  <p className="mt-2 copy-muted">{item.description}</p>
</article>
```

- [ ] **Step 5: Run lint for gallery and schedule**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 6: Verify in browser**

Check:

```text
- Gallery slideshow still advances and controls still work
- Progress bar and controls use champagne palette
- Schedule remains readable on mobile widths
```

- [ ] **Step 7: Commit the gallery/schedule slice**

```bash
git add src/components/sections/GalleryTeaserSection.tsx src/components/sections/ScheduleSection.tsx
git commit -m "refactor: reskin gallery and schedule chapters"
```

### Task 6: Restyle Wedding Party, Gift, Venue, and Travel

**Files:**
- Modify: `src/components/sections/WeddingPartySection.tsx`
- Modify: `src/components/sections/GiftSection.tsx`
- Modify: `src/components/sections/VenueSection.tsx`
- Modify: `src/components/sections/TravelSection.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Apply the shared shell and serif headings to Wedding Party**

```tsx
<section className="section-shell rounded-[2rem] px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
  <p className="section-label">Wedding party</p>
  <h2 className="chapter-title mt-4 text-4xl sm:text-5xl">Những người thân thương</h2>
</section>
```

- [ ] **Step 2: Update party cards**

```tsx
<article className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[rgba(10,14,39,0.56)] px-5 py-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(212,165,116,0.16)]">
  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-[rgba(244,228,193,0.22)]" />
  <h3 className="font-serif text-2xl text-[var(--accent)]">{member.name}</h3>
  <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--accent-soft)]">{member.role}</p>
</article>
```

- [ ] **Step 3: Refine the gift card contrast without affecting QR readability**

```tsx
<article className="section-shell rounded-[2rem] px-6 py-8 text-center">
  <div className="mx-auto mb-6 w-fit rounded-[1.25rem] bg-white p-3">
    <img src={qrCodeSrc} alt={bankName} className="h-40 w-40" />
  </div>
  <h3 className="font-serif text-2xl text-[var(--accent)]">{bankName}</h3>
  <p className="mt-3 font-mono text-sm tracking-[0.18em] text-[var(--accent-soft)]">{accountNumber}</p>
</article>
```

- [ ] **Step 4: Update venue and travel wrappers**

```tsx
<section className="section-shell rounded-[2rem] overflow-hidden">
  {/* existing content */}
</section>
```

For any venue overlay card, use:

```tsx
<div className="max-w-md rounded-[1.75rem] border border-[var(--border-soft)] bg-[rgba(10,14,39,0.82)] p-6 backdrop-blur-xl">
```

- [ ] **Step 5: Run lint for this slice**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 6: Verify in browser**

Check:

```text
- Portrait cards feel consistent with the design system
- QR codes remain easy to scan
- Venue overlay is readable over the map
- Travel cards still scan quickly on mobile
```

- [ ] **Step 7: Commit the utility chapter slice**

```bash
git add src/components/sections/WeddingPartySection.tsx src/components/sections/GiftSection.tsx src/components/sections/VenueSection.tsx src/components/sections/TravelSection.tsx
git commit -m "refactor: restyle supporting wedding chapters"
```

### Task 7: Restyle FAQ, RSVP, Floating Controls, and Invitation Overlay

**Files:**
- Modify: `src/components/sections/FaqSection.tsx`
- Modify: `src/components/sections/RsvpBand.tsx`
- Modify: `src/components/sections/FloatingControls.tsx`
- Modify: `src/components/sections/EnterInvitationOverlay.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Restyle FAQ shells and active state**

Use this accordion item structure.

```tsx
<article className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[rgba(10,14,39,0.56)] transition duration-300 data-[open=true]:border-[rgba(244,228,193,0.28)] data-[open=true]:shadow-[0_18px_50px_rgba(212,165,116,0.12)]">
  <button className="flex w-full items-center justify-between px-5 py-5 text-left">
    <span className="font-serif text-xl text-[var(--accent)]">{question}</span>
  </button>
</article>
```

- [ ] **Step 2: Redesign the RSVP section as the final chapter**

```tsx
<section className="relative px-4 pb-20 pt-8 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(26,35,50,0.82),rgba(10,14,39,0.92))] px-6 py-10 shadow-[0_22px_80px_rgba(212,165,116,0.16)] backdrop-blur-xl sm:px-8 sm:py-12">
    <p className="section-label text-center">Final chapter</p>
    <h2 className="mt-4 text-center font-[var(--font-script)] text-5xl text-[var(--accent)] sm:text-6xl">Xác nhận tham dự</h2>
  </div>
</section>
```

- [ ] **Step 3: Update RSVP field styles without changing logic**

```tsx
className="w-full rounded-2xl border border-[var(--border-soft)] bg-[rgba(10,14,39,0.62)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[rgba(255,248,238,0.42)] focus:border-[rgba(244,228,193,0.4)] focus:outline-none"
```

Use this submit button styling:

```tsx
className="w-full rounded-2xl bg-[linear-gradient(135deg,#d4a574,#f4e4c1)] px-5 py-3 font-serif text-lg text-[#0a0e27] transition duration-300 hover:brightness-105"
```

- [ ] **Step 4: Re-skin floating controls and invitation overlay**

For floating control buttons:

```tsx
className="rounded-full border border-[rgba(244,228,193,0.16)] bg-[rgba(10,14,39,0.82)] text-[var(--accent)] shadow-[0_12px_36px_rgba(212,165,116,0.16)] backdrop-blur-xl"
```

For the invitation overlay wrapper:

```tsx
className="bg-[radial-gradient(circle_at_top,rgba(244,228,193,0.12),transparent_28%),rgba(10,14,39,0.96)]"
```

- [ ] **Step 5: Run lint for the final section slice**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 6: Verify in browser**

Check:

```text
- FAQ still expands/collapses correctly
- RSVP still submits and shows the current success flow
- Floating controls remain tappable on mobile
- Invitation overlay still opens/closes correctly
```

- [ ] **Step 7: Commit the final interaction slice**

```bash
git add src/components/sections/FaqSection.tsx src/components/sections/RsvpBand.tsx src/components/sections/FloatingControls.tsx src/components/sections/EnterInvitationOverlay.tsx
git commit -m "refactor: finalize cinematic wedding interactions"
```

### Task 8: End-to-end regression and polish pass

**Files:**
- Modify: any files from Tasks 1-7 only if fixes are needed
- Test: `pnpm lint`

- [ ] **Step 1: Run the full lint check**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 2: Verify the homepage in a desktop browser**

Check:

```text
- Hero typography and atmosphere match the approved spec
- All major sections share one coherent palette
- No cyan accents remain unless intentionally preserved in non-homepage code
- Gallery, FAQ, RSVP, and floating controls still work
```

- [ ] **Step 3: Verify the homepage in a narrow mobile viewport**

Check:

```text
- Hero text wraps elegantly
- Quick Facts and RSVP remain readable
- Schedule and Gallery controls remain usable
- Floating controls do not cover critical form elements
```

- [ ] **Step 4: Make any minimal fixes discovered during browser verification**

Only touch files from earlier tasks. Do not add new features.

```text
Examples:
- reduce heading size on mobile
- increase RSVP bottom padding to avoid floating control overlap
- soften blur or shadow if readability drops
```

- [ ] **Step 5: Re-run lint after fixes**

Run: `pnpm lint`
Expected: PASS.

- [ ] **Step 6: Commit the final polish pass**

```bash
git add src/app/page.tsx src/app/globals.css src/components/sections src/components/ui
git commit -m "refactor: polish cinematic wedding homepage"
```

## Self-Review

### Spec coverage
- Visual system, palette, and typography are covered by Task 1.
- Chapter rhythm and page spacing are covered by Task 2.
- Hero atmospheric image, poetic typography, countdown, and particles are covered by Task 3.
- Quick Facts and Love Story are covered by Task 4.
- Gallery and Schedule are covered by Task 5.
- Wedding Party, Gift, Venue, and Travel are covered by Task 6.
- FAQ, RSVP, Floating Controls, and Enter Invitation Overlay are covered by Task 7.
- Browser verification, mobile verification, and regression checks are covered by Task 8.

### Placeholder scan
- No `TODO`, `TBD`, or “implement later” markers remain.
- Every code-changing step includes concrete code or exact class/style targets.
- Every validation step includes an exact command or explicit browser checklist.

### Type consistency
- Shared token names use the same CSS variables across all tasks: `--accent`, `--accent-soft`, `--text-primary`, `--border-soft`.
- Shared reusable classes remain consistent across tasks: `section-shell`, `section-label`, `chapter-title`, `copy-muted`.
- Browser verification consistently assumes `pnpm dev` and the existing homepage route.
