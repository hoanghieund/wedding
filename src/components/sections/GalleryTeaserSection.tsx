"use client";

import Image from "next/image";
import { useState } from "react";

import { GALLERY_TEASER_ITEMS } from "@/lib/constants/event-data";

export function GalleryTeaserSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (GALLERY_TEASER_ITEMS.length === 0) {
    return null;
  }

  return (
    <>
      <section id="gallery" aria-labelledby="gallery-heading" className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
            Khoảnh khắc lưu giữ
          </p>
          <h2 id="gallery-heading" className="font-serif text-4xl font-semibold tracking-tight text-rose-950 sm:text-5xl">
            Album ảnh cưới của chúng tôi
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {GALLERY_TEASER_ITEMS.slice(0, 3).map((item, index) => (
            <button
              key={item.src}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-rose-100/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              aria-label={`Xem ảnh: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/45 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <p className="text-sm font-medium leading-6 text-white drop-shadow-md">{item.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox xem ảnh"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Đóng lightbox"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={GALLERY_TEASER_ITEMS[selectedImage].src}
              alt={GALLERY_TEASER_ITEMS[selectedImage].alt}
              width={1200}
              height={1200}
              className="h-auto max-h-[90vh] w-auto rounded-2xl object-contain shadow-2xl"
            />

            <div className="mt-4 text-center">
              <p className="text-sm text-white/80">{GALLERY_TEASER_ITEMS[selectedImage].alt}</p>
              <p className="mt-1 text-xs text-white/60">
                {selectedImage + 1} / {GALLERY_TEASER_ITEMS.length}
              </p>
            </div>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : GALLERY_TEASER_ITEMS.length - 1))}
                className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Ảnh trước"
              >
                ← Trước
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev! < GALLERY_TEASER_ITEMS.length - 1 ? prev! + 1 : 0))}
                className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Ảnh sau"
              >
                Sau →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
