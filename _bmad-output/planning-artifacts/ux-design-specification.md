---
workflowType: 'ux-design'
project_name: 'wedding'
status: 'complete'
last_updated: '2026-05-29'
---

# UX Design Specification

## Current UX Direction

The completed site is a mobile-first cinematic wedding invitation. The interface uses a dark romantic visual system with cyan neon accents, glass surfaces, particle motion, large photography, and compact utility controls.

## Primary User

The primary user is a wedding guest opening the site from a shared link on mobile. The experience should make the guest quickly understand the event, feel invited, and complete RSVP without needing an account or separate form.

## Core Journey

1. Enter the invitation experience.
2. See the couple, date, and wedding tone immediately.
3. Scan key event details and schedule.
4. View venue, map, travel, gift, and FAQ information.
5. Browse the gallery teaser.
6. Submit RSVP and receive a clear confirmation state.
7. Use contact or calendar actions if needed.

## Implemented Sections

- `HeroSection`
- `QuickFactsBand`
- `LoveStorySection`
- `ScheduleSection`
- `WeddingPartySection`
- `GalleryProvider` and `GalleryTeaserSection`
- `GiftSection`
- `VenueSection`
- `TravelSection`
- `FaqSection`
- `RsvpBand`
- `FloatingControls`

## Interaction Requirements

- RSVP must be short, direct, and forgiving.
- Feedback states must be explicit for success and failure.
- Text must remain readable on mobile.
- Navigation and controls must be touch-friendly.
- Music and motion controls must not block the primary content.

## Removed UX Scope

The final product does not include admin screens, protected dashboard flows, admin login, RSVP table management, or database-backed operations.
