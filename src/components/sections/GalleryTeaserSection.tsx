"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { WeddingIcon } from "@/components/ui/WeddingIcon";

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const zoomButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const wasLightboxOpenRef = useRef(false);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === selectedSlug),
    [categories, selectedSlug],
  );

  const images = activeCategory?.images ?? [];
  const total = images.length;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
    setIsZoomed(false);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : null));
    setIsZoomed(false);
  }, [total]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  const openLightbox = (index: number) => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setLightboxIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab") {
        const controls = [
          closeButtonRef.current,
          zoomButtonRef.current,
          prevButtonRef.current,
          nextButtonRef.current,
        ].filter((control): control is HTMLButtonElement => Boolean(control));
        if (controls.length === 0) return;

        const currentIndex = controls.indexOf(document.activeElement as HTMLButtonElement);
        const nextIndex = e.shiftKey
          ? (currentIndex <= 0 ? controls.length - 1 : currentIndex - 1)
          : (currentIndex + 1) % controls.length;
        e.preventDefault();
        controls[nextIndex].focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  useEffect(() => {
    const wasOpen = wasLightboxOpenRef.current;

    if (lightboxIndex !== null) {
      if (!wasOpen) {
        previousOverflowRef.current = document.body.style.overflow;
        requestAnimationFrame(() => closeButtonRef.current?.focus());
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflowRef.current;
      if (wasOpen) {
        const previousFocus = previousFocusRef.current;
        if (previousFocus && document.contains(previousFocus)) {
          previousFocus.focus();
        }
      }
    }

    wasLightboxOpenRef.current = lightboxIndex !== null;

    return () => {
      if (lightboxIndex !== null) {
        document.body.style.overflow = previousOverflowRef.current;
      }
    };
  }, [lightboxIndex]);


  if (categories.length === 0) {
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
              type="button"
              onClick={() => {
                setSelectedSlug(cat.slug);
                setLightboxIndex(null);
                setIsZoomed(false);
              }}
              className={`focus-ring-accent min-h-[44px] rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
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

      {total === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border-soft)] bg-[var(--surface)] px-4 py-16 text-center">
          <p className="font-body-serif text-lg italic text-[var(--text-secondary)]">
            Hình ảnh sẽ được cập nhật sớm trong thời gian tới.
          </p>
        </div>
      ) : (
        <div
          className={`columns-1 gap-6 sm:columns-2 lg:columns-3 ${
            isInView ? "animate-fade-up stagger-2" : "reveal-hidden"
          }`}
        >
          {images.map((img, index) => {
            const aspectClass = ASPECT_RATIOS[index % ASPECT_RATIOS.length];
            const alt = img.alt || `Ảnh trong album ${activeCategory?.name}`;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`Mở ảnh ${index + 1}: ${alt}`}
                className={`focus-ring-accent group relative mb-6 block w-full break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface-strong)] text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-[var(--glow-soft)] ${aspectClass}`}
              >
                <Image
                  src={img.src}
                  alt={alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded border border-[var(--accent)] bg-black/40 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--accent)] backdrop-blur-sm">
                    Xem ảnh
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 z-[1000] flex select-none items-center justify-center bg-[var(--bg-deep)]/95 backdrop-blur-md"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <h2 id="gallery-lightbox-title" className="sr-only">
            {images[lightboxIndex].alt || `Ảnh trong album ${activeCategory?.name}`}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="focus-ring-accent absolute right-4 top-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] transition duration-200 hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label="Đóng"
          >
            <WeddingIcon className="h-5 w-5" name="cross" />
          </button>

          <button
            ref={zoomButtonRef}
            type="button"
            onClick={() => setIsZoomed((current) => !current)}
            className="focus-ring-accent absolute right-16 top-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] transition duration-200 hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label={isZoomed ? "Thu nhỏ" : "Phóng to"}
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
              <path d={isZoomed ? "M7.5 10.5h6" : "M7.5 10.5h6M10.5 7.5v6"} />
            </svg>
          </button>

          <button
            ref={prevButtonRef}
            type="button"
            onClick={handlePrev}
            className="focus-ring-accent absolute left-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] transition duration-200 hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label="Ảnh trước"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className={`relative flex h-full max-h-[80vh] w-full max-w-[90vw] items-center justify-center transition-transform duration-300 ${isZoomed ? "scale-125" : ""}`}>
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt || "Ảnh cưới phóng to"}
              width={1200}
              height={900}
              className="max-h-full max-w-full rounded-lg object-contain"
              priority
            />
          </div>

          <button
            ref={nextButtonRef}
            type="button"
            onClick={handleNext}
            className="focus-ring-accent absolute right-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] transition duration-200 hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            aria-label="Ảnh sau"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-strong)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}
