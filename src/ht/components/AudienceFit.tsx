import { motion, useReducedMotion } from "framer-motion";

type AudienceFitProps = {
  onOpenPanel: () => void;
};

const NOT_FOR_YOU = [
  "אתה מחפש ויראליות מובטחת בלחיצת כפתור. אנחנו מביאים כמות ואותנטיות — לא קסמים.",
  "אתה רוצה לשלוט בכל מילה עד הפסיק. פה ליוצרים יש סגנון אמיתי (עם אישור שלך על כל וידאו).",
  "אין לך מוצר או שירות אמיתי להראות. צריך משהו שאפשר לצלם ולספר עליו.",
  "אתה מחפש את הזול ביותר בלי קשר לתוצאה. אנחנו עובדים לפי צפיות שנספרו בפועל.",
];

const FOR_YOU = [
  "יש לך מוצר טוב ואתה רוצה עשרות סרטוני UGC אותנטיים שמדברים עליו.",
  "נמאס לך להמר על משפיען יחיד — אתה רוצה כמות של פרצופים אמיתיים במקביל.",
  "אתה רוצה לשלם לפי תוצאה, על צפיות שנספרו, ולא ריטיינר חודשי קבוע.",
  "אתה רוצה חומרים שאפשר גם להזין לפרסום ממומן ולהמשיך להגדיל.",
];

function HandDrawnMark({
  type,
  delay,
  reduceMotion,
}: {
  type: "x" | "check";
  delay: number;
  reduceMotion: boolean;
}) {
  const transition = { delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : 0.42 };

  return (
    <svg
      className={`ht-fit__mark ht-fit__mark--${type}`}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      {type === "check" ? (
        <motion.path
          d="M4.5 14.7C8.3 17.2 10.3 19.6 11.8 22.1C14.5 15.3 18.2 9.4 24.1 4.8"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={transition}
        />
      ) : (
        <>
          <motion.path
            d="M5.4 5.7C10.4 10.1 17.2 17.7 22.8 22.5"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={transition}
          />
          <motion.path
            d="M22.4 5.2C18.7 9.7 10.7 18.1 5.1 22.7"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ ...transition, delay: transition.delay + (reduceMotion ? 0 : 0.08) }}
          />
        </>
      )}
    </svg>
  );
}

