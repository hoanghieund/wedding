"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "@/hooks/useInView";

import type { GalleryCategory } from "@/lib/gallery-data";

type GalleryTeaserSectionProps = {
  categories: GalleryCategory[];
};

const ASPECT_RATIOS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/2]", "aspect-[2/3]", "aspect-[1/1]"];

export default function GalleryTeaserSection({ categories }: GalleryTeaserSectionProps) {
  const { ref, isInView } = useInView(0.1);
  const sectionRef = ref as React.RefObject<HTMLElement>;

  const [selectedSlug, setSelectedSlug] = useState<string>(categories[0]?.slug ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === selectedSlug),
    [categories, selectedSlug],
  );

  const images = activeCategory?.images ?? [];
  const total = images.length;

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
    setIsZoomed(false);
  }, [lightboxIndex, total]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : null));
    setIsZoomed(false);
  }, [lightboxIndex, total]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);


  if (categories.length === 0 || total === 0) {
    return (
      <section
        ref={sectionRef}
        id="gallery"
        aria-label="Wedding Photo Gallery"
        className="py-16 text-center"
      >
        <div className="space-y-3 text-center mb-12">
          <h2 className="chapter-title text-4xl sm:text-5xl">Khoảnh Khắc</h2>
          <div className="mx-auto h-px w-24 section-divider" />
        </div>
        <div className="border border-dashed border-[var(--border-soft)] py-16 px-4 rounded-2xl bg-[var(--surface)]">
          <p className="text-[var(--text-secondary)] font-body-serif text-lg italic">
            Hình ảnh sẽ được cập nhật sớm trong thời gian tới.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      role="region"
      aria-label="Wedding Photo Gallery"
      className="space-y-12 py-8"
    >
      <div className={`space-y-3 text-center ${isInView ? "animate-fade-up" : "reveal-hidden"}`}>
        <h2 className="chapter-title text-4xl sm:text-5xl">Khoảnh Khắc</h2>
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
                setIsZoomed(false);
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

      {/* Masonry Grid Layout */}
      <div
        className={`columns-1 sm:columns-2 lg:columns-3 gap-6 ${
          isInView ? "animate-fade-up stagger-2" : "reveal-hidden"
        }`}
      >
        {images.map((img, index) => {
          const aspectClass = ASPECT_RATIOS[index % ASPECT_RATIOS.length];
          return (
            <div
              key={img.src}
              onClick={() => setLightboxIndex(index)}
              className={`break-inside-avoid mb-6 relative overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface-strong)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[var(--glow-soft)] group cursor-pointer ${aspectClass}`}
            >
              <Image
                src={img.src}
                alt={img.alt || `Ảnh trong album ${activeCategory?.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[var(--accent)] font-mono text-xs uppercase tracking-widest border border-[var(--accent)] px-3 py-1.5 rounded bg-black/40 backdrop-blur-sm">
                  Xem ảnh
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[var(--bg-deep)]/95 backdrop-blur-md flex items-center justify-center select-none"
          onClick={handleClose}
        >
          {/* Controls - Stop propagation to avoid closing lightbox on click */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-xl text-[var(--accent)] hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition duration-200"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Zoom Button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-16 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-xl text-[var(--accent)] hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition duration-200"
              aria-label={isZoomed ? "Thu nhỏ" : "Phóng to"}
            >
              {isZoomed ? "⊖" : "⊕"}
            </button>

            {/* Left Control */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-xl text-[var(--accent)] hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition duration-200"
              aria-label="Ảnh trước"
            >
              ←
            </button>

            {/* Image Container */}
            <div
              className={`relative max-w-[90vw] max-h-[80vh] w-full h-full flex items-center justify-center transition-transform duration-300 ${
                isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt || "Ảnh cưới phóng to"}
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain rounded-lg"
                priority
              />
            </div>

            {/* Right Control */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-xl text-[var(--accent)] hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition duration-200"
              aria-label="Ảnh sau"
            >
              →
            </button>

            {/* Status Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-strong)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
