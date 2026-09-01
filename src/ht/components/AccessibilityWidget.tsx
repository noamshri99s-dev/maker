import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  applyA11yPrefs,
  DEFAULT_A11Y_PREFS,
  loadA11yPrefs,
  saveA11yPrefs,
  type A11yPrefs,
} from "../a11y/prefs";
import { useFocusTrap } from "../hooks/useFocusTrap";

type ToggleKey = Exclude<keyof A11yPrefs, "textScale">;

const TOGGLES: { key: ToggleKey; label: string }[] = [
  { key: "readableFont", label: "גופן קריא" },
  { key: "letterSpacing", label: "ריווח מוגדל בין אותיות ומילים" },
  { key: "highContrast", label: "ניגודיות גבוהה" },
  { key: "darkMode", label: "מצב כהה" },
  { key: "lightMode", label: "מצב בהיר" },
  { key: "invert", label: "היפוך צבעים" },
  { key: "grayscale", label: "גווני אפור" },
  { key: "underlineLinks", label: "הדגשת קישורים" },
  { key: "highlightHeadings", label: "הדגשת כותרות" },
  { key: "bigCursor", label: "סמן עכבר מוגדל" },
  { key: "readingGuide", label: "סרגל קריאה" },
  { key: "readingMask", label: "מיסוך קריאה" },
  { key: "stopAnimations", label: "עצירת אנימציות והבהובים" },
];

function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <circle cx="12" cy="4.5" r="2.2" fill="currentColor" />
      <path
        fill="currentColor"
        d="M4 9.2h16v2.1H14.6l.7 9.2h-2.2l-.45-5.4h-1.3l-.45 5.4H8.7l.7-9.2H4V9.2z"
      />
    </svg>
  );
}

type AccessibilityWidgetProps = {
  onOpenStatement?: () => void;
};

/** תפריט נגישות צף — HT בלבד, ללא ספריות חיצוניות */
export default function AccessibilityWidget({
  onOpenStatement,
}: AccessibilityWidgetProps) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(() =>
    typeof window !== "undefined" ? loadA11yPrefs() : DEFAULT_A11Y_PREFS
  );
  const [guideY, setGuideY] = useState(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);
  const panelRef = useFocusTrap(open, close, closeRef);

  useEffect(() => {
    applyA11yPrefs(prefs);
    saveA11yPrefs(prefs);
  }, [prefs]);

  useEffect(() => {
    if (!prefs.readingGuide && !prefs.readingMask) return;
    const onMove = (e: MouseEvent) => setGuideY(e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefs.readingGuide, prefs.readingMask]);

  const update = (patch: Partial<A11yPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      // מצב כהה/בהיר — בלעדיים זה לזה
      if (patch.darkMode) next.lightMode = false;
      if (patch.lightMode) next.darkMode = false;
      return next;
    });
  };

  const toggle = (key: ToggleKey) => update({ [key]: !prefs[key] });

  const bumpText = (dir: 1 | -1) => {
    const steps: A11yPrefs["textScale"][] = [100, 110, 125, 150];
    const i = steps.indexOf(prefs.textScale);
    const next = steps[Math.max(0, Math.min(steps.length - 1, i + dir))];
    update({ textScale: next });
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="ht-a11y-fab"
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <AccessibilityIcon />
      </button>

      {open &&
        createPortal(
          <div className="ht-a11y-layer" role="presentation">
            <button
              type="button"
              className="ht-a11y-layer__backdrop"
              aria-label="סגור תפריט נגישות"
              onClick={close}
            />
            <div
              ref={panelRef as React.RefObject<HTMLDivElement>}
              id={panelId}
              className="ht-a11y-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              dir="rtl"
              lang="he"
            >
              <header className="ht-a11y-panel__head">
                <h2 id={titleId} className="ht-a11y-panel__title" tabIndex={-1}>
                  תפריט נגישות
                </h2>
                <button
                  ref={closeRef}
                  type="button"
                  className="ht-a11y-panel__close"
                  onClick={close}
                  aria-label="סגירת תפריט נגישות"
                >
                  ×
                </button>
              </header>

              <div className="ht-a11y-panel__body">
                <div className="ht-a11y-row">
                  <span className="ht-a11y-row__label">הגדלת טקסט ({prefs.textScale}%)</span>
                  <div className="ht-a11y-text-controls">
                    <button
                      type="button"
                      className="ht-a11y-icon-btn"
                      onClick={() => bumpText(-1)}
                      aria-label="הקטנת טקסט"
                      disabled={prefs.textScale === 100}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      className="ht-a11y-icon-btn"
                      onClick={() => bumpText(1)}
                      aria-label="הגדלת טקסט"
                      disabled={prefs.textScale === 150}
                    >
                      +
                    </button>
                  </div>
                </div>

                {TOGGLES.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    className={`ht-a11y-toggle${prefs[key] ? " is-on" : ""}`}
                    aria-pressed={prefs[key]}
                    onClick={() => toggle(key)}
                  >
                    <span className="ht-a11y-toggle__mark" aria-hidden>
                      {prefs[key] ? "✓" : ""}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}

                <button
                  type="button"
                  className="ht-a11y-reset"
                  onClick={() => setPrefs({ ...DEFAULT_A11Y_PREFS })}
                >
                  איפוס כל ההגדרות
                </button>

                {onOpenStatement ? (
                  <button
                    type="button"
                    className="ht-a11y-link"
                    onClick={() => {
                      setOpen(false);
                      onOpenStatement();
                    }}
                  >
                    הסדרי נגישות ונגישות אתר
                  </button>
                ) : (
                  <a className="ht-a11y-link" href="/accessibility/">
                    הסדרי נגישות ונגישות אתר
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      {prefs.readingGuide && (
        <div
          className="ht-a11y-guide"
          style={{ top: guideY }}
          aria-hidden="true"
        />
      )}
      {prefs.readingMask && (
        <div className="ht-a11y-mask" aria-hidden="true">
          <div className="ht-a11y-mask__top" style={{ height: Math.max(0, guideY - 40) }} />
          <div className="ht-a11y-mask__gap" />
          <div className="ht-a11y-mask__bottom" />
        </div>
      )}
    </>
  );
}
