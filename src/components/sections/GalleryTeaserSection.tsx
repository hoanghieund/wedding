"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "@/hooks/useInView";

type GalleryCategory = {
  slug: string;
  name: string;
  images: { src: string; alt: string }[];
};

type AnimationPreset = {
  name: string;
  className: string;
};

const ANIMATIONS: AnimationPreset[] = [
  { name: "Ken Burns", className: "animate-[kenburns_10s_ease-in-out_infinite_alternate]" },
  { name: "Pan Left", className: "animate-[panLeft_10s_ease-in-out_infinite]" },
  { name: "Pan Up", className: "animate-[panUp_10s_ease-in-out_infinite]" },
  { name: "Zoom In", className: "animate-[zoomIn_10s_ease-in-out_infinite]" },
  { name: "Pulse", className: "animate-[pulse_3s_ease-in-out_infinite]" },
  { name: "Rotate", className: "animate-[rotateSlow_20s_linear_infinite]" },
  { name: "Shake", className: "animate-[shake_4s_ease-in-out_infinite]" },
  { name: "Glow Pulse", className: "animate-[glowPulse_3s_ease-in-out_infinite]" },
];

const SLIDE_INTERVAL_MS = 4000;

type GalleryTeaserSectionProps = {
  categories: GalleryCategory[];
};

export default function GalleryTeaserSection({ categories }: GalleryTeaserSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = ref as React.RefObject<HTMLElement>;

  const [selectedSlug, setSelectedSlug] = useState<string>(categories[0]?.slug ?? "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === selectedSlug),
    [categories, selectedSlug],
  );

  const images = activeCategory?.images ?? [];
  const total = images.length;
  const currentAnim = ANIMATIONS[animIndex % ANIMATIONS.length];

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgressKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setAnimIndex((i) => i + 1);
    goTo((currentIndex - 1 + total) % total);
    setIsPlaying(false);
  }, [currentIndex, goTo, total]);

  const goNext = useCallback(() => {
    setAnimIndex((i) => i + 1);
    goTo((currentIndex + 1) % total);
    setIsPlaying(false);
  }, [currentIndex, goTo, total]);

  useEffect(() => {
    if (!isPlaying || total === 0) return;

    const timer = window.setInterval(() => {
      const nextIndex = (currentIndex + 1) % total;

      if (nextIndex === 0) {
        const currentCatIndex = categories.findIndex((c) => c.slug === selectedSlug);
        const nextCategory = categories[(currentCatIndex + 1) % categories.length];

        if (nextCategory) {
          setSelectedSlug(nextCategory.slug);
          setCurrentIndex(0);
          setProgressKey((k) => k + 1);
        }
      } else {
        setAnimIndex((i) => i + 1);
        setCurrentIndex(nextIndex);
        setProgressKey((k) => k + 1);
      }
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, total, currentIndex, categories, selectedSlug]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((v) => !v);
        setProgressKey((k) => k + 1);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  if (total === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="space-y-12"
    >
      <div className={`space-y-3 text-center ${isInView ? "animate-fade-up" : "reveal-hidden"}`}>
        <p className="section-label">Chương 4</p>
        <h2
          id="gallery-heading"
          className="chapter-title text-4xl sm:text-5xl"
        >
          Khoảnh Khắc
        </h2>
        <div className="mx-auto h-px w-24 section-divider" />
      </div>

      {categories.length > 1 && (
        <div
          className={`flex flex-wrap justify-center gap-3 ${
            isInView ? "animate-fade-up stagger-1" : "reveal-hidden"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedSlug(cat.slug);
                setCurrentIndex(0);
                setProgressKey((k) => k + 1);
              }}
              className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                selectedSlug === cat.slug
                  ? "border-[var(--accent-soft)] bg-[var(--accent)] text-[var(--bg)] shadow-[var(--glow-soft)]"
                  : "border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--accent-soft)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <div
        className={`relative mx-auto w-full max-w-5xl ${
          isInView ? "animate-fade-up stagger-2" : "reveal-hidden"
        }`}
      >
        <div className="relative aspect-[4/5] sm:aspect-[3/2] md:aspect-[16/10] overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-strong)] shadow-[var(--glow-soft)]">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === currentIndex
                  ? `z-10 opacity-100 ${currentAnim?.className ?? ""}`
                  : "z-0 opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                className="object-contain"
                quality={85}
                loading={i < 2 ? "eager" : "lazy"}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,14,39,0.82)] via-transparent to-[rgba(10,14,39,0.28)]" />
              {i === currentIndex && (
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(244,228,193,0.12)_45%,transparent_60%)] animate-[hologramSweep_3.5s_ease-in-out_infinite] mix-blend-screen" />
              )}
            </div>
          ))}

          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label="Ảnh trước"
          >
            ←
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label="Ảnh sau"
          >
            →
          </button>

          <button
            onClick={() => setAnimIndex((i) => i + 1)}
            className="absolute left-4 bottom-4 z-10 flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            title="Đổi hiệu ứng"
          >
            ✦ {currentAnim?.name ?? "FX"}
          </button>

          <button
            onClick={() => {
              setIsPlaying((v) => !v);
              setProgressKey((k) => k + 1);
            }}
            className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] font-mono text-xs text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label={isPlaying ? "Tạm dừng" : "Phát"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-strong)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] backdrop-blur-xl">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-50 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            key={progressKey}
            className={`h-full origin-left bg-[var(--accent-soft)] transition-transform ${
              isPlaying
                ? "animate-[slideProgress_4s_linear_forwards] shadow-[0_0_12px_rgba(212,165,116,0.65)]"
                : "scale-x-0 opacity-40"
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate3d(0,0,0); }
          100% { transform: scale(1.12) translate3d(-2%,-2%,0); }
        }
        @keyframes panLeft {
          0% { transform: scale(1.15) translateX(3%); }
          100% { transform: scale(1.15) translateX(-3%); }
        }
        @keyframes panUp {
          0% { transform: scale(1.1) translateY(3%); }
          100% { transform: scale(1.1) translateY(-3%); }
        }
        @keyframes zoomIn {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.2); filter: brightness(1.08); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); filter: brightness(1) saturate(1); }
          50% { transform: scale(1.06); filter: brightness(1.05) saturate(1.05); }
        }
        @keyframes rotateSlow {
          0% { transform: scale(1.05) rotate(0deg); }
          100% { transform: scale(1.05) rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          20% { transform: translateX(-2px) translateY(1px); }
          40% { transform: translateX(2px) translateY(-1px); }
          60% { transform: translateX(-1px) translateY(2px); }
          80% { transform: translateX(1px) translateY(-2px); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,165,116,0)); }
          50% { filter: brightness(1.1) drop-shadow(0 0 25px rgba(212,165,116,0.45)); }
        }
        @keyframes hologramSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes slideProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
