"use client";

import { useMemo } from "react";
import { useInView } from "@/hooks/useInView";

interface VenueInfo {
  venueName: string;
  addressLines: string[];
  coordinates: { lat: number; lng: number };
  mapUrl: string;
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

const sectionCardClassName = "space-y-4 rounded-2xl border border-[#00e5ff]/10 bg-[#0A0A0D]/40 p-6";
const mapLinkClassName =
  "inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/15 px-6 py-3 text-sm font-semibold text-[#00e5ff] transition hover:bg-[#00e5ff]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]";
const mapFrameWrapperClassName =
  "overflow-hidden rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/5 shadow-[0_0_50px_rgba(245,225,164,0.08)]";

function buildMapEmbedUrl({ lat, lng }: VenueInfo["coordinates"]) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
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
      <h3 className="font-serif text-2xl font-medium text-[#00e5ff]">{venue.venueName}</h3>
      <div className="space-y-1 text-base leading-6 text-white/75">
        {venue.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {venue.note ? <p className="text-sm leading-6 text-white/60">{venue.note}</p> : null}
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
          <h3 className="font-serif text-lg font-medium text-[#00e5ff] sm:text-xl">{title}</h3>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00e5ff]/70 underline decoration-[#00e5ff]/30 underline-offset-2 transition hover:text-[#00e5ff]"
          >
            Mở rộng
          </a>
        </div>
        <p className="text-sm text-white/60">{timeLabel}</p>
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

export function VenueSection({ groomVenue, brideVenue }: VenueSectionProps) {
  const { ref, isInView } = useInView();

  const directionsUrl = useMemo(
    () =>
      `https://www.google.com/maps/dir/?api=1&origin=${brideVenue.coordinates.lat},${brideVenue.coordinates.lng}&destination=${groomVenue.coordinates.lat},${groomVenue.coordinates.lng}&travelmode=driving`,
    [brideVenue.coordinates.lat, brideVenue.coordinates.lng, groomVenue.coordinates.lat, groomVenue.coordinates.lng],
  );

  const brideMapEmbedUrl = useMemo(() => buildMapEmbedUrl(brideVenue.coordinates), [brideVenue.coordinates]);
  const groomMapEmbedUrl = useMemo(() => buildMapEmbedUrl(groomVenue.coordinates), [groomVenue.coordinates]);

  return (
    <section
      ref={ref}
      id="venue"
      aria-labelledby="venue-heading"
      className="space-y-8 rounded-3xl border border-[#00e5ff]/10 bg-[#0A0A0D]/60 p-8 backdrop-blur-xl"
    >
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#00e5ff]/60">Tọa độ điểm đến</p>
        <h2 id="venue-heading" className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Nơi hân hạnh đón tiếp quý vị
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <VenueCard venue={brideVenue} animationClassName={isInView ? "animate-fade-left" : "reveal-hidden"} />
        <VenueCard venue={groomVenue} animationClassName={isInView ? "animate-fade-right" : "reveal-hidden"} />
      </div>

      <div className={`grid gap-6 md:grid-cols-2 ${isInView ? "animate-fade-up" : "reveal-hidden"} stagger-3`}>
        <MapCard
          title="Nhà gái - Lễ Vu Quy"
          timeLabel="07:00 - 08:30 sáng"
          mapUrl={brideVenue.mapUrl}
          embedUrl={brideMapEmbedUrl}
        />
        <MapCard
          title="Nhà trai - Lễ Thành Hôn"
          timeLabel="09:00 - 13:30"
          mapUrl={groomVenue.mapUrl}
          embedUrl={groomMapEmbedUrl}
        />
      </div>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex min-h-[120px] items-center justify-between gap-6 overflow-hidden rounded-2xl border border-[#00e5ff]/15 bg-gradient-to-br from-[#0f1720] via-[#0A0A0D] to-[#10212a] p-6 shadow-[0_0_50px_rgba(245,225,164,0.08)] transition hover:border-[#00e5ff]/30"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,229,255,0.10),transparent_35%)]" />
        <div className="relative space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#00e5ff]/60">Google Maps</p>
          <h3 className="font-serif text-2xl font-semibold text-white">Xem chỉ đường từ nhà gái đến nhà trai</h3>
          <p className="max-w-2xl text-sm leading-6 text-white/65">
            Mở Google Maps để xem lộ trình di chuyển chi tiết giữa hai địa điểm
          </p>
        </div>
        <svg
          aria-hidden="true"
          className="relative h-8 w-8 shrink-0 text-[#00e5ff] transition group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </section>
  );
}
