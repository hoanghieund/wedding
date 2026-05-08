"use client";

import TimelineItem from "@/components/ui/TimelineItem";
import { useInView } from "@/hooks/useInView";

const LOVE_STORY_TIMELINE = [
  {
    date: "2022",
    code: "FIRST_SPARK",
    title: "Năm Ấy, Chúng Mình Bắt Đầu",
    desc: "Năm 2022, giữa những ngày rất bình thường, chúng mình bước vào cuộc đời nhau. Không ồn ào, không vội vã, chỉ là càng nói chuyện càng thấy hợp, càng gặp lại càng thấy thương.",
  },
  {
    date: "2023",
    code: "THE_DEPARTURE",
    title: "Ngày Em Sang Nhật",
    desc: "Khi tình yêu vừa đủ sâu, cô dâu bắt đầu hành trình 3 năm ở Nhật. Từ đây, yêu nhau không còn chỉ là những buổi hẹn gần bên, mà là học cách thương một người qua màn hình điện thoại.",
  },
  {
    date: "2023 - 2025",
    code: "LONG_DISTANCE",
    title: "Ba Năm Giữ Một Lời Hứa",
    desc: "Có những ngày lệch múi giờ, những đêm nhớ nhau đến nghẹn lòng, những lần chỉ kịp hỏi 'hôm nay em ổn không?'. Nhưng sau tất cả, chúng mình vẫn chọn ở lại, chọn tin nhau, chọn đi tiếp.",
  },
  {
    date: "Mỗi Năm",
    code: "REUNION_TRIPS",
    title: "Những Chuyến Bay Về Và Những Chuyến Đi Chung",
    desc: "Mỗi năm cô dâu bay về Việt Nam, và mỗi lần gặp lại, chúng mình lại cùng nhau đi du lịch. Những chuyến đi ấy không chỉ để ngắm cảnh, mà để bù đắp những cái ôm còn thiếu và lưu lại bằng chứng rằng tình yêu này vẫn luôn ở đây.",
  },
  {
    date: "2026",
    code: "NEW_BEGINNING",
    title: "Không Còn Là Yêu Xa",
    desc: "Sau 4 năm yêu nhau, trong đó có 3 năm cách xa, chúng mình hiểu rằng người phù hợp không phải là người luôn ở cạnh từ đầu, mà là người dù xa đến đâu vẫn khiến mình muốn trở về.",
  },
  {
    date: "Hôm Nay",
    code: "WEDDING_DAY",
    title: "Về Chung Một Nhà",
    desc: "Hôm nay, chúng mình không còn đếm ngày gặp lại. Từ những tin nhắn xuyên đêm, những chuyến bay trở về, những hành trình đã đi cùng nhau — tất cả dẫn chúng mình đến khoảnh khắc này: nắm tay nhau, chính thức gọi nhau là gia đình.",
  },
];

const SECTION_TITLE = "Hành Trình Nên Duyên";
const STAGGER_CLASSES = [
  "stagger-1",
  "stagger-2",
  "stagger-3",
  "stagger-4",
  "stagger-5",
  "stagger-6",
] as const;

export default function LoveStorySection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = ref as React.RefObject<HTMLElement>;

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="space-y-10"
    >
      <h2
        id="story-heading"
        className={`text-center text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl ${
          isInView ? "animate-fade-up" : "reveal-hidden"
        }`}
      >
        {SECTION_TITLE}
      </h2>

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[rgba(20,20,30,0.6)] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-12">
        <ol className="border-l-2 border-[#00e5ff] pl-4">
          {LOVE_STORY_TIMELINE.map((milestone, index) => (
            <TimelineItem
              key={milestone.code}
              date={milestone.date}
              code={milestone.code}
              title={milestone.title}
              desc={milestone.desc}
              className={`${
                isInView
                  ? index % 2 === 0
                    ? "animate-fade-left"
                    : "animate-fade-right"
                  : "reveal-hidden"
              } ${STAGGER_CLASSES[Math.min(index, STAGGER_CLASSES.length - 1)]}`}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
