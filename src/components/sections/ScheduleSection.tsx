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
      className="space-y-12 bg-[#0A0A0D]/70 backdrop-blur-xl p-8 rounded-2xl"
    >
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#00e5ff]/60">
          Lịch trình đám cưới
        </p>
        <h2
          id="schedule-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Lịch trình trong ngày
        </h2>
      </div>

      <ol className="mx-auto max-w-3xl space-y-10">
        {SCHEDULE_ITEMS.map((item, index) => (
          <li
            key={`${item.time}-${item.title}`}
            className={`relative pl-8 sm:pl-10 transition-all duration-500 hover:bg-[#00e5ff]/5 rounded-xl p-4 ${
              isInView ? "animate-fade-up" : "reveal-hidden"
            } stagger-${Math.min(index + 1, 6)}`}
          >
            <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/20 text-[#00e5ff] shadow-[0_0_15px_rgba(245,225,164,0.2)] ring-0" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#00e5ff]/60">
              {item.time}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-6 text-white/70">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
