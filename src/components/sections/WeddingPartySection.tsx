"use client";

import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";

export default function WeddingPartySection() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="party"
      aria-labelledby="party-heading"
      ref={ref}
      className="space-y-12"
    >
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2
          id="party-heading"
          className={`chapter-title text-4xl sm:text-5xl ${
            isInView ? "animate-fade-up" : "reveal-hidden"
          }`}
        >
          {EVENT_DATA.copy.sections.partyTitle}
        </h2>
        <p className={`copy-muted text-lg leading-8 sm:text-xl ${isInView ? "animate-fade-up stagger-1" : "reveal-hidden"}`}>
          {EVENT_DATA.copy.sections.partyDescription}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {EVENT_DATA.weddingParty.map((member, index) => (
          <article
            key={member.name}
            className={`section-shell hover-lift flex h-full flex-col rounded-[1.75rem] p-6 text-center reveal-hidden ${
              isInView ? `animate-zoom-in stagger-${index + 1}` : ""
            }`}
          >
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--accent-soft)]/40 bg-gradient-to-b from-[var(--surface)] to-[var(--surface-strong)] text-2xl font-display-serif font-semibold text-[var(--accent)] shadow-[var(--glow-soft)]">
              {member.name?.split(" ").pop()?.charAt(0) || "?"}
            </div>
            <h3 className="text-2xl font-display-serif text-[var(--accent)]">{member.name}</h3>
            <p className="mt-2 section-label text-[10px]">{member.role}</p>
            <p className="copy-muted mt-4 text-base leading-7">{member.duty}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
