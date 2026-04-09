import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Folder, ArrowUpRight, Flame } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { lazy, Suspense, useRef } from "react";

const projectMeta = [
  {
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://ldi-website-m9g4.vercel.app/index.html",
  },
  {
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    link: "https://core-x-fitness-beige.vercel.app/",
  },
  {
    tags: ["Python", "React", "Next.js"],
    link: null,
  },
];

const FloatingParticles = lazy(() => import("./FloatingParticles"));

const ProjectsSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1, rotateX: 0,
      transition: {
        delay: 0.2 + i * 0.15,
        type: "spring" as const, stiffness: 100, damping: 15,
      },
    }),
  };

  return (
    <section ref={sectionRef} id="projects" className="py-28 px-6 relative overflow-hidden">
      {/* Parallax bg */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full -left-40 top-10"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(160 60% 45% / 0.05), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full -right-32 bottom-10"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(280 60% 55% / 0.04), transparent 70%)",
        }}
      />

      {!isMobile && <Suspense fallback={null}><FloatingParticles count={5} /></Suspense>}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-[0.2em] uppercase"
        >
          {t.projects.tag}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: "spring" as const }}
          className="font-heading text-3xl md:text-5xl font-bold mb-4"
        >
          {t.projects.title}<span className="text-gradient">{t.projects.titleHighlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-lg text-base md:text-lg"
        >
          {t.projects.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ perspective: "800px" }}>
          {t.projects.items.map((project, i) => {
            const meta = projectMeta[i];
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotateX: 2,
                  boxShadow: "0 24px 60px hsl(160 60% 45% / 0.15), 0 0 80px hsl(160 60% 45% / 0.06)",
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="glass-ultra border-glow rounded-xl p-6 group cursor-default relative overflow-hidden shimmer"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: "radial-gradient(circle at 50% 0%, hsl(160 60% 45% / 0.08), transparent 70%)"
                }} />
                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: "linear-gradient(90deg, transparent, hsl(160 60% 45% / 0.4), transparent)",
                  boxShadow: "0 0 20px hsl(160 60% 45% / 0.3)",
                }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring" }}
                    >
                      <Folder className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                    </motion.div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {project.status}
                      </span>
                      {meta?.link && (
                        <motion.a
                          href={meta.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.3, rotate: 45 }}
                        >
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-heading text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {meta?.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + ti * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="font-heading text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded border border-border/50 hover:border-primary/30 hover:text-primary transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