function FitList({
  items,
  type,
  reduceMotion,
}: {
  items: string[];
  type: "x" | "check";
  reduceMotion: boolean;
}) {
  return (
    <ul className="ht-fit__list">
      {items.map((item, index) => (
        <motion.li
          key={item}
          className="ht-fit__item"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : index * 0.08 }}
        >
          <span className="ht-fit__mark-wrap">
            <HandDrawnMark
              type={type}
              delay={index * 0.08 + 0.08}
              reduceMotion={reduceMotion}
            />
          </span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export default function AudienceFit({ onOpenPanel }: AudienceFitProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="ht-fit" aria-labelledby="ht-fit-title">
      <div className="ht-fit__inner">
        <h2 id="ht-fit-title" className="ht-fit__title">
          בוא נחסוך לשנינו זמן. זה לא לכל עסק.
        </h2>

        <div className="ht-fit__cards">
          <motion.article
            className="ht-fit__card ht-fit__card--out"
            initial={reduceMotion ? false : { opacity: 0, y: 10, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="ht-fit__card-title">זה לא בשבילך אם...</h3>
            <FitList items={NOT_FOR_YOU} type="x" reduceMotion={reduceMotion} />
          </motion.article>

          <motion.article
            className="ht-fit__card ht-fit__card--in"
            initial={reduceMotion ? false : { opacity: 0, y: 10, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="ht-fit__card-title">זה בדיוק בשבילך אם...</h3>
            <FitList items={FOR_YOU} type="check" reduceMotion={reduceMotion} />
            <button type="button" className="ht-fit__cta" onClick={onOpenPanel}>
              אז בוא נפתח קמפיין
            </button>
          </motion.article>
        </div>
      </div>

      <style>{CSS}</style>
    </section>
  );
}

const CSS = `
.ht-fit{
  position:relative;
  overflow-x:clip;
  padding:clamp(4rem,9vw,7rem) var(--ht-px);
  background:
    radial-gradient(60% 55% at 50% 22%,rgba(255,106,26,.06),transparent 72%),
    var(--ht-bg-deep);
  font-family:"Rubik","Heebo","Assistant",system-ui,sans-serif;
}
.ht-fit__inner{
  position:relative;
  z-index:1;
  width:100%;
  max-width:1000px;
  margin-inline:auto;
}
.ht-fit__title{
  max-width:760px;
  margin:0 auto clamp(2.5rem,7vw,4.25rem);
  text-align:center;
  font-size:clamp(1.75rem,7vw,3rem);
  font-weight:900;
  line-height:1.18;
  letter-spacing:-.025em;
  color:var(--ht-text);
}
.ht-fit__cards{
  display:grid;
  gap:clamp(1.75rem,7vw,3rem);
  padding:4px 2px;
}
.ht-fit__card{
  direction:rtl;
  padding:clamp(1.35rem,5.5vw,2rem);
  border-radius:24px;
  background:#fff;
  border:1px solid var(--ht-border);
  box-shadow:0 24px 70px -48px rgba(23,19,15,.35);
  transform-origin:center;
}
.ht-fit__card--out{
  color:rgba(23,19,15,.55);
}
.ht-fit__card--in{
  color:rgba(23,19,15,.92);
  border-color:rgba(255,106,26,.35);
  box-shadow:
    0 0 0 1px rgba(255,106,26,.06),
    0 28px 80px -48px rgba(255,106,26,.4);
}
.ht-fit__card-title{
  margin:0 0 .8rem;
  font-size:22px;
  font-weight:800;
  line-height:1.3;
}
.ht-fit__card--in .ht-fit__card-title{
  color:var(--ht-primary-hover);
}
.ht-fit__list{
  margin:0;
  padding:0;
  list-style:none;
}
.ht-fit__item{
  display:flex;
  align-items:flex-start;
  gap:.75rem;
  padding:1rem 0;
  font-size:16px;
  line-height:1.7;
  text-align:right;
}
.ht-fit__item + .ht-fit__item{
  border-top:1px solid rgba(23,19,15,.08);
}
.ht-fit__mark-wrap{
  display:grid;
  place-items:center;
  flex:0 0 26px;
  width:26px;
  min-height:27px;
  margin-top:.05rem;
}
.ht-fit__mark{
  width:25px;
  height:25px;
  overflow:visible;
}
.ht-fit__mark path{
  stroke:currentColor;
  stroke-width:2.4;
  stroke-linecap:round;
  stroke-linejoin:round;
  vector-effect:non-scaling-stroke;
}
.ht-fit__mark--x{color:#c0492b;}
.ht-fit__mark--check{color:var(--ht-primary);}
.ht-fit__cta{
  display:flex;
  width:100%;
  min-height:52px;
  align-items:center;
  justify-content:center;
  margin-top:1.25rem;
  padding:.9rem 1.25rem;
  border:0;
  border-radius:999px;
  background:var(--ht-primary);
  color:#fff;
  font:800 1.0625rem/1.15 inherit;
  cursor:pointer;
  box-shadow:0 15px 36px -18px rgba(255,106,26,.8);
  transition:background .18s ease,transform .18s ease,box-shadow .18s ease;
}
.ht-fit__cta:hover{
  background:var(--ht-primary-hover);
  transform:translateY(-1px);
  box-shadow:0 18px 42px -18px rgba(255,106,26,.95);
}
.ht-fit__cta:active{transform:translateY(0);}
.ht-fit__cta:focus-visible{
  outline:2px solid var(--ht-ink);
  outline-offset:3px;
}
@media (min-width:1024px){
  .ht-fit__cards{
    grid-template-columns:repeat(2,minmax(0,1fr));
    direction:ltr;
    align-items:stretch;
  }
  .ht-fit__card--out{grid-column:1;}
  .ht-fit__card--in{
    grid-column:2;
    display:flex;
    flex-direction:column;
  }
  .ht-fit__card--in .ht-fit__cta{margin-top:auto;}
}
@media (prefers-reduced-motion:reduce){
  .ht-fit *,
  .ht-fit *::before,
  .ht-fit *::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    scroll-behavior:auto !important;
    transition-duration:.01ms !important;
  }
}
`;
