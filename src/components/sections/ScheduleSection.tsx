"use client";

import { SCHEDULE_ITEMS } from "@/lib/constants/event-data";
import { useInView } from "@/hooks/useInView";

export default function ScheduleSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="schedule"
      aria-labelledby="schedule-heading"
      className="space-y-14"
    >
      <div className="space-y-3 text-center">
        <p
          className={`section-label ${isInView ? "animate-fade-down" : "reveal-hidden"}`}
        >
          Chương 5
        </p>
        <h2
          id="schedule-heading"
          className={`chapter-title text-4xl sm:text-5xl ${
            isInView ? "animate-fade-up" : "reveal-hidden"
          }`}
        >
          Lịch trình trong ngày
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider ${
            isInView ? "animate-fade-up stagger-1" : "reveal-hidden"
          }`}
        />
      </div>

      <ol className="mx-auto max-w-3xl space-y-8">
        {SCHEDULE_ITEMS.map((item, index) => (
          <li
            key={`${item.time}-${item.title}`}
            className={`section-shell hover-lift rounded-2xl p-6 sm:p-8 ${
              isInView ? "animate-fade-up" : "reveal-hidden"
            } stagger-${Math.min(index + 2, 6)}`}
          >
            <p className="section-label text-[10px]">
              {item.time}
            </p>
            <h3 className="mt-3 text-2xl font-display-serif text-[var(--accent)] sm:text-3xl">
              {item.title}
            </h3>
            <p className="copy-muted mt-4 text-lg leading-7">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
