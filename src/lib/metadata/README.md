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
- Metadata is only needed for the public guest-facing site.

## Usage Pattern

Current metadata lives in `src/app/layout.tsx`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`.

Metadata should support:
- Home/landing page title and description
- Open Graph social cards
- Twitter/X card metadata if needed
- Canonical URLs for public pages

## Related Modules

- `src/lib/constants/` - shared site name and URL constants
- `public/images/og/` - social sharing preview images
- `src/app/` routes - pages consuming generated metadata
