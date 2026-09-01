import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** גרסה רחבה (CTA ראשי) */
  wide?: boolean;
  /** הצגת חץ שמאלה */
  arrow?: boolean;
};

/** כפתור ראשי — כתום, פינות מעוגלות, חץ שמאלה */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, wide = false, arrow = true, className = "", type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`ht-btn ${wide ? "ht-btn--wide" : ""} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && (
        <svg
          className="ht-btn__arrow"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 12H5M5 12l6-6M5 12l6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
});

export default Button;
