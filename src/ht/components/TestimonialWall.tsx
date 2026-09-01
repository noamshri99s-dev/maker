import Section from "./Section";
import Badge from "./Badge";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { PlayIcon } from "./Icons";

/**
 * שלב 6 — קיר המלצות ותוצאות.
 * גריד של placeholders לצילומי מסך וואטסאפ + נגן וידאו אחד באמצע.
 * להחלפת תמונות: ערכו את המערך items — value מסוג "image" יציג placeholder לתמונה,
 * value מסוג "video" יציג נגן וידאו.
 */
const items: { type: "image" | "video"; label: string }[] = [
  { type: "image", label: "צילום מסך וואטסאפ 1" },
  { type: "image", label: "צילום מסך וואטסאפ 2" },
  { type: "image", label: "צילום מסך וואטסאפ 3" },
  { type: "video", label: "וידאו המלצה" },
  { type: "image", label: "צילום מסך וואטסאפ 4" },
  { type: "image", label: "צילום מסך וואטסאפ 5" },
];

export default function TestimonialWall() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Badge>מה אומרים עלינו</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            קיר המלצות ותוצאות אמיתיות
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            הודעות, שיחות ותיעודים מבוגרים שעברו את התהליך ובנו עסק אמיתי
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.label} className="ht-card overflow-hidden p-3" delay={(i % 3) * 0.08}>
            <div className="relative">
              <ImagePlaceholder
                label={item.label}
                ratio="4 / 5"
              />
              {item.type === "video" && (
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="נגן וידאו"
                >
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      background: "var(--ht-primary)",
                      color: "#16120c",
                      boxShadow: "0 12px 40px -10px rgba(245,168,59,0.7)",
                    }}
                  >
                    <PlayIcon size={26} />
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
