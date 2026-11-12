---
target: src/app/page.tsx
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:/Users/hoanghieu/Documents/MySelf/wedding/src/app/page.tsx"
target_fingerprint: "sha256:978af9bbfde272f86fe794e344f07a8eaf8cf33c30026dc8ac31b947895499e6"
target_path: /Users/hoanghieu/Documents/MySelf/wedding/src/app/page.tsx
timestamp: 2026-11-12T04-23-19Z
slug: src-app-page-tsx
---
Method: dual-agent (A: AssessmentAdesignreview · B: AssessmentBdetectorbrowser)

## Design Health Score: 29/40 — Good (72.5%)

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | RSVP states exist; API errors do not focus invalid field. |
| 2 | Match System / Real World | 4 | Vietnamese copy and actual event sequence/venues fit guests. |
| 3 | User Control and Freedom | 2 | Full-screen invitation gate has no close/skip route. |
| 4 | Consistency and Standards | 3 | Cohesive system; some English labels mismatch Vietnamese-first UI. |
| 5 | Error Prevention | 3 | Required fields and bounded count; errors require field discovery. |
| 6 | Recognition Rather Than Recall | 3 | Facts/forms/maps labeled; mobile shortcuts visually icon-only. |
| 7 | Flexibility and Efficiency | 2 | Jump links exist, but schedule/directions lack visible labels. |
| 8 | Aesthetic and Minimalist Design | 3 | Distinctive art direction; long page/floating rail compete on mobile. |
| 9 | Error Recovery | 3 | Field-specific errors preserve data; focus does not move to error. |
| 10 | Help and Documentation | 3 | Useful FAQ/travel info; RSVP deadline far from the form. |

## Design Specificity Verdict

Strongly authored for Hoàng Hiếu & Kim Liên, not a replaceable wedding template: the long-distance story, actual Ninh Bình venues, and exact ceremony sequence make it personal. “Midnight Champagne & Starry Sky” fits a romantic, elegant invitation. Biggest opportunity: make mobile logistics easy to find and never obstructed.

**Deterministic scan:** CLI on `src/app/page.tsx` returned `[]`. Browser scan logged 50 desktop and 49 mobile anti-patterns. Main rule counts: `dark-glow` 31, `image-hover-transform` 11, `nested-cards` 8, `undersized-ui-text` 8, `gpt-thin-border-wide-shadow` 4, `all-caps-body` 3, `radial-spotlight-glow` 2, `kicker-above-heading` 1; desktop additionally had one `line-length`. Browser rules overlap/repeat elements; not independent issue totals. Some glow, uppercase, and nested-card reports are false positives against `DESIGN.md`'s intended champagne glow, uppercase labels, and layered cards. Functional 9–10px microcopy remains a concern. Detector injection succeeded; screenshot showed detector annotations in the [Human] tab.

## Overall Impression

Romantic and polished, with practical event details and RSVP. Main friction: on mobile, the floating shortcuts can cover the schedule/venue information guests need to read.

## What's Working

- Midnight/champagne palette and serif/script typography make a clear, non-generic identity.
- Four schedule stops, two venues, map/travel directions, calendar action, and RSVP serve real guest tasks.
- Skip link, labeled form fields, focus styles, and reduced-motion support are good foundations.

## Priority Issues

1. **[P1] Mobile shortcut rail covers schedule/venue text.** `src/components/sections/FloatingControls.tsx`: when logistics are visible, the fixed control row changes position and overlaps copy at 390×844. Guests may miss event times/addresses. Fix: reserve a safe-area dock or hide it while reading logistics; never overlay content. **Suggested command:** `/impeccable adapt`.
2. **[P2] Schedule and directions are buried after a long story.** `src/app/page.tsx` places six relationship milestones before the schedule; schedule/directions shortcuts are icon-only. First-time guests must scroll or infer icons. Fix: add visible Vietnamese links immediately after Quick Facts and repeat the RSVP deadline beside the form. **Suggested command:** `/impeccable layout`.
3. **[P2] RSVP errors do not move focus to the field needing correction.** `src/components/sections/RsvpBand.tsx` shows field errors but never focuses the first invalid input after the API response. On mobile/screen readers the error may be outside the viewport. Fix: focus the first invalid field in form order and preserve entered values. **Suggested command:** `/impeccable harden`.
4. **[P3] Date display is not natural Vietnamese order.** `src/lib/formatters/date-format.ts` uses `en-CA`, yielding `2026/12/06, 09:00`. Fix: use day-first Vietnamese form such as `06/12/2026`. **Suggested command:** `/impeccable clarify`.

## Cognitive Load

High: 4/8 checklist failures. Failures: single focus (toolbar competes with text), visual hierarchy (toolbar overlays content), minimal choices (attendee selector has 10 values), working memory (RSVP deadline is far from form). Passes: chunking, grouping, one task at a time in the form, progressive disclosure in FAQ/gallery. One decision point exceeds four options: attendee count 1–10.

## Emotional Journey

“Mở Thiệp” feels like opening a keepsake; the hero and names form the emotional peak. Six story milestones deepen the couple-specific feeling but create a practical valley for guests seeking schedule/directions. Venue/maps and RSVP restore task focus; the deadline far from the form weakens reassurance during confirmation.

## Persona Red Flags

- **Casey — Distracted Mobile User:** floating rail covers schedule/venue details; icon-only shortcuts require inference. Touch targets are otherwise 48px.
- **Jordan — Confused First-Timer:** RSVP/pin icons have no visible labels; “Wedding Invitation” and year/month/day format interrupt the Vietnamese-first experience.

## Minor Observations

- “Wedding Invitation” and “Wedding Party” are English in an otherwise Vietnamese guest journey.
- Quick Facts names only the groom's home, while the schedule starts at the bride's home; later sections clarify the two-location sequence.
- Detector reports 9–10px microcopy; glow/uppercase/card rules need design-aware filtering rather than mechanical changes.

## Questions to Consider

- Should schedule and venues come before the six relationship milestones?
- Should mobile shortcuts show Vietnamese labels or remain icon-only?
- Is “Mở Thiệp” a required ceremonial gate, or should guests jump directly to logistics?
