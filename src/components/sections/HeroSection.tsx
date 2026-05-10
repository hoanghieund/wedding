"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import { useInView } from "@/hooks/useInView";
import { COUPLE, EVENT_CONFIG, HERO_IMAGE } from "@/lib/constants/event-data";
import { formatEventDate } from "@/lib/formatters/date-format";

const HERO_COPY = {
  invitation: "Trân trọng kính mời",
  eventTitle: "Lễ Thành Hôn",
  countdownLabel: "Cùng đếm ngược đến ngày vui",
  rsvpLabel: "Xác nhận tham dự",
};

const hiddenClass = "reveal-hidden";

export default function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/60 via-transparent to-[#0a0e27]/90" />

      <div className="relative flex min-h-screen items-center justify-center">
        <div className="z-10 mx-auto w-full max-w-4xl px-6 text-center sm:px-10 lg:px-14">
          <div className="space-y-14">
            <div className="space-y-6">
              <p
                className={`font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent-soft)] ${
                  isInView ? "animate-fade-down" : hiddenClass
                }`}
              >
                {HERO_COPY.invitation}
              </p>
              <h1
                id="hero-heading"
                className={`font-display-serif text-6xl font-semibold tracking-tight text-[var(--accent)] sm:text-7xl md:text-8xl lg:text-9xl ${
                  isInView ? "animate-fade-up-soft" : hiddenClass
                }`}
              >
                {COUPLE.groomName}
                <span className="mx-3 text-5xl sm:mx-5 sm:text-6xl md:text-7xl lg:text-8xl font-script text-[var(--accent-soft)]">&</span>
                {COUPLE.brideName}
              </h1>
              <div
                className={`mx-auto h-px w-40 section-divider ${
                  isInView ? "animate-fade-up stagger-2" : hiddenClass
                }`}
              />
              <div
                className={`mx-auto max-w-2xl space-y-3 ${
                  isInView ? "animate-fade-up stagger-3" : hiddenClass
                }`}
              >
                <p className="text-lg uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xl">
                  {HERO_COPY.eventTitle}
                </p>
                <p className="text-xl leading-7 text-[var(--text-primary)] sm:text-2xl sm:leading-9">
                  <time dateTime={EVENT_CONFIG.weddingDateISO}>{formatEventDate(EVENT_CONFIG.weddingDateISO)}</time>
                </p>
              </div>
            </div>

            <div className={`pt-4 ${isInView ? "animate-fade-up stagger-4" : hiddenClass}`}>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent-soft)]/70">
                {HERO_COPY.countdownLabel}
              </p>
              <CountdownTimer />
              <div className="mt-8 flex justify-center">
                <a
                  href="#rsvp"
                  className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-8 py-4 font-body-serif text-lg tracking-[0.15em] text-[var(--accent)] shadow-[var(--glow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_62px_rgba(244,228,193,0.26)] hover:border-[var(--accent-soft)]"
                >
                  {HERO_COPY.rsvpLabel}
                  <span className="text-xl transition group-hover:translate-y-0.5">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
          isInView ? "animate-fade-up stagger-5" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-[var(--accent-soft)]/60">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Cuộn xuống</span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-[var(--accent-soft)]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
