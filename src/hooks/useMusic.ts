"use client";

import { useEffect, useState } from "react";

export function useMusic() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const checkAndPlay = () => {
      const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (!audio) {
        setTimeout(checkAndPlay, 100);
        return;
      }

      const playAudio = async () => {
        try {
          await audio.play();
          setPlaying(true);
        } catch (error) {
          console.log("Autoplay blocked:", error);
        }
      };

      void playAudio();
    };

    checkAndPlay();
  }, []);

  const toggle = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) {
      console.warn("Audio element not found");
      return;
    }

    if (audio.paused) {
      void audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return { playing, toggle };
}
