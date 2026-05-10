"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const giftAccounts = [
  {
    title: "Mừng cưới chú rể",
    bank: "TECHCOMBANK",
    name: "HOÀNG HIẾU",
    qrData: "STK_HIEU",
  },
  {
    title: "Mừng cưới cô dâu",
    bank: "NGÂN HÀNG VIB",
    name: "KIM LIÊN",
    qrData: "STK_LIEN",
  },
];

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
          Chương 7
        </p>
        <h2 id="gift-heading" className={`chapter-title text-4xl sm:text-5xl ${isInView ? "animate-fade-up" : "reveal-hidden"}`}>
          Mừng cưới
        </h2>
        <p className={`mx-auto max-w-2xl copy-muted text-lg leading-8 ${isInView ? "animate-fade-up stagger-1" : "reveal-hidden"}`}>
          Sự hiện diện của quý vị là niềm vui lớn nhất của gia đình chúng tôi. Nếu thuận tiện, quý vị có thể gửi lời chúc qua mã QR bên dưới.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {giftAccounts.map((account, index) => (
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
