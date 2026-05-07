"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { FAQ_DATA } from "@/lib/constants/event-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      ref={ref}
      className={`space-y-6 rounded-2xl border border-[#00e5ff]/10 bg-[#0A0A0D]/70 p-8 backdrop-blur-xl reveal-hidden ${isInView ? "animate-fade-up" : ""}`}
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#00e5ff]/60">
          Giải đáp thông tin
        </p>
        <h2 id="faq-heading" className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Câu hỏi thường gặp
        </h2>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => {
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`overflow-hidden border-b border-[#00e5ff]/10 pb-4 last:border-b-0 reveal-hidden ${
                isInView ? `animate-fade-up stagger-${Math.min(index + 1, 6)}` : ""
              }`}
            >
              <button
                id={questionId}
                onClick={() => toggleFaq(index)}
                className="flex min-h-[44px] w-full items-center justify-between gap-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0D]"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="pr-4 text-base font-medium text-white">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#00e5ff] transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                className="pt-3 text-sm leading-6 text-white/70"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
