import { motion } from "framer-motion";
import { Folder, ArrowUpRight, Rocket } from "lucide-react";

const placeholderProjects = [
  {
    title: "Coming Soon",
    description: "A data analysis project exploring real-world datasets with Python and Pandas.",
    tags: ["Python", "Data Science"],
  },
  {
    title: "Coming Soon",
    description: "A full-stack web application built with React and modern tooling.",
    tags: ["React", "JavaScript"],
  },
  {
    title: "Coming Soon",
    description: "An algorithmic challenge solution implemented in C++ for competitive programming.",
    tags: ["C++", "Algorithms"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        background: "radial-gradient(circle at 80% 50%, hsl(280 60% 55%), transparent 50%)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {"// projects"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-4"
        >
          My <span className="text-gradient">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-lg"
        >
          Currently working on building my project portfolio. Stay tuned for exciting work!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {placeholderProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass border-glow rounded-2xl p-6 group cursor-default relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 0%, hsl(160 60% 45% / 0.08), transparent 60%)" }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Folder className="w-5 h-5 text-primary" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-heading text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                  {project.title}
                  <Rocket className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-heading text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 font-heading text-xs text-muted-foreground glass border-glow rounded-full px-5 py-2.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            More projects loading...
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
