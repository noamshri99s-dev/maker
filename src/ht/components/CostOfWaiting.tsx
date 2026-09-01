import Section from "./Section";
import Badge from "./Badge";
import Reveal from "./Reveal";
import Button from "./Button";

const CARDS = [
  {
    num: "8",
    text: "מפגשים פרקטיים מהיסודות ועד עסק שמכניס כסף. ליווי בבנייה, תמחור, מכירות וחיבור ללקוח ראשון — שלב אחרי שלב.",
  },
  {
    num: "0",
    text: "ידע בתכנות שצריך כדי להתחיל. נותנים לכם יכולת לבנות אתרים שנמכרים באלפי שקלים בעולם החדש.",
  },
];

type CostOfWaitingProps = {
  onOpenPanel: () => void;
};

/** שלב 13 — המחיר של לחכות + CTA סוגר */
export default function CostOfWaiting({ onOpenPanel }: CostOfWaitingProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Badge>המחיר של לחכות</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            כמה זה עולה לכם{" "}
            <span style={{ color: "var(--ht-red)" }}>
              להישאר עם רעיון במחברת?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            כל חודש שעובר, השוק מתמלא. וההזדמנות שלכם לתפוס אותו כשהוא עוד פתוח — לא
            מחכה.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {CARDS.map((c, i) => (
          <Reveal key={c.num} className="ht-card p-8 text-center" delay={i * 0.1}>
            <div
              className="font-black leading-none"
              style={{ fontSize: "clamp(4rem, 12vw, 6rem)", color: "var(--ht-red)" }}
            >
              {c.num}
            </div>
            <p className="mt-4" style={{ color: "var(--ht-text-soft)" }}>
              {c.text}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-12 max-w-2xl text-center text-lg" style={{ color: "var(--ht-text-soft)" }}>
          כל חודש שעובר בלי לבנות, אחרים כבר סוגרים את הלקוחות שיכלו להיות שלכם.{" "}
          <span className="font-bold" style={{ color: "var(--ht-text)" }}>
            לא מפני שהם חכמים יותר
          </span>{" "}
          — אלא מפני שהם לא נשארו רק בלמידה. הם מבצעים. ראית מספיק סרטונים. הגיע הזמן
          לבנות.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 flex justify-center">
          <Button wide onClick={onOpenPanel}>
            לתיאום פגישת אפיון
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
