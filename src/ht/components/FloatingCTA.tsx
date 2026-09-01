type FloatingCTAProps = {
  onOpenPanel: () => void;
  hidden?: boolean;
};

/** פס CTA דביק בתחתית — מוסתר כשה-CTA של ההירו נראה */
export default function FloatingCTA({ onOpenPanel, hidden = false }: FloatingCTAProps) {
  return (
    <div
      className={`ht-sticky-cta ${hidden ? "ht-sticky-cta--hidden" : ""}`}
      role="region"
      aria-label="קריאה לפעולה"
    >
      <button type="button" className="ht-sticky-cta__btn" onClick={onOpenPanel}>
        <span className="ht-sticky-cta__title">רוצה קמפיין כזה למוצר שלי</span>
        <span className="ht-sticky-cta__meta">
          <span className="ht-sticky-cta__stars" aria-hidden>
            ★★★★★
          </span>
          <span>4.9 · 240+ יוצרים ברשת</span>
        </span>
      </button>
    </div>
  );
}
