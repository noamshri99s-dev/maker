import type { CSSProperties } from "react";

type ImagePlaceholderProps = {
  label?: string;
  ratio?: string;
  className?: string;
  style?: CSSProperties;
};

/** מסגרת placeholder לתמונה שתוכנס בהמשך */
export default function ImagePlaceholder({
  label = "מקום לתמונה",
  ratio = "16 / 9",
  className = "",
  style,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{
        aspectRatio: ratio,
        background:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 12px, rgba(255,255,255,0.05) 12px 24px)",
        border: "1px dashed var(--ht-border-strong)",
        color: "var(--ht-text-mute)",
        fontWeight: 700,
        fontSize: "0.875rem",
        ...style,
      }}
    >
      {label}
    </div>
  );
}
