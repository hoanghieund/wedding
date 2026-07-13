"use client";

import { EVENT_DATA, RSVP_DEADLINE_ISO, VENUE_GROOM, WEDDING_DATE_ISO } from "@/lib/constants/event-data";
import { formatDateTime } from "@/lib/formatters/date-format";
import { useInView } from "@/hooks/useInView";
import { WeddingIcon, type WeddingIconName } from "@/components/ui/WeddingIcon";

export function QuickFactsBand() {
  const { ref, isInView } = useInView(0.2);
  const quickFacts = [
    { icon: "calendar" as const, label: EVENT_DATA.copy.quickFacts.dateLabel, value: formatDateTime(WEDDING_DATE_ISO) },
    { icon: "pin" as const, label: EVENT_DATA.copy.quickFacts.venueLabel, value: VENUE_GROOM.venueName },
    { icon: "shirt" as const, label: EVENT_DATA.copy.quickFacts.dressCodeLabel, value: EVENT_DATA.details.dressCode },
    { icon: "clock" as const, label: EVENT_DATA.copy.quickFacts.rsvpDeadlineLabel, value: formatDateTime(RSVP_DEADLINE_ISO) },
  ];

  return (
    <section
      ref={ref}
      aria-label={EVENT_DATA.copy.quickFacts.ariaLabel}
      className="relative border-y border-[var(--border-soft)] bg-[var(--bg-elevated)]/60 py-16 sm:py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)]/40 via-transparent to-[var(--bg-deep)]/40" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {quickFacts.map((fact, index) => (
          <div
            key={fact.label}
            className={`group section-shell hover-lift rounded-xl p-6 text-center ${isInView ? `animate-fade-up stagger-${index + 1}` : 'reveal-hidden'}`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent-soft)] shadow-[var(--glow-soft)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent-soft)] mx-auto">
              <WeddingIcon name={fact.icon as WeddingIconName} className="h-6 w-6" />
            </div>
            <p className="section-label text-[10px]">
              {fact.label}
            </p>
            <p className="mt-2 text-base font-body-serif leading-7 text-[var(--text-primary)]">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
