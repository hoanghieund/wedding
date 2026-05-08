"use client";

import { useMusic } from "@/hooks/useMusic";

export default function FloatingControls() {
  const { playing, toggle } = useMusic();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={toggle}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00e5ff]/20 bg-[#0A0A0D] text-[#00e5ff] backdrop-blur-md transition hover:bg-[#00e5ff] hover:text-[#0A0A0D]"
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        {playing ? "⏸" : "♫"}
      </button>
      <a href="#rsvp" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00e5ff]/20 bg-[#0A0A0D] text-[#00e5ff] backdrop-blur-md transition hover:bg-[#00e5ff] hover:text-[#0A0A0D]" title="Xác nhận tham dự">
        ✎
      </a>
      <a href="#gift" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00e5ff]/20 bg-[#0A0A0D] text-[#00e5ff] backdrop-blur-md transition hover:bg-[#00e5ff] hover:text-[#0A0A0D]" title="Mừng cưới">
        🎁
      </a>
      <audio id="bg-music" loop preload="auto">
        {/* TODO: Add your wedding music file to public/audio/ folder
            Example: <source src="/audio/wedding-song.mp3" type="audio/mpeg" />
            For now, using a placeholder to prevent 403 errors */}
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
