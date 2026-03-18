import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      onClick={toggleLang}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg glass border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <motion.span
        key={lang}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-base leading-none"
      >
        {lang === "en" ? "🇪🇬" : "🇺🇸"}
      </motion.span>
      <motion.span
        key={lang + "-label"}
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="font-heading text-xs font-semibold text-muted-foreground"
      >
        {lang === "en" ? "عربي" : "EN"}
      </motion.span>
    </motion.button>
  );
};

export default LanguageToggle;
