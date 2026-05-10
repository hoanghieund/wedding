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
      className={`space-y-8 rounded-[1.75rem] ${
        isInView ? "animate-fade-up" : "reveal-hidden"
      }`}
    >
      <div className="space-y-2">
        <p className="section-label">Chương 10</p>
        <h2 id="faq-heading" className="chapter-title text-3xl sm:text-4xl">
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
              className={`section-shell rounded-2xl p-5 ${
                isInView ? `animate-fade-up stagger-${Math.min(index + 1, 6)}` : ""
              }`}
            >
              <button
                id={questionId}
                onClick={() => toggleFaq(index)}
                className="focus-ring-accent group flex min-h-[44px] w-full items-center justify-between gap-4 text-left transition-all"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className={`text-base transition-colors ${isOpen ? "text-[var(--accent)]" : "text-[var(--text-primary)] group-hover:text-[var(--accent-soft)]"}`}>
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)] transition-all duration-300 ${
                    isOpen ? "rotate-180 border-[var(--accent-soft)] bg-[var(--accent)] text-[var(--bg)]" : "rotate-0"
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
                  isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="copy-muted text-sm leading-7">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
