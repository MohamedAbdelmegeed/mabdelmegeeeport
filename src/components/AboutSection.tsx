import { motion } from "framer-motion";
import { Code2, Database, Brain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Code2, title: t.about.h1Title, desc: t.about.h1Desc },
    { icon: Database, title: t.about.h2Title, desc: t.about.h2Desc },
    { icon: Brain, title: t.about.h3Title, desc: t.about.h3Desc },
  ];

  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-primary text-sm mb-2 tracking-wider"
          >
            {t.about.tag}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-bold mb-12"
          >
            {t.about.title}<span className="text-gradient">{t.about.titleHighlight}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass border-glow rounded-2xl p-6 md:p-10 glow-box mb-12"
          >
            <p className="text-secondary-foreground leading-relaxed mb-4 text-base md:text-lg">
              {t.about.p1}
            </p>
            <p className="text-secondary-foreground leading-relaxed mb-4 text-base md:text-lg">
              {t.about.p2}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {t.about.p3}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                whileHover={{ y: -5, boxShadow: "0 0 40px hsl(160 60% 45% / 0.1)" }}
                className="glass border-glow rounded-xl p-5 text-center group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
