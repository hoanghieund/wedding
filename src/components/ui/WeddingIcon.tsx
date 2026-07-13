export type WeddingIconName =
  | "calendar"
  | "pin"
  | "shirt"
  | "clock"
  | "lantern"
  | "car"
  | "flower"
  | "wine"
  | "sparkles"
  | "plane"
  | "letter"
  | "map"
  | "sunrise"
  | "ring"
  | "person"
  | "groom"
  | "bride"
  | "chat"
  | "gift"
  | "check"
  | "cross"
  | "help";

type IconProps = {
  name: WeddingIconName;
  className?: string;
};

export function WeddingIcon({ name, className }: IconProps): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: WeddingIconName): ReactElement {
  switch (name) {
    case "calendar":
      return (
        <>
          <rect height="16" rx="2" width="18" x="3" y="5" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </>
      );
    case "pin":
      return (
        <>
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
    case "shirt":
      return <path d="m8 4 4 2 4-2 4 3-2 4-2-1v10H8V10l-2 1-2-4 4-3Z" />;
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </>
      );
    case "lantern":
      return (
        <>
          <path d="M8 6h8l1 3H7l1-3ZM8 9h8v10H8zM6 21h12M10 3c0-1 1-2 2-2s2 1 2 2" />
          <path d="M10 12h4M10 15h4" />
        </>
      );
    case "car":
      return (
        <>
          <path d="M5 17h14l-1-6H6l-1 6Z" />
          <path d="m7 11 1.5-4h7L17 11M4 17v2h2M20 17v2h-2" />
          <circle cx="8" cy="17" r="1" />
          <circle cx="16" cy="17" r="1" />
        </>
      );
    case "flower":
      return (
        <>
          <circle cx="12" cy="10" r="2" />
          <path d="M12 8c-3-3-6-1-5 2 0-3-3-4-4-1-1 3 3 4 7 3M12 8c3-3 6-1 5 2 0-3 3-4 4-1 1 3-3 4-7 3M12 12v8M8 20h8" />
        </>
      );
    case "wine":
      return (
        <>
          <path d="M7 4h10l-1 5a4 4 0 0 1-8 0L7 4ZM12 13v7M9 20h6" />
          <path d="M8 8h8" />
        </>
      );
    case "sparkles":
      return (
        <>
          <path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3ZM19 14l.6 2.4L22 17l-2.4.6L19 20l-.6-2.4L16 17l2.4-.6L19 14ZM5 14l.4 1.6L7 16l-1.6.4L5 18l-.4-1.6L3 16l1.6-.4L5 14Z" />
        </>
      );
    case "plane":
      return <path d="m3 12 18-7-5 7 5 7-18-7Zm0 0h13M11 10l-2-5M11 14l-2 5" />;
    case "letter":
      return (
        <>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="m4 7 8 6 8-6" />
        </>
      );
    case "map":
      return (
        <>
          <path d="m4 5 6-2 4 2 6-2v16l-6 2-4-2-6 2V5Z" />
          <path d="M10 3v16M14 5v16" />
        </>
      );
    case "sunrise":
      return (
        <>
          <path d="M3 18h18M5 14a7 7 0 0 1 14 0M12 3v4M5.6 6.6l2.1 2.1M18.4 6.6l-2.1 2.1" />
        </>
      );
    case "ring":
      return (
        <>
          <circle cx="12" cy="14" r="6" />
          <path d="m9.5 8 2.5-3 2.5 3M12 5v-2" />
        </>
      );
    case "person":
      return (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </>
      );
    case "groom":
      return (
        <>
          <circle cx="12" cy="6" r="2.5" />
          <path d="m8 21 1.5-9h5L16 21M9.5 12l2.5 2 2.5-2M9 4l3-2 3 2" />
        </>
      );
    case "bride":
      return (
        <>
          <circle cx="12" cy="6" r="2.5" />
          <path d="M8 21c1-4 2-6 4-8 2 2 3 4 4 8M9 4l3-2 3 2M8 21h8" />
        </>
      );
    case "chat":
      return (
        <>
          <path d="M4 5h16v11H8l-4 4V5Z" />
          <path d="M8 9h8M8 12h5" />
        </>
      );
    case "gift":
      return (
        <>
          <path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13" />
          <path d="M12 7H8.5a2.5 2.5 0 1 1 2.5-2.5V7ZM12 7h3.5A2.5 2.5 0 1 0 13 4.5V7Z" />
        </>
      );
    case "check":
      return <path d="m5 12 4 4L19 6" />;
    case "cross":
      return <path d="m6 6 12 12M18 6 6 18" />;
    case "help":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.8c-.9.8-1.8 1.2-1.8 2.7M12 17h.01" />
        </>
      );
  }
}
import type { ReactElement } from "react";

