import Section from "./Section";
import Badge from "./Badge";
import Reveal from "./Reveal";
import { NotebookIcon, BookIcon, CodeIcon, TrainIcon } from "./Icons";

const CHIPS = ["מתחילים — ונתקעים", "אין דרך ברורה", "יותר מדי מידע"];

const PAINS = [
  {
    Icon: NotebookIcon,
    title: "רעיון שנשאר במחברת",
    text: "יש לך רעיון לעסק אבל אתה לא יודע איך להתחיל ולהפוך אותו לכסף",
  },
  {
    Icon: BookIcon,
    title: "למידה בלי תוצאה",
    text: "יוטיוב, קורסים זולים, צ'אטים עם AI — הכל מפוזר ושום דבר לא מסתיים",
  },
  {
    Icon: CodeIcon,
    title: "תלות במתכנתים",
    text: "אתר ברמה גבוהה עולה עשרות אלפים אצל סוכנות, ואתה עדיין לא מבין מה קורה במוצר שלך",
  },
  {
    Icon: TrainIcon,
    title: "תחושה שאתם מאחרים לרכבת",
    text: "העולם רץ קדימה עם AI, ואתם מרגישים שאתם נשארים עוד שנה באותו מקום",
  },
];

/** שלב 7 — סקשן הבעיה האמיתית */
export default function RealProblem() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Badge>הבעיה האמיתית</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            רוב האנשים לא נתקעים בגלל חוסר יכולת. הם נתקעים בגלל{" "}
            <span className="ht-accent">חוסר דרך.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            לא, זה לא בגלל שאין לכם רעיונות. וזה בטח לא בגלל שאתם לא חכמים מספיק.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-lg font-bold">
            הבעיה היא לא שאין מידע — יש יותר מדי מידע.{" "}
            <span style={{ color: "var(--ht-text-soft)", fontWeight: 400 }}>
              אינסוף כלים, סרטונים וקורסים, בלי להבין מה לעשות קודם ואיך לבנות נכון.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            בלי מסגרת, דדליין ומישהו שמתקן אתכם כשאתם נתקעים, רוב האנשים מתחילים
            בהתלהבות — <span className="font-bold" style={{ color: "var(--ht-text)" }}>ואז נתקעים באמצע.</span>
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CHIPS.map((c) => (
            <span
              key={c}
              className="rounded-full px-4 py-2 text-sm font-bold"
              style={{
                background: "var(--ht-card)",
                border: "1px solid var(--ht-border)",
                color: "var(--ht-text-soft)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-3xl gap-4">
        {PAINS.map(({ Icon, title, text }, i) => (
          <Reveal key={title} className="ht-card flex items-start gap-4 p-5" delay={i * 0.08}>
            <span
              className="flex shrink-0 items-center justify-center rounded-xl"
              style={{
                width: "3rem",
                height: "3rem",
                background: "rgba(245,168,59,0.12)",
                color: "var(--ht-primary)",
              }}
            >
              <Icon />
            </span>
            <div className="text-right">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-1" style={{ color: "var(--ht-text-soft)" }}>
                {text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
