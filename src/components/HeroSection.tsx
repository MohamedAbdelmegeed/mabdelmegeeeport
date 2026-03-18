import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpeg";
import FloatingParticles from "./FloatingParticles";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { t } = useLanguage();

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-14">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, hsl(160 60% 45%), transparent 70%)", top: "10%", right: "-10%" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, hsl(280 60% 55%), transparent 70%)", bottom: "10%", left: "-10%" }}
        animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <FloatingParticles count={15} />

      <motion.div style={{ y, opacity }} className="max-w-3xl w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8 relative group"
        >
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-primary/40 glow-box-strong transition-shadow duration-500 group-hover:shadow-[0_0_100px_hsl(160_60%_45%/0.3)]">
            <img src={profilePhoto} alt={t.hero.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/20"
            animate={{ scale: [1.15, 1.25, 1.15], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/10"
            animate={{ scale: [1.3, 1.4, 1.3], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-4 h-4 rounded-full bg-primary border-2 border-background"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-primary text-sm md:text-base mb-4 tracking-wider"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          {t.hero.intro}<span className="text-gradient">{t.hero.name}</span>
          <motion.span
            className="text-primary inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >_</motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(160 60% 45% / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="font-heading text-sm px-8 py-3.5 bg-primary text-primary-foreground rounded-lg glow-box transition-all"
          >
            {t.hero.cta}
          </motion.a>
          <motion.a
            href="/Mohamed_Abdelmegeed_Resume.pdf"
            download
            whileHover={{ scale: 1.05, borderColor: "hsl(160, 60%, 45%)" }}
            whileTap={{ scale: 0.95 }}
            className="font-heading text-sm px-8 py-3.5 border-glow rounded-lg text-foreground glass transition-all inline-flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {t.hero.cv}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
