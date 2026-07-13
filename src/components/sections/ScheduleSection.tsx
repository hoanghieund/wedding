"use client";

import { SCHEDULE_ITEMS } from "@/lib/constants/event-data";
import { useInView } from "@/hooks/useInView";
import { WeddingIcon, type WeddingIconName } from "@/components/ui/WeddingIcon";

const SCHEDULE_ICONS: Record<string, WeddingIconName> = {
  "Lễ Vu Quy": "lantern",
  "Rước dâu": "car",
  "Lễ Thành Hôn": "flower",
  "Tiệc mừng": "wine",
};

function getIcon(title: string): WeddingIconName {
  for (const [key, icon] of Object.entries(SCHEDULE_ICONS)) {
    if (title.includes(key)) return icon;
  }
  return "sparkles";
}

export default function ScheduleSection() {
  const { ref, isInView } = useInView(0.1);
  const total = SCHEDULE_ITEMS.length;

  return (
    <section
      ref={ref}
      id="schedule"
      aria-labelledby="schedule-heading"
      className="py-8 relative"
    >
      {/* Section heading — clean */}
      <div className="text-center space-y-4 mb-16">
        <h2
          id="schedule-heading"
          className={`chapter-title text-4xl sm:text-5xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Lịch Trình Trong Ngày
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Timeline — each item is a large bold row */}
      <div>
        {SCHEDULE_ITEMS.map((item, index) => {
          const isLast = index === total - 1;
          const icon = getIcon(item.title);

          return (
            <div
              key={`${item.time}-${item.title}`}
              className={`relative flex gap-6 md:gap-10 transition-all duration-700 ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Left side: vertical timeline connector + big time */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Decorative dot */}
                <div
                  className={`
                    relative z-10 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border bg-[var(--bg)] transition-all duration-500
                    ${isLast
                      ? "border-[var(--accent)] shadow-[0_0_30px_rgba(244,228,193,0.3)]"
                      : "border-[var(--accent-soft)]/60"
                    }
                  `}
                >
                  <WeddingIcon className="h-6 w-6 md:h-7 md:w-7" name={icon} />
                </div>

                {/* Vertical connector line — hidden on last item */}
                {!isLast && (
                  <div className="w-px flex-1 min-h-[4rem] bg-gradient-to-b from-[var(--accent-soft)]/30 to-[var(--border-soft)]" />
                )}
              </div>

              {/* Right side: time (big) + content card */}
              <div className="flex-1 pb-8 md:pb-12">
                {/* Time — bold, editorial */}
                <div className="mb-3">
                  <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                    {item.time}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className={`
                    rounded-2xl p-6 md:p-8 border transition-all duration-500
                    ${isLast
                      ? "bg-[var(--surface-strong)] border-[var(--accent)]/20 shadow-[var(--glow-soft)]"
                      : "bg-[var(--surface)] border-[var(--border-soft)] hover:border-[var(--accent-soft)]/30"
                    }
                  `}
                >
                  <h3
                    className={`
                      font-display-serif font-medium leading-tight
                      ${isLast
                        ? "text-2xl md:text-3xl text-[var(--accent)]"
                        : "text-xl md:text-2xl text-[var(--text-primary)]"
                      }
                    `}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed ${
                      isLast ? "text-[var(--text-primary)]/80" : "copy-muted"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
