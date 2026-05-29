"use client";

import { useMemo } from "react";
import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";

interface VenueInfo {
  venueName: string;
  addressLines: readonly string[];
  coordinates: { lat: number; lng: number };
  mapUrl: string;
  mapTitle: string;
  timeLabel: string;
  note?: string;
}

interface VenueSectionProps {
  groomVenue: VenueInfo;
  brideVenue: VenueInfo;
}

interface VenueCardProps {
  venue: VenueInfo;
  animationClassName: string;
}

interface MapCardProps {
  title: string;
  timeLabel: string;
  mapUrl: string;
  embedUrl: string;
}

interface DirectionsCardProps {
  mapUrl: string;
  embedUrl: string;
}

const sectionCardClassName = "section-shell space-y-4 rounded-[1.75rem] p-6";
const mapLinkClassName =
  "focus-ring-accent inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-3 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent-soft)] hover:bg-[var(--surface-strong)]";
const mapFrameWrapperClassName =
  "overflow-hidden rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[var(--glow-soft)]";

function buildMapEmbedUrl({ lat, lng }: VenueInfo["coordinates"]) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

function buildDirectionsEmbedUrl(origin: VenueInfo["coordinates"], destination: VenueInfo["coordinates"]) {
  const originParam = `${origin.lat},${origin.lng}`;
  const destinationParam = `${destination.lat},${destination.lng}`;

  return `https://www.google.com/maps?output=embed&saddr=${originParam}&daddr=${destinationParam}&dirflg=d`;
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function VenueCard({ venue, animationClassName }: VenueCardProps) {
  return (
    <div className={`${sectionCardClassName} ${animationClassName}`}>
      <h3 className="font-display-serif text-2xl text-[var(--accent)]">{venue.venueName}</h3>
      <div className="copy-muted space-y-1 text-base leading-7">
        {venue.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {venue.note ? <p className="copy-muted text-sm leading-6">{venue.note}</p> : null}
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={mapLinkClassName}
      >
        <LocationIcon />
        Xem chỉ dẫn đường đi
      </a>
    </div>
  );
}

function MapCard({ title, timeLabel, mapUrl, embedUrl }: MapCardProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display-serif text-lg text-[var(--accent)] sm:text-xl">{title}</h3>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent-soft)] underline decoration-[var(--accent-soft)]/30 underline-offset-2 transition hover:text-[var(--accent)]"
          >
            Mở rộng
          </a>
        </div>
        <p className="copy-muted text-sm">{timeLabel}</p>
      </div>
      <div className={mapFrameWrapperClassName}>
        <iframe
          src={embedUrl}
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      </div>
    </div>
  );
}

function DirectionsCard({ mapUrl, embedUrl }: DirectionsCardProps) {
  return (
    <div className="section-shell relative overflow-hidden rounded-[1.75rem] p-4 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,228,193,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(212,165,116,0.10),transparent_35%)]" />
      <div className="relative space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="section-label text-[10px]">Google Maps</p>
            <h3 className="font-display-serif text-2xl text-[var(--accent)]">{EVENT_DATA.copy.venueDirections.heading}</h3>
            <p className="copy-muted max-w-2xl text-sm leading-6">
              {EVENT_DATA.copy.venueDirections.description}
            </p>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={mapLinkClassName}
          >
            <LocationIcon />
            Mở chỉ đường
          </a>
        </div>

        <div className={mapFrameWrapperClassName}>
          <iframe
            src={embedUrl}
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={EVENT_DATA.copy.venueDirections.heading}
          />
        </div>
      </div>
    </div>
  );
}

export function VenueSection({ groomVenue, brideVenue }: VenueSectionProps) {
  const { ref, isInView } = useInView();

  const directionsUrl = useMemo(
    () =>
      `https://www.google.com/maps/dir/?api=1&origin=${brideVenue.coordinates.lat},${brideVenue.coordinates.lng}&destination=${groomVenue.coordinates.lat},${groomVenue.coordinates.lng}&travelmode=driving`,
    [brideVenue.coordinates.lat, brideVenue.coordinates.lng, groomVenue.coordinates.lat, groomVenue.coordinates.lng],
  );

  const directionsEmbedUrl = useMemo(
    () => buildDirectionsEmbedUrl(brideVenue.coordinates, groomVenue.coordinates),
    [brideVenue.coordinates, groomVenue.coordinates],
  );

  const brideMapEmbedUrl = useMemo(() => buildMapEmbedUrl(brideVenue.coordinates), [brideVenue.coordinates]);
  const groomMapEmbedUrl = useMemo(() => buildMapEmbedUrl(groomVenue.coordinates), [groomVenue.coordinates]);

  return (
    <section
      ref={ref}
      id="venue"
      aria-labelledby="venue-heading"
      className="space-y-10"
    >
      <div className="space-y-3 text-center">
        <p className={`section-label ${isInView ? "animate-fade-down" : "reveal-hidden"}`}>Chương 8</p>
        <h2 id="venue-heading" className={`chapter-title text-4xl sm:text-5xl ${isInView ? "animate-fade-up" : "reveal-hidden"}`}>
          Nơi hân hạnh đón tiếp quý vị
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <VenueCard venue={brideVenue} animationClassName={isInView ? "animate-fade-left" : "reveal-hidden"} />
        <VenueCard venue={groomVenue} animationClassName={isInView ? "animate-fade-right" : "reveal-hidden"} />
      </div>

      <div className={`grid gap-6 md:grid-cols-2 ${isInView ? "animate-fade-up" : "reveal-hidden"} stagger-3`}>
        <MapCard
          title={brideVenue.mapTitle}
          timeLabel={brideVenue.timeLabel}
          mapUrl={brideVenue.mapUrl}
          embedUrl={brideMapEmbedUrl}
        />
        <MapCard
          title={groomVenue.mapTitle}
          timeLabel={groomVenue.timeLabel}
          mapUrl={groomVenue.mapUrl}
          embedUrl={groomMapEmbedUrl}
        />
      </div>

      <DirectionsCard mapUrl={directionsUrl} embedUrl={directionsEmbedUrl} />
    </section>
  );
}
