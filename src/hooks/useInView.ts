"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      if (!("IntersectionObserver" in window)) {
        setIsInView(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setIsInView(entry.isIntersecting),
        { threshold, rootMargin: "0px 0px -50px 0px" }
      );
      observer.observe(element);
    };

    const updateMotionPreference = () => {
      observer?.disconnect();
      observer = null;

      if (mediaQuery?.matches) {
        setIsInView(true);
        return;
      }

      setIsInView(false);
      observe();
    };

    updateMotionPreference();

    if (!mediaQuery) {
      return () => observer?.disconnect();
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference);
    } else {
      (mediaQuery as MediaQueryList & {
        addListener: (listener: (event: MediaQueryListEvent) => void) => void;
      }).addListener(updateMotionPreference);
    }

    return () => {
      observer?.disconnect();
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      } else {
        (mediaQuery as MediaQueryList & {
          removeListener: (listener: (event: MediaQueryListEvent) => void) => void;
        }).removeListener(updateMotionPreference);
      }
    };
  }, [threshold]);

  return { ref, isInView };
}
