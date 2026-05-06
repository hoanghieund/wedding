# Page Sections Module

**Purpose:** Guest-facing page sections for the wedding landing page.

## Responsibilities

- Hero section with event title and featured image
- Event details and schedule sections
- Venue information and map display
- FAQ section
- Photo gallery section (optional)
- Travel information section (optional)

## Architecture Boundaries

- **Guest-facing only** - no admin-specific logic here
- Static-first architecture for informational content
- Sections should be composable and reusable
- Keep sections focused on presentation, not data fetching

## Usage Pattern

Expected section components:
- `HeroSection.tsx` - hero banner with event title (Story 2.1)
- `EventDetailsSection.tsx` - event date/time/schedule (Story 2.2)
- `VenueSection.tsx` - venue info and map (Story 2.3)
- `FaqSection.tsx` - frequently asked questions (Story 2.4)
- `GallerySection.tsx` - photo gallery (Story 2.6, optional)
- `TravelSection.tsx` - travel info (Story 2.6, optional)

## Naming Conventions

- Component files: **PascalCase**
- React components: **PascalCase**
- Section components should end with `Section` suffix

## Related Modules

- `src/components/ui/` - reusable UI primitives
- `public/images/hero/`, `gallery/`, `venue/` - section images
- `src/lib/constants/` - shared labels and copy
- `src/lib/metadata/` - page metadata for SEO
