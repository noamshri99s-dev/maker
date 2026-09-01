import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import { useFocusTrap } from "../hooks/useFocusTrap";

type PrivacyModalProps = {
  open: boolean;
  onClose: () => void;
};

/** מודאל מדיניות פרטיות — לבן על רקע כהה, רק באתר HT */
export default function PrivacyModal({ open, onClose }: PrivacyModalProps) {
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
        aria-label="סגור מדיניות פרטיות"
        onClick={onClose}
      />
      <div
        ref={panelRef as React.RefObject<HTMLDivElement>}
        className="ht-privacy-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ht-privacy-title"
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
          <PrivacyPolicyContent />
        </div>
      </div>
    </div>,
    document.body
  );
}
