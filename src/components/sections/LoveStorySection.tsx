"use client";

import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";

const MILESTONE_EMOJIS: Record<string, string> = {
  FIRST_SPARK: "💫",
  THE_DEPARTURE: "✈️",
  LONG_DISTANCE: "💌",
  REUNION_TRIPS: "🗺️",
  NEW_BEGINNING: "🌅",
  WEDDING_DAY: "💍",
};

export default function LoveStorySection() {
  const { ref, isInView } = useInView(0.1);
  const sectionRef = ref as React.RefObject<HTMLElement>;
  const timeline = EVENT_DATA.loveStoryTimeline;
  const lastIndex = timeline.length - 1;

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="py-8 relative"
    >
      {/* Section heading — clean, no eyebrow */}
      <div className="text-center space-y-4 mb-16">
        <h2
          id="story-heading"
          className={`chapter-title text-4xl sm:text-5xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.storyTitle}
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Timeline cards — zigzag asymmetric layout */}
      <div className="space-y-8 md:space-y-16">
        {timeline.map((milestone, index) => {
          const isLast = index === lastIndex;
          const isOdd = index % 2 === 0; // odd items left, even items right

          return (
            <div
              key={milestone.code}
              className={`relative transition-all duration-700 ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Last item gets centered special treatment */}
              {/* Other items alternate left/right on desktop */}
              <div
                className={`
                  ${isLast
                    ? "flex justify-center"
                    : "md:flex md:justify-start"
                  }
                `}
              >
                <article
                  className={`
                    relative
                    ${isLast
                      ? "w-full md:max-w-2xl"
                      : "w-full md:max-w-[42rem]"
                    }
                    ${isLast
                      ? "bg-[var(--surface-strong)] border-2 border-[var(--accent)]/30 shadow-[var(--glow-soft)]"
                      : "bg-[var(--surface)] border border-[var(--border-soft)]"
                    }
                    rounded-[2rem] p-8 md:p-10 transition-all duration-500
                    ${isLast ? "hover:shadow-[0_20px_70px_rgba(244,228,193,0.2)]" : "hover:border-[var(--accent-soft)]/40"}
                    ${!isLast && isOdd ? "md:mr-auto" : ""}
                    ${!isLast && !isOdd ? "md:ml-auto" : ""}
                  `}
                  style={{
                    transform: isInView ? "none" : "",
                  }}
                >
                  {/* Decorative script number watermark */}
                  <div
                    className={`
                      absolute pointer-events-none select-none font-script text-[6rem] sm:text-[8rem] md:text-[10rem] leading-none
                      ${isLast
                        ? "text-[var(--accent)]/6 -top-8 -right-4"
                        : isOdd
                          ? "text-[var(--accent)]/5 -top-6 -right-2"
                          : "text-[var(--accent)]/5 -top-6 -left-2"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Milestone emoji + date row */}
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <span className="text-2xl" aria-hidden="true">
                      {MILESTONE_EMOJIS[milestone.code] ?? "✨"}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-soft)]">
                      {milestone.date}
                      <span className="text-[var(--text-secondary)] ml-2">
                        // {milestone.code}
                      </span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`
                      relative z-10 font-display-serif font-medium leading-tight
                      ${isLast
                        ? "text-3xl md:text-4xl text-[var(--accent)]"
                        : "text-2xl md:text-3xl text-[var(--text-primary)]"
                      }
                    `}
                  >
                    {milestone.title}
                  </h3>

                  {/* Decorative divider */}
                  <div
                    className={`
                      my-5 h-px w-12
                      ${isLast
                        ? "bg-[var(--accent)]/40"
                        : "bg-[var(--border-soft)]"
                      }
                    `}
                  />

                  {/* Description */}
                  <p
                    className={`
                      relative z-10 leading-relaxed
                      ${isLast
                        ? "text-lg md:text-xl text-[var(--text-primary)]"
                        : "copy-muted text-base md:text-lg"
                      }
                    `}
                  >
                    &ldquo;{milestone.desc}&rdquo;
                  </p>

                  {/* Last item decorative ring */}
                  {isLast && (
                    <div className="absolute -inset-3 rounded-[2.5rem] border border-[var(--accent)]/10 pointer-events-none" />
                  )}
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
