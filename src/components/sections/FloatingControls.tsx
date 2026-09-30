"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "@/hooks/useMusic";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { WeddingIcon } from "@/components/ui/WeddingIcon";

const controlClassName =
  "focus-ring-accent flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-strong)] text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[var(--bg)] shadow-[var(--glow-soft)]";

export default function FloatingControls() {
  const { playing, toggle } = useMusic();
  const [isLogisticsVisible, setIsLogisticsVisible] = useState(false);
  const [isRsvpVisible, setIsRsvpVisible] = useState(false);
  const [hasFocusedControl, setHasFocusedControl] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const quickLinksTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const rsvpSection = document.getElementById("rsvp");
    if (!rsvpSection) return;

    const scheduleSection = document.getElementById("schedule");
    const venueSection = document.getElementById("venue");
    const visibleLogisticsSections = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === rsvpSection) {
          setIsRsvpVisible(entry.isIntersecting);
        }
        if (entry.target === scheduleSection || entry.target === venueSection) {
          if (entry.isIntersecting) visibleLogisticsSections.add(entry.target);
          else visibleLogisticsSections.delete(entry.target);
        }
      }
      setIsLogisticsVisible(visibleLogisticsSections.size > 0);
    });

    observer.observe(rsvpSection);
    if (scheduleSection) observer.observe(scheduleSection);
    if (venueSection) observer.observe(venueSection);
    return () => observer.disconnect();
  }, []);

  const hideControls = isRsvpVisible && !hasFocusedControl;

  return (
    <div
      onFocusCapture={() => setHasFocusedControl(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocusedControl(false);
        }
      }}
      className={`fixed ${
        isLogisticsVisible
          ? "top-[calc(1.5rem+env(safe-area-inset-top,0px))] bottom-auto"
          : "bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
      } left-[max(1rem,env(safe-area-inset-left,0px))] right-[calc(1.5rem+env(safe-area-inset-right,0px))] z-50 flex flex-wrap justify-end gap-3 transition-opacity lg:top-auto lg:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] lg:left-auto lg:flex-col ${
        hideControls
          ? "invisible pointer-events-none opacity-0 lg:visible lg:pointer-events-auto lg:opacity-100"
          : ""
      }`}
    >
      <button
        onClick={toggle}
        className={controlClassName}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        {playing ? (
          <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 5.25v13.5M17.25 5.25v13.5" />
          </svg>
        ) : (
          <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        )}
      </button>
      <a
        href="#rsvp"
        onClick={() => {
          window.requestAnimationFrame(() => {
            document.getElementById("rsvp-guest-name")?.focus();
          });
        }}
        className={controlClassName}
        aria-label="Xác nhận tham dự"
        title="Xác nhận tham dự"
      >
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </a>
      <a href="#gift" className={controlClassName} aria-label={EVENT_DATA.copy.sections.giftTitle} title={EVENT_DATA.copy.sections.giftTitle}>
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12m0-2.625A2.625 2.625 0 119.375 7.5H12m0-2.625A2.625 2.625 0 119.375 7.5H12m3.75 0h6.375a1.5 1.5 0 010 3H22.5m-16.125 0H4.125a1.5 1.5 0 010-3h1.5m6.375 0v9m0-9H12m-2.625 0h5.25" />
        </svg>
      </a>
      <div
        className="relative"
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsQuickLinksOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setIsQuickLinksOpen(false);
            quickLinksTriggerRef.current?.focus();
          }
        }}
      >
        <button
          ref={quickLinksTriggerRef}
          type="button"
          className={controlClassName}
          aria-label="Mở lối tắt lịch trình và chỉ đường"
          aria-expanded={isQuickLinksOpen}
          aria-controls="floating-quick-links"
          title="Lịch trình và chỉ đường"
          onClick={() => setIsQuickLinksOpen((open) => !open)}
        >
          <WeddingIcon name="map" className="h-5 w-5" />
        </button>
        <nav
          id="floating-quick-links"
          aria-label="Lối tắt thông tin"
          className={`absolute right-0 min-w-52 flex-col gap-1 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-strong)] p-2 shadow-[var(--glow-soft)] backdrop-blur-md ${
            isLogisticsVisible
              ? "top-full mt-3 lg:bottom-full lg:top-auto lg:mb-3 lg:mt-0"
              : "bottom-full mb-3"
          } ${isQuickLinksOpen ? "flex" : "hidden"}`}
        >
          <a
            href="#schedule"
            className="focus-ring-accent flex min-h-11 items-center rounded-lg px-3 text-sm text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            onClick={() => setIsQuickLinksOpen(false)}
          >
            Lịch trình
          </a>
          <a
            href="#venue"
            className="focus-ring-accent flex min-h-11 items-center rounded-lg px-3 text-sm text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            onClick={() => setIsQuickLinksOpen(false)}
          >
            Địa điểm &amp; chỉ đường
          </a>
        </nav>
      </div>
      <audio id="bg-music" loop preload="none">
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
