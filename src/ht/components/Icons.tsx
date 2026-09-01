type IconProps = { className?: string; size?: number };

export function CheckIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VerifiedIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1.5l2.4 1.8 3 .0 .9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3 0L12 22.5l-2.4-1.8-3 0-.9-2.9L3.3 16l.9-2.9L3.3 10.2 5.7 8.4l.9-2.9 3 0L12 1.5z" opacity="0.9" />
      <path d="M8.5 12.2l2.3 2.3 4.7-4.7" stroke="#16120c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function PlayIcon({ className = "", size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function XIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M19 12l-6-6M19 12l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotebookIcon({ className = "", size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 3v18M12 8h4M12 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon({ className = "", size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 5a2 2 0 0 1 2-2h5v16H6a2 2 0 0 0-2 2V5zM20 5a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function CodeIcon({ className = "", size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrainIcon({ className = "", size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 10h14M9 16l-2 4M15 16l2 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
      <circle cx="15" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}
