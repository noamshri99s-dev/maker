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

export const CALENDLY_BOOKING_URL =
  "https://cal.com/royazaria/נועםשרי";

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

/**
 * שליחת התשובות. יש לחבר כאן את כתובת ה-webhook בפועל.
 */
export async function submitAssessment(answers: AssessmentAnswers): Promise<void> {
  const WEBHOOK_URL = ""; // TODO: חברו כאן את כתובת ה-webhook

  if (!WEBHOOK_URL) {
    // eslint-disable-next-line no-console
    console.log("assessment answers (no webhook connected yet):", answers);
    return;
  }

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });
}
