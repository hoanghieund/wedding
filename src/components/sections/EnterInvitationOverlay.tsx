"use client";

import { useEffect, useState } from "react";
import { COUPLE_NAMES } from "@/lib/constants/event-data";

const PARTICLES = Array.from({ length: 30 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 10) * 0.5}s`,
  duration: `${8 + (index % 5)}s`,
  opacity: 0.3 + (index % 5) * 0.08,
}));

export default function EnterInvitationOverlay() {
  const [opened, setOpened] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReduced(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (opened) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [opened]);

  const handleOpen = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (audio) {
      audio.play().catch(() => {});
    }

    setOpened(true);
  };

  if (opened) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(244,228,193,0.08),transparent_30%),linear-gradient(180deg,#0a0e27_0%,#11182b_45%,#0d1323_100%)] px-6 text-center">
      <div className={`absolute inset-0 bg-[url('/images/HAR01404.jpg')] bg-cover bg-center opacity-15 blur-sm ${prefersReduced ? "" : "animate-slow-zoom"}`} />

      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className={`absolute h-1 w-1 rounded-full bg-[var(--accent-soft)] ${prefersReduced ? "" : "animate-float-particle"}`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: prefersReduced ? undefined : particle.delay,
              animationDuration: prefersReduced ? undefined : particle.duration,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <div className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,228,193,0.08),transparent_70%)] ${prefersReduced ? "" : "animate-pulse-slow"}`} />

      <div className={`relative w-full max-w-[420px] ${prefersReduced ? "" : "animate-card-entrance"}`} style={{ perspective: "1200px" }}>
        <div className={`section-shell relative rounded-[2.25rem] px-8 py-10 shadow-[0_0_120px_rgba(212,165,116,0.24)] backdrop-blur-xl sm:px-10 sm:py-11 ${prefersReduced ? "" : "animate-card-float"}`}>
          <div className="relative z-10 space-y-5">
            <div className={`space-y-2 ${prefersReduced ? "" : "animate-fade-in-up"}`} style={{ animationDelay: prefersReduced ? undefined : "0.2s" }}>
              <p className="section-label text-[10px]">Wedding Invitation</p>
              <div className="mx-auto h-px w-24 section-divider" />
            </div>

            <div className={`space-y-3 ${prefersReduced ? "" : "animate-fade-in-up"}`} style={{ animationDelay: prefersReduced ? undefined : "0.4s" }}>
              <h1 className="font-script text-5xl leading-[1.12] text-[var(--accent)] drop-shadow-[0_2px_20px_rgba(212,165,116,0.25)] sm:text-6xl">
                {COUPLE_NAMES.split(" & ").map((part, i) => (
                  <span key={i} className="block text-center">{part}</span>
                ))}
              </h1>
              <p className="font-body-serif text-lg italic leading-relaxed text-[var(--text-secondary)]">
                Trân trọng kính mời
              </p>
            </div>

            <div className="mx-auto h-px w-32 section-divider" />

            <p className={`mx-auto max-w-[280px] font-body-serif text-base leading-7 text-[var(--text-secondary)] ${prefersReduced ? "" : "animate-fade-in-up"}`} style={{ animationDelay: prefersReduced ? undefined : "0.8s" }}>
              Hân hạnh được đón tiếp Quý vị trong ngày trọng đại của chúng tôi
            </p>

            <button
              type="button"
              onClick={handleOpen}
              className={`group pointer-events-auto relative z-50 mx-auto mt-6 block cursor-pointer overflow-hidden rounded-full border border-[var(--accent-soft)] bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)] px-10 py-4 font-body-serif text-base tracking-[0.15em] text-[var(--bg)] shadow-[0_0_40px_rgba(212,165,116,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_70px_rgba(244,228,193,0.35)] ${prefersReduced ? "" : "animate-pulse-button"}`}
              style={{ animationDelay: prefersReduced ? undefined : "1s" }}
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">Mở Thiệp</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes card-entrance {
          0% { opacity: 0; transform: scale(0.8) rotateX(20deg); }
          100% { opacity: 1; transform: scale(1) rotateX(0deg); }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-10px) rotateZ(1deg); }
        }
        @keyframes float-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(30px, -100vh) scale(0); opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-button {
          0%, 100% { box-shadow: 0 0 40px rgba(212,165,116,0.35); }
          50% { box-shadow: 0 0 60px rgba(244,228,193,0.38), 0 0 80px rgba(212,165,116,0.18); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-card-entrance { animation: card-entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-card-float { animation: card-float 6s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-pulse-button { animation: pulse-button 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
