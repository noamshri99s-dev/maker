export type A11yPrefs = {
  textScale: 100 | 110 | 125 | 150;
  readableFont: boolean;
  letterSpacing: boolean;
  highContrast: boolean;
  darkMode: boolean;
  lightMode: boolean;
  invert: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  highlightHeadings: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  readingMask: boolean;
  stopAnimations: boolean;
};

export const A11Y_STORAGE_KEY = "a11y-prefs";

export const DEFAULT_A11Y_PREFS: A11yPrefs = {
  textScale: 100,
  readableFont: false,
  letterSpacing: false,
  highContrast: false,
  darkMode: false,
  lightMode: false,
  invert: false,
  grayscale: false,
  underlineLinks: false,
  highlightHeadings: false,
  bigCursor: false,
  readingGuide: false,
  readingMask: false,
  stopAnimations: false,
};

const CLASS_MAP: { key: keyof A11yPrefs; cls: string; when?: (p: A11yPrefs) => boolean }[] = [
  { key: "readableFont", cls: "a11y-readable-font" },
  { key: "letterSpacing", cls: "a11y-letter-spacing" },
  { key: "highContrast", cls: "a11y-high-contrast" },
  { key: "darkMode", cls: "a11y-dark" },
  { key: "lightMode", cls: "a11y-light" },
  { key: "invert", cls: "a11y-invert" },
  { key: "grayscale", cls: "a11y-grayscale" },
  { key: "underlineLinks", cls: "a11y-underline-links" },
  { key: "highlightHeadings", cls: "a11y-highlight-headings" },
  { key: "bigCursor", cls: "a11y-big-cursor" },
  { key: "readingGuide", cls: "a11y-reading-guide" },
  { key: "readingMask", cls: "a11y-reading-mask" },
  { key: "stopAnimations", cls: "a11y-stop-animations" },
];

export function loadA11yPrefs(): A11yPrefs {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y_PREFS };
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return { ...DEFAULT_A11Y_PREFS, ...parsed };
  } catch {
    return { ...DEFAULT_A11Y_PREFS };
  }
}

export function saveA11yPrefs(prefs: A11yPrefs) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

/** מחלקות על <html> + font-size — גם לפני React */
export function applyA11yPrefs(prefs: A11yPrefs) {
  const html = document.documentElement;
  for (const { key, cls } of CLASS_MAP) {
    html.classList.toggle(cls, Boolean(prefs[key]));
  }
  html.classList.toggle("a11y-text-110", prefs.textScale === 110);
  html.classList.toggle("a11y-text-125", prefs.textScale === 125);
  html.classList.toggle("a11y-text-150", prefs.textScale === 150);
  html.style.setProperty("--a11y-text-scale", String(prefs.textScale / 100));
  html.style.fontSize = `${(16 * prefs.textScale) / 100}px`;
}
