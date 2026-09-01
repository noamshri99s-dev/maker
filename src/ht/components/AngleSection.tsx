import Section from "./Section";
import Badge from "./Badge";
import Reveal from "./Reveal";

/** שלב 3 — סקשן הזווית (המשפט על AI) */
export default function AngleSection() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Badge>האמת שאף אחד לא אומר</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 font-black leading-tight"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            שימוש לא נכון ב-AI זה בדיחה. הוא לא ייתן לך שקל.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            כולם מוכרים לך שתקליד פרומט, ה-AI יבנה לך אתר, ואתה תתעשר. זה שקר. לקוח
            שמשלם 10,000+ ₪ על אתר מזהה בשנייה עבודה של AI בלי מקצועיות מאחוריה.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            className="mt-6 text-lg font-bold"
            style={{ color: "var(--ht-text)" }}
          >
            AI הוא כלי. מי שיודע לבנות אתרים ברמה גבוהה ומשלב אותו נכון — עובד פי 5
            מהר יותר וגובה פי 3 יותר. מי שלא — מייצר זבל מהיר יותר.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            זה בדיוק מה שאנחנו מלמדים: המקצועיות של אתרי תלת־מימד + השימוש הנכון
            ב-AI. השילוב הזה הוא <span className="ht-accent font-bold">הכסף</span>.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
