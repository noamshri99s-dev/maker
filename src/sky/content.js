/**
 * Maker home page — written for business owners.
 * Model (Oct 2026): Maker is a UGC agency. We recruit Israeli creators for
 * each campaign, the business picks who films, every creator has a fixed
 * price (by tier), and every video is approved before it is delivered.
 *
 * ▸ Your reels: fill `work.reels` below (see the note there).
 */

export const nav = {
  status: 'סוכנות UGC ישראלית',
  links: [
    { label: 'למה Maker', href: '#why' },
    { label: 'איך זה עובד', href: '#how' },
    { label: 'העבודות שלנו', href: '#work' },
  ],
  creators: 'אני יוצר/ת',
  cta: 'לתאם שיחה',
}

export const hero = {
  eyebrow: 'סוכנות UGC',
  titleA: 'סרטונים אמיתיים.',
  titleB: 'מאנשים אמיתיים.',
  sub: 'יוצרים ישראלים מצלמים את המוצר שלכם — בבית, בטלפון, בשפה שלהם. אתם בוחרים מי מצלם, ואנחנו מנהלים את כל השאר, מהבריף ועד הסרטון המוכן.',
  cta: 'לתאם שיחה',
  secondary: 'לראות עבודות',
  cards: {
    ready: { title: 'סרטון חדש מוכן', meta: 'ממתין לאישור שלך' },
    picked: { title: '3 יוצרים הוצעו לך', meta: 'בוחרים מי מצלם' },
    reel: { title: 'רילס בעמוד של היוצר', meta: 'תוספת לקמפיין' },
  },
}

export const phone = {
  lines: ['אתם בוחרים.', 'אנחנו מביאים', 'את היוצרים.'],
  text: 'בלי סטודיו, בלי שחקנים ובלי לרדוף אחרי משפיענים. בונים איתכם בריף ברור, היוצרים מצלמים — וכל סרטון עובר אישור לפני שהוא מגיע אליכם.',
  underline: 'בריף ברור',
  note: 'ככה נראה הבריף ליוצרים',
  bubbles: [
    { value: 'UGC', label: 'סרטונים אותנטיים' },
    { value: 'אתם', label: 'בוחרים את היוצרים' },
    { value: 'עברית', label: 'יוצרים ישראלים' },
  ],
  brief: {
    campaign: 'קמפיין סקין-קר',
    hook: '"גיליתי משהו שאני חייבת לספר לכן..."',
    checklist: ['מצלמים באור יום', 'המוצר קרוב לפנים', '15–30 שניות'],
    rec: 'להתחיל לצלם',
  },
}

export const band = 'UGC · REAL PEOPLE · REAL VIDEOS · MAKER · '

export const bento = {
  title: ['למה עסקים', 'עובדים עם Maker'],
  big: {
    value: 'UGC',
    title: 'נראה כמו המלצה של חבר',
    text: 'לא פרסומת מלוטשת. אנשים אמיתיים, בבית, בשפה שלהם — בדיוק מה שעוצר גלילה, גם באורגני וגם בממומן.',
    chip: 'מוכן לעלות גם כמודעה',
  },
  pay: {
    title: 'מחיר קבוע לכל יוצר',
    text: 'יודעים מראש כמה זה עולה. מחירון לפי גודל היוצר: Nano, Micro או Mid-tier.',
    row: 'קמפיין · 5 יוצרים',
    meta: 'מחיר סגור מראש',
    status: 'מאושר',
  },
  picked: {
    title: 'אתם בוחרים את היוצרים',
    text: 'אנחנו מגייסים מועמדים שמתאימים לקהל שלכם — לפי גיל, אזור, נישה ומראה. אתם בוחרים מי מצלם.',
    tag: 'נבחרה',
  },
  reel: {
    title: 'גם בעמוד של היוצר',
    text: 'אפשר להוסיף פרסום של הסרטון כרילס בעמוד של היוצר, מול הקהל שלו.',
    lesson: 'רילס · עמוד היוצר',
  },
  brief: {
    title: 'בריף ותסריט — עלינו',
    text: 'בונים איתכם בריף ברור, והיוצרים יודעים בדיוק מה לצלם ומה להגיד.',
  },
  team: {
    title: 'אנחנו מנהלים הכל',
    text: 'גיוס, חוזים, בריף ואישור של כל סרטון. ואם צריך — יום צילום שבו היוצרים מגיעים אליכם לעסק.',
    chip: 'כל סרטון מאושר לפני שהוא מגיע אליכם',
  },
}

