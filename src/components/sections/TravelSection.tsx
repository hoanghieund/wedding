"use client";

import { EVENT_DATA, TRAVEL_GUIDANCE } from "@/lib/constants/event-data";
import { useInView } from "@/hooks/useInView";

const TRAVEL_ICONS: Record<string, string> = {
  "hà nội": "🚗",
  "bay": "✈️",
  "xe máy": "🏍️",
  "xe": "🚖",
  "tàu": "🚂",
  "taxi": "🚕",
};

function getIcon(title: string): string {
  const lower = title.toLowerCase();
  for (const [key, icon] of Object.entries(TRAVEL_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "🚗";
}

export function TravelSection() {
  const { ref, isInView } = useInView(0.1);

  if (!TRAVEL_GUIDANCE || TRAVEL_GUIDANCE.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      id="travel"
      aria-labelledby="travel-heading"
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2
          id="travel-heading"
          className={`chapter-title text-3xl sm:text-4xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.travelTitle}
        </h2>
      </div>

      <div className="space-y-5">
        {TRAVEL_GUIDANCE.map((item, index) => (
          <article
            key={item.title}
            className={`relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 transition-all duration-500 hover:border-[var(--accent-soft)]/30 hover:shadow-[var(--glow-soft)] ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 120}ms`, transitionProperty: "transform, opacity, border-color, box-shadow" }}
          >
            {/* Emoji + Title row */}
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-2xl border border-[var(--border-soft)]" aria-hidden="true">
                {getIcon(item.title)}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-display-serif font-medium text-[var(--accent)] leading-tight">
                  {item.title}
                </h3>
                {item.summary && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                    {item.summary}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] font-body-serif">
              {item.details}
            </p>

            {/* Link */}
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring-accent mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] underline decoration-[var(--accent-soft)]/30 underline-offset-8 transition-all hover:text-[var(--text-primary)] hover:decoration-[var(--accent-soft)]/60"
              >
                {item.link.label}
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
