import Section from "./Section";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";

const PILLARS = [
  {
    title: "באת עירום, יצאת מצויד",
    text: "תלמד את העקרונות החשובים ביותר לבניית אתרי תלת־מימד מ-0 עד רמה שלקוחות משלמים עליה אלפי שקלים.",
  },
  {
    title: "מהירות יישום פראית",
    text: "תלמד חומר שלוקח לאנשים ללמוד אותו שנה — בשלושה חודשים.",
  },
  {
    title: "סביבה חזקה",
    text: "קהילה של בונים רעבים שרוצים להגיע למטרה שהעסק שלהם מכניס להם כסף כל חודש.",
  },
];

/** שלב 5 — שלושת עמודי התוכנית */
export default function ThreePillars() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            תוכנית אינטנסיבית בליווי צמוד שתאפשר לך
            <br />
            <span className="ht-accent-underline">
              לנצל את המומנטום החריג בשוק האתרים
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} className="ht-card overflow-hidden" delay={i * 0.1}>
            <ImagePlaceholder label="מקום לתמונה" ratio="4 / 3" className="!rounded-none" />
            <div className="p-6 text-right">
              <h3 className="text-xl font-black">{p.title}</h3>
              <p className="mt-3" style={{ color: "var(--ht-text-soft)" }}>
                {p.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
