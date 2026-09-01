import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import AccessibilityStatementContent from "./AccessibilityStatementContent";
import { useFocusTrap } from "../hooks/useFocusTrap";

type AccessibilityModalProps = {
  open: boolean;
  onClose: () => void;
};

/** מודאל הסדרי נגישות — לבן על רקע כהה, בתוך אתר HT */
export default function AccessibilityModal({ open, onClose }: AccessibilityModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useFocusTrap(open, onClose, closeRef);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("ht-privacy-modal-open");
    return () => {
      document.documentElement.classList.remove("ht-privacy-modal-open");
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="ht-privacy-modal" role="presentation">
      <button
        type="button"
        className="ht-privacy-modal__backdrop"
        aria-label="סגור הסדרי נגישות"
        onClick={onClose}
      />
      <div
        ref={panelRef as React.RefObject<HTMLDivElement>}
        className="ht-privacy-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ht-a11y-statement-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="ht-privacy-modal__close"
          onClick={onClose}
          aria-label="סגירה"
        >
          ×
        </button>
        <div className="ht-privacy-modal__scroll">
          <AccessibilityStatementContent />
        </div>
      </div>
    </div>,
    document.body
  );
}
