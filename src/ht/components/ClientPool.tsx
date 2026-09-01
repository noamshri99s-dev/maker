import Section from "./Section";
import Badge from "./Badge";
import Reveal from "./Reveal";

/** שלב 10 — קבוצת הלקוחות (החיבורים) */
export default function ClientPool() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Badge>לא לבד בשוק</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            אנחנו לא רק מלמדים אותך לדוג. אנחנו מביאים לך את{" "}
            <span className="ht-accent">הבריכה.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-lg" style={{ color: "var(--ht-text-soft)" }}>
            הבעיה הכי גדולה של מי שמתחיל היא לא הידע — זה הלקוח הראשון. בלי תיק
            עבודות אין לקוחות, ובלי לקוחות אין תיק עבודות.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-lg">
            <span className="font-bold">
              לכן הקמנו קבוצה של בעלי עסקים ולקוחות שמחפשים בניית אתרים.
            </span>{" "}
            <span style={{ color: "var(--ht-text-soft)" }}>
              אנחנו עושים את החיבור: בוגרים שלנו מקבלים פרויקטים אמיתיים ראשונים
              ישירות מהקבוצה, בונים תיק עבודות אמיתי — ומהשלב הזה הלקוחות כבר מגיעים
              אליהם לבד.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg font-bold">
            זה לא "אולי תמצא לקוח". זה מנגנון שעובד אצלנו כל חודש מחדש.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
