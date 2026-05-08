"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { FAQ_DATA } from "@/lib/constants/event-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!FAQ_DATA || FAQ_DATA.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      ref={ref}
      className={`space-y-6 rounded-2xl border border-cyan-400/10 bg-[#0A0A0D]/70 p-8 backdrop-blur-xl transition-all duration-500 ${
        isInView ? "animate-fade-up" : "reveal-hidden"
      }`}
    >
      <div className="space-y-2">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-cyan-400/60">
          Giải đáp thông tin
        </p>
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Câu hỏi thường gặp
        </h2>
      </div>

      <div className="divide-y divide-cyan-400/10">
        {FAQ_DATA.map((faq, index) => {
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`py-4 first:pt-0 last:pb-0 ${
                isInView ? `animate-fade-up stagger-${Math.min(index + 1, 6)}` : ""
              }`}
            >
              <button
                id={questionId}
                onClick={() => toggleFaq(index)}
                className="group flex min-h-[44px] w-full items-center justify-between gap-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0D]"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className={`text-base font-medium transition-colors ${isOpen ? "text-cyan-400" : "text-white group-hover:text-cyan-400/80"}`}>
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/10 bg-white/5 text-cyan-400 transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-cyan-400 text-black border-cyan-400" : "rotate-0"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-white/60">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
