/**
 * כל הטקסטים והמספרים שצריך לעדכן נמצאים בקובץ הזה.
 * מה שמסומן ב-TODO הוא מה שהשארת פתוח בבריף.
 */

export const site = {
  brand: 'Maker',

  ctaLabel: 'הצטרף בתור יוצר',
  ctaNavLabel: 'להצטרף',
  ctaSecondaryLabel: 'רגע, איך זה עובד?',

  // קישורים בין שני האתרים
  creatorsUrl: '/',
  businessUrl: '/business/',

  // Web3Forms — מקבל את תשובות השאלון למייל
  web3formsAccessKey: 'ccae87b8-5da9-4e2b-96c9-fed4f1ac63c1',

  // TODO: מספרים סופיים. אלה placeholders שנראים טוב בעיצוב — תחליף כשתחליט.
  numbers: {
    perViewsUnit: '1,000',       // כל כמה נתונים משלמים
    payPerUnit: '₪—',            // TODO: כמה משלמים על יחידת הנתונים
    bonusViews: '50K',           // יעד הנתונים לבונוס
    bonusAmount: '₪—',           // TODO: גובה הבונוס
    windowDays: '14',            // חלון הזמן בימים
    followersNeeded: '0',        // כמה עוקבים צריך
  },
}

export const steps = [
  { n: 1, title: 'תקציב נכנס לפּוּל', icon: 'pool' },
  { n: 2, title: 'מקבל תבנית', icon: 'template' },
  { n: 3, title: 'מצלם את עצמך', icon: 'camera' },
  { n: 4, title: 'אישור הצוות', icon: 'check' },
  { n: 5, title: 'מעלה לרשתות', icon: 'upload' },
  { n: 6, title: 'הנתונים נספרים', icon: 'views' },
  { n: 7, title: 'בונוס לביצועים', icon: 'bonus' },
]

export const earnings = [
  {
    label: 'התשלום מגיע מהפּוּל',
    value: '100%',
    text: 'התקציב יושב בפּוּל של העסק לפני שאתה מצלם. אתה לא מחכה לתשלום מלקוח — אתה נמשך מהפּוּל.',
  },
  {
    label: `על כל ${site.numbers.perViewsUnit} נתונים`,
    value: site.numbers.payPerUnit,
    text: 'כל נתון שנכנס בתוך חלון הזמן נספר ומתורגם לכסף. אין תקרה על כמה סרטונים תעשה.',
  },
  {
    label: `בונוס מעל ${site.numbers.bonusViews} נתונים`,
    value: site.numbers.bonusAmount,
    text: 'ביצועים גבוהים מקבלים תוספת. מי שמייצר סרטון שעובד — מרוויח יותר מהבסיס.',
  },
  {
    label: 'חלון זמן לספירה',
    value: `${site.numbers.windowDays} ימים`,
    text: 'הנתונים נספרים בתוך חלון זמן מוגדר מרגע ההעלאה. שקוף, מדיד, בלי הפתעות.',
  },
]
