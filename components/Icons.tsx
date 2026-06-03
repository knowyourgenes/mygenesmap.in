import type { ReactNode } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Gene-map "constellation" mark — a small network of connected nodes.
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.7">
        <line x1="10" y1="12" x2="17" y2="8" />
        <line x1="17" y1="8" x2="23" y2="14" />
        <line x1="10" y1="12" x2="13" y2="22" />
        <line x1="23" y1="14" x2="21" y2="22" />
        <line x1="13" y1="22" x2="21" y2="22" />
      </g>
      <g fill="#fff">
        <circle cx="10" cy="12" r="2.5" />
        <circle cx="17" cy="8" r="2.5" />
        <circle cx="23" cy="14" r="2.5" />
        <circle cx="13" cy="22" r="2.5" />
        <circle cx="21" cy="22" r="2.5" />
      </g>
    </svg>
  );
}

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

export const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const UpArrow = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M12 5l7 8h-4v6H9v-6H5l7-8z" />
  </svg>
);

export const DownArrow = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M12 19l7-8h-4V5H9v6H5l7 8z" />
  </svg>
);

export const CommentIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M21 12a8 8 0 01-11.5 7.2L4 20.5l1.3-5.2A8 8 0 1121 12z" />
  </svg>
);

export const ShareIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
  </svg>
);

export const HomeIcon = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" />
  </svg>
);

export const SparkIcon = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M5 13l3-2 2-4 2 6 3 1-3 2-2 4-2-6-3-1z" />
  </svg>
);

export const AskIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M12 20h9M4 20l1-4 11-11 3 3-11 11-4 1z" />
  </svg>
);

export const VerifiedBadge = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 1l2.6 1.9 3.2-.1 1 3 2.6 1.8-1 3 1 3-2.6 1.8-1 3-3.2-.1L12 23l-2.6-1.9-3.2.1-1-3L2.6 16.4l1-3-1-3 2.6-1.8 1-3 3.2.1L12 1z" />
    <path
      d="M8.5 12l2.3 2.3L15.5 9.5"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SPACE_ICONS: Record<string, ReactNode> = {
  family: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <circle cx="7.5" cy="8" r="2.5" />
      <circle cx="16.5" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5M12.5 19c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5" />
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <path d="M3 12h4l2-5 3 9 2-6 1.5 2H21" />
    </svg>
  ),
  testing: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <path d="M9 3h6M10 3v7l-4 7.5A2 2 0 007.8 21h8.4a2 2 0 001.8-3.5L14 10V3" />
      <line x1="8.5" y1="15" x2="15.5" y2="15" />
    </svg>
  ),
  ancestry: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c-2.5 2.4-3.8 5.3-3.8 9s1.3 6.6 3.8 9c2.5-2.4 3.8-5.3 3.8-9S14.5 5.4 12 3z" />
    </svg>
  ),
  traits: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <path d="M12 3v3M12 18v3M5 12H3M21 12h-2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  ethics: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
  results: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 12l2.5 2.5L16 9M8 7h8" />
    </svg>
  ),
  popculture: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base}>
      <path d="M12 3l2.2 5.2 5.8.5-4.4 3.8 1.4 5.7L12 15.9 7 18.2l1.4-5.7L4 8.7l5.8-.5L12 3z" />
    </svg>
  ),
};

export function SpaceIcon({ iconKey }: { iconKey?: string }) {
  return <>{SPACE_ICONS[iconKey ?? ""] ?? SPACE_ICONS.results}</>;
}

export function initials(name?: string): string {
  if (!name) return "?";
  const parts = name
    .replace(/^Dr\.?\s+/i, "")
    .trim()
    .split(/\s+/);
  return (
    parts
      .slice(0, 2)
      .map((p) => p[0] ?? "")
      .join("")
      .toUpperCase() || "?"
  );
}
