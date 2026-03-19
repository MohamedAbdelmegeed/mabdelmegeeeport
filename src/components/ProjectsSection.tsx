import { motion } from "framer-motion";
import { ExternalLink, Folder, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { lazy, Suspense } from "react";

const projectMeta = [
  {
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://ldi-website-m9g4.vercel.app/index.html",
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

  return (
    <section id="projects" className="py-28 px-6 relative">
      {!isMobile && <Suspense fallback={null}><FloatingParticles count={6} /></Suspense>}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {t.projects.tag}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.projects.items.map((project, i) => {
            const meta = projectMeta[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                whileHover={{ y: -5, boxShadow: "0 0 60px hsl(160 60% 45% / 0.1)" }}
                className="glass border-glow rounded-xl p-6 group cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: "radial-gradient(circle at 50% 0%, hsl(160 60% 45% / 0.05), transparent 70%)"
                }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {project.status}
                      </span>
                      {meta?.link && (
                        <a href={meta.link} target="_blank" rel="noopener noreferrer">
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
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
                    {meta?.tags.map(tag => (
                      <span key={tag} className="font-heading text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                        {tag}
                      </span>
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
