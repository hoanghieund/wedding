"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { COUPLE_NAMES, WEDDING_DATE_ISO } from "@/lib/constants/event-data";
import { formatEventDate } from "@/lib/formatters/date-format";
import CountdownTimer from "@/components/ui/CountdownTimer";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import { useInView } from "@/hooks/useInView";

export default function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const nameCharacters = useMemo(() => Array.from(COUPLE_NAMES), []);
  const animatedIndexes = useMemo(
    () => nameCharacters.map((char, index) => (char === " " ? -1 : index)),
    [nameCharacters],
  );
  const [waveIndex, setWaveIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const playableIndexes = animatedIndexes.filter((i) => i >= 0);
    if (playableIndexes.length === 0) return;
    const intervalId = window.setInterval(() => {
      setWaveIndex((c) => (c + 1) % playableIndexes.length);
    }, 140);
    return () => window.clearInterval(intervalId);
  }, [animatedIndexes, isInView]);

  const activeIndex = animatedIndexes.filter((index) => index >= 0)[waveIndex] ?? -1;

  const getLetterStyle = (index: number, char: string) => {
    if (!isInView || char === " ") {
      return {
        textShadow: "0 0 40px rgba(0, 229, 255, 0.4), 0 0 80px rgba(0, 229, 255, 0.2)",
      };
    }

    const distance = Math.abs(index - activeIndex);
    const isCurrent = index === activeIndex;
    const isNear = distance === 1;

    return {
      transform: isCurrent
        ? "translateY(-20px) scale(1.12)"
        : isNear
          ? "translateY(-8px) scale(1.04)"
          : "translateY(0) scale(1)",
      transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), text-shadow 220ms ease",
      textShadow: isCurrent
        ? "0 0 45px rgba(0, 229, 255, 0.75), 0 0 100px rgba(0, 229, 255, 0.35)"
        : "0 0 40px rgba(0, 229, 255, 0.4), 0 0 80px rgba(0, 229, 255, 0.2)",
    };
  };

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] sm:min-h-screen w-full overflow-hidden bg-[#0A0A0D]"
    >
      <Image
        src="/images/HAR01404.jpg"
        alt="Background ảnh cưới"
        fill
        priority
        className="object-cover opacity-65"
        sizes="100vw"
      />
      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0D]/45 via-[#1A1A2E]/25 to-[#030305]/50" />

      <div className="relative flex h-screen items-center justify-center">
        <div className="z-10 mx-auto w-full max-w-5xl px-6 text-center sm:px-10 lg:px-14">
          <div className="space-y-12 text-white">
            <div className="space-y-4">
              <p className={`font-mono text-sm tracking-[0.5em] text-[#00e5ff] uppercase ${isInView ? 'animate-fade-down' : 'reveal-hidden'}`}>
                Trân trọng kính mời
              </p>
              <h1
                id="hero-heading"
                className="font-serif text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
              >
                {nameCharacters.map((char, i) => {
                  if (char === "&") {
                    return (
                      <span key={`${char}-${i}`} className="block leading-[0.9] text-[#00e5ff]">
                        &
                      </span>
                    );
                  }

                  return (
                    <span
                      key={`${char}-${i}`}
                      className={`inline-block ${isInView ? '' : 'reveal-hidden'}`}
                      style={getLetterStyle(i, char)}
                    >
                      {char === ' ' ? ' ' : char}
                    </span>
                  );
                })}
              </h1>
              <div className={`mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#00e5ff]/60 to-transparent shadow-[0_0_15px_rgba(0,229,255,0.5)] ${isInView ? 'animate-fade-up stagger-2' : 'reveal-hidden'}`} />
              <div className={`mx-auto max-w-2xl space-y-3 text-white/90 ${isInView ? 'animate-fade-up stagger-3' : 'reveal-hidden'}`}>
                <p className="text-lg tracking-[0.2em] uppercase text-white/80 sm:text-xl">
                  Lễ Thành Hôn
                </p>
                <p className="text-xl leading-7 sm:text-2xl sm:leading-9">
                  <time dateTime={WEDDING_DATE_ISO}>{formatEventDate(WEDDING_DATE_ISO)}</time>
                </p>
              </div>
            </div>

            <div className={`pt-4 ${isInView ? 'animate-fade-up stagger-4' : 'reveal-hidden'}`}>
              <p className="mb-6 font-mono text-xs tracking-[0.4em] text-[#00e5ff]/70 uppercase">
                Cùng đếm ngược đến ngày vui
              </p>
              <CountdownTimer />
              <div className="mt-6 flex justify-center">
                <a
                  href="#rsvp"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#007bff] px-8 py-4 font-bold uppercase tracking-[0.24em] text-white shadow-[0_15px_40px_rgba(0,229,255,0.4)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,229,255,0.5)] animate-pulse-soft"
                >
                  Xác nhận tham dự ngay
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
