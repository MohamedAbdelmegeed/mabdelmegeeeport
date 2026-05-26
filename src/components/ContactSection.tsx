import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Sparkles, Copy, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { lazy, Suspense, useState, useCallback } from "react";

const contactMeta = [
  { icon: Mail, value: "m.Abdelmegeed291@gmail.com", href: "mailto:m.Abdelmegeed291@gmail.com", copyable: true },
  { icon: Linkedin, value: "Mohamed Abdelmegeed", href: "https://www.linkedin.com/in/mohamed-abdelmegeed-", copyable: false },
  { icon: Github, value: "MohamedAbdelmegeed", href: "https://github.com/MohamedAbdelmegeed", copyable: false },
];

const FloatingParticles = lazy(() => import("./FloatingParticles"));

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 80, damping: 14 },
  },
};

const ContactSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const labels = [t.contact.email, t.contact.linkedin, t.contact.github];

  const handleCopy = useCallback(async (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, []);

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

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {contactMeta.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                x: 10,
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
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:shadow-[0_0_20px_hsl(160_60%_45%/0.2)] relative z-10 flex-shrink-0"
              >
                <link.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{labels[i]}</p>
                <p className="text-muted-foreground text-sm truncate">{link.value}</p>
              </div>

              {/* Copy button for email */}
              {link.copyable ? (
                <motion.button
                  className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center border border-border/40 hover:border-primary/40 hover:bg-primary/10 transition-all flex-shrink-0"
                  onClick={(e) => handleCopy(e, link.value)}
                  whileTap={{ scale: 0.85 }}
                  title="Copy email"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </motion.button>
              ) : (
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </motion.div>
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* Copied toast */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-ultra border border-primary/30 rounded-xl px-5 py-3 font-heading text-sm text-primary shadow-[0_0_30px_hsl(160_60%_45%/0.2)]"
          >
            ✓ Email copied to clipboard
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
