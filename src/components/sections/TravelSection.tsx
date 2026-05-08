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
      className="space-y-6 rounded-2xl border border-cyan-400/10 bg-[#0A0A0D]/70 p-8 backdrop-blur-xl transition-all duration-500"
    >
      <div className="space-y-2">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-cyan-400/60">
          Hướng dẫn di chuyển
        </p>
        <h2 id="travel-heading" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Thông tin hữu ích
        </h2>
      </div>

      <div className="space-y-6">
        {TRAVEL_GUIDANCE.map((item, index) => (
          <article 
            key={item.title} 
            className={`border-b border-cyan-400/10 pb-6 last:border-b-0 last:pb-0 ${
              isInView ? "animate-fade-up" : "reveal-hidden"
            } stagger-${Math.min(index + 1, 6)}`}
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm font-medium text-cyan-400/80">{item.summary}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{item.details}</p>
            
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 underline decoration-cyan-400/30 underline-offset-8 transition-all hover:text-white hover:decoration-cyan-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0D]"
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
