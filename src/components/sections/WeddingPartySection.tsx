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
      className={`space-y-8 reveal-hidden ${isInView ? "animate-fade-up" : ""}`}
    >
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00e5ff]">
          Những người thân thiết nhất
        </p>
        <h2
          id="party-heading"
          className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl"
        >
          Đội Ngũ Đồng Hành
        </h2>
        <p className="text-base leading-7 text-white/75 sm:text-lg">
          Đây là những người bạn, người thân luôn ở bên cô dâu chú rể trong
          quá trình chuẩn bị và trong ngày cưới. Mỗi người đều góp một phần để
          buổi lễ diễn ra ấm áp, chỉn chu và đáng nhớ hơn.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {partyMembers.map((member, index) => (
          <article
            key={member.role}
            className={`flex h-full flex-col rounded-2xl border border-white/10 bg-[rgba(20,20,30,0.6)] p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl reveal-hidden ${
              isInView ? `animate-zoom-in stagger-${index + 1}` : ""
            }`}
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00e5ff] bg-[rgba(20,20,30,0.6)] text-3xl shadow-[0_0_24px_rgba(0,229,255,0.25)]">
              {member.emoji}
            </div>
            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00e5ff]">
              {member.role}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/70">{member.duty}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
