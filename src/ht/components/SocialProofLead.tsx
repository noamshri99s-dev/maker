import Section from "./Section";
import Reveal from "./Reveal";

const STATS = [
  { value: "240+", label: "יוצרים אמיתיים ברשת", sub: "מחכים לקמפיין הבא" },
  { value: "עד 30", label: "יוצרים על קמפיין אחד", sub: "כל אחד עם הקהל שלו" },
  { value: "7 ימים", label: "עד שהסרטונים באוויר", sub: "מרגע אישור הבריף" },
  { value: "100%", label: "מהתקציב הולך לתוכן", sub: "בלי ריטיינר, בלי דמי ניהול" },
];

/** הוכחה לעסק — מספרים במקום תמונות */
export default function SocialProofLead() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            במקום להמר על משפיען אחד —
            <br />
            רשת שלמה מצלמת את המוצר שלך
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--ht-text-soft)" }}
          >
            עשרות אנשים אמיתיים מדברים על המוצר בשפה של הרשתות. זה נראה כמו טרנד, לא כמו פרסומת
            אחת — ואתה משלם לפי מה שבאמת נצפה.
          </p>
        </Reveal>
      </div>

      <div className="ht-stats-grid mx-auto mt-12 max-w-5xl">
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="ht-card ht-stat" delay={(i % 4) * 0.05}>
            <span className="ht-stat__value">{s.value}</span>
            <span className="ht-stat__label">{s.label}</span>
            <span className="ht-stat__sub">{s.sub}</span>
          </Reveal>
        ))}
      </div>

      <style>{CSS}</style>
    </Section>
  );
}

const CSS = `
.ht-stats-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0.85rem;
}
@media (min-width:820px){
  .ht-stats-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:1.1rem;}
}
.ht-stat{
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  gap:0.35rem;
  padding:1.6rem 1rem;
}
.ht-stat__value{
  font-family:"Rubik","Heebo",system-ui,sans-serif;
  font-weight:900;
  font-size:clamp(1.9rem,6vw,2.6rem);
  line-height:1;
  letter-spacing:-0.03em;
  color:var(--ht-primary-hover);
}
.ht-stat__label{
  font-weight:800;
  font-size:0.98rem;
  color:var(--ht-text);
}
.ht-stat__sub{
  font-size:0.84rem;
  color:var(--ht-text-mute);
}
`;
