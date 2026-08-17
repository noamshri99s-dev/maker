/**
 * קמפיין אמילי — דף גיוס ל־5 יוצרים שמצלמים סרטון UGC אחד בתשלום.
 */

export const emilySite = {
  brand: 'Maker',
  brandTag: 'קמפיין אמילי',
  productName: 'אמילי',
  productUrl: 'https://emilyai.lovable.app',

  ctaLabel: 'תופסים מקום בפול',
  ctaNavLabel: 'נרשמים',
  ctaSecondaryLabel: 'רגע, מה מצלמים?',

  creatorsUrl: '/',
  businessUrl: '/business/',
  emilyUrl: '/emily/',

  web3formsAccessKey: 'ccae87b8-5da9-4e2b-96c9-fed4f1ac63c1',

  poolSize: 5,
}

export const emilyHeroPoints = ['סרטון אחד', 'תבנית מוכנה', 'תשלום מהפול']

export const emilyStrip = [
  { title: '5 מקומות', text: 'הפול נסגר אחרי חמישה נרשמים' },
  { title: 'סרטון אחד', text: 'UGC קצר, מצולם בטלפון' },
  { title: 'התשלום', text: 'יוצא מהפול אחרי אישור' },
  { title: 'התבנית', text: 'אנחנו שולחים מה להגיד' },
]

export const emilyFeatures = [
  {
    title: 'מקליטה ומתמללת',
    text: 'כל שיחה עסקית נשמרת. אמילי מתמללת ומסכמת אותה אוטומטית — בלי שתצטרכו לרשום דבר.',
    icon: 'mic',
  },
  {
    title: 'מזהה משימות ותזכורות',
    text: 'החלטות, התחייבויות ומועדים יוצאים מהשיחה. אמילי זוכרת מה סיכמתם עם כל לקוח.',
    icon: 'spark',
  },
  {
    title: 'הכל מגיע לוואטסאפ',
    text: 'סיכום, משימות ומה צריך לקרות עכשיו — במקום שבעלי עסקים כבר נמצאים בו כל היום.',
    icon: 'chat',
  },
]

export const emilyTalkingPoints = [
  'אמילי מקליטה, מתמללת ומסכמת שיחות — אוטומטית.',
  'אין אפליקציה חדשה ללמוד. הכל מגיע ישר לוואטסאפ.',
  'בנויה לעסקים שחיים מהטלפון: מתווכים, יועצים, סוכנים ואנשי מכירות.',
]

export const emilySteps = [
  { n: 1, title: 'נרשמים לפול', text: 'חמישה מקומות. מי שנרשם — נכנס.', icon: 'users' },
  { n: 2, title: 'מקבלים תבנית', text: 'בריף קצר עם מה להגיד על אמילי.', icon: 'template' },
  { n: 3, title: 'מצלמים סרטון אחד', text: 'בטלפון, לפי התבנית, בלי הפקה.', icon: 'camera' },
  { n: 4, title: 'מקבלים תשלום', text: 'אחרי אישור — הכסף יוצא מהפול.', icon: 'money' },
]

export const emilyChat = [
  {
    from: 'emily',
    time: '9:41',
    text: 'היי תומר, הנה מה שסיכמתי מהשיחה 👋',
    extra: 'דני מעוניין בהצעה למסלול Premium וביקש שתחזור אליו ביום חמישי.',
  },
  {
    from: 'emily',
    time: '9:41',
    task: 'לשלוח הצעת מחיר',
    reminder: 'יום חמישי, 14:00',
  },
  {
    from: 'user',
    time: '9:42',
    text: 'מושלם, תודה אמילי 🙌',
  },
]
