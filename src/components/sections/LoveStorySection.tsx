"use client";

import TimelineItem from "@/components/ui/TimelineItem";
import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";

const STAGGER_CLASSES = [
  "stagger-1",
  "stagger-2",
  "stagger-3",
  "stagger-4",
  "stagger-5",
  "stagger-6",
] as const;

export default function LoveStorySection() {
  const { ref, isInView } = useInView(0.1);
  const sectionRef = ref as React.RefObject<HTMLElement>;

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="space-y-14"
    >
      <div className="text-center space-y-3">
        <p
          className={`section-label ${isInView ? "animate-fade-down" : "reveal-hidden"}`}
        >
          {EVENT_DATA.copy.sections.storyChapter}
        </p>
        <h2
          id="story-heading"
          className={`chapter-title text-4xl sm:text-5xl ${
            isInView ? "animate-fade-up" : "reveal-hidden"
          }`}
        >
          {EVENT_DATA.copy.sections.storyTitle}
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider ${
            isInView ? "animate-fade-up stagger-1" : "reveal-hidden"
          }`}
        />
      </div>

      <ol className="mx-auto max-w-3xl border-l-2 border-[var(--border-soft)]">
        {EVENT_DATA.loveStoryTimeline.map((milestone, index) => (
          <TimelineItem
            key={milestone.code}
            date={milestone.date}
            code={milestone.code}
            title={milestone.title}
            desc={milestone.desc}
            highlight={index === EVENT_DATA.loveStoryTimeline.length - 1}
            className={`${
              isInView
                ? index % 2 === 0
                  ? "animate-fade-left"
                  : "animate-fade-right"
                : "reveal-hidden"
            } ${STAGGER_CLASSES[Math.min(index, STAGGER_CLASSES.length - 1)]}`}
          />
        ))}
      </ol>
    </section>
  );
}
