import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "./Icons";
import { useFocusTrap } from "../hooks/useFocusTrap";

type ImageLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

/** תצוגת תמונה מלאה — לגלילה ולראות את כל ההמשך */
export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useFocusTrap(true, onClose, closeRef);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div
      ref={dialogRef as React.RefObject<HTMLDivElement>}
      className="ht-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="ht-lightbox__close"
        onClick={onClose}
        aria-label="סגירה"
      >
        <XIcon />
      </button>
      <div className="ht-lightbox__scroll">
        <img src={src} alt={alt} className="ht-lightbox__img" />
      </div>
    </div>,
    document.body
  );
}
