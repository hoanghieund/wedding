---
target: src/app/page.tsx
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:/Users/hoanghieu/Documents/MySelf/wedding/src/app/page.tsx"
target_fingerprint: "sha256:978af9bbfde272f86fe794e344f07a8eaf8cf33c30026dc8ac31b947895499e6"
target_path: /Users/hoanghieu/Documents/MySelf/wedding/src/app/page.tsx
timestamp: 2026-09-29T09-31-22Z
slug: src-app-page-tsx
---
# Critique: `src/app/page.tsx`

Method: dual-agent (A: DesignAssessmentA · B: DetectorBrowserB)
Mode: Persuade — wedding invitation page with RSVP as the primary action.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Countdown visible; loading, success and error states exist in source but live submission was not exercised. |
| 2 | Match System / Real World | 4 | Vietnamese copy, event sequence, family venues and directions match guest planning. |
| 3 | User Control and Freedom | 1 | The “Mở Thiệp” dialog has no skip/close route; Escape is prevented. |
| 4 | Consistency and Standards | 3 | Palette/type are coherent; floating controls compete with the mobile RSVP form. |
| 5 | Error Prevention | 2 | RSVP allows 0 guests while marked attending; 0–10 is unexplained. |
| 6 | Recognition Rather Than Recall | 3 | Sections are clear, but the long page lacks navigation to schedule and venues. |
| 7 | Flexibility and Efficiency | 3 | Hero and fixed RSVP shortcuts help; no equivalent shortcut to logistics. |
| 8 | Aesthetic and Minimalist Design | 2 | Strong mood, but fixed controls and countdown compete for attention. |
| 9 | Error Recovery | 3 | Submission error is announced; form state is retained in source. |
| 10 | Help and Documentation | 3 | FAQ, venue and directions help; little context-specific support in the form. |
| **Total** | | **27/40 — Acceptable** | Address RSVP friction and navigation. |

## Design Specificity Verdict

Authored for this couple: Vietnamese invitation copy, couple names, exact date, two family venues, procession, directions and wedding-specific FAQ are product-specific. Midnight/champagne colors and serif/script typography align with DESIGN.md. Cinematic hero, oversized serif names and countdown remain familiar wedding-site patterns; identity comes chiefly from content and imagery.

Static detector on `src/app/page.tsx` returned zero findings. Runtime detector overlay on rendered page reported 40 anti-pattern matches across seven rules: `dark-glow`, `nested-cards`, `gpt-thin-border-wide-shadow`, `line-length`, `all-caps-body`, `radial-spotlight-glow`, `image-hover-transform`. Per-rule logs totaled 59 occurrences and may overlap, not 59 distinct issues. Several are likely intentional/heuristic matches: glow and radial light fit the documented palette; uppercase appears on compact action labels; image hover may be intended gallery behavior. Runtime output did not identify exact source lines. Browser injection succeeded in the isolated assessment tab; that tab was closed after inspection, so no overlay remains open.

## Overall Impression

The page feels like an intimate invitation and serves real guest needs. Biggest opportunity: keep the opening ritual while removing mobile obstruction from the RSVP task and improving access to practical details.

## What's Working

- Couple/event specificity: exact date, venues, schedule and route information serve actual guests.
- Coherent romantic atmosphere: navy/champagne with classic serif and restrained script follows the design brief.
- RSVP is reachable directly from the hero and a persistent shortcut; practical details include directions, travel, FAQ and calendar support.

## Priority Issues

1. **[P1] Fixed controls overlap the RSVP form on mobile.** At 390px, the fixed right-side controls sit over the guest-count/message area. This obscures and competes with the primary task. **Fix:** hide/condense controls while RSVP is in view or relocate them outside the form's safe area; retest the complete form on mobile. **Suggested command:** `/impeccable adapt src/components/sections/FloatingControls.tsx`.
2. **[P2] The invitation gate has no skip route.** Keyboard-operable “Mở Thiệp” opens the page, but Tab/Escape keep focus at the gate until activation; guests cannot go directly to directions or RSVP. **Fix:** add “Bỏ qua”/“Xem thông tin” or allow Escape to dismiss if the entrance ritual may be skipped. **Suggested command:** `/impeccable harden src/components/sections/EnterInvitationOverlay.tsx`.
3. **[P2] RSVP permits attending with zero guests.** The UI exposes 0–10; API validation accepts zero without correlating it to attendance status. **Fix:** confirm the actual invited-party limit and disallow 0 when attending. Do not invent a party cap. **Suggested command:** `/impeccable clarify src/components/sections/RsvpBand.tsx`.
4. **[P2] Practical sections are hard to reach on a very long page.** The page measures about 12,543px desktop and 17,868px mobile. The fixed RSVP shortcut helps, but does not jump to schedule, venue or directions. **Fix:** add concise links to those essential sections without replacing the editorial flow. **Suggested command:** `/impeccable layout src/app/page.tsx`.

## Persona Red Flags

- **Jordan (first-timer):** the opening gate says “Mở Thiệp” but does not explain where event details and RSVP are.
- **Casey (distracted mobile guest):** fixed controls intrude on RSVP fields during one-handed form completion.
- **Riley (deliberate stress tester):** submitting attendance with a count of zero passes the current relationship checks.

## Minor Observations

- Four live countdown units compete with the date and RSVP CTA; seconds add little for trip planning.
- Glow, radial spotlight, uppercase labels and hover transforms match intentional styles in DESIGN.md; do not treat detector counts alone as defects.

## Questions to Consider

- Should the theatrical entry be skippable so guests can reach event details directly?
- What should a count of zero mean when attendance is “attending”?
- Which section after RSVP needs the fastest shortcut: schedule, venue or directions?
