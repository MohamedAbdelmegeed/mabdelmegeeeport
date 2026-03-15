import { motion } from "framer-motion";

const skills = [
  { name: "Python", level: 85 },
  { name: "C", level: 70 },
  { name: "C++", level: 70 },
  { name: "Java", level: 65 },
  { name: "JavaScript", level: 80 },
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "React", level: 75 },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-primary text-sm mb-2">{"// skills"}</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10">
            Tech <span className="text-gradient">Stack</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border-glow rounded-lg p-4 group hover:glow-box transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-heading text-sm text-foreground">{skill.name}</span>
                  <span className="font-heading text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
