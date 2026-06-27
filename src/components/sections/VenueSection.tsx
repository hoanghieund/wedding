"use client";

import { useMemo } from "react";
import { useInView } from "@/hooks/useInView";

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

function buildMapEmbedUrl({ lat, lng }: VenueInfo["coordinates"]) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

function LocationTag() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function VenueCard({ venue, animationClassName }: { venue: VenueInfo; animationClassName: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-8 transition-all duration-500 hover:border-[var(--accent-soft)]/30 hover:shadow-[var(--glow-soft)] ${animationClassName}`}>
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-soft)]/60 to-transparent" />

      {/* Venue name — large serif */}
      <h3 className="font-display-serif text-2xl md:text-3xl font-medium text-[var(--accent)] leading-tight">
        {venue.venueName}
      </h3>

      {/* Thin divider */}
      <div className="my-5 h-px w-16 bg-[var(--accent-soft)]/30" />

      {/* Address */}
      <div className="space-y-1 text-base leading-7 text-[var(--text-secondary)] font-body-serif">
        {venue.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {/* Note */}
      {venue.note && (
        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]/70 italic border-l border-[var(--accent-soft)]/20 pl-4">
          {venue.note}
        </p>
      )}

      {/* Map link */}
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring-accent mt-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg)] px-6 py-3 text-sm font-medium text-[var(--accent)] transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
      >
        <LocationTag />
        Xem chỉ dẫn đường đi
      </a>
    </div>
  );
}

export function VenueSection({ groomVenue, brideVenue }: VenueSectionProps) {
  const { ref, isInView } = useInView(0.1);

  const directionsUrl = useMemo(
    () =>
      `https://www.google.com/maps/dir/?api=1&origin=${brideVenue.coordinates.lat},${brideVenue.coordinates.lng}&destination=${groomVenue.coordinates.lat},${groomVenue.coordinates.lng}&travelmode=driving`,
    [brideVenue.coordinates, groomVenue.coordinates],
  );

  const brideMapEmbedUrl = useMemo(() => buildMapEmbedUrl(brideVenue.coordinates), [brideVenue.coordinates]);
  const groomMapEmbedUrl = useMemo(() => buildMapEmbedUrl(groomVenue.coordinates), [groomVenue.coordinates]);

  return (
    <section
      ref={ref}
      id="venue"
      aria-labelledby="venue-heading"
      className="space-y-12"
    >
      {/* Section heading */}
      <div className="space-y-3 text-center">
        <h2
          id="venue-heading"
          className={`chapter-title text-4xl sm:text-5xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Nơi hân hạnh đón tiếp quý vị
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Venue cards — bold 2-col */}
      <div className="grid gap-8 md:grid-cols-2">
        <VenueCard
          venue={brideVenue}
          animationClassName={isInView ? "animate-fade-left" : "reveal-hidden"}
        />
        <VenueCard
          venue={groomVenue}
          animationClassName={isInView ? "animate-fade-right" : "reveal-hidden"}
        />
      </div>

      {/* Map area — full width */}
      <div
        className={`overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-strong)] shadow-[var(--glow-soft)] transition-all duration-700 delay-300 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="p-6 md:p-8 space-y-6">
          {/* Map grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[var(--border-soft)]">
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border-soft)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                  {brideVenue.timeLabel}
                </span>
                <span className="font-display-serif text-sm text-[var(--accent)]">{brideVenue.venueName}</span>
              </div>
              <div className="aspect-[16/9] w-full bg-[var(--bg-deep)]">
                <iframe
                  title={brideVenue.mapTitle}
                  src={brideMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "200px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--border-soft)]">
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border-soft)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                  {groomVenue.timeLabel}
                </span>
                <span className="font-display-serif text-sm text-[var(--accent)]">{groomVenue.venueName}</span>
              </div>
              <div className="aspect-[16/9] w-full bg-[var(--bg-deep)]">
                <iframe
                  title={groomVenue.mapTitle}
                  src={groomMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "200px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Directions CTA */}
          <div className="text-center">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring-accent inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-soft)]/40 bg-[var(--surface)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Chỉ đường từ nhà gái sang nhà trai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
