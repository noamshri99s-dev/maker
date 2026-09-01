import Section from "./Section";
import Reveal from "./Reveal";

const DELIVERABLES = [
  {
    title: "עשרות פנים, לא פרזנטור אחד",
    text: "אותו מוצר מצולם על ידי עשרות יוצרים במקביל. זה נראה כמו טרנד, לא כמו פרסומת אחת.",
  },
  {
    title: "סרטונים אותנטיים מהטלפון",
    text: "בלי סטודיו ובלי הפקה. אנשים אמיתיים מדברים על המוצר בשפה של הרשתות.",
  },
  {
    title: "אישור שלך לפני כל העלאה",
    text: "שום סרטון לא עולה לאוויר לפני שאתה מאשר אותו. יש לך שליטה מלאה על המסר.",
  },
  {
    title: "תשלום לפי צפיות שנספרו",
    text: "אתה משלם על מה שבאמת נצפה בתוך חלון הזמן — לא לפי הבטחות ולא לפי מספר עוקבים.",
  },
  {
    title: "בריף ותבנית שאנחנו בונים",
    text: "אנחנו מנסחים איתך את המסר והתבנית לצילום. אתה דואג שהמוצר יגיע — הרשת עושה את השאר.",
  },
  {
    title: "דוח מסודר בסוף הקמפיין",
    text: "כל סרטון, כמה צפיות הביא וכמה עלה — הכל שקוף ומרוכז במקום אחד.",
  },
];

/** מה העסק מקבל — כרטיסים, בלי תמונות ובלי כסף */
export default function PaymentProof({ onOpenPanel }: { onOpenPanel: () => void }) {
  return (
    <Section className="ht-payment-proof">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            מה אתה מקבל בקמפיין{" "}
            <span className="ht-accent">Maker</span>
          </h2>
        </Reveal>
      </div>

      <div className="ht-deliv-grid mx-auto mt-12 max-w-5xl">
        {DELIVERABLES.map((item, i) => (
          <Reveal key={item.title} className="ht-card ht-deliv" delay={(i % 3) * 0.05}>
            <span className="ht-deliv__check" aria-hidden="true">
              ✓
            </span>
            <h3 className="ht-deliv__title">{item.title}</h3>
            <p className="ht-deliv__text">{item.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="ht-payment-proof__cta">
        <div className="ht-hero-rush-wrap">
          <button
            type="button"
            className="ht-hero-rush ht-hero-rush--yellow"
            onClick={onOpenPanel}
          >
            <span className="ht-hero-rush__label">רוצה קמפיין כזה למוצר שלי</span>
          </button>
        </div>
      </div>

      <style>{CSS}</style>
    </Section>
  );
}

const CSS = `
.ht-deliv-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:0.9rem;
}
@media (min-width:640px){
  .ht-deliv-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.1rem;}
}
@media (min-width:980px){
  .ht-deliv-grid{grid-template-columns:repeat(3,minmax(0,1fr));}
}
.ht-deliv{
  padding:1.5rem 1.4rem;
  text-align:right;
}
.ht-deliv__check{
  display:grid;
  place-items:center;
  width:2.1rem;
  height:2.1rem;
  border-radius:9999px;
  background:rgba(255,106,26,0.12);
  color:var(--ht-primary-hover);
  font-weight:900;
  font-size:1.05rem;
}
.ht-deliv__title{
  margin:0.85rem 0 0.45rem;
  font-size:1.12rem;
  font-weight:900;
  color:var(--ht-text);
}
.ht-deliv__text{
  margin:0;
  font-size:0.96rem;
  line-height:1.65;
  color:var(--ht-text-soft);
}
`;