export const how = {
  title: 'איך זה עובד',
  steps: [
    {
      icon: 'chat',
      title: 'שיחה קצרה',
      text: 'מבינים מה אתם מוכרים, למי, ואיזה סרטונים יעבדו לכם.',
      note: 'בלי התחייבות',
    },
    {
      icon: 'form',
      title: 'הצעה ו-NDA',
      text: 'שולחים הצעה מסודרת עם מחיר לכל יוצר. חותמים על NDA ופותחים קמפיין.',
    },
    {
      icon: 'users',
      title: 'מגייסים יוצרים',
      text: 'מוצאים יוצרים שמתאימים לקהל שלכם, לפי גיל, אזור, נישה וסגנון.',
    },
    {
      icon: 'pick',
      title: 'אתם בוחרים',
      text: 'מקבלים את המועמדים ובוחרים מי מצלם את המוצר שלכם.',
      note: 'שום הפתעות',
    },
    {
      icon: 'play',
      title: 'מקבלים סרטונים',
      text: 'שולחים את המוצר, היוצרים מצלמים, והסרטונים מגיעים מאושרים ומוכנים לעלות.',
    },
  ],
}

export const work = {
  title: ['העבודות שלנו.', 'ככה זה נראה בפיד.'],
  text: 'סרטונים שיוצרים צילמו לעסקים שעבדו איתנו. לחצו על סרטון כדי לצפות.',
  note: 'אמיתי, מהטלפון',
  /**
   * ▸ The reels on the page — up to 6 work best.
   *   Instagram: paste the reel's link, e.g.
   *     { instagram: 'https://www.instagram.com/reel/ABC123xyz/' }
   *   Your own file (loads faster and looks cleanest): put the mp4 in
   *   /public/reels/ and write
   *     { video: '/reels/emily-1.mp4', poster: '/reels/emily-1.jpg', label: 'אמילי' }
   *   An empty {} shows a "your reel here" placeholder.
   */
  reels: [
    { instagram: 'https://www.instagram.com/reel/De-BOnICwtq/' },
    { instagram: 'https://www.instagram.com/reel/De-BCAAirym/' },
    { instagram: 'https://www.instagram.com/reel/De-B46rikW4/' },
    { instagram: 'https://www.instagram.com/reel/De-BkqdiZWx/' },
    { instagram: 'https://www.instagram.com/reel/DfR7E4Oilrf/' },
    { instagram: 'https://www.instagram.com/reel/DfP3joxE9YU/' },
  ],
  /** Link to the Instagram profile with all the work. Leave '' to hide the button. */
  profileUrl: '',
  profileLabel: 'לכל העבודות באינסטגרם',
}

export const finalCta = {
  title: ['בואו', 'נצלם.'],
  text: 'שיחה קצרה, הצעה מסודרת, ויוצרים אמיתיים שמצלמים את המוצר שלכם.',
  cta: 'לתאם שיחה',
  note: 'רבע שעה, בלי התחייבות',
  meta: 'מחיר קבוע לכל יוצר · אתם בוחרים מי מצלם · כל סרטון מאושר',
  creators: 'אני יוצר/ת ורוצה לצלם לקמפיינים',
}

/** The brief form that opens from every "לתאם שיחה" button. */
export const brief = {
  steps: {
    contact: { emoji: '👋', title: 'נעים להכיר!', text: 'רק טלפון ושם העסק — ונחזור אליכם בוואטסאפ.' },
    budget: { emoji: '💸', title: 'כמה בא לכם להשקיע?', text: 'גררו את הפס לתקציב של הקמפיין. אפשר לשנות בשיחה.' },
    type: { emoji: '🎬', title: 'איזה קמפיין?', text: 'איפה מצלמים — אצלכם, או אצל היוצרים?' },
    size: { emoji: '⭐', title: 'איזה יוצרים?', text: 'אפשר לבחור יותר מאחד.' },
  },
  budget: {
    min: 1500,
    max: 30000,
    step: 500,
    start: 5000,
    // the label under the number changes as the slider moves
    moods: [
      { from: 0, emoji: '🌱', label: 'מתחילים בקטן' },
      { from: 4000, emoji: '🚀', label: 'קמפיין רציני' },
      { from: 12000, emoji: '🔥', label: 'הרבה יוצרים, הרבה תוכן' },
      { from: 25000, emoji: '👑', label: 'הולכים על הכל' },
    ],
  },
  types: [
    { id: 'onsite', emoji: '🏪', title: 'היוצרים מגיעים לעסק', text: 'יום צילום אצלכם — מסעדה, חנות, סטודיו או קליניקה.' },
    { id: 'product', emoji: '📦', title: 'המוצר מגיע ליוצרים', text: 'שולחים מוצר, והיוצרים מצלמים אותו בבית.' },
  ],
  sizes: [
    { id: 'nano', emoji: '🌱', title: 'Nano', text: 'יוצרים בתחילת הדרך — אותנטי ומשתלם' },
    { id: 'micro', emoji: '🚀', title: 'Micro', text: 'קהל נאמן שמגיב ומתעניין' },
    { id: 'mid', emoji: '⭐', title: 'Mid-tier', text: 'יוצרים מוכרים עם חשיפה רחבה' },
    { id: 'unsure', emoji: '🤷', title: 'לא בטוחים — תמליצו לנו', text: 'נתאים לכם לפי המוצר והתקציב' },
  ],
  done: {
    title: 'קיבלנו! 🎉',
    text: 'נחזור אליכם בוואטסאפ ממש בקרוב עם רעיונות ליוצרים שמתאימים לכם.',
    cta: 'סגירה',
  },
}
