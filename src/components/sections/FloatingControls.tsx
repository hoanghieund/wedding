"use client";

import { useMusic } from "@/hooks/useMusic";

const controlClassName =
  "flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-strong)] text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)] shadow-[var(--glow-soft)]";

export default function FloatingControls() {
  const { playing, toggle } = useMusic();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={toggle}
        className={controlClassName}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        {playing ? "⏸" : "♫"}
      </button>
      <a href="#rsvp" className={controlClassName} title="Xác nhận tham dự">
        ✎
      </a>
      <a href="#gift" className={controlClassName} title="Mừng cưới">
        🎁
      </a>
      <audio id="bg-music" loop preload="auto">
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
