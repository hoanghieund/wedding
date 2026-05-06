# Story 2.5: Add Metadata and Sharing Preview Support

Status: ready-for-dev

## Story

As a guest receiving the wedding link in a messaging app,
I want the shared link to show a useful preview and open correctly,
So that I can trust the link and access the intended content directly.

## Acceptance Criteria

**Given** the wedding website is shared via messaging apps or opened in a browser
**When** the link preview metadata is generated
**Then** the page includes descriptive title, metadata, and Open Graph tags
**And** the preview communicates the wedding context appropriately
**And** the website opens directly to the intended homepage content
**And** metadata implementation does not expose private guest data

## Tasks / Subtasks

- [ ] Add Next.js metadata configuration (AC: title, metadata, Open Graph tags)
  - [ ] Update `src/app/layout.tsx` metadata export
  - [ ] Add title, description, and canonical URL
  - [ ] Add Open Graph fields (`og:title`, `og:description`, `og:image`, `og:type`)
  - [ ] Add Twitter card metadata if appropriate
- [ ] Create or configure preview image asset (AC: preview communicates wedding context)
  - [ ] Add OG image under `public/images/og/`
  - [ ] Ensure dimensions are 1200x630
  - [ ] Avoid private guest data in image
- [ ] Verify direct homepage open behavior (AC: opens intended homepage)
  - [ ] Confirm root route `/` renders landing content
  - [ ] Avoid redirects that break messaging app previews
- [ ] Validate privacy boundaries (AC: no private guest data)
  - [ ] Review metadata strings and images
  - [ ] Ensure no RSVP or guest records appear in metadata

## Technical Context

- **Module**: `src/app/`
- **Dependencies**: Next.js Metadata API
- **Related Stories**: 2-1 (homepage content)
- **File to Edit**: `src/app/layout.tsx`
- **File to Add**: `public/images/og/wedding-preview.png` or equivalent
