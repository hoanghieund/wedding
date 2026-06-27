"use client";

import { useEffect, useState } from "react";
import { WEDDING_DATE_ISO } from "@/lib/constants/event-data";

const TARGET_DATE = new Date(WEDDING_DATE_ISO).getTime();

type TimeLeft = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

function calculateTimeLeft(): TimeLeft {
  const difference = Math.max(TARGET_DATE - Date.now(), 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((difference / (1000 * 60)) % 60);
  const secs = Math.floor((difference / 1000) % 60);
  return {
    days,
    hours,
    mins,
    secs,
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
            {String(timeLeft[item.key]).padStart(2, "0")}
          </div>
          <div className="mt-3 font-mono text-[0.65rem] tracking-[0.3em] text-[var(--accent-soft)] sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
