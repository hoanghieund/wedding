"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/constants/event-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
          Giải đáp thông tin
        </p>
        <h2 id="faq-heading" className="font-serif text-2xl font-semibold tracking-tight text-rose-950 sm:text-3xl">
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
              className="overflow-hidden border-b border-rose-200/30 pb-4 last:border-b-0"
            >
              <button
                id={questionId}
                onClick={() => toggleFaq(index)}
                className="flex min-h-[44px] w-full items-center justify-between gap-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="pr-4 text-base font-medium text-rose-950">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-rose-600 transition-transform ${
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
                className="pt-3 text-sm leading-7 text-rose-800/60"
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
