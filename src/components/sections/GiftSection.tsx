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
      className={`space-y-10 reveal-hidden ${isInView ? "animate-fade-up" : ""}`}
    >
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#00e5ff]/60">
          Thông tin mừng cưới
        </p>
        <h2 id="gift-heading" className="text-center text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
          Mừng cưới
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-7 text-white/60">
          Sự hiện diện của quý vị là niềm vui lớn nhất của gia đình chúng tôi. Nếu thuận tiện, quý vị có thể gửi lời chúc qua mã QR bên dưới.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {giftAccounts.map((account, index) => (
          <article
            key={account.title}
            className={`rounded-3xl border border-white/10 bg-[rgba(20,20,30,0.6)] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl reveal-hidden ${
              isInView ? `animate-fade-up stagger-${index + 1}` : ""
            }`}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#a0a0b0]">{account.title}</p>
            <div className="mx-auto inline-flex rounded-xl bg-white p-2">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${account.qrData}`}
                alt={`QR ${account.title}`}
                width={140}
                height={140}
                unoptimized
                className="h-[140px] w-[140px]"
              />
            </div>
            <p className="mt-5 text-lg font-bold text-white">{account.bank}</p>
            <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-[#00e5ff]">{account.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
