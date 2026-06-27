"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { EVENT_DATA } from "@/lib/constants/event-data";


export default function GiftSection() {
  const { ref, isInView } = useInView(0.1);
  const gifts = EVENT_DATA.gifts;

  return (
    <section
      id="gift"
      aria-labelledby="gift-heading"
      ref={ref}
      className="space-y-12 py-4 relative"
    >
      {/* Decorative background script */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none select-none text-[8rem] sm:text-[12rem] font-script text-[var(--accent)]/5 whitespace-nowrap z-0">
        Mừng Cưới
      </div>

      {/* Section heading */}
      <div className="space-y-4 text-center relative z-10">
        <h2
          id="gift-heading"
          className={`chapter-title text-4xl sm:text-5xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.giftTitle}
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
        <p
          className={`mx-auto max-w-2xl copy-muted text-lg leading-8 transition-all duration-700 delay-300 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.giftDescription}
        </p>
      </div>

      {/* Gift cards — bold two-column */}
      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        {gifts.map((account, index) => {
          const isGroom = account.title.includes("chú rể");
          return (
            <article
              key={account.title}
              className={`relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-8 transition-all duration-500 hover:border-[var(--accent-soft)]/30 hover:shadow-[var(--glow-soft)] ${
                isInView
                  ? index === 0 ? "animate-fade-left" : "animate-fade-right"
                  : "reveal-hidden"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Decorative top bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-soft)]/60 to-transparent`} />

              {/* Card label */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">
                  {isGroom ? "🤵" : "👰"}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-soft)]">
                  {account.title}
                </span>
              </div>

              {/* QR Code */}
              <div className="mx-auto mb-6 flex w-fit rounded-2xl bg-white/5 p-3 border border-[var(--border-soft)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(244,228,193,0.15)]">
                <Image
                  src={`https://img.vietqr.io/image/${account.bankId}-${account.accountNumber}-compact2.png?addInfo=${encodeURIComponent(account.transferNote)}&accountName=${encodeURIComponent(account.accountName)}`}
                  alt={`QR ${account.title}`}
                  width={240}
                  height={284}
                  unoptimized
                  className="h-auto w-[220px] max-w-full rounded-lg"
                />
              </div>

              {/* Decorative divider */}
              <div className="my-5 h-px w-16 mx-auto bg-[var(--accent-soft)]/30" />

              {/* Bank details — clean stack */}
              <div className="space-y-3 text-center">
                <p className="font-display-serif text-xl text-[var(--text-primary)]">
                  {account.bank}
                </p>
                <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--bg)] px-5 py-2.5">
                  <span className="font-mono text-sm tracking-[0.15em] text-[var(--accent)] select-all">
                    {account.accountNumber}
                  </span>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]/70">
                  {account.name}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
