"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { COUPLE_NAMES, HERO_IMAGE, WEDDING_DATE_ISO } from "@/lib/constants/event-data";
import { formatEventDate } from "@/lib/formatters/date-format";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Subtle Parallax */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(76,5,25,0.1)_0%,rgba(76,5,25,0.3)_50%,rgba(76,5,25,0.8)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-5xl px-6 text-center sm:px-10 lg:px-14">
          <div
            className={`space-y-8 text-white transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h1
              id="hero-heading"
              className="font-serif text-7xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-8xl lg:text-9xl"
              style={{
                animation: "fade-in-up 1s ease-out 0.2s both",
              }}
            >
              {COUPLE_NAMES}
            </h1>

            <div
              className="mx-auto h-px w-32 bg-gradient-to-r from-white/0 via-white/80 to-white/0"
              style={{
                animation: "fade-in-up 1s ease-out 0.4s both",
              }}
            />

            <p
              className="mx-auto max-w-2xl text-xl leading-9 text-white/95 sm:text-2xl sm:leading-10"
              style={{
                animation: "fade-in-up 1s ease-out 0.6s both",
              }}
            >
              <time dateTime={WEDDING_DATE_ISO}>{formatEventDate(WEDDING_DATE_ISO)}</time>
            </p>

            <div
              className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:justify-center"
              style={{
                animation: "fade-in-up 1s ease-out 0.8s both",
              }}
            >
              <a
                href="#rsvp"
                className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-rose-700 shadow-2xl transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rose-900 sm:w-auto"
              >
                Xác nhận tham dự
              </a>
              <a
                href="#schedule"
                className="text-base font-medium text-white underline decoration-white/40 underline-offset-8 transition hover:decoration-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rose-900"
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
