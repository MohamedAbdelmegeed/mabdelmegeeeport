import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Database, Brain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef } from "react";

const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const highlights = [
    { icon: Code2, title: t.about.h1Title, desc: t.about.h1Desc },
    { icon: Database, title: t.about.h2Title, desc: t.about.h2Desc },
    { icon: Brain, title: t.about.h3Title, desc: t.about.h3Desc },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 15 },
    },
  };

  return (
    <section ref={sectionRef} id="about" className="py-28 px-6 relative overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full -left-40 top-0"
        style={{
          y: bgY,
          scale: orbScale,
          background: "radial-gradient(circle, hsl(160 60% 45% / 0.06), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full -right-32 bottom-0"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(280 60% 55% / 0.04), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            className="font-heading text-primary text-sm mb-2 tracking-[0.2em] uppercase"
          >
            {t.about.tag}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" as const }}
            className="font-heading text-3xl md:text-5xl font-bold mb-12"
          >
            {t.about.title}<span className="text-gradient">{t.about.titleHighlight}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" as const }}
            className="glass-ultra border-glow rounded-2xl p-6 md:p-10 glow-box mb-12 shimmer"
          >
            <p className="text-secondary-foreground leading-relaxed mb-4 text-base md:text-lg">{t.about.p1}</p>
            <p className="text-secondary-foreground leading-relaxed mb-4 text-base md:text-lg">{t.about.p2}</p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{t.about.p3}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  boxShadow: "0 0 50px hsl(160 60% 45% / 0.15), 0 20px 40px hsl(160 60% 45% / 0.08)",
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="glass-ultra border-glow rounded-xl p-5 text-center group cursor-default shimmer"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring" }}
                  className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:shadow-[0_0_20px_hsl(160_60%_45%/0.2)]"
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
