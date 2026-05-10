"use client";

import { useInView } from "@/hooks/useInView";

const partyMembers = [
  {
    name: "Phạm Văn A",
    role: "Phù rể chính",
    duty: "Đồng hành cùng chú rể, hỗ trợ đón khách và giữ không khí buổi tiệc thật vui vẻ.",
    emoji: "🤵",
  },
  {
    name: "Nguyễn Thị B",
    role: "Phù dâu chính",
    duty: "Luôn bên cạnh cô dâu, hỗ trợ chuẩn bị trang phục, nghi thức và những khoảnh khắc quan trọng.",
    emoji: "👰",
  },
  {
    name: "Trần Văn C",
    role: "Người hỗ trợ tiệc cưới",
    duty: "Giúp kết nối khách mời, hỗ trợ hậu cần và cùng gia đình chăm chút cho ngày vui trọn vẹn.",
    emoji: "🤵",
  },
];

export default function WeddingPartySection() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="party"
      aria-labelledby="party-heading"
      ref={ref}
      className="space-y-12"
    >
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className={`section-label ${isInView ? "animate-fade-down" : "reveal-hidden"}`}>
          Chương 6
        </p>
        <h2
          id="party-heading"
          className={`chapter-title text-4xl sm:text-5xl ${
            isInView ? "animate-fade-up" : "reveal-hidden"
          }`}
        >
          Đội Ngũ Đồng Hành
        </h2>
        <p className={`copy-muted text-lg leading-8 sm:text-xl ${isInView ? "animate-fade-up stagger-1" : "reveal-hidden"}`}>
          Đây là những người bạn, người thân luôn ở bên cô dâu chú rể trong quá trình chuẩn bị và trong ngày cưới.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {partyMembers.map((member, index) => (
          <article
            key={member.role}
            className={`section-shell hover-lift flex h-full flex-col rounded-[1.75rem] p-6 text-center reveal-hidden ${
              isInView ? `animate-zoom-in stagger-${index + 1}` : ""
            }`}
          >
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-4xl shadow-[var(--glow-soft)]">
              {member.emoji}
            </div>
            <h3 className="text-2xl font-display-serif text-[var(--accent)]">{member.name}</h3>
            <p className="mt-2 section-label text-[10px]">{member.role}</p>
            <p className="copy-muted mt-4 text-base leading-7">{member.duty}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
