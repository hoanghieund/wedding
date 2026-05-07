"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function InvitationNote() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      aria-labelledby="invitation-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 bg-[#0A0A0D]/60 backdrop-blur-xl rounded-2xl border border-[#00e5ff]/10"
    >
      <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-16">
        <div className={`relative aspect-[3/4] overflow-hidden rounded-3xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 shadow-[0_0_40px_rgba(245,225,164,0.1)] ${isInView ? 'animate-fade-left' : 'reveal-hidden'}`}>
          <Image
            src="/images/gallery/couple-1.svg"
            alt="Ảnh cặp đôi"
            fill
            className="object-cover opacity-80 mix-blend-luminosity"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>

        <div className={`space-y-6 ${isInView ? 'animate-fade-right' : 'reveal-hidden'}`}>
          <h2
            id="invitation-heading"
            className="font-serif text-2xl leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Trân trọng kính mời quý vị đến chung vui cùng gia đình chúng tôi trong ngày trọng đại này.
          </h2>
          <p className="text-lg leading-7 text-white/70">
            Sự hiện diện của quý vị là niềm vinh hạnh và là món quà ý nghĩa nhất mà chúng tôi có thể nhận được.
          </p>
        </div>
      </div>
    </section>
  );
}
