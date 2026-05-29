# Page Sections Module

**Purpose:** Guest-facing page sections for the wedding landing page.

## Responsibilities

- Hero section with event title and featured image
- Event details and schedule sections
- Venue information and map display
- FAQ section
- Photo gallery teaser and provider
- Travel, gift, RSVP, and calendar-support sections

## Architecture Boundaries

- **Guest-facing only** - no admin-specific logic here
- Static-first architecture for informational content
- Sections should be composable and reusable
- Keep sections focused on presentation, not data fetching

## Usage Pattern

Current section components include:
- `HeroSection.tsx` - cinematic hero with event title
- `EventDetailsSection.tsx` and `ScheduleSection.tsx` - date/time and wedding flow
- `VenueSection.tsx` - venue info and map action
- `GalleryProvider.tsx` and `GalleryTeaserSection.tsx` - folder-based gallery slideshow
- `GiftSection.tsx`, `TravelSection.tsx`, `FaqSection.tsx`, `ContactSection.tsx`, and `RsvpBand.tsx`

## Naming Conventions

- Component files: **PascalCase**
- React components: **PascalCase**
- Section components should end with `Section` suffix

## Related Modules

- `src/components/ui/` - reusable UI primitives
- `public/images/hero/`, `gallery/`, `venue/` - section images
- `src/lib/constants/` - shared labels and copy
- `src/lib/metadata/` - page metadata for SEO
