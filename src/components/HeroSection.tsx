import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { Download, Zap } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpeg";
import TypingAnimation from "./TypingAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingParticles = lazy(() => import("./FloatingParticles"));

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.6 + i * 0.04,
        duration: 0.5,
        type: "spring",
        stiffness: 150,
      },
    }),
  };

  const nameLetters = t.hero.name.split("");

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-14">
      {/* Dragon energy orbs */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(160 60% 45% / 0.08), hsl(160 60% 45% / 0.02), transparent 70%)",
              top: "5%",
              right: "-15%",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 40, 0],
              y: [0, -30, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(280 60% 55% / 0.06), transparent 70%)",
              bottom: "5%",
              left: "-15%",
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
          {/* Diagonal streaks */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 100px, hsl(160 60% 45% / 0.05) 100px, hsl(160 60% 45% / 0.05) 101px)",
            }}
            animate={{ x: [0, 100], y: [0, -100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <Suspense fallback={null}>
        <FloatingParticles count={isMobile ? 4 : 12} />
      </Suspense>

      <motion.div style={isMobile ? { opacity } : { y, opacity }} className="max-w-3xl w-full relative z-10 flex flex-col items-center text-center">
        {/* Profile photo with dragon aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.25 }}
          className="mb-8 relative group"
        >
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-primary/40 glow-box-strong transition-all duration-700 group-hover:shadow-[0_0_120px_hsl(160_60%_45%/0.4)] group-hover:border-primary/60">
            <img
              src={profilePhoto}
              alt={t.hero.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="eager"
              width={208}
              height={208}
            />
          </div>
          {!isMobile && (
            <>
              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-[-8px] rounded-full"
                style={{ border: "1px solid hsl(160 60% 45% / 0.2)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{ top: "50%", left: "50%", transformOrigin: "0 0" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "120px" }}>
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(160_60%_45%/0.8)]" />
                </div>
              </motion.div>
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-[-4px] rounded-full border border-primary/15"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-[-4px] rounded-full border border-accent/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </>
          )}
          {/* Status indicator */}
          <motion.div
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_12px_hsl(160_60%_45%/0.6)]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Greeting with flash */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-heading text-primary text-sm md:text-base mb-4 tracking-[0.2em] uppercase"
        >
          <Zap className="w-3 h-3 inline-block mr-1 mb-0.5" />
          {t.hero.greeting}
          <Zap className="w-3 h-3 inline-block ml-1 mb-0.5" />
        </motion.p>

        {/* Name with per-letter animation */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {t.hero.intro}
          </motion.span>
          <span className="text-gradient inline-block" style={{ perspective: "600px" }}>
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ display: letter === " " ? "inline" : "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </span>
          <motion.span
            className="text-primary inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          >
            _
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          <TypingAnimation text={t.hero.subtitle} delay={1.2} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: "spring" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.08, boxShadow: "0 0 60px hsl(160 60% 45% / 0.4), 0 0 120px hsl(160 60% 45% / 0.1)" }}
            whileTap={{ scale: 0.92 }}
            className="font-heading text-sm px-8 py-3.5 bg-primary text-primary-foreground rounded-lg glow-box transition-all border-glow-animated relative overflow-hidden group"
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
          <motion.a
            href="/Mohamed_Abdelmegeed_Resume.pdf"
            download
            whileHover={{ scale: 1.08, borderColor: "hsl(160, 60%, 45%)" }}
            whileTap={{ scale: 0.92 }}
            className="font-heading text-sm px-8 py-3.5 border-glow rounded-lg text-foreground glass-ultra transition-all inline-flex items-center justify-center gap-2 shimmer"
          >
            <Download className="w-4 h-4" />
            {t.hero.cv}
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border border-primary/30 flex items-start justify-center p-1.5 backdrop-blur-sm"
          >
            <motion.div
              className="w-1 h-2.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
