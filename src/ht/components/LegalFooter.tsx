import makerLogo from "../../assets/logo.png";

type LegalFooterProps = {
  onOpenPrivacy: () => void;
  onOpenAccessibility: () => void;
};

/** פוטר — לוגו Maker + קישורים משפטיים */
export default function LegalFooter({
  onOpenPrivacy,
  onOpenAccessibility,
}: LegalFooterProps) {
  return (
    <footer className="ht-legal-footer" dir="rtl" lang="he">
      <div className="ht-legal-footer__brand">
        <span className="ht-logo ht-logo--footer" style={{ margin: 0 }}>
          <img className="ht-logo__img" src={makerLogo} alt="Maker" />
          <span className="ht-logo__word">Maker</span>
          <span className="ht-logo__tag">לעסקים</span>
        </span>
      </div>

      <nav className="ht-legal-footer__nav" aria-label="מידע משפטי">
        <button type="button" className="ht-legal-footer__link" onClick={onOpenPrivacy}>
          מדיניות פרטיות
        </button>
        <span className="ht-legal-footer__sep" aria-hidden="true">
          |
        </span>
        <button
          type="button"
          className="ht-legal-footer__link"
          onClick={onOpenAccessibility}
        >
          הסדרי נגישות ונגישות אתר
        </button>
      </nav>

      <p className="ht-legal-footer__copy">
        © {new Date().getFullYear()} Maker — לעסקים
      </p>
    </footer>
  );
}
