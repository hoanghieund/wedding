"use client";

import Image from "next/image";
import CountdownTimer from "@/components/ui/CountdownTimer";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import { useInView } from "@/hooks/useInView";
import { COUPLE, EVENT_CONFIG, EVENT_DATA, HERO_IMAGE } from "@/lib/constants/event-data";
import { formatDateTime } from "@/lib/formatters/date-format";

export default function HeroSection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-dvh w-full overflow-hidden"
    >
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <ParticleCanvas />

      {/* Deep vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/70 via-[#0a0e27]/20 to-[#0a0e27]/95" />

      {/* Decorative background script watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none text-[10rem] sm:text-[16rem] md:text-[20rem] font-script text-[var(--accent)]/4 leading-none z-0">
        {COUPLE.groom.name} &amp; {COUPLE.bride.name}
      </div>

      <div className="relative z-10 flex min-h-dvh items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            {/* Left: Names lockup — bold asymmetric typography */}
            <div className="flex-1 max-w-3xl">
              <div className="space-y-4 lg:space-y-6">
                {/* Invitation label — small and quiet */}
                <p
                  className={`font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent-soft)] transition-all duration-700 ${
                    isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  {EVENT_DATA.copy.hero.invitation}
                </p>

                {/* Monumental groom name */}
                <h1 id="hero-heading" className="relative">
                  <span
                    className={`block text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-bold tracking-tight text-[var(--accent)] leading-[0.85] transition-all duration-700 delay-150 ${
                      isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                    }`}
                  >
                    {COUPLE.groom.name}
                  </span>

                  {/* Decorative script "&" — overlapping and floating */}
                  <span
                    className={`block relative -mt-4 sm:-mt-6 lg:-mt-8 xl:-mt-10 text-7xl sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[11rem] font-script text-[var(--accent-soft)] leading-none transition-all duration-700 delay-300 ${
                      isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
                  >
                    &amp;
                  </span>

                  {/* Bride name — right-aligned for tension */}
                  <span
                    className={`block -mt-4 sm:-mt-6 lg:-mt-8 xl:-mt-10 text-right text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-display-serif font-medium tracking-tight text-[var(--text-primary)] leading-[0.9] transition-all duration-700 delay-500 ${
                      isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                    }`}
                  >
                    {COUPLE.bride.name}
                  </span>
                </h1>
              </div>
            </div>

            {/* Right: Event details + CTA — pushed right */}
            <div
              className={`flex-shrink-0 lg:self-end space-y-8 lg:pb-6 lg:pl-8 transition-all duration-700 delay-700 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <div className="text-left">
                <div className="mx-0 h-px w-24 section-divider mb-4" />
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-soft)]">
                  {EVENT_DATA.event.title}
                </p>
                <p className="mt-3 text-xl sm:text-2xl font-body-serif leading-relaxed text-[var(--text-primary)]">
                  <time dateTime={EVENT_CONFIG.weddingDateISO}>{formatDateTime(EVENT_CONFIG.weddingDateISO)}</time>
                </p>
              </div>

              <div className="space-y-5">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent-soft)]/70">
                  {EVENT_DATA.copy.hero.countdownLabel}
                </p>
                <CountdownTimer />
                <a
                  href="#rsvp"
                  className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-8 py-4 font-body-serif text-lg tracking-[0.15em] text-[var(--accent)] shadow-[var(--glow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_62px_rgba(244,228,193,0.26)] hover:border-[var(--accent-soft)]"
                >
                  {EVENT_DATA.copy.hero.rsvpLabel}
                  <span className="text-xl transition group-hover:translate-y-0.5">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
