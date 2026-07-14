# Wedding P1 Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Sửa 7 lỗi P1 về responsive, accessibility, performance, typography và OG brand mà không đổi RSVP API, nội dung tiếng Việt hoặc palette midnight/champagne.

**Architecture:** Giữ component boundaries hiện tại và sửa tại source of truth. Overlay/lightbox dùng lớp page isolation chung qua helper local trong từng component nếu cần; RSVP giữ state hiện tại nhưng thêm field-error map và focus refs; OG dùng literal semantic values trùng DESIGN.md vì `next/og` không đọc CSS variables.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Vitest, browser verification, Impeccable detector.

## Global Constraints

- Chỉ xử lý 7 P1; không mở rộng sang P2/P3.
- Giữ nguyên nội dung tiếng Việt, palette midnight/champagne, RSVP API/schema và event data.
- Không thêm dependency.
- Mọi lệnh shell phải chạy qua `rtk`.
- Sau mỗi nhóm remediation chạy `rtk npm run lint` và `rtk npm run build` trước khi sang nhóm tiếp theo.
- Cuối cùng phải chạy `rtk npm test`, `rtk npx tsc --noEmit`, `rtk npm run lint`, `rtk npm run build` và browser audit.

---

### Task 1: Make invitation and hero operable in landscape

**Files:**
- Modify: `src/components/sections/EnterInvitationOverlay.tsx:72-103`
- Modify: `src/components/sections/HeroSection.tsx:19-82`
- Modify: `src/app/globals.css:27-34`

**Interfaces:**
- Consumes: existing `opened`, `prefersReduced`, `openButtonRef`, hero layout and font tokens.
- Produces: overlay with internal vertical scrolling and hero content that remains visible at `812×375`.

- [ ] **Step 1: Update overlay sizing and scroll containment**

  Change the dialog class from a centered `overflow-hidden` viewport to a viewport-height scroll container. Preserve background layers and button semantics. Use `min-h-dvh`, `max-h-dvh`, `overflow-y-auto`, `py-6 sm:py-8`, and `items-start` so content can be reached in landscape while remaining centered through an inner flex wrapper.

  Target structure:

  ```tsx
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="invitation-dialog-heading"
    onKeyDown={handleKeyDown}
    className="fixed inset-0 z-[999] min-h-dvh max-h-dvh overflow-y-auto overflow-x-hidden bg-[...] px-6 py-6 text-center sm:py-8"
  >
    {/* background layers */}
    <div className="relative flex min-h-[calc(100dvh-3rem)] items-center justify-center sm:min-h-[calc(100dvh-4rem)]">
      <div className="relative w-full max-w-[420px] ...">
        ...
      </div>
    </div>
  </div>
  ```

  Do not use a second scroll container inside the card.

- [ ] **Step 2: Make hero reflow without hiding vertical content**

  Keep `min-h-dvh`, replace the unconditional vertical clipping with horizontal-only clipping, and add landscape-specific alignment/padding. Use a fluid display ceiling no greater than `6rem` for the landscape name lockup while preserving current desktop scale.

  Target class changes:

  ```tsx
  className="relative min-h-dvh w-full overflow-x-hidden"
  ```

  Add a class to the content wrapper that gives landscape screens vertical breathing room, for example `py-8 landscape:min-h-[calc(100dvh+12rem)] landscape:py-12`, while keeping the existing `lg:flex-row` desktop composition.

  Replace the landscape-effective `text-7xl`/`text-5xl` lockup with responsive values capped at `6rem` before `lg`, without changing `lg:text-[8rem]` and `xl:text-[10rem]` desktop intent.

- [ ] **Step 3: Add a narrow landscape media rule only if utility classes cannot express the layout**

  In `globals.css`, add one scoped `@media (orientation: landscape) and (max-height: 520px)` rule for `#hero` content spacing. Do not add global overflow suppression or alter the reduced-motion block.

- [ ] **Step 4: Run responsive smoke check**

  Run the app/browser at `812×375` and `375×812`. Expected: overlay button fully visible and clickable; after opening, hero names and event details are visible; `scrollWidth === innerWidth` at 375px.

- [ ] **Step 5: Verify the group before continuing**

  ```bash
  rtk npm run lint
  rtk npm run build
  ```

  Expected: both commands exit 0.

- [ ] **Step 6: Commit**

  ```bash
  rtk git add src/components/sections/EnterInvitationOverlay.tsx src/components/sections/HeroSection.tsx src/app/globals.css
  rtk git commit -m "fix(ui): support invitation landscape layout"
  ```

---

### Task 2: Defer audio and isolate invitation/lightbox layers

**Files:**
- Modify: `src/components/sections/FloatingControls.tsx:41-43`
- Modify: `src/components/sections/EnterInvitationOverlay.tsx:1-70`
- Modify: `src/components/sections/GalleryTeaserSection.tsx:1-150,231-235`
- Modify: `src/app/page.tsx:75-109`
- Create: `src/lib/modal-isolation.ts`

