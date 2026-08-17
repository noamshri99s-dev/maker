/**
 * כל הטקסטים והמספרים של האתר לעסקים נמצאים בקובץ הזה.
 * מה שמסומן ב-TODO הוא מה שצריך להחליט לפני שהאתר עולה לאוויר.
 */

export const bizSite = {
  brand: 'Maker',
  brandTag: 'לעסקים',

  ctaLabel: 'רוצה קמפיין כזה',
  ctaNavLabel: 'לפתוח קמפיין',
  ctaSecondaryLabel: 'רגע, איך זה עובד?',

  // קישורים בין שני האתרים
  creatorsUrl: '/',
  businessUrl: '/business/',
  emilyUrl: '/emily/',

  // Web3Forms — מקבל את הבריפים למייל
  web3formsAccessKey: 'ccae87b8-5da9-4e2b-96c9-fed4f1ac63c1',

  // TODO: מספרים סופיים. אלה placeholders שנראים טוב בעיצוב — תחליף כשתחליט.
  numbers: {
    creatorsInNetwork: '240',      // גודל רשת היוצרים
    creatorsPerCampaign: '30',     // כמה יוצרים מצלמים קמפיין אחד
    perViewsUnit: '1,000',         // כל כמה צפיות מחשבים
    costPerUnit: '₪—',             // TODO: עלות ל-1,000 צפיות
    minBudget: '₪—',               // TODO: תקציב מינימלי לקמפיין
    windowDays: '14',              // חלון ספירת הצפיות
    launchDays: '7',               // כמה ימים עד שהקמפיין באוויר
  },
}

export const bizSteps = [
  { n: 1, title: 'מגדירים תקציב לקמפיין', icon: 'money' },
  { n: 2, title: 'בונים בריף ותבנית', icon: 'template' },
  { n: 3, title: 'התקציב נכנס לפּוּל', icon: 'pool' },
  { n: 4, title: 'היוצרים מצלמים את המוצר', icon: 'camera' },
  { n: 5, title: 'אתה מאשר כל סרטון', icon: 'check' },
  { n: 6, title: 'הסרטונים עולים לרשתות', icon: 'upload' },
  { n: 7, title: 'הצפיות נספרות ומדווחות', icon: 'views' },
]

export const bizBudget = [
  {
    label: 'התקציב יושב בפּוּל שלך',
    value: '100%',
    text: 'אתה מכניס תקציב לפּוּל של הקמפיין. מהפּוּל משולם ליוצרים לפי הצפיות שהם הביאו — כל שקל הולך לתוכן שעובד.',
  },
  {
    label: `על כל ${bizSite.numbers.perViewsUnit} צפיות`,
    value: bizSite.numbers.costPerUnit,
    text: 'העלות מחושבת לפי הצפיות שנספרו בפועל בתוך חלון הזמן. לא לפי הבטחות ולא לפי מספר עוקבים.',
  },
  {
    label: 'יוצרים על קמפיין אחד',
    value: `עד ${bizSite.numbers.creatorsPerCampaign}`,
    text: 'במקום משפיען יחיד אתה מקבל עשרות אנשים אמיתיים שמצלמים את אותו מוצר — כל אחד עם הקהל שלו.',
  },
  {
    label: 'חלון ספירת צפיות',
    value: `${bizSite.numbers.windowDays} ימים`,
    text: 'הצפיות נספרות בחלון זמן מוגדר מרגע ההעלאה. שקוף, מדיד, ומגיע אליך בדוח מסודר.',
  },
]

export const bizDeliverables = [
  {
    title: 'עשרות פנים, לא פרזנטור אחד',
    text: 'אותו מוצר מצולם על ידי עשרות יוצרים במקביל. זה נראה כמו טרנד, לא כמו פרסומת אחת.',
    icon: 'users',
  },
  {
    title: 'סרטונים אותנטיים מהטלפון',
    text: 'בלי סטודיו ובלי הפקה. אנשים אמיתיים מדברים על המוצר בשפה של הרשתות.',
    icon: 'camera',
  },
  {
    title: 'אישור שלך לפני כל העלאה',
    text: 'שום סרטון לא עולה לאוויר לפני שהצוות ואתה אישרתם אותו. יש לך שליטה מלאה על המסר.',
    icon: 'shield',
  },
]
