import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** עיכוב בשניות — נשמר לתאימות, ללא אנימציה */
  delay?: number;
  /** תגית HTML לעטיפה */
  as?: "div" | "li" | "section" | "span";
};

/** עטיפה סטטית — בלי scroll reveal */
export default function Reveal({
  children,
  className = "",
  as = "div",
}: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