**Interfaces:**
- Consumes: existing `opened` state, lightbox `lightboxIndex`, `previousFocusRef`, body overflow handling.
- Produces: no audio request before gesture; background inert/hidden while either modal is open; focus return remains intact.

- [ ] **Step 1: Defer audio preload**

  Change only the audio element preload value:

  ```tsx
  <audio id="bg-music" loop preload="none">
  ```

  Keep `handleOpen` and `useMusic().toggle()` as the only play paths.

- [ ] **Step 2: Add a shared page-content root and DOM isolation helper**

  Create `src/lib/modal-isolation.ts` with the exact client-safe API:

  ```ts
  export function setPageModalIsolation(active: boolean): void;
  ```

  The helper targets `#page-content`, snapshots its existing `inert` and `aria-hidden` values on first activation, sets `element.inert = true` and `aria-hidden="true"` while active, and restores the snapshot when inactive. It is a no-op when `document` or `#page-content` is unavailable.

  In `src/app/page.tsx`, wrap `HeroSection`, `QuickFactsBand`, `FloatingControls`, `main`, `RsvpBand`, and `FooterSection` in `div#page-content`; keep `EnterInvitationOverlay` outside that wrapper so it remains interactive. Do not change server data loading.

  Preferred DOM shape:

  ```tsx
  <div id="page-content">
    <HeroSection />
    ...
  </div>
  <EnterInvitationOverlay />
  ```

- [ ] **Step 3: Wire invitation isolation**

  Import `setPageModalIsolation` into `EnterInvitationOverlay.tsx`. Call it with `true` while the invitation overlay is mounted and with `false` in the cleanup path when it opens/unmounts. Keep the existing `aria-modal`, Escape behavior and focus-to-hero behavior. Ensure the open button remains the only focusable control in the invitation dialog.

- [ ] **Step 4: Wire lightbox isolation**

  Import `setPageModalIsolation` into `GalleryTeaserSection.tsx`. In the existing `lightboxIndex` effect, call it with `lightboxIndex !== null` and restore it to false in the effect cleanup. Preserve Escape, arrows, Tab loop, body scroll lock and trigger focus restoration.

- [ ] **Step 5: Verify modal behavior**

  Browser checks:
  - Invitation open: accessibility tree contains dialog controls, not page main/footer/floating controls.
  - Lightbox open: same isolation; close returns focus to image trigger.
  - New page before any click: no `wedding-music.mp3` resource.
  - Click invitation/music: audio request/play begins.

- [ ] **Step 6: Verify the group before continuing**

  ```bash
  rtk npm run lint
  rtk npm run build
  ```

  Expected: both commands exit 0.

- [ ] **Step 7: Commit**

  ```bash
  rtk git add src/components/sections/FloatingControls.tsx src/components/sections/EnterInvitationOverlay.tsx src/components/sections/GalleryTeaserSection.tsx src/app/page.tsx src/lib/modal-isolation.ts
  rtk git commit -m "fix(a11y): isolate modal background"
  ```

---

### Task 3: Render RSVP field errors and focus recovery

**Files:**
- Modify: `src/components/sections/RsvpBand.tsx:1-301`
- Test reference: `src/app/api/rsvp/route.test.ts:40-73` (existing server contract; do not change API)

**Interfaces:**
- Consumes: API response `{ ok?: boolean; error?: string; fieldErrors?: Partial<Record<Field, string>> }`.
- Produces: field-level error UI with stable ids, `aria-invalid`, `aria-describedby`, and first-error focus.

- [ ] **Step 1: Add client field-error types and refs**

  Add:

  ```tsx
  type RsvpField = "guestName" | "attendanceStatus" | "attendeeCount" | "guestMessage";
  type FieldErrors = Partial<Record<RsvpField, string>>;
  ```

  Add `const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});` and refs for `guestName`, `attendanceStatus`, `attendeeCount`, `guestMessage`. Clear a field’s error when the corresponding value changes.

- [ ] **Step 2: Parse API fieldErrors and focus first error**

  Extend the response cast with `fieldErrors`. On failed response:

  ```tsx
  const nextFieldErrors = result.fieldErrors ?? {};
  setFieldErrors(nextFieldErrors);
  requestAnimationFrame(() => {
    const firstField = ["guestName", "attendanceStatus", "attendeeCount", "guestMessage"]
      .find((field) => nextFieldErrors[field as RsvpField]);
    if (firstField === "attendanceStatus") attendanceStatusRef.current?.focus();
    else if (firstField) fieldRefs[firstField]?.current?.focus();
  });
  ```

  Preserve generic summary `setError(...)` and clear field errors before submit.

