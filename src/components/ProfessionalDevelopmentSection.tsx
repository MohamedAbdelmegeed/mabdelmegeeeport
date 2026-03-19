import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { lazy, Suspense } from "react";

const ProfessionalDevelopmentSection = () => {
  const { t } = useLanguage();

  return (
    <section id="development" className="py-28 px-6 relative">
      <FloatingParticles count={5} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {t.development.tag}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-12"
        >
          {t.development.title}<span className="text-gradient">{t.development.titleHighlight}</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute start-6 md:start-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-6">
            {t.development.events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
                className="relative ps-16 md:ps-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", bounce: 0.5 }}
                  className="absolute start-2 md:start-4 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-primary" />
                </motion.div>

                <motion.div
                  className="absolute start-2 md:start-4 w-8 h-8 rounded-full border border-primary/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />

                <motion.div
                  whileHover={{ x: 6, boxShadow: "0 0 40px hsl(160 60% 45% / 0.1)" }}
                  className="glass border-glow rounded-xl p-5 transition-all cursor-default"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading text-sm font-bold text-foreground">{event.title}</h3>
                    <span className="font-heading text-xs text-primary/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{event.org}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activities & Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-6">
            {t.development.activitiesTitle}<span className="text-gradient">{t.development.activitiesHighlight}</span>
          </h3>
          <div className="space-y-3">
            {t.development.activities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="glass border-glow rounded-xl p-4 flex items-center gap-3 cursor-default"
              >
                <Star className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-foreground">{activity}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalDevelopmentSection;
