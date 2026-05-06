import Image from "next/image";

export function InvitationNote() {
  return (
    <section
      aria-labelledby="invitation-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-rose-100/60 shadow-lg">
          <Image
            src="/images/gallery/couple-1.svg"
            alt="Ảnh cặp đôi"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>

        <div className="space-y-6">
          <h2
            id="invitation-heading"
            className="font-serif text-3xl leading-tight text-rose-950 sm:text-4xl lg:text-5xl"
          >
            Trân trọng kính mời quý vị đến chung vui cùng gia đình chúng tôi trong ngày trọng đại này.
          </h2>
          <p className="text-lg leading-9 text-rose-800/80">
            Sự hiện diện của quý vị là niềm vinh hạnh và là món quà ý nghĩa nhất mà chúng tôi có thể nhận được.
          </p>
        </div>
      </div>
    </section>
  );
}
