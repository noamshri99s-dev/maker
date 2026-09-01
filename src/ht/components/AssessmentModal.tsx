import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "./Icons";
import {
  CALENDLY_BOOKING_URL,
  STEPS,
  submitAssessment,
  type AssessmentAnswers,
} from "../assessmentData";
import { useFocusTrap } from "../hooks/useFocusTrap";

const MAX_TEXT = 300;
const QUIZ_BAR_DETAILS = 70;
const QUIZ_BAR_QUESTIONS = 90;

type AssessmentModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenPrivacy?: () => void;
};

export default function AssessmentModal({
  open,
  onClose,
  onOpenPrivacy,
}: AssessmentModalProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // שדות מסך הפרטים (מסך ראשון)
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [quizBarPct, setQuizBarPct] = useState(0);
  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    phone?: string;
    terms?: string;
  }>({});
  const [statusMsg, setStatusMsg] = useState("");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useFocusTrap(open, onClose, closeBtnRef);

  const step = STEPS[index];
  const total = STEPS.length;

  // נעילת גלילת הרקע + סגירה ב-Escape (מסך מלא גם במובייל)
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.insetInline = "0";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.classList.add("ht-modal-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevOverflow;
      document.body.style.position = "";
      document.body.style.insetInline = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.classList.remove("ht-modal-open");
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // איפוס בעת פתיחה מחדש
  useEffect(() => {
    if (open) {
      setIndex(0);
      setDirection(1);
      setDone(false);
      setSubmitting(false);
      setFirstName("");
      setPhone("");
      setAgreeTerms(false);
      setAgreeMarketing(false);
      setAnswers({});
      setQuizBarPct(0);
    }
  }, [open]);

  // אנימציית בר ההתקדמות — 70% בפרטים, 90% בשאלון
  useEffect(() => {
    if (!open || done) {
      setQuizBarPct(0);
      return;
    }

    const target =
      step.type === "details" ? QUIZ_BAR_DETAILS : QUIZ_BAR_QUESTIONS;
    const startValue = step.type === "details" ? 0 : QUIZ_BAR_DETAILS;
    let frame = 0;
    const duration = step.type === "details" ? 1400 : 900;
    const start = performance.now();

    setQuizBarPct(startValue);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setQuizBarPct(Math.round(startValue + (target - startValue) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, [open, done, step.type]);

  const calendlyEmbedUrl = useMemo(() => {
    const url = new URL(CALENDLY_BOOKING_URL);
    url.searchParams.set("layout", "mobile");
    if (firstName.trim()) url.searchParams.set("name", firstName.trim());
    return url.toString();
  }, [firstName]);

  const goNext = () => {
    setDirection(1);
    setIndex((i) => Math.min(i + 1, total - 1));
  };
  const goBack = () => {
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  };

  const currentText = step.type === "text" ? answers[step.id] ?? "" : "";

  const validateDetails = () => {
    const next: typeof formErrors = {};
    if (firstName.trim().length < 2) {
      next.firstName = "יש להזין שם פרטי של לפחות שני תווים";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 10) {
      next.phone = "מספר טלפון חייב להכיל 9 עד 10 ספרות";
    }
    if (!agreeTerms) {
      next.terms = "יש לאשר את התקנון והתנאים כדי להמשיך";
    }
    setFormErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitAll = async (finalAnswers: AssessmentAnswers) => {
    if (submitting) return;
    setSubmitting(true);
    setStatusMsg("שולח את הפרטים…");
    const payload: AssessmentAnswers = {
      ...finalAnswers,
      fullName: firstName.trim(),
      phone: phone.trim(),
    };
    try {
      await submitAssessment(payload);
      setDone(true);
      setStatusMsg("הפרטים התקבלו בהצלחה. אפשר לקבוע פגישה ביומן.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("assessment submit failed", err);
      setDone(true);
      setStatusMsg("הפרטים נשמרו. אפשר לקבוע פגישה ביומן.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectRadio = (value: string) => {
    if (step.type !== "radio") return;
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    const isLast = index === total - 1;
    setTimeout(() => {
      if (isLast) submitAll(next);
      else goNext();
    }, 220);
  };

  const startQuestions = () => {
    if (!validateDetails()) return;
    setAnswers((a) => ({
      ...a,
      consent: agreeTerms ? "true" : "false",
      marketing: agreeMarketing ? "true" : "false",
    }));
    goNext();
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="ht-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            ref={dialogRef as React.RefObject<HTMLDivElement>}
            className={`ht-modal${done ? " ht-modal--booking" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="שאלון אפיון"
            initial={{ opacity: 0, y: "8%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "6%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="ht-modal__back"
              onClick={onClose}
              aria-label="חזרה לעמוד"
            >
              <span>חזור</span>
              <ArrowRightIcon size={16} />
            </button>
            {done ? (
              <div className="py-4 text-center">
                <div className="mt-8 mb-6">
                  <div className="ht-progress">
                    <div className="ht-progress__bar" style={{ width: "100%" }} />
                  </div>
                </div>
                <span
                  className="mx-auto flex items-center justify-center rounded-full"
                  style={{
                    width: "4rem",
                    height: "4rem",
                    background: "var(--ht-primary)",
                    color: "#fff",
                  }}
                >
                  <CheckIcon size={32} />
                </span>
                <div className="sr-only" role="status" aria-live="polite">
                  {statusMsg}
                </div>
                <h2 className="mt-6 text-2xl font-black">נקבע שיחה לבניית הקמפיין</h2>
                <p className="mx-auto mt-3 max-w-sm" style={{ color: "var(--ht-text-soft)" }}>
                  קיבלנו את הבריף. בחר עכשיו את הזמן שנוח לך:
                </p>
                <div className="ht-calendly-embed mt-6 w-full overflow-hidden rounded-xl">
                  <iframe
                    key={calendlyEmbedUrl}
                    title="תיאום שיחה לבניית קמפיין"
                    src={calendlyEmbedUrl}
                    className="ht-calendly-embed__frame"
                    loading="eager"
                    allow="payment"
                  />
                </div>
              </div>
            ) : (
              <>
                <div
                  className="ht-quiz-bar mt-8 mb-6"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={quizBarPct}
                  aria-label={`עברת כבר את רוב הדרך, ${quizBarPct} אחוז`}
                >
                  <div className="ht-quiz-bar__track">
                    <div
                      className="ht-quiz-bar__fill"
                      style={{ width: `${quizBarPct}%` }}
                    >
                      {quizBarPct >= 28 && (
                        <span className="ht-quiz-bar__label">עברת כבר את רוב הדרך</span>
                      )}
                      {quizBarPct >= 8 && (
                        <span className="ht-quiz-bar__pct">{quizBarPct}%</span>
                      )}
                    </div>
                  </div>
                </div>

                {step.type !== "details" && index === 1 && (
                  <div className="ht-quiz-hold">
                    <p className="ht-quiz-hold__step">עוד שלב אחד — עדיין לא סיימנו...</p>
                    <p className="ht-quiz-hold__warn" role="status">
                      <span aria-hidden="true">⚠️</span>
                      <span>רגע! אל תצא מהדף</span>
                      <span aria-hidden="true">⚠️</span>
                    </p>
                    <p className="ht-quiz-hold__text">
                      יש כאן שאלון קצר (בערך 40 שניות) שיעזור לי להתכונן לשיחה איתך.
                      מי שעונה — חוזרים אליו קודם :)
                    </p>
                    <p className="ht-quiz-hold__go">יאללה, בוא נתחיל!</p>
                  </div>
                )}

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3
                      className="font-black leading-snug"
                      style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.7rem)" }}
                    >
                      {step.question}
                    </h3>

                    {step.type === "details" && (
                      <>
                        <ul className="mt-4 space-y-2">
                          {step.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="mt-1 shrink-0" style={{ color: "#22c55e" }}>
                                <CheckIcon size={18} />
                              </span>
                              <span style={{ color: "var(--ht-text-soft)" }}>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* שאלת רדיו */}
                    {step.type === "radio" && (
                      <div
                        className="mt-6 space-y-3"
                        role="radiogroup"
                        aria-label={step.question}
                      >
                        {step.options.map((opt) => {
                          const selected = answers[step.id] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              className={`ht-radio-card ${selected ? "ht-radio-card--selected" : ""}`}
                              onClick={() => selectRadio(opt)}
                            >
                              <span className="ht-radio-dot" aria-hidden="true">
                                <span className="ht-radio-dot__fill" />
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* שאלת טקסט */}
                    {step.type === "text" && (
                      <div className="mt-6">
                        <label className="ht-field-label" htmlFor={`ht-text-${step.id}`}>
                          {step.question}
                        </label>
                        <textarea
                          id={`ht-text-${step.id}`}
                          className="ht-field"
                          maxLength={MAX_TEXT}
                          placeholder={step.placeholder}
                          value={currentText}
                          aria-describedby={`ht-text-count-${step.id}`}
                          onChange={(e) =>
                            setAnswers((a) => ({ ...a, [step.id]: e.target.value }))
                          }
                        />
                        <div
                          id={`ht-text-count-${step.id}`}
                          className="mt-2 text-sm"
                          style={{ color: "var(--ht-text-mute)", direction: "ltr", textAlign: "left" }}
                        >
                          {currentText.length}/{MAX_TEXT}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="ht-btn" onClick={goNext} type="button">
                            <span>הבא</span>
                            <svg
                              className="ht-btn__arrow"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M19 12H5M5 12l6-6M5 12l6 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* מסך פרטים (מסך ראשון) */}
                    {step.type === "details" && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="ht-field-label" htmlFor="ht-lead-name">
                            שם פרטי
                          </label>
                          <input
                            id="ht-lead-name"
                            className="ht-field ht-field--lead"
                            type="text"
                            name="given-name"
                            autoComplete="given-name"
                            dir="rtl"
                            placeholder="השם הפרטי שלך"
                            value={firstName}
                            required
                            aria-required="true"
                            aria-invalid={formErrors.firstName ? "true" : "false"}
                            aria-describedby={
                              formErrors.firstName ? "ht-lead-name-err" : undefined
                            }
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              if (formErrors.firstName) {
                                setFormErrors((f) => ({ ...f, firstName: undefined }));
                              }
                            }}
                          />
                          {formErrors.firstName && (
                            <p id="ht-lead-name-err" className="ht-field-error" role="alert">
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="ht-field-label" htmlFor="ht-lead-phone">
                            מספר טלפון
                          </label>
                          <input
                            id="ht-lead-phone"
                            className="ht-field ht-field--lead"
                            type="tel"
                            name="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            dir="ltr"
                            placeholder="050-1234567"
                            value={phone}
                            required
                            aria-required="true"
                            aria-invalid={formErrors.phone ? "true" : "false"}
                            aria-describedby={
                              formErrors.phone ? "ht-lead-phone-err" : "ht-lead-phone-hint"
                            }
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (formErrors.phone) {
                                setFormErrors((f) => ({ ...f, phone: undefined }));
                              }
                            }}
                          />
                          <p id="ht-lead-phone-hint" className="ht-field-hint">
                            חשוב לרשום את המספר שתענה ממנו כי לשם נתקשר
                          </p>
                          {formErrors.phone && (
                            <p id="ht-lead-phone-err" className="ht-field-error" role="alert">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                        <div className="ht-consent space-y-2.5">
                          <label className="ht-consent__row" htmlFor="ht-agree-terms">
                            <input
                              id="ht-agree-terms"
                              type="checkbox"
                              checked={agreeTerms}
                              required
                              aria-required="true"
                              aria-invalid={formErrors.terms ? "true" : "false"}
                              aria-describedby={
                                formErrors.terms ? "ht-agree-terms-err" : undefined
                              }
                              onChange={(e) => {
                                setAgreeTerms(e.target.checked);
                                if (formErrors.terms) {
                                  setFormErrors((f) => ({ ...f, terms: undefined }));
                                }
                              }}
                            />
                            <span>
                              אני מאשר/ת את{" "}
                              {onOpenPrivacy ? (
                                <button
                                  type="button"
                                  className="ht-consent__link-btn"
                                  onClick={onOpenPrivacy}
                                >
                                  התקנון
                                </button>
                              ) : (
                                <a
                                  href={step.termsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  התקנון
                                </a>
                              )}{" "}
                              והתנאים
                            </span>
                          </label>
                          {formErrors.terms && (
                            <p id="ht-agree-terms-err" className="ht-field-error" role="alert">
                              {formErrors.terms}
                            </p>
                          )}
                          <label className="ht-consent__row" htmlFor="ht-agree-marketing">
                            <input
                              id="ht-agree-marketing"
                              type="checkbox"
                              checked={agreeMarketing}
                              onChange={(e) => setAgreeMarketing(e.target.checked)}
                            />
                            <span>אני מאשר/ת לקבל תכנים, עדכונים ומדריכים</span>
                          </label>
                        </div>
                        <div className="ht-details-cta">
                          <button
                            className="ht-btn ht-btn--wide ht-btn--details"
                            type="button"
                            onClick={startQuestions}
                          >
                            {step.buttonLabel}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* כפתור חזרה */}
                {index > 0 && (
                  <div className="mt-6">
                    <button className="ht-back-btn" onClick={goBack} type="button">
                      <ArrowRightIcon size={18} />
                      <span>חזור</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
