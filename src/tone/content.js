/**
 * קמפיין tone. formula 04 — דף גיוס ל־5 יוצרות שמצלמות סרטון UGC אחד.
 * מקבלות את המוצר (שווי ₪200) + תוספות עד שווי כולל של ₪400.
 */

export const toneSite = {
  brand: 'Maker',
  brandTag: 'קמפיין tone.',
  productName: 'tone. formula 04',
  productUrl: 'https://tone04.com',

  ctaLabel: 'תופסת מקום בפול',
  ctaNavLabel: 'נרשמות',
  ctaSecondaryLabel: 'רגע, מה מצלמים?',

  web3formsAccessKey: 'ccae87b8-5da9-4e2b-96c9-fed4f1ac63c1',

  poolSize: 5,

  productValue: 200,
  payoutMax: 400,
}

export const toneDealPerks = [
  { title: 'המוצר אצלך', text: 'צנצנת formula 04 נשלחת הביתה' },
  { title: 'תדריך מוכן', text: 'מה להגיד, בלי לנחש' },
  { title: 'הסכם בוואטסאפ', text: 'הבוט שולח אחרי ההרשמה' },
  { title: 'סרטון אחד', text: 'מצולם בטלפון, בלי הפקה' },
]

export const toneDealEdit = {
  id: 'edit',
  title: 'עורכת את הסרטון',
  text: 'עריכה מלאה לפני השליחה — לא רק צילום גולמי.',
  amount: 50,
}

export const toneDealPlatforms = [
  { id: 'tiktok', title: 'טיקטוק', text: 'הערוץ שמשלם הכי הרבה בקמפיין', amount: 50 },
  { id: 'reels', title: 'רילס באינסטגרם', text: 'רילס לקהל שלך', amount: 40 },
  { id: 'reelsFeed', title: 'רילס בפיד', text: 'עולה גם לפיד, לא רק לרילס', amount: 20 },
  { id: 'igStory', title: 'סטורי באינסטגרם', text: 'סטורי עם לינק או תיוג', amount: 20 },
  { id: 'facebook', title: 'פייסבוק', text: 'פוסט או רילס בפייסבוק', amount: 10 },
  { id: 'status', title: 'סטטוס', text: 'סטטוס בוואטסאפ', amount: 10 },
]

export const toneHeroPoints = ['סרטון אחד', 'המוצר אצלך', 'תבנית מוכנה']

export const toneStrip = [
  { title: '5 מקומות', text: 'הפול נסגר אחרי חמש נרשמות' },
  { title: 'סרטון אחד', text: 'UGC קצר, מצולם בטלפון' },
  { title: 'המוצר אצלך', text: 'נשלח אלייך הביתה' },
  { title: 'הסכם בוואטסאפ', text: 'הבוט שולח אחרי ההרשמה' },
]

export const toneFeatures = [
  {
    title: 'שיזוף שמתחיל מבפנים',
    text: 'קומפלקס שמאיץ את ייצור המלנין הטבעי, לצד קרוטנואידים שבונים גוון ברונזה — גם בלי שמש.',
    icon: 'spark',
  },
  {
    title: 'עור חלק וזוהר',
    text: 'חומצה היאלורונית ואסטקסנטין נועלים לחות ומשפרים את מרקם העור — למראה קורן ובריא.',
    icon: 'sparkle',
  },
  {
    title: 'הגנה מבפנים',
    text: 'ליקופן ונוגדי חמצון מסייעים בהגנה על התאים מנזקי קרינה. מיוצר בישראל באישור משרד הבריאות.',
    icon: 'shield',
  },
]

export const toneTalkingPoints = [
  'התוסף הראשון בישראל לשיזוף מבפנים — פחות שמש, יותר שיזוף.',
  'כמוסה אחת ביום בבוקר. בלי ספריי, בלי שכבות.',
  'גוון ברונזה אחיד שנשאר שבועות, ועור שנראה זוהר ובריא.',
]

export const toneFacts = [
  { value: '30', label: 'כמוסות בצנצנת' },
  { value: '7', label: 'רכיבים פעילים' },
  { value: '4.9', label: 'דירוג לקוחות' },
]

export const toneSteps = [
  { n: 1, title: 'נרשמות לפול', text: 'חמישה מקומות. מי שנרשמת — נכנסת.', icon: 'users' },
  { n: 2, title: 'מקבלות את המוצר', text: 'צנצנת formula 04 נשלחת הביתה + תבנית.', icon: 'bag' },
  { n: 3, title: 'מצלמות סרטון אחד', text: 'בטלפון, לפי התבנית, בלי הפקה.', icon: 'camera' },
  { n: 4, title: 'מעלות ומקבלות', text: 'מעלות את הסרטון ומקבלות לפי ההסכם.', icon: 'money' },
]
