"use client";

import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { WeddingIcon } from "@/components/ui/WeddingIcon";

export default function WeddingPartySection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section
      id="party"
      aria-labelledby="party-heading"
      ref={ref}
      className="space-y-16 py-12 relative overflow-hidden"
    >
      {/* Decorative background script */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none select-none text-[8rem] sm:text-[12rem] font-script text-[var(--accent)]/5 whitespace-nowrap z-0">
        Wedding Party
      </div>

      <div className="mx-auto max-w-3xl space-y-4 text-center relative z-10">
        <h2
          id="party-heading"
          className={`chapter-title text-4xl sm:text-5xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.partyTitle}
        </h2>
        <div className="mx-auto h-px w-32 section-divider" />
        <p
          className={`copy-muted text-lg leading-8 sm:text-xl max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.partyDescription}
        </p>
      </div>

      {/* Asymmetric overlapping grid layout */}
      <div className="grid gap-10 md:grid-cols-3 relative z-10 mx-auto max-w-5xl">
        {EVENT_DATA.weddingParty.map((member, index) => {
          // Asymmetric pushdown styling for bolder rhythm
          const translationClass = index === 1 ? "md:-translate-y-4" : "md:translate-y-4";
          
          return (
            <article
              key={member.name}
              className={`group relative flex flex-col p-8 text-center bg-[var(--surface-strong)] border border-[var(--border-soft)] transition-all duration-500 hover:scale-[1.02] hover:border-[var(--accent-soft)] hover:shadow-[var(--glow-soft)] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl ${translationClass} ${
                isInView ? "animate-zoom-in" : "reveal-hidden"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Overlapping stylized frame for avatar */}
              <div className="relative mx-auto mb-8 h-28 w-28 flex items-center justify-center">
                {/* Decorative gold rotated frame */}
                <div className="absolute inset-0 border border-[var(--accent-soft)]/30 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 border border-[var(--accent)]/50 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500" />
                
                {/* Inner bubble */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg)] shadow-[inset_0_2px_8px_rgba(244,228,193,0.1)]">
                  <WeddingIcon className="h-10 w-10 filter drop-shadow-[0_4px_8px_rgba(10,14,39,0.5)] transition-transform duration-300 group-hover:scale-110" name="person" />
                </div>
              </div>

              {/* Typography hierarchy */}
              <div className="space-y-1">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--accent-soft)]">
                  {member.role}
                </p>
                <h3 className="text-2xl font-display-serif font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  {member.name}
                </h3>
              </div>

              <div className="my-5 h-px bg-[var(--border-soft)] w-1/3 mx-auto group-hover:w-1/2 transition-all duration-300" />

              <p className="copy-muted text-base leading-7 italic px-2">
                &ldquo;{member.duty}&rdquo;
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
