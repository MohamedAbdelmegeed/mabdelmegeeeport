import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { lazy, Suspense } from "react";

const contactMeta = [
  { icon: Mail, value: "m.Abdelmegeed291@gmail.com", href: "mailto:m.Abdelmegeed291@gmail.com" },
  { icon: Linkedin, value: "Mohamed Abdelmegeed", href: "https://www.linkedin.com/in/mohamed-abdelmegeed-" },
  { icon: Github, value: "MohamedAbdelmegeed", href: "https://github.com/MohamedAbdelmegeed" },
];

const FloatingParticles = lazy(() => import("./FloatingParticles"));

const ContactSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const labels = [t.contact.email, t.contact.linkedin, t.contact.github];

  return (
    <section id="contact" className="py-28 px-6 relative">
      {!isMobile && <Suspense fallback={null}><FloatingParticles count={4} /></Suspense>}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-[0.2em] uppercase"
        >
          <Sparkles className="w-3 h-3 inline-block mr-1 mb-0.5" />
          {t.contact.tag}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: "spring" as const }}
          className="font-heading text-3xl md:text-5xl font-bold mb-4"
        >
          {t.contact.title}<span className="text-gradient">{t.contact.titleHighlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-lg text-base md:text-lg"
        >
          {t.contact.subtitle}
        </motion.p>

        <div className="space-y-4">
          {contactMeta.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring" as const, stiffness: 80 }}
              whileHover={{
                x: 12,
                boxShadow: "0 10px 50px hsl(160 60% 45% / 0.15)",
                transition: { type: "spring", stiffness: 300 },
              }}
              className="flex items-center gap-4 glass-ultra border-glow rounded-xl p-5 group transition-all cursor-pointer shimmer relative overflow-hidden"
            >
              {/* Hover sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                transition={{ type: "spring" }}
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:shadow-[0_0_20px_hsl(160_60%_45%/0.2)] relative z-10"
              >
                <link.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{labels[i]}</p>
                <p className="text-muted-foreground text-sm truncate">{link.value}</p>
              </div>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
