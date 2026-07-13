"use client";

import { useEffect, useState } from "react";

export function useMusic() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) return;

    const syncPlaying = () => setPlaying(!audio.paused);
    syncPlaying();
    audio.addEventListener("play", syncPlaying);
    audio.addEventListener("pause", syncPlaying);
    audio.addEventListener("ended", syncPlaying);

    return () => {
      audio.removeEventListener("play", syncPlaying);
      audio.removeEventListener("pause", syncPlaying);
      audio.removeEventListener("ended", syncPlaying);
    };
  }, []);

  const toggle = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) {
      console.warn("Audio element not found");
      return;
    }

    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return { playing, toggle };
}
