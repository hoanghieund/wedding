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
  rsvpLabel: "Xác nhận tham dự ngay",
};

const WAVE_INTERVAL_MS = 140;
const DEFAULT_TEXT_SHADOW = "0 0 40px rgba(0, 229, 255, 0.4), 0 0 80px rgba(0, 229, 255, 0.2)";
const ACTIVE_TEXT_SHADOW = "0 0 45px rgba(0, 229, 255, 0.75), 0 0 100px rgba(0, 229, 255, 0.35)";
const NAME_CHARACTERS = Array.from(COUPLE.combinedName);
const PLAYABLE_INDEXES = NAME_CHARACTERS.flatMap((char, index) => (char === " " ? [] : [index]));

const hiddenClass = "reveal-hidden";

export default function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [waveIndex, setWaveIndex] = useState(0);

  useEffect(() => {
    if (!isInView || PLAYABLE_INDEXES.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setWaveIndex((currentIndex) => (currentIndex + 1) % PLAYABLE_INDEXES.length);
    }, WAVE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isInView]);

  const activeIndex = PLAYABLE_INDEXES[waveIndex] ?? -1;

  const getLetterStyle = (index: number, char: string) => {
    if (!isInView || char === " ") {
      return { textShadow: DEFAULT_TEXT_SHADOW };
    }

    const distance = Math.abs(index - activeIndex);
    const isCurrent = index === activeIndex;

    return {
      transform: isCurrent
        ? "translateY(-20px) scale(1.12)"
        : distance === 1
          ? "translateY(-8px) scale(1.04)"
          : "translateY(0) scale(1)",
      transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), text-shadow 220ms ease",
      textShadow: isCurrent ? ACTIVE_TEXT_SHADOW : DEFAULT_TEXT_SHADOW,
    };
  };

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] w-full overflow-hidden bg-[#0A0A0D] sm:min-h-screen"
    >
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-65"
      />
      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0D]/45 via-[#1A1A2E]/25 to-[#030305]/50" />

      <div className="relative flex h-screen items-center justify-center">
        <div className="z-10 mx-auto w-full max-w-5xl px-6 text-center sm:px-10 lg:px-14">
          <div className="space-y-12 text-white">
            <div className="space-y-4">
              <p
                className={`font-mono text-sm uppercase tracking-[0.5em] text-[#00e5ff] ${
                  isInView ? "animate-fade-down" : hiddenClass
                }`}
              >
                {HERO_COPY.invitation}
              </p>
              <h1
                id="hero-heading"
                className="font-serif text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
              >
                {NAME_CHARACTERS.map((char, index) => {
                  if (char === "&") {
                    return (
                      <span key={`${char}-${index}`} className="block leading-[0.9] text-[#00e5ff]">
                        &
                      </span>
                    );
                  }

                  return (
                    <span
                      key={`${char}-${index}`}
                      className={`inline-block ${isInView ? "" : hiddenClass}`}
                      style={getLetterStyle(index, char)}
                    >
                      {char}
                    </span>
                  );
                })}
              </h1>
              <div
                className={`mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#00e5ff]/60 to-transparent shadow-[0_0_15px_rgba(0,229,255,0.5)] ${
                  isInView ? "animate-fade-up stagger-2" : hiddenClass
                }`}
              />
              <div
                className={`mx-auto max-w-2xl space-y-3 text-white/90 ${
                  isInView ? "animate-fade-up stagger-3" : hiddenClass
                }`}
              >
                <p className="text-lg uppercase tracking-[0.2em] text-white/80 sm:text-xl">
                  {HERO_COPY.eventTitle}
                </p>
                <p className="text-xl leading-7 sm:text-2xl sm:leading-9">
                  <time dateTime={EVENT_CONFIG.weddingDateISO}>{formatEventDate(EVENT_CONFIG.weddingDateISO)}</time>
                </p>
              </div>
            </div>

            <div className={`pt-4 ${isInView ? "animate-fade-up stagger-4" : hiddenClass}`}>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-[#00e5ff]/70">
                {HERO_COPY.countdownLabel}
              </p>
              <CountdownTimer />
              <div className="mt-6 flex justify-center">
                <a
                  href="#rsvp"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#007bff] px-8 py-4 font-bold uppercase tracking-[0.24em] text-white shadow-[0_15px_40px_rgba(0,229,255,0.4)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,229,255,0.5)] animate-pulse-soft"
                >
                  {HERO_COPY.rsvpLabel}
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
