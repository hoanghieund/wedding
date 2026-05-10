"use client";

import { TRAVEL_GUIDANCE } from "@/lib/constants/event-data";
import { useInView } from "@/hooks/useInView";

export function TravelSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  if (!TRAVEL_GUIDANCE || TRAVEL_GUIDANCE.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      id="travel"
      aria-labelledby="travel-heading"
      className="space-y-8 rounded-[1.75rem] transition-all duration-500"
    >
      <div className="space-y-2">
        <p className={`section-label ${isInView ? "animate-fade-down" : "reveal-hidden"}`}>
          Chương 9
        </p>
        <h2 id="travel-heading" className={`chapter-title text-3xl sm:text-4xl ${isInView ? "animate-fade-up" : "reveal-hidden"}`}>
          Thông tin hữu ích
        </h2>
      </div>

      <div className="space-y-6">
        {TRAVEL_GUIDANCE.map((item, index) => (
          <article
            key={item.title}
            className={`section-shell rounded-2xl p-6 ${
              isInView ? "animate-fade-up" : "reveal-hidden"
            } stagger-${Math.min(index + 1, 6)}`}
          >
            <h3 className="text-xl font-display-serif text-[var(--accent)]">{item.title}</h3>
            <p className="mt-2 text-sm font-mono uppercase tracking-[0.18em] text-[var(--accent-soft)]">{item.summary}</p>
            <p className="copy-muted mt-3 text-base leading-7">{item.details}</p>

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
