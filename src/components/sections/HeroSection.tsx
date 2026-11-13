"use client";

import Image from "next/image";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { formatDateTime } from "@/lib/formatters/date-format";

export default function HeroSection() {

  return (
    <section
      aria-labelledby="hero-heading"
      id="hero"
      className="relative min-h-dvh w-full overflow-x-clip"
    >
      <Image
        src={EVENT_DATA.media.heroImage.src}
        alt={EVENT_DATA.media.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />


      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/60 via-[var(--bg)]/45 to-[var(--bg)]/85 lg:bg-gradient-to-r lg:from-[var(--bg)]/90 lg:via-[var(--bg)]/65 lg:to-[var(--bg)]/35" />


      <div className="relative z-10 flex min-h-dvh items-center py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-2xl space-y-8 text-center sm:space-y-10 lg:mx-0 lg:text-left">
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <span className="block font-display-serif text-5xl font-medium leading-[0.92] tracking-[-0.04em] text-[var(--accent)] sm:text-7xl md:text-8xl">
                {EVENT_DATA.couple.groom.name}
              </span>
              <span
                aria-hidden="true"
                className="block font-script text-5xl leading-none text-[var(--accent-soft)] sm:text-7xl"
              >
                &amp;
              </span>
              <span className="block font-display-serif text-5xl font-medium leading-[0.92] tracking-[-0.04em] text-[var(--accent)] sm:text-7xl md:text-8xl">
                {EVENT_DATA.couple.bride.name}
              </span>
            </h1>

            <div className="mx-auto h-px w-24 section-divider lg:mx-0" aria-hidden="true" />

            <div className="space-y-7">
              <div className="space-y-1">
                <p className="text-sm text-[var(--accent-soft)]">
                  {EVENT_DATA.event.title}
                </p>
                <p className="font-body-serif text-xl leading-relaxed text-[var(--text-primary)] sm:text-2xl">
                  <time dateTime={EVENT_DATA.event.startTime}>
                    {formatDateTime(EVENT_DATA.event.startTime)}
                  </time>
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[var(--accent-soft)]/90">
                  {EVENT_DATA.copy.hero.countdownLabel}
                </p>
                <CountdownTimer />
              </div>

              <a
                href="#rsvp"
                className="focus-ring-accent group inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface-strong)] px-8 py-3 font-body-serif text-lg text-[var(--accent)] transition-colors duration-300 hover:border-[var(--accent-soft)] active:translate-y-px"
              >
                {EVENT_DATA.copy.hero.rsvpLabel}
                <span aria-hidden="true" className="text-xl transition group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
