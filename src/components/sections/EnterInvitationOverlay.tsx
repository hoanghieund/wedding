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
      audio.play().catch(() => {
        // Browser may block audio autoplay
      });
    }

    setOpened(true);
  };

  if (opened) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#0f0f1e] to-[#030305] px-6 text-center">
      <div className={`absolute inset-0 bg-[url('/images/HAR01404.jpg')] bg-cover bg-center opacity-20 blur-sm ${prefersReduced ? "" : "animate-slow-zoom"}`} />
      
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className={`absolute h-1 w-1 rounded-full bg-[#d4af37] ${prefersReduced ? "" : "animate-float-particle"}`}
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

      <div className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08),transparent_70%)] ${prefersReduced ? "" : "animate-pulse-slow"}`} />

      <div className={`relative w-full max-w-[420px] ${prefersReduced ? "" : "animate-card-entrance"}`} style={{ perspective: "1200px" }}>
        <div className={`relative rounded-[2.25rem] border-2 border-[#d4af37]/40 bg-gradient-to-br from-[#1a1520]/95 via-[#0f0a15]/98 to-[#050305]/95 px-8 py-10 shadow-[0_0_120px_rgba(212,175,55,0.35),inset_0_0_80px_rgba(212,175,55,0.08)] backdrop-blur-xl sm:px-10 sm:py-11 ${prefersReduced ? "" : "animate-card-float"}`}>

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[2.25rem]">
            <div className={`absolute -left-1/2 -top-1/2 h-full w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent ${prefersReduced ? "" : "animate-shimmer"}`} />
          </div>

          <div className={`pointer-events-none absolute left-1/2 top-4 z-0 -translate-x-1/2 ${prefersReduced ? "" : "animate-bounce-gentle"}`}>
            <div className={`h-9 w-9 rounded-full border border-[#d4af37]/60 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/10 shadow-[0_0_32px_rgba(212,175,55,0.45)] ${prefersReduced ? "" : "animate-spin-slow"}`} />
          </div>

          <div className={`pointer-events-none absolute left-5 top-5 z-0 text-2xl text-[#d4af37]/35 ${prefersReduced ? "" : "animate-float-slow"}`}>
            ❦
          </div>
          <div className={`pointer-events-none absolute right-5 top-5 z-0 text-2xl text-[#d4af37]/35 ${prefersReduced ? "" : "animate-float-slow"}`} style={{ animationDelay: prefersReduced ? undefined : "0.7s" }}>
            ❦
          </div>
          <div className={`pointer-events-none absolute bottom-5 left-5 z-0 text-2xl text-[#d4af37]/25 ${prefersReduced ? "" : "animate-float-slow"}`} style={{ animationDelay: prefersReduced ? undefined : "1.2s" }}>
            ❦
          </div>
          <div className={`pointer-events-none absolute bottom-5 right-5 z-0 text-2xl text-[#d4af37]/25 ${prefersReduced ? "" : "animate-float-slow"}`} style={{ animationDelay: prefersReduced ? undefined : "1.8s" }}>
            ❦
          </div>

          <div className={`pointer-events-none absolute inset-0 z-0 rounded-[2.25rem] bg-gradient-to-br from-[#d4af37]/8 via-transparent to-transparent ${prefersReduced ? "" : "animate-gradient-shift"}`} />

          <div className="relative z-10 space-y-5">
            <div className={`space-y-2 ${prefersReduced ? "" : "animate-fade-in-up"}`} style={{ animationDelay: prefersReduced ? undefined : "0.2s" }}>
              <p className={`font-serif text-sm italic tracking-[0.3em] text-[#d4af37]/90 ${prefersReduced ? "" : "animate-glow"}`}>
                Wedding Invitation
              </p>
              <div className={`mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent ${prefersReduced ? "" : "animate-expand"}`} />
            </div>

            <div className={`space-y-3 ${prefersReduced ? "" : "animate-fade-in-up"}`} style={{ animationDelay: prefersReduced ? undefined : "0.4s" }}>
              <h1 className={`font-serif text-4xl font-bold leading-[1.12] tracking-wide text-white drop-shadow-[0_2px_20px_rgba(212,175,55,0.4)] sm:text-5xl ${prefersReduced ? "" : "animate-text-glow"}`}>
                {COUPLE_NAMES.split(" & ").map((part, i) => (
                  <span key={i} className="block text-center" style={{ animationDelay: prefersReduced ? undefined : `${i * 0.2}s` }}>{part}</span>
                ))}
              </h1>
              <p className={`font-serif text-lg italic leading-relaxed text-white/80 ${prefersReduced ? "" : "animate-fade-in"}`}>
                Trân trọng kính mời
              </p>
            </div>

            <div className={`mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent ${prefersReduced ? "" : "animate-expand"}`} style={{ animationDelay: prefersReduced ? undefined : "0.6s" }} />

            <p className={`mx-auto max-w-[280px] font-serif text-sm leading-6 text-white/65 ${prefersReduced ? "" : "animate-fade-in-up"}`} style={{ animationDelay: prefersReduced ? undefined : "0.8s" }}>
              Hân hạnh được đón tiếp Quý vị trong ngày trọng đại của chúng tôi
            </p>

            <button
              type="button"
              onClick={handleOpen}
              className={`group pointer-events-auto relative z-50 mx-auto mt-6 block cursor-pointer overflow-hidden rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#d4af37] to-[#b8941f] px-10 py-4 font-serif text-base font-semibold tracking-[0.15em] text-[#1a1520] opacity-100 shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(212,175,55,0.8)] ${prefersReduced ? "" : "animate-pulse-button"}`}
              style={{ animationDelay: prefersReduced ? undefined : "1s" }}
            >
              <div className={`absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl ${prefersReduced ? "" : "animate-button-glow"}`} />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">Mở Thiệp</span>
            </button>

            <div className={`flex items-center justify-center gap-3 pt-4 ${prefersReduced ? "" : "animate-fade-in"}`} style={{ animationDelay: prefersReduced ? undefined : "1.2s" }}>
              <div className={`h-1 w-1 rounded-full bg-[#d4af37]/50 ${prefersReduced ? "" : "animate-pulse"}`} style={{ animationDelay: prefersReduced ? undefined : "0s" }} />
              <div className={`h-1 w-1 rounded-full bg-[#d4af37]/70 ${prefersReduced ? "" : "animate-pulse"}`} style={{ animationDelay: prefersReduced ? undefined : "0.3s" }} />
              <div className={`h-1 w-1 rounded-full bg-[#d4af37]/50 ${prefersReduced ? "" : "animate-pulse"}`} style={{ animationDelay: prefersReduced ? undefined : "0.6s" }} />
            </div>
          </div>
        </div>

        <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 ${prefersReduced ? "" : "animate-bounce-gentle"}`} style={{ animationDelay: prefersReduced ? undefined : "0.5s" }}>
          <div className="flex items-center justify-center">
            <div className={`h-12 w-12 rounded-full border-2 border-[#d4af37]/50 bg-gradient-to-br from-[#d4af37]/15 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.3)] ${prefersReduced ? "" : "animate-spin-slow"}`} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes card-entrance {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateX(20deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }
        @keyframes card-float {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-10px) rotateZ(1deg);
          }
        }
        @keyframes float-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(30px, -100vh) scale(0);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
          }
        }
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-8px) translateX(-50%);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes expand {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 6rem;
            opacity: 1;
          }
        }
        @keyframes letter-wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 2px 20px rgba(212,175,55,0.4);
          }
          50% {
            text-shadow: 0 2px 30px rgba(212,175,55,0.7), 0 0 40px rgba(212,175,55,0.3);
          }
        }
        @keyframes glow {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(212,175,55,0.8);
          }
        }
        @keyframes pulse-button {
          0%, 100% {
            box-shadow: 0 0 40px rgba(212,175,55,0.5);
          }
          50% {
            box-shadow: 0 0 60px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4);
          }
        }
        @keyframes button-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes slow-zoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-card-entrance {
          animation: card-entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-card-float {
          animation: card-float 6s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        .animate-letter-wave {
          animation: letter-wave 2s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-pulse-button {
          animation: pulse-button 2s ease-in-out infinite;
        }
        .animate-button-glow {
          animation: button-glow 2s ease-in-out infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
