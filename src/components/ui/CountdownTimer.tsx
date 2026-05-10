"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-12-25T00:00:00").getTime();

type TimeLeft = {
  days: string;
  hours: string;
  mins: string;
  secs: string;
};

function calculateTimeLeft(): TimeLeft {
  const difference = Math.max(TARGET_DATE - Date.now(), 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((difference / (1000 * 60)) % 60);
  const secs = Math.floor((difference / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    mins: String(mins).padStart(2, "0"),
    secs: String(secs).padStart(2, "0"),
  };
}

const countdownItems = [
  { key: "days", label: "NGÀY" },
  { key: "hours", label: "GIỜ" },
  { key: "mins", label: "PHÚT" },
  { key: "secs", label: "GIÂY" },
] as const;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5 md:gap-8">
      {countdownItems.map((item, index) => (
        <div
          key={item.key}
          className={`section-shell rounded-xl px-3 py-5 text-center sm:px-5 sm:py-7 reveal-hidden animate-fade-up`}
          style={{ animationDelay: `${(index + 5) * 100}ms` }}
        >
          <div className="text-5xl leading-none font-display-serif font-semibold text-[var(--accent)] sm:text-6xl">
            {timeLeft[item.key]}
          </div>
          <div className="mt-3 font-mono text-[0.65rem] tracking-[0.3em] text-[var(--accent-soft)] sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
