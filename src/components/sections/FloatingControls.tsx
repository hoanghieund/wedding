"use client";

import { useMusic } from "@/hooks/useMusic";
import { EVENT_DATA } from "@/lib/constants/event-data";

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
        {playing ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 5.25v13.5M17.25 5.25v13.5" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        )}
      </button>
      <a href="#rsvp" className={controlClassName} title="Xác nhận tham dự">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </a>
      <a href="#gift" className={controlClassName} title={EVENT_DATA.copy.sections.giftTitle}>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12m0-2.625A2.625 2.625 0 119.375 7.5H12m0-2.625A2.625 2.625 0 119.375 7.5H12m3.75 0h6.375a1.5 1.5 0 010 3H22.5m-16.125 0H4.125a1.5 1.5 0 010-3h1.5m6.375 0v9m0-9H12m-2.625 0h5.25" />
        </svg>
      </a>
      <audio id="bg-music" loop preload="auto">
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
