# Metadata Module

**Purpose:** SEO, Open Graph, and social sharing metadata generation.

## Responsibilities

- Page metadata generation for guest-facing routes
- Open Graph and social sharing previews
- SEO title and description helpers
- Canonical URL and metadata composition
- Reusable metadata builders

## Architecture Boundaries

- Guest-facing informational content should be static-first
- Metadata generation supports social sharing and SEO
- Keep metadata concerns separate from page rendering logic
- Admin pages typically do not need public-facing share metadata

## Usage Pattern

Expected metadata modules:
- `site.ts` - shared site-wide metadata constants
- `home.ts` - landing page metadata builder (Story 2.5)
- `og.ts` - Open Graph image metadata helpers

Metadata should support:
- Home/landing page title and description
- Open Graph social cards
- Twitter/X card metadata if needed
- Canonical URLs for public pages

## Related Modules

- `src/lib/constants/` - shared site name and URL constants
- `public/images/og/` - social sharing preview images
- `src/app/` routes - pages consuming generated metadata
