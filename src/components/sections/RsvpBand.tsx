"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { CALENDAR_EVENT } from "@/lib/constants/event-data";
import { buildGoogleCalendarUrl } from "@/lib/formatters/calendar";

export function RsvpBand() {
  const [submitted, setSubmitted] = useState(false);
  const { ref, isInView } = useInView();
  const calendarUrl = buildGoogleCalendarUrl(CALENDAR_EVENT);

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      ref={ref}
      className={`border-t border-[var(--border-soft)] py-20 sm:py-24 lg:py-28 reveal-hidden ${isInView ? "animate-fade-up" : ""}`}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="section-label">Chương Kết</p>
          <h2
            id="rsvp-heading"
            className="font-script text-5xl text-[var(--accent)] sm:text-6xl"
          >
            Xác Nhận Tham Dự
          </h2>
          <p className="copy-muted text-lg leading-8">Gia đình rất hân hạnh được đón tiếp quý vị trong ngày trọng đại này.</p>
        </div>

        <div className="section-shell mt-10 rounded-[2rem] p-8 shadow-[var(--glow-soft)] sm:p-10">
          {submitted ? (
            <div className="text-center">
              <p className="section-label">XÁC NHẬN ĐÃ GỬI</p>
              <p className="mt-4 text-lg leading-7 text-[var(--text-primary)]">Gia đình xin cảm ơn quý vị đã xác nhận tham dự.</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="block">
                <span className="section-label text-[10px]">Tên khách mời</span>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="focus-ring-accent mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]"
                />
              </label>

              <label className="block">
                <span className="section-label text-[10px]">Số lượng khách tham dự</span>
                <select className="focus-ring-accent mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition">
                  <option className="bg-[#0a0e27]">1 người</option>
                  <option className="bg-[#0a0e27]">2 người</option>
                  <option className="bg-[#0a0e27]">Gia đình (3 người trở lên)</option>
                </select>
              </label>

              <label className="block">
                <span className="section-label text-[10px]">Lời chúc gửi đến Hoàng Hiếu & Kim Liên</span>
                <textarea
                  placeholder="Kính chúc hai bạn trăm năm hạnh phúc..."
                  className="focus-ring-accent mt-2 min-h-28 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]"
                />
              </label>

              <button
                type="submit"
                className={`w-full rounded-full border border-[var(--accent-soft)] bg-gradient-to-r from-[var(--accent-soft)] to-[var(--accent)] px-8 py-4 font-body-serif text-lg tracking-[0.15em] text-[var(--bg)] shadow-[0_18px_50px_rgba(212,165,116,0.28)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(244,228,193,0.26)] reveal-hidden ${
                  isInView ? "animate-zoom-in stagger-1" : ""
                }`}
              >
                Xác Nhận Tham Dự
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)] underline decoration-[var(--accent-soft)]/30 underline-offset-4 transition hover:text-[var(--accent)] hover:decoration-[var(--accent-soft)]"
            >
              Thêm vào lịch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
