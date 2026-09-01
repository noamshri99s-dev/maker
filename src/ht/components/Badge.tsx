import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** תגית קטנה — badge כחול */
export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`ht-badge ${className}`}>
      <span className="ht-badge__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
