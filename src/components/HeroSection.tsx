import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense, useCallback } from "react";
import { Download, Zap } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.webp";
import TypingAnimation from "./TypingAnimation";
import StatsCounter from "./StatsCounter";
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
  const photoRef = useRef<HTMLDivElement>(null);

  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 14;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * -14;
    photoRef.current.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${dy}deg) scale(1.04)`;
  }, [isMobile]);

  const resetTilt = useCallback(() => {
    if (!photoRef.current) return;
    photoRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.6 + i * 0.04,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 150,
      },
    }),
  };

  const nameLetters = t.hero.name.split("");

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-14">
      {!isMobile && (
        <>
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(160 60% 45% / 0.07), transparent 70%)",
              top: "5%",
              right: "-15%",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(280 60% 55% / 0.05), transparent 70%)",
              bottom: "5%",
              left: "-15%",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </>
      )}

      <Suspense fallback={null}>
        <FloatingParticles count={isMobile ? 2 : 6} />
      </Suspense>

      <motion.div style={isMobile ? { opacity } : { y, opacity }} className="max-w-3xl w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.25 }}
          className="mb-8 relative group"
        >
          <div
            ref={photoRef}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ transition: "transform 0.15s ease-out", willChange: "transform" }}
            className="relative"
          >
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-primary/40 glow-box-strong transition-all duration-700 group-hover:shadow-[0_0_120px_hsl(160_60%_45%/0.4)] group-hover:border-primary/60">
            <img
              src={profilePhoto}
              alt={t.hero.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="eager"
              decoding="async"
              width={208}
              height={208}
            />
          </div>
          {!isMobile && (
            <>
              <div
                className="absolute inset-[-8px] rounded-full"
                style={{ border: "1px solid hsl(160 60% 45% / 0.2)" }}
              />
              <div
                className="absolute inset-[-4px] rounded-full border border-primary/10"
              />
            </>
          )}
          <div
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_12px_hsl(160_60%_45%/0.6)]"
            style={{ animation: "stat-pulse 2s ease-in-out infinite" }}
          />
          </div>
        </motion.div>

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

        <h1 className="font-heading font-bold leading-[0.95] mb-6">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
          >
            {t.hero.intro}
          </motion.span>
          <div className="mt-1 flex items-end justify-center gap-1 whitespace-nowrap text-[clamp(1.15rem,6.4vw,4.5rem)] md:text-6xl lg:text-7xl">
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
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          <TypingAnimation text={t.hero.subtitle} delay={1.2} />
        </motion.div>

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

        <StatsCounter />

        <motion.div
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
