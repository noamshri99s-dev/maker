import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** לכידת פוקוס במודאל + החזרה לאלמנט שפתח + Esc */
export function useFocusTrap(
  active: boolean,
  onEscape?: () => void,
  initialFocusRef?: React.RefObject<HTMLElement | null>
) {
  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const root = containerRef.current;
    const focusInitial = () => {
      const target =
        initialFocusRef?.current ??
        root?.querySelector<HTMLElement>(FOCUSABLE) ??
        root;
      target?.focus?.();
    };
    // אחרי paint
    const t = window.setTimeout(focusInitial, 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const nodes = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (current === first || !root.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else if (current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus?.();
    };
  }, [active, onEscape, initialFocusRef]);

  return containerRef;
}