- [ ] **Step 3: Add field error nodes and ARIA attributes**

  Use stable ids such as `rsvp-guest-name-error`, `rsvp-attendance-status-error`, `rsvp-attendee-count-error`, `rsvp-message-error`. For each control/group, add `aria-invalid={Boolean(fieldErrors.field)}` and `aria-describedby={fieldErrors.field ? errorId : undefined}`. Render the error immediately below its field with `role="alert"` or a field-local live-safe element. Keep summary `role="alert"` for the generic error.

- [ ] **Step 4: Add focusable radiogroup label target**

  Keep the current custom radio behavior unchanged for this P1, but attach the attendance field error to the radiogroup and its first/selected button ref so the first error can receive focus.

- [ ] **Step 5: Verify with mocked responses**

  Browser mock response:

  ```json
  {
    "ok": false,
    "error": "Please check the highlighted fields.",
    "fieldErrors": {
      "guestName": "Tên lỗi",
      "attendeeCount": "Số lỗi"
    }
  }
  ```

  Expected: summary remains visible; errors appear beside fields; `guestName` has `aria-invalid="true"`; focus lands on `#rsvp-guest-name`; editing the field clears its error.

- [ ] **Step 6: Verify the group before continuing**

  ```bash
  rtk npm run lint
  rtk npm run build
  ```

  Expected: both commands exit 0.

- [ ] **Step 7: Commit**

  ```bash
  rtk git add src/components/sections/RsvpBand.tsx
  rtk git commit -m "fix(a11y): show RSVP field errors"
  ```

---

### Task 4: Correct heading font and OG brand tokens

**Files:**
- Modify: `src/app/globals.css:46-50`
- Modify: `src/app/opengraph-image.tsx:17-91`

**Interfaces:**
- Consumes: `--font-display-serif`, DESIGN.md midnight/champagne values.
- Produces: computed Playfair chapter headings and OG image with live brand palette.

- [ ] **Step 1: Correct chapter title token**

  Change:

  ```css
  .chapter-title {
    font-family: var(--font-display-serif);
  }
  ```

- [ ] **Step 2: Align OG palette and hierarchy**

  Replace cream/pink/purple background with the committed palette:

  ```tsx
  background: "#0a0e27",
  color: "#fff8ee",
  ```

  Use champagne `#f4e4c1` for primary title/labels, bronze `#d4a574` for secondary metadata, and `#101728` or `#1a2332` for supporting surfaces. Keep text solid, no gradient text, and maintain the current image dimensions.

- [ ] **Step 3: Verify computed type and generated source**

  Browser expected: `.chapter-title` computed family contains `Playfair Display`. Source scan expected: no `#fffaf6`, `#fdf2f8`, `#faf5ff`, `#be185d`, `#1c1917`, `#57534e`, or `#78716c` in `opengraph-image.tsx`.

- [ ] **Step 4: Verify the group before continuing**

  ```bash
  rtk npm run lint
  rtk npm run build
  ```

  Expected: both commands exit 0.

- [ ] **Step 5: Commit**

  ```bash
  rtk git add src/app/globals.css src/app/opengraph-image.tsx
  rtk git commit -m "fix(brand): align heading and OG typography"
  ```

---

### Task 5: Run full verification and audit regression check

**Files:**
- No source changes expected.
- Evidence: browser screenshots/metrics and command output.

- [ ] **Step 1: Run full project verification**

  ```bash
  rtk npm test
  rtk npx tsc --noEmit
  rtk npm run lint
  rtk npm run build
  ```

  Expected: all commands exit 0.

- [ ] **Step 2: Run browser acceptance matrix**

  Check `375×812`, `812×375`, and `1440×1000`:
  - invitation button visible and clickable in landscape;
  - hero names/details not clipped;
  - no mobile horizontal overflow;
  - no audio resource before click;
  - modal background absent from accessibility tree/tab order;
  - focus return works for invitation/lightbox;
  - RSVP mock field errors and focus recovery work;
  - chapter title computed font is Playfair Display;
  - QR/gallery still render.

- [ ] **Step 3: Capture before/after screenshots and metrics**

  Save screenshots for invitation landscape, hero landscape, RSVP field error, and lightbox. Record dialog/hero scroll metrics, resource entries and accessibility snapshots.

- [ ] **Step 4: Re-run Impeccable audit**

  ```bash
  rtk npx impeccable detect.mjs --json src/app src/components
  ```

  Confirm P1-specific detector hits are gone where applicable; document remaining P2/P3 hits without expanding scope.

- [ ] **Step 5: Review final diff and status**

  ```bash
  rtk git diff --check
  rtk git status --short
  ```

  Expected: no whitespace errors; only intended spec/source commits present.

- [ ] **Step 6: Commit verification evidence if required**

  Do not create documentation or screenshots in the repository unless explicitly requested. Report command output and browser evidence in the final handoff.
