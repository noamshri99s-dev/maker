import Section from "./Section";
import Reveal from "./Reveal";
import { CheckIcon } from "./Icons";

const STEPS: { n: number; title: string; lines: string[] }[] = [
  {
    n: 1,
    title: "מגדירים תקציב לקמפיין",
    lines: [
      "בוחרים סכום לקמפיין ומכניסים אותו לפּוּל — סכום אחד שאתה שולט בו, בלי ריטיינר",
      "קובעים יחד יעד: כמה יוצרים, אילו רשתות, ומה המסר המרכזי של המוצר",
    ],
  },
  {
    n: 2,
    title: "בונים בריף ותבנית",
    lines: [
      "אנחנו מנסחים איתך בריף ברור ותבנית צילום שהיוצרים יעבדו לפיה",
      "מוודאים שהמסר, הטון והקריאה לפעולה מדויקים למותג שלך",
    ],
  },
  {
    n: 3,
    title: "הרשת מצלמת",
    lines: [
      "הקמפיין נפתח לרשת ועד 30 יוצרים אמיתיים מצלמים את המוצר — כל אחד עם הקהל שלו",
      "מקבלים עשרות סרטוני UGC אותנטיים מהטלפון, בלי הפקה ובלי סטודיו",
    ],
  },
  {
    n: 4,
    title: "אתה מאשר כל סרטון",
    lines: [
      "כל וידאו עובר אליך לאישור לפני שהוא עולה לרשתות",
      "שום דבר לא יוצא בשם המותג בלי האישור שלך — שליטה מלאה על המסר",
    ],
  },
  {
    n: 5,
    title: "הסרטונים עולים והצפיות נספרות",
    lines: [
      "הסרטונים מתפרסמים והצפיות נספרות בחלון של 14 ימים",
      "מהפּוּל משולם ליוצרים רק על הצפיות שהביאו בפועל",
    ],
  },
  {
    n: 6,
    title: "מקבלים דוח ומחליטים על הבא",
    lines: [
      "בסוף הקמפיין מגיע דוח מרוכז: כל סרטון, כמה צפיות וכמה עלה",
      "מחליטים יחד אם להגדיל תקציב, לפתוח קמפיין נוסף או להזין את הסרטונים לפרסום ממומן",
    ],
  },
];

/** מבנה הקמפיין — Timeline שלבים */
export default function Timeline() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
        >
          מבנה הקמפיין
        </h2>
      </div>

      <div className="relative mx-auto mt-12 max-w-2xl">
        {/* הקו האנכי */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            insetInlineStart: "1.4rem",
            width: "2px",
            background:
              "linear-gradient(to bottom, transparent, var(--ht-border-strong) 8%, var(--ht-border-strong) 92%, transparent)",
          }}
          aria-hidden="true"
        />

        <ol className="space-y-6">
          {STEPS.map((m, i) => (
            <Reveal key={m.n} as="li" className="relative" delay={i * 0.06}>
              <div className="flex gap-5">
                <div
                  className="relative z-10 flex shrink-0 items-center justify-center rounded-full font-black"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    background: "var(--ht-primary)",
                    color: "#fff",
                    boxShadow: "0 0 0 6px var(--ht-bg)",
                  }}
                >
                  {m.n}
                </div>
                <div className="ht-card flex-1 p-5 text-right">
                  <h3 className="text-lg font-black">
                    שלב {m.n}: {m.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {m.lines.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span
                          className="mt-1 shrink-0"
                          style={{ color: "var(--ht-primary)" }}
                        >
                          <CheckIcon size={18} />
                        </span>
                        <span style={{ color: "var(--ht-text-soft)" }}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
