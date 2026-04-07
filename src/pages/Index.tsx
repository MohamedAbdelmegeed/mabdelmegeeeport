import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LoadingScreen from "@/components/LoadingScreen";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ProfessionalDevelopmentSection = lazy(() => import("@/components/ProfessionalDevelopmentSection"));
const TimelineSection = lazy(() => import("@/components/TimelineSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Divider = () => (
  <div className="max-w-4xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
  </div>
);

const Index = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background noise-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <HeroSection />
        <Suspense fallback={null}>
          <Divider />
          <AboutSection />
          <Divider />
          <TimelineSection />
          <Divider />
          <SkillsSection />
          <Divider />
          <ProjectsSection />
          <Divider />
          <ProfessionalDevelopmentSection />
          <Divider />
          <ContactSection />
        </Suspense>
        <footer className="py-10 px-6 border-t border-border/50 text-center relative">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-xs text-muted-foreground"
          >
            © {new Date().getFullYear()} {t.footer.text}
          </motion.p>
        </footer>
        <BackToTop />
      </motion.div>
    </>
  );
};

export default Index;
