export type DetailsStep = {
  id: "details";
  type: "details";
  badge: string;
  question: string;
  bullets: string[];
  termsUrl: string;
  buttonLabel: string;
  note: string;
};

export type RadioStep = {
  id: string;
  type: "radio";
  question: string;
  options: string[];
};

export type TextStep = {
  id: string;
  type: "text";
  question: string;
  placeholder?: string;
};

export type Step = DetailsStep | RadioStep | TextStep;

export const STEPS: Step[] = [
  {
    id: "details",
    type: "details",
    badge: "בריף קמפיין קצר",
    question: "בכמה שאלות נבין את המוצר שלך ונחזור עם הצעה לקמפיין",
    bullets: [
      "נגדיר יחד תקציב, כמות יוצרים ורשתות",
      "תצא עם הצעה ברורה ומתי הסרטונים באוויר",
    ],
    termsUrl: "/ht/privacy/",
    buttonLabel: "בואו נתחיל",
    note: "אחרי זה יש כמה שאלות קצרות למילוי",
  },
  {
    id: "goal",
    type: "radio",
    question: "מה המטרה העיקרית של הקמפיין?",
    options: [
      "מודעות למותג וחשיפה",
      "הורדות אפליקציה או הרשמות",
      "מכירות ישירות בחנות",
      "חומרי UGC לפרסום ממומן",
    ],
  },
  {
    id: "category",
    type: "radio",
    question: "באיזה תחום המוצר או השירות שלך?",
    options: [
      "מותג אונליין / חנות D2C",
      "אפליקציה או דיגיטל",
      "ביוטי, טיפוח ואופנה",
      "אוכל, משקאות ומקומי",
      "אחר",
    ],
  },
  {
    id: "budget",
    type: "radio",
    question: "איזה תקציב חשבת להקצות לקמפיין?",
    options: [
      "עד 5,000 ₪",
      "5,000 עד 15,000 ₪",
      "15,000 עד 30,000 ₪",
      "30,000 ₪ ומעלה",
    ],
  },
  {
    id: "timing",
    type: "radio",
    question: "מתי היית רוצה שהקמפיין יעלה לאוויר?",
    options: [
      "מיד, כמה שיותר מהר",
      "בשבועיים הקרובים",
      "בחודש הקרוב בערך",
      "רק בודק אפשרויות",
    ],
  },
  {
    id: "product",
    type: "text",
    question: "ספר בקצרה על המוצר ומה חשוב שנדגיש",
    placeholder: "לדוגמה: קרם לחות טבעי, קהל יעד נשים 25-40, חשוב להדגיש רכיבים טבעיים ותוצאה מהירה",
  },
];

export type AssessmentAnswers = Record<string, string> & {
  fullName?: string;
  phone?: string;
  consent?: string;
  marketing?: string;
};

/* יעד שליחת הלידים — Web3Forms */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "ccae87b8-5da9-4e2b-96c9-fed4f1ac63c1";

/* מיפוי מזהה־שאלה → טקסט השאלה, לצורך מייל קריא */
const QUESTION_LABELS: Record<string, string> = Object.fromEntries(
  STEPS.filter(
    (s): s is RadioStep | TextStep => s.type === "radio" || s.type === "text"
  ).map((s) => [s.id, s.question])
);

/**
 * שלב הליד:
 * "partial" — שמירה ראשונה מיד אחרי שם + טלפון (מסך ראשון)
 * "full"    — שמירה שנייה עם כל פרטי הבריף בסיום
 */
export type LeadStage = "partial" | "full";

/**
 * שליחת הפרטים ל-Web3Forms. כל קריאה יוצרת רשומה/מייל נפרד.
 */
export async function submitAssessment(
  answers: AssessmentAnswers,
  stage: LeadStage = "full"
): Promise<void> {
  const yesNo = (v?: string) => (v === "true" ? "כן" : "לא");
  const name = answers.fullName?.trim() || "";
  const phone = answers.phone?.trim() || "";

  const fields: Record<string, string> = {
    "שם פרטי": name,
    "טלפון": phone,
    "אישור תקנון": yesNo(answers.consent),
    "דיוור שיווקי": yesNo(answers.marketing),
  };

  // בשלב המלא מוסיפים את כל תשובות הבריף עם תוויות בעברית
  if (stage === "full") {
    for (const [id, label] of Object.entries(QUESTION_LABELS)) {
      const val = answers[id];
      if (val && val.trim()) fields[label] = val.trim();
    }
  }

  const stageLabel =
    stage === "partial"
      ? "פרטים ראשוניים (שם + טלפון)"
      : "בריף קמפיין מלא";

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "Maker לעסקים",
    subject:
      stage === "partial"
        ? `ליד חדש (התחלה) — ${name || "ללא שם"}`
        : `בריף מלא — ${name || "ללא שם"}`,
    "שלב": stageLabel,
    ...fields,
  };

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`web3forms responded ${res.status}`);
  }
}
