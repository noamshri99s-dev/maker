import Reveal from "./Reveal";
import Badge from "./Badge";

/** שלב 11 — סקשן ההצעה והאחריות */
export default function Guarantee() {
  return (
    <section
      className="ht-section-glow relative w-full"
      style={{
        paddingBlock: "var(--ht-section-y)",
        paddingInline: "var(--ht-px)",
        background: "#0a0805",
      }}
    >
      <div
        className="relative z-10 mx-auto w-full"
        style={{ maxWidth: "56rem" }}
      >
        <div
          className="rounded-3xl p-8 text-center sm:p-12"
          style={{
            background: "var(--ht-card)",
            border: "1px solid rgba(196,135,31,0.4)",
            boxShadow: "0 0 60px -30px rgba(196,135,31,0.5)",
          }}
        >
          <Reveal>
            <Badge>ההתחייבות שלנו</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-6 font-black leading-tight"
              style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
            >
              אם אחרי הליווי לא החזרת את התשלום שלך — נחזיר לך את הכסף.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-lg" style={{ color: "var(--ht-text-soft)" }}>
              אנחנו לא מוכרים חלומות, אנחנו בונים עסקים. ולכן אנחנו היחידים שמוכנים
              לחתום על זה:
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--ht-text-soft)" }}>
              אם סיימת את הליווי המלא ולא הרווחת חזרה את מה ששילמת — אתה מקבל את הכסף
              שלך בחזרה. עד השקל האחרון.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-bold">
              אנחנו יכולים להרשות לעצמנו את ההתחייבות הזאת מסיבה אחת פשוטה: המערכת
              עובדת. הבוגרים שלנו מחזירים את ההשקעה — ולכן הסיכון עלינו, לא עליך.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 text-xs" style={{ color: "var(--ht-text-mute)" }}>
              *בכפוף לביצוע המשימות והשתתפות בכל המפגשים לאורך הליווי.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
