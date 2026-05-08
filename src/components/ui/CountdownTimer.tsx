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
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "mins", label: "MINS" },
  { key: "secs", label: "SECS" },
] as const;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-5 md:gap-8">
        {countdownItems.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-[#00e5ff]/25 bg-black/35 px-3 py-4 text-center shadow-[0_0_25px_rgba(0,229,255,0.18)] backdrop-blur-md sm:px-5 sm:py-6"
          >
            <div className="text-[3rem] leading-none font-bold text-white drop-shadow-[0_0_14px_rgba(0,229,255,0.8)]">
              00
            </div>
            <div className="mt-3 font-mono text-[0.65rem] tracking-[0.35em] text-[#00e5ff] sm:text-xs">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5 md:gap-8">
      {countdownItems.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-[#00e5ff]/25 bg-black/35 px-3 py-4 text-center shadow-[0_0_25px_rgba(0,229,255,0.18)] backdrop-blur-md sm:px-5 sm:py-6"
        >
          <div className="text-[3rem] leading-none font-bold text-white drop-shadow-[0_0_14px_rgba(0,229,255,0.8)]">
            {timeLeft[item.key]}
          </div>
          <div className="mt-3 font-mono text-[0.65rem] tracking-[0.35em] text-[#00e5ff] sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
