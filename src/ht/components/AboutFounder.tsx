import Section from "./Section";
import Reveal from "./Reveal";

const STEPS = [
  {
    tag: "01 · אתה",
    title: "מגדיר תקציב וזהו.",
    text: "בוחר סכום לקמפיין ומכניס אותו לפּוּל. לא ריטיינר, לא מחיר לפי עוקבים — סכום אחד שאתה שולט בו לגמרי.",
  },
  {
    tag: "02 · הרשת",
    title: "עשרות מתחילים לצלם.",
    text: "ברגע שהבריף מאושר, הקמפיין נפתח לרשת. עד 30 יוצרים מצלמים את המוצר שלך — כל אחד בסגנון שלו, מול הקהל שלו.",
  },
  {
    tag: "03 · אתה שוב",
    title: "מאשר כל סרטון.",
    text: "כל וידאו מגיע אליך לאישור לפני שהוא עולה. אתה שולט במסר, בטון ובמה שיוצא החוצה בשם המותג.",
  },
  {
    tag: "04 · הצפיות",
    title: "נספרות בזמן אמת.",
    text: "הסרטונים עולים, והצפיות נספרות בחלון של 14 ימים. מהפּוּל יוצא תשלום רק על מה שבאמת נצפה — ואתה מקבל דוח מסודר.",
  },
];

/** איך Maker עובד לעסק — 4 שלבים, בלי תמונות */
export default function AboutFounder() {
  return (
    <Section id="how" className="ht-section--deep">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="ht-badge">
            <span className="ht-badge__dot" />
            איך זה עובד
          </span>
          <h2
            className="mt-5 font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            ארבעה שלבים מהתקציב עד הצפיות
          </h2>
        </Reveal>
      </div>

      <ol className="ht-flow mx-auto mt-12 max-w-4xl">
        {STEPS.map((s, i) => (
          <Reveal key={s.tag} as="li" className="ht-card ht-flow__card" delay={i * 0.06}>
            <span className="ht-flow__tag">{s.tag}</span>
            <h3 className="ht-flow__title">{s.title}</h3>
            <p className="ht-flow__text">{s.text}</p>
          </Reveal>
        ))}
      </ol>

      <style>{CSS}</style>
    </Section>
  );
}

const CSS = `
.ht-flow{
  display:grid;
  gap:1rem;
  list-style:none;
  padding:0;
  margin-inline:auto;
}
@media (min-width:820px){
  .ht-flow{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem;}
}
.ht-flow__card{
  padding:1.6rem 1.5rem;
  text-align:right;
}
.ht-flow__tag{
  display:inline-block;
  font-weight:900;
  font-size:0.82rem;
  letter-spacing:0.02em;
  color:var(--ht-primary-hover);
}
.ht-flow__title{
  margin:0.6rem 0 0.5rem;
  font-size:1.3rem;
  font-weight:900;
  color:var(--ht-text);
}
.ht-flow__text{
  margin:0;
  font-size:1rem;
  line-height:1.7;
  color:var(--ht-text-soft);
}
`;
