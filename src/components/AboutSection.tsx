import { motion } from "framer-motion";
import { Code2, Database, Brain } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Software Engineering", desc: "Building clean, scalable applications" },
  { icon: Database, title: "Data Science", desc: "Extracting insights from complex data" },
  { icon: Brain, title: "Problem Solver", desc: "Turning ideas into elegant solutions" },
];

const AboutSection = () => {
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
            {"// about"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-bold mb-12"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass border-glow rounded-2xl p-6 md:p-10 glow-box mb-12"
          >
            <p className="text-secondary-foreground leading-relaxed mb-4 text-base md:text-lg">
              I'm an aspiring Software Engineer and Data Scientist at the beginning of my journey.
              I'm driven by curiosity and a passion for problem-solving through code.
            </p>
            <p className="text-secondary-foreground leading-relaxed mb-4 text-base md:text-lg">
              Currently building my skills across multiple programming languages and frameworks,
              I'm eager to contribute to real-world projects and grow as a developer.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              I believe in writing clean, efficient code and continuously learning new technologies
              to stay at the cutting edge of software development and data science.
            </p>
          </motion.div>

          {/* Highlights */}
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
