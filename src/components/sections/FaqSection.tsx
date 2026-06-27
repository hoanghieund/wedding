"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { EVENT_DATA, FAQ_DATA } from "@/lib/constants/event-data";

const FAQ_ICONS: Record<string, string> = {
  "trang phục": "👔",
  "xác nhận": "📅",
  "tham dự": "📅",
};

function getFaqIcon(question: string): string {
  const lower = question.toLowerCase();
  for (const [key, icon] of Object.entries(FAQ_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "💡";
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default
  const { ref, isInView } = useInView(0.1);

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
      className="space-y-10 relative py-4"
    >
      {/* Decorative background script */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none select-none text-[8rem] sm:text-[12rem] font-script text-[var(--accent)]/5 whitespace-nowrap z-0">
        Hỏi Đáp
      </div>

      {/* Section heading */}
      <div className="space-y-4 text-center relative z-10">
        <h2
          id="faq-heading"
          className={`chapter-title text-4xl sm:text-5xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {EVENT_DATA.copy.sections.faqTitle}
        </h2>
        <div
          className={`mx-auto h-px w-24 section-divider transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* FAQ accordion list */}
      <div className="space-y-4 relative z-10 mx-auto max-w-3xl">
        {FAQ_DATA.map((faq, index) => {
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] transition-all duration-500 ${
                isOpen
                  ? "border-[var(--accent-soft)]/30 shadow-[var(--glow-soft)]"
                  : "hover:border-[var(--border-soft)]/80"
              } ${
                isInView
                  ? `translate-y-0 opacity-100`
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionProperty: "transform, opacity, border-color, box-shadow",
              }}
            >
              {/* Top accent bar when open */}
              {isOpen && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-soft)]/60 to-transparent" />
              )}

              <button
                id={questionId}
                onClick={() => toggleFaq(index)}
                className="focus-ring-accent group flex min-h-[60px] w-full items-center gap-4 px-6 py-4 text-left transition-all"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                {/* Emoji icon */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-lg border border-[var(--border-soft)]" aria-hidden="true">
                  {getFaqIcon(faq.question)}
                </span>

                {/* Question text */}
                <span
                  className={`flex-1 text-base font-display-serif transition-colors duration-300 ${
                    isOpen
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-primary)] group-hover:text-[var(--accent-soft)]"
                  }`}
                >
                  {faq.question}
                </span>

                {/* Chevron toggle */}
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 border-[var(--accent-soft)] bg-[var(--accent)] text-[var(--bg)]"
                      : "rotate-0 border-[var(--border-soft)] bg-[var(--surface)] text-[var(--accent)]"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {/* Expandable answer */}
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-px w-12 bg-[var(--accent-soft)]/30 mb-4" />
                    <p className="copy-muted text-sm leading-7">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
