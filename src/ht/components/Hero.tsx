import { motion } from "framer-motion";
import makerLogo from "../../assets/logo.png";

type HeroProps = {
  onOpenPanel: () => void;
  ctaRef?: React.Ref<HTMLButtonElement>;
};

const SEATS_TOTAL = 20;
const SEATS_TAKEN = 17;

export default function Hero({ onOpenPanel, ctaRef }: HeroProps) {
  return (
    <>
      <header className="ht-topbar">
        <p className="ht-topbar__text">
          <span>שיווק UGC לעסקים בישראל</span>
          <span className="ht-topbar__flag" aria-hidden="true">
            🇮🇱
          </span>
          <span className="ht-topbar__rank">#1</span>
          <span className="ht-topbar__brand">Maker</span>
        </p>
      </header>

      <section className="ht-hero-brand" aria-labelledby="ht-hero-title">
        <div className="ht-hero-brand__inner">
          <motion.a
            href="#top"
            className="ht-logo"
            aria-label="Maker לעסקים"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img className="ht-logo__img" src={makerLogo} alt="Maker" />
            <span className="ht-logo__word">Maker</span>
            <span className="ht-logo__tag">לעסקים</span>
          </motion.a>

          <motion.div
            className="ht-hero-brand__trust"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="ht-hero-brand__badge">240+ יוצרים ברשת</span>
            <span className="ht-hero-brand__trust-text">אישור שלך לכל סרטון</span>
            <span className="ht-hero-brand__stars" aria-label="דירוג 4.9 מתוך 5">
              <span aria-hidden>★★★★★</span>
              <span className="ht-hero-brand__rating" dir="ltr">
                4.9
              </span>
            </span>
          </motion.div>

          <motion.h1
            id="ht-hero-title"
            className="ht-hero-brand__headline"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            לא צריך משפיען. צריך המון אנשים אמיתיים שמצלמים את המוצר שלך — ואתה משלם לפי צפיות
          </motion.h1>

          <motion.p
            className="ht-hero-brand__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            בלי הפקה ובלי ריטיינר. אתה מכניס תקציב לפּוּל, מאשר כל סרטון לפני שהוא עולה, ומשלם רק
            על הצפיות שנספרו בפועל.
          </motion.p>

          <motion.div
            className="ht-hero-brand__vsl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ht-hero-brand__vsl-frame">
              <div style={{ padding: "75% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1223140139?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  title="vsl_phone"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="ht-hero-brand__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
        >
          <div className="ht-hero-rush-wrap">
            <button
              ref={ctaRef}
              type="button"
              className="ht-hero-rush"
              onClick={onOpenPanel}
            >
              <span className="ht-hero-rush__label">רוצה קמפיין כזה למוצר שלי</span>
            </button>
          </div>

          <p className="ht-hero-scarcity__label">
            מספר הקמפיינים החדשים החודש מוגבל — אנחנו מלווים כל אחד אישית.
          </p>

          <div
            className="ht-hero-scarcity"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={SEATS_TOTAL}
            aria-valuenow={SEATS_TAKEN}
            aria-label={`${SEATS_TAKEN} מתוך ${SEATS_TOTAL} מקומות תפוסים`}
          >
            {Array.from({ length: SEATS_TOTAL }, (_, i) => {
              const filled = i < SEATS_TAKEN;
              const isLastFilled = i === SEATS_TAKEN - 1;
              return (
                <span
                  key={i}
                  className={`ht-hero-scarcity__seg${filled ? " is-filled" : ""}${
                    isLastFilled ? " is-pulse" : ""
                  }`}
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  {isLastFilled ? (
                    <span className="ht-hero-scarcity__check" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>
        </motion.div>
      </section>
    </>
  );
}
