"use client";

import { useEffect, useState } from "react";
import { EVENT_DATA } from "@/lib/constants/event-data";

const TARGET_DATE = new Date(EVENT_DATA.event.startTime).getTime();

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
    <div
      role="timer"
      tabIndex={0}
      aria-label={`Còn ${timeLeft.days} ngày, ${timeLeft.hours} giờ, ${timeLeft.mins} phút và ${timeLeft.secs} giây`}
      className="grid w-full grid-cols-4 divide-x divide-[var(--border-soft)] focus-ring-accent"
    >
      {countdownItems.map((item) => (
        <div
          key={item.key}
          aria-hidden="true"
          className="px-1.5 py-2 text-center sm:px-4"
        >
          <div
            suppressHydrationWarning
            className="font-display-serif text-4xl leading-none tabular-nums text-[var(--accent)] sm:text-5xl"
          >
            {String(timeLeft[item.key]).padStart(2, "0")}
          </div>
          <div className="mt-2 font-mono text-[0.6rem] tracking-[0.18em] text-[var(--accent-soft)] sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
