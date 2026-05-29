"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";

export default function GiftSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="gift"
      aria-labelledby="gift-heading"
      ref={ref}
      className="space-y-12"
    >
      <div className="space-y-3 text-center">
        <p className={`section-label ${isInView ? "animate-fade-down" : "reveal-hidden"}`}>
          {EVENT_DATA.copy.sections.giftChapter}
        </p>
        <h2 id="gift-heading" className={`chapter-title text-4xl sm:text-5xl ${isInView ? "animate-fade-up" : "reveal-hidden"}`}>
          {EVENT_DATA.copy.sections.giftTitle}
        </h2>
        <p className={`mx-auto max-w-2xl copy-muted text-lg leading-8 ${isInView ? "animate-fade-up stagger-1" : "reveal-hidden"}`}>
          {EVENT_DATA.copy.sections.giftDescription}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {EVENT_DATA.gifts.map((account, index) => (
          <article
            key={account.title}
            className={`section-shell hover-lift rounded-[1.75rem] p-8 text-center reveal-hidden ${
              isInView ? `animate-fade-up stagger-${index + 1}` : ""
            }`}
          >
            <p className="mb-4 section-label text-[10px]">{account.title}</p>
            <div className="mx-auto inline-flex rounded-2xl bg-white p-3">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${account.qrData}`}
                alt={`QR ${account.title}`}
                width={140}
                height={140}
                unoptimized
                className="h-[140px] w-[140px]"
              />
            </div>
            <p className="mt-5 text-xl font-display-serif text-[var(--accent)]">{account.bank}</p>
            <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-[var(--accent-soft)]">{account.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
