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
      className={`border-t border-[#00e5ff]/10 bg-transparent py-16 sm:py-20 lg:py-24 reveal-hidden ${isInView ? "animate-fade-up" : ""}`}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2
          id="rsvp-heading"
          className="text-center text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          Xác Nhận Tham Dự
        </h2>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[rgba(20,20,30,0.38)] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {submitted ? (
            <div className="text-center">
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-[#00e5ff]">XÁC NHẬN ĐÃ GỬI</p>
              <p className="mt-4 text-lg leading-6 text-white/80">Gia đình xin cảm ơn quý vị đã xác nhận tham dự.</p>
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
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a0a0b0]">Tên khách mời</span>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#00e5ff]"
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a0a0b0]">Số lượng khách tham dự</span>
                <select className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#00e5ff]">
                  <option className="bg-[#030305]">1 người</option>
                  <option className="bg-[#030305]">2 người</option>
                  <option className="bg-[#030305]">Gia đình (3 người trở lên)</option>
                </select>
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a0a0b0]">Lời chúc gửi đến Hoàng Hiếu & Kim Liên</span>
                <textarea
                  placeholder="Kính chúc hai bạn trăm năm hạnh phúc..."
                  className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#00e5ff]"
                />
              </label>

              <button
                type="submit"
                className={`w-full rounded-full bg-gradient-to-r from-[#00e5ff] to-[#007bff] px-8 py-4 font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_25px_rgba(0,229,255,0.35)] transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,229,255,0.45)] reveal-hidden ${
                  isInView ? "animate-zoom-in animate-glow-pulse stagger-1" : ""
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
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#00e5ff] underline decoration-[#00e5ff]/30 underline-offset-4 transition hover:decoration-[#00e5ff]"
            >
              Thêm vào lịch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
