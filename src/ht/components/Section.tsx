import type { CSSProperties, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** רוחב פנימי מלא (ללא ה־max-width הסטנדרטי) */
  full?: boolean;
  style?: CSSProperties;
};

/** קומפוננטת סקשן בסיסית עם ריווח אנכי אחיד ורוחב תוכן ממורכז */
export default function Section({
  children,
  id,
  className = "",
  full = false,
  style,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`ht-section-glow relative w-full ${className}`}
      style={{
        paddingTop: "var(--ht-section-y)",
        paddingBottom: "var(--ht-section-y)",
        paddingInline: "var(--ht-px)",
        ...style,
      }}
    >
      <div
        className="relative z-10 mx-auto w-full"
        style={{ maxWidth: full ? "100%" : "var(--ht-maxw)" }}
      >
        {children}
      </div>
    </section>
  );
}
