import { useCallback, useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import SocialProofLead from "./components/SocialProofLead";
import AboutFounder from "./components/AboutFounder";
import PaymentProof from "./components/PaymentProof";
import Timeline from "./components/Timeline";
import AudienceFit from "./components/AudienceFit";
import FloatingCTA from "./components/FloatingCTA";
import LegalFooter from "./components/LegalFooter";
import AssessmentModal from "./components/AssessmentModal";
import PrivacyModal from "./components/PrivacyModal";
import AccessibilityModal from "./components/AccessibilityModal";
import AccessibilityWidget from "./components/AccessibilityWidget";

export default function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const heroCtaRef = useRef<HTMLButtonElement | null>(null);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const openPrivacy = useCallback(() => setPrivacyOpen(true), []);
  const openA11y = useCallback(() => setA11yOpen(true), []);

  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#privacy") setPrivacyOpen(true);
      if (window.location.hash === "#accessibility") setA11yOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const clearHash = useCallback((hash: string) => {
    if (window.location.hash === hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const handleClosePrivacy = useCallback(() => {
    setPrivacyOpen(false);
    clearHash("#privacy");
  }, [clearHash]);

  const handleCloseA11y = useCallback(() => {
    setA11yOpen(false);
    clearHash("#accessibility");
  }, [clearHash]);

  return (
    <div className="ht-app">
      <a href="#main-content" className="ht-skip-link">
        דלג לתוכן הראשי
      </a>

      <main id="main-content" tabIndex={-1}>
        <Hero onOpenPanel={openPanel} ctaRef={heroCtaRef} />
        <SocialProofLead />
        <AboutFounder />
        <PaymentProof onOpenPanel={openPanel} />
        <Timeline />
        <AudienceFit onOpenPanel={openPanel} />
      </main>

      <LegalFooter onOpenPrivacy={openPrivacy} onOpenAccessibility={openA11y} />

      <FloatingCTA
        onOpenPanel={openPanel}
        hidden={heroCtaVisible || panelOpen || privacyOpen || a11yOpen}
      />
      <AccessibilityWidget onOpenStatement={openA11y} />
      <AssessmentModal
        open={panelOpen}
        onClose={closePanel}
        onOpenPrivacy={openPrivacy}
      />
      <PrivacyModal open={privacyOpen} onClose={handleClosePrivacy} />
      <AccessibilityModal open={a11yOpen} onClose={handleCloseA11y} />
    </div>
  );
}
